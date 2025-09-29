import nodemailer from "nodemailer";
import env from "../../../config/env";

export const POST = async (req) => {
  try {
    // Parse the incoming request body
    const { name, email, phone, other } = await req.json();

    // Input validation
    if (!name || !email ) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Name, Email, and Message are required!",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: env.NEXT_PUBLIC_EMAIL_USER,
        pass: env.NEXT_PUBLIC_EMAIL_APP_PASS,
      },
    });

    // Setup email content
    const mailOptions = {
      from: `"JM Visa Services Contact" <${env.NEXT_PUBLIC_EMAIL_USER}>`,
      to: env.NEXT_PUBLIC_EMAIL_RECEIVER,
      subject: "New Contact Form Submission",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <div style="background-color: #007BFF; color: #ffffff; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 1.8rem; font-weight: bold;">New Contact Form Submission</h1>
          </div>

          <!-- Body -->
          <div style="padding: 20px; background-color: #ffffff; color: #333333;">
            <p style="font-size: 1.1rem; margin-bottom: 10px;">
              <strong>Name:</strong> <span style="color: #007BFF;">${name}</span>
            </p>
             <p style="font-size: 1.1rem; margin-bottom: 10px;">
              <strong>Phone:</strong> <span style="color: #007BFF;">${phone}</span>
            </p>
            <p style="font-size: 1.1rem; margin-bottom: 10px;">
              <strong>Email:</strong> <a href="mailto:${email}" style="color: #007BFF; text-decoration: none;">${email}</a>
            </p>
            <p style="font-size: 1.1rem; margin-bottom: 10px;">
                <strong>From:</strong> <span style="color: #007BFF;">${other || "Home Page"}</span>
                </p>
          </div>

          <!-- Footer -->
          <div style="background-color: #f8f9fa; padding: 15px; text-align: center; color: #666666; font-size: 0.9rem;">
            <p style="margin: 0;">This email was sent via the JM Visa Contact Form.</p>
          </div>
        </div>
      `,
      text: `New submission from ${name} (${email},${phone}, ${other}`,
    };

    // Aggressive IST time function
    const getIndianTime = () => {
      const now = new Date();
      const utcTime = now.getTime();
      const istOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds
      const istTime = new Date(utcTime + istOffset);
      const year = istTime.getUTCFullYear();
      const month = String(istTime.getUTCMonth() + 1).padStart(2, '0');
      const day = String(istTime.getUTCDate()).padStart(2, '0');
      let hours = istTime.getUTCHours();
      const minutes = String(istTime.getUTCMinutes()).padStart(2, '0');
      const seconds = String(istTime.getUTCSeconds()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      const displayHours = String(hours).padStart(2, '0');
      return `${day}/${month}/${year}, ${displayHours}:${minutes}:${seconds} ${ampm} (IST)`;
    };

    const indianTime = getIndianTime();

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    // Log successful email sending
    console.log("Email sent successfully:", info.messageId);

    // Send to Google Sheets
    try {
      await fetch('https://script.google.com/macros/s/AKfycbyFjUGmoLofjOWl4AwEDRmCG7PRYC0c9CDBB9nkbwe2n8n0ihHJeHhPtoRsXKuXiYZb/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageSource: other || 'Contact Form - Home Page',
          formType: 'Contact Form',
          name: name || '',
          email: email || '',
          phone: phone || '',
          message: `Contact request from ${name} (${email}) - Phone: ${phone}`,
          extraInfo: `Submitted from contact form at ${indianTime}`
        }),
      });
      console.log('Data sent to Google Sheets successfully');
    } catch (sheetError) {
      console.error('Error sending data to Google Sheets:', sheetError);
    }

    // Success response
    return new Response(
      JSON.stringify({
        success: true,
        message: "Your message has been sent successfully!",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error sending email:", error);

    // Error response
    return new Response(
      JSON.stringify({
        success: false,
        message:
          "Something went wrong while sending your message. Please try again later!",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
