import nodemailer from "nodemailer";

export const POST = async (req) => {
  try {
    // Parse the incoming request body
    const { name, email, phone, message } = await req.json();

    // Input validation
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ success: false, message: "Name, Email, and Message are required!" }),
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
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #2c3e50; margin-bottom: 10px;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f8f9fa; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
            ${message}
          </div>
        </div>
      `,
      text: `New submission from ${name} ${email}, ${message}`,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    // Log successful email sending
    console.log("Email sent:", info.messageId);

    // Success response
    return new Response(
      JSON.stringify({ success: true, message: "Your message has been sent successfully!" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error sending email:", error);

    // Error response
    return new Response(
      JSON.stringify({
        success: false,
        message: "Something went wrong while sending your message. Please try again later!",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
