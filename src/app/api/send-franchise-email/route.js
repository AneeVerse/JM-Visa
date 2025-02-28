import nodemailer from 'nodemailer';

export const POST = async (req) => {
  try {
    // Parse the incoming JSON data
    const { name, email, phone, experience } = await req.json();

    // Validate required fields
    if (!name || !email || !phone || !experience) {
      return new Response(
        JSON.stringify({ error: 'All fields are required!' }),
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
      from: `"JM Visa Franchise" <${process.env.NEXT_PUBLIC_EMAIL_USER}>`,
      to: process.env.NEXT_PUBLIC_EMAIL_RECEIVER,
      subject: 'New Franchise Application',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            New Franchise Application
          </h2>
          <div style="margin-top: 20px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Experience:</strong></p>
            <div style="background-color: #f8fafc; padding: 15px; border-radius: 5px; margin-top: 10px;">
              ${experience}
            </div>
          </div>
          <div style="margin-top: 30px; color: #64748b; font-size: 0.9em;">
            Sent from JM Visa Franchise Application Form
          </div>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ success: true, message: 'Application submitted successfully!' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error sending email:', error.message);

    return new Response(
      JSON.stringify({ success: false, message: 'Error submitting application' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
