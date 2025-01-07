import nodemailer from 'nodemailer';

export const POST = async (req) => {
  try {
    // Parse the incoming JSON data
    const { email } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required!' }),
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

    // Email content for Terms and Conditions consent
    const emailContent = `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Consent for Visa Application Services</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f8f9fa;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #4f46e5;
      color: #ffffff;
      text-align: center;
      padding: 20px;
    }
    .header h1 {
      margin: 0;
      font-size: 1.8rem;
      letter-spacing: 1px;
    }
    .content {
      padding: 20px;
      color: #333333;
    }
    .content p {
      font-size: 1.1rem;
      line-height: 1.5;
    }
    .content strong {
      font-size: 1.1rem;
    }
    .footer {
      background-color: #f1f5f9;
      text-align: center;
      padding: 15px;
      font-size: 0.9rem;
      color: #555555;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Consent for Visa Application Services</h1>
    </div>
    <div class="content">
      <p>Dear Applicant,</p>
      <p>Thank you for choosing JM Visa Services for your visa assistance. We value your trust and are committed to providing professional guidance throughout the visa application process. Kindly review the following consent statement carefully:</p>

      <p><strong>1. No Guarantee of Visa Approval:</strong><br>
        JM Visa Services provides professional visa guidance and application assistance but does not guarantee visa approval. The decision is solely made by the respective embassy/consulate.
      </p>

      <p><strong>2. Accuracy of Information:</strong><br>
        It is your responsibility to ensure that all information and documents provided are accurate and complete. JM Visa Services is not liable for any visa rejection due to false, misleading, or incomplete information provided.
      </p>

      <p><strong>3. Limitation of Liability:</strong><br>
        JM Visa Services will not be held responsible for any visa rejection, processing delays, or travel disruptions resulting from decisions made by the embassy/consulate.
      </p>

      <p><strong>4. Non-Refundable Payments:</strong><br>
        All payments made to the embassy and JM Visa Services are strictly non-refundable, regardless of the outcome of the visa application.
      </p>

      <p><strong>Terms and Conditions:</strong></p>
      <ul>
        <li>This is a basic document list; the Embassy reserves the right to request additional documents after submission. These must be provided for further processing.</li>
        <li>Confirmed air tickets and hotel bookings are not mandatory for the visa process.</li>
        <li>JM Visa Services is not responsible for the cost of confirmed air tickets and hotel bookings purchased before or during the visa process and decision.</li>
        <li>We cannot influence visa decisions or processing times in any manner.</li>
        <li>Visa fees are non-refundable once paid to the authorities under any circumstances.</li>
        <li>JM Visa Services charges and air ticket blocking charges are non-refundable once the application is submitted, regardless of the circumstances.</li>
        <li>We do not have any influence over visa processing and decision-making processes.</li>
        <li>We cannot expedite the visa process once an application is submitted.</li>
        <li>All communications will be conducted via our company landline and email address only.</li>
        <li>Document exchange will occur via email only.</li>
        <li>Documents in regional languages must be duly translated into English.</li>
      </ul>
          <p style="font-size: 1.1rem; color: #333333;">
            <strong>By replying to this email with "I Agree," you confirm that you have read, understood, and accepted the above terms and conditions.</strong>
          </p>

          <div style="background-color: #f1f5f9; text-align: center; padding: 15px; font-size: 0.9rem; color: #555555;">
            <p style="margin: 0;">This email was sent from JM Visa Services.</p>
            <p style="margin: 0;">For assistance, you can contact us at:</p>
            <p style="margin: 0;">Phone: +91 9321315524</p>
            <p style="margin: 0;">Email: <a href="mailto:jayeshmore@jmvisaservices.com">jayeshmore@jmvisaservices.com</a></p>
            <p style="margin: 0;">Website: <a href="http://www.jmvisaservices.com" target="_blank">www.jmvisaservices.com</a></p>
          </div>
        </div>

</body>
</html>
    `;

    // Email options
    const mailOptions = {
      from: `"JM Visa Services" <${process.env.NEXT_PUBLIC_EMAIL_USER}>`,
      to: email,
      subject: 'Consent for Visa Application Services',
      html: emailContent,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ success: true, message: 'Consent email sent successfully!' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error sending email:', error.message);

    return new Response(
      JSON.stringify({ success: false, message: 'Error sending email!' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
