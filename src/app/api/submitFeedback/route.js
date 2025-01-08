import nodemailer from 'nodemailer';

export const POST = async (req) => {
  try {
    // Parse the incoming JSON data
    const { message } = await req.json();

    // Validate the message field
    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Message is required!' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Nodemailer transporter setup
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_APP_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: `"Feedback Form" <${process.env.NEXT_PUBLIC_EMAIL_USER}>`,
      to: process.env.NEXT_PUBLIC_EMAIL_RECEIVER, // Receiver's email
      subject: 'New Feedback Message',
      html: `
        <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 20px auto; background-color: #f8f9fa; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; box-shadow: 0px 4px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <div style="background-color: #4f46e5; color: #ffffff; text-align: center; padding: 20px;">
            <h1 style="margin: 0; font-size: 1.8rem; letter-spacing: 1px;">New Feedback Message</h1>
          </div>
          <!-- Content -->
          <div style="padding: 20px; background-color: #ffffff;">
            <p style="margin-bottom: 10px; font-size: 1.1rem; color: #333333;">
              <strong>Message:</strong>
            </p>
            <div style="background-color: #f1f5f9; padding: 15px; border-left: 5px solid #4f46e5; border-radius: 5px; font-size: 1rem; line-height: 1.5; color: #333333;">
              ${message}
            </div>
          </div>
          <!-- Footer -->
          <div style="background-color: #f1f5f9; text-align: center; padding: 15px; font-size: 0.9rem; color: #555555;">
            <p style="margin: 0;">This email was sent from the feedback form on your website.</p>
          </div>
        </div>
      `,
      text: `New feedback message: ${message}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ success: true, message: 'Feedback message sent successfully!' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error sending email:', error.message);

    return new Response(
      JSON.stringify({ success: false, message: 'Error sending message!' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
