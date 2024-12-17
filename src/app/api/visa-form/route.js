import nodemailer from "nodemailer";

export const POST = async (req) => {
  try {
    const { citizen, travellingTo, category, firstName, email, phoneNumber } = await req.json();

    // Validate data
    if (!firstName || !email || !travellingTo) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing required fields." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Setup Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_APP_PASS,
      },
    });

    const mailOptions = {
      from: `"Visa Form Submission" <${process.env.NEXT_PUBLIC_EMAIL_USER}>`,
      to: process.env.NEXT_PUBLIC_EMAIL_RECEIVER,
      subject: "New Visa Application Submission",
      html: `
        <h2>Visa Application Form Submission</h2>
        <p><strong>Citizen:</strong> ${citizen}</p>
        <p><strong>Travelling To:</strong> ${travellingTo}</p>
        <p><strong>Category:</strong> ${category}</p>
        <p><strong>Name:</strong> ${firstName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phoneNumber || "N/A"}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ success: true, message: "Form submitted successfully!" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Server error, try again." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
