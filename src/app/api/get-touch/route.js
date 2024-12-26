import nodemailer from "nodemailer";

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
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_APP_PASS,
      },
    });

    // Setup email content
    const mailOptions = {
      from: `"JM Visa Contact" <${process.env.NEXT_PUBLIC_EMAIL_USER}>`,
      to: process.env.NEXT_PUBLIC_EMAIL_RECEIVER,
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

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    // Log successful email sending
    console.log("Email sent successfully:", info.messageId);

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
