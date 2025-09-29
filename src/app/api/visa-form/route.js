import nodemailer from "nodemailer";
import env from "../../../config/env";

export const POST = async (req) => {
  try {
    const { citizen, travellingTo, category, firstName, email, phoneNumber, pageSource } = await req.json();

    // Validate required fields
    if (!firstName || !email || !travellingTo) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing required fields." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: env.NEXT_PUBLIC_EMAIL_USER,
        pass: env.NEXT_PUBLIC_EMAIL_APP_PASS,
      },
    });

    // HTML Email Content
    const mailOptions = {
      from: `"Visa Form Submission" <${env.NEXT_PUBLIC_EMAIL_USER}>`,
      to: env.NEXT_PUBLIC_EMAIL_RECEIVER,
      subject: "New Visa Application Submission",
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); border-radius: 8px; overflow: hidden;">
          <!-- Header -->
          <div style="background-color: #4a90e2; padding: 20px; text-align: center; color: #ffffff;">
            <h1 style="margin: 0; font-size: 1.8rem;">Visa Application Form Submission</h1>
          </div>

          <!-- Body -->
          <div style="padding: 20px; background-color: #ffffff;">
            <p style="font-size: 1.1rem; margin: 0 0 10px;"><strong>Citizen:</strong> <span style="color: #4a90e2;">${citizen}</span></p>
            <p style="font-size: 1.1rem; margin: 0 0 10px;"><strong>Travelling To:</strong> <span style="color: #4a90e2;">${travellingTo}</span></p>
            <p style="font-size: 1.1rem; margin: 0 0 10px;"><strong>Category:</strong> <span>${category}</span></p>
            <p style="font-size: 1.1rem; margin: 0 0 10px;"><strong>Name:</strong> ${firstName}</p>
            <p style="font-size: 1.1rem; margin: 0 0 10px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #4a90e2; text-decoration: none;">${email}</a></p>
            <p style="font-size: 1.1rem; margin: 0 0 10px;"><strong>Phone:</strong> ${phoneNumber || "N/A"}</p>
          </div>

          <!-- Footer -->
          <div style="background-color: #f8f9fa; padding: 15px; text-align: center; color: #777777; font-size: 0.9rem;">
            <p style="margin: 0;">This email was generated from the Visa Application Form on JM Visa Services.</p>
          </div>
        </div>
      `,
      text: `Visa Form Submission:\nCitizen: ${citizen}\nTravelling To: ${travellingTo}\nCategory: ${category}\nName: ${firstName}\nEmail: ${email}\nPhone: ${phoneNumber || "N/A"}`,
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
    await transporter.sendMail(mailOptions);

    // Send to Google Sheets
    try {
      await fetch('https://script.google.com/macros/s/AKfycbyFjUGmoLofjOWl4AwEDRmCG7PRYC0c9CDBB9nkbwe2n8n0ihHJeHhPtoRsXKuXiYZb/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageSource: pageSource || 'Visa Application - Unknown Page',
          formType: 'Visa Application',
          name: firstName || '',
          email: email || '',
          phone: phoneNumber || '',
          message: `Visa application for ${travellingTo} - Category: ${category}`,
          visaType: category || '',
          citizen: citizen || '',
          travellingTo: travellingTo || '',
          extraInfo: `Submitted from visa form at ${indianTime}`
        }),
      });
      console.log('Visa form data sent to Google Sheets successfully');
    } catch (sheetError) {
      console.error('Error sending visa form data to Google Sheets:', sheetError);
    }

    return new Response(
      JSON.stringify({ success: true, message: "Form submitted successfully!" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error sending email:", error);

    return new Response(
      JSON.stringify({ success: false, message: "Server error, please try again." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
