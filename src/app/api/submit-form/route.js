import nodemailer from 'nodemailer';
import { sendToGoogleSheets } from '../../../lib/googleSheetsClient';

export const dynamic = 'force-dynamic';

const getIndianTime = () => {
  const now = new Date();
  const utcTime = now.getTime();
  const istOffset = 5.5 * 60 * 60 * 1000;
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

const DEDUPE_GLOBAL_KEY = Symbol.for('jmvisa.submitForm.recentSubmissions');
if (!globalThis[DEDUPE_GLOBAL_KEY]) {
  globalThis[DEDUPE_GLOBAL_KEY] = new Map();
}
const recentSubmissions = globalThis[DEDUPE_GLOBAL_KEY];
const DEDUPE_WINDOW_MS = 15 * 60 * 1000;

const cleanupOldSubmissions = () => {
  const cutoff = Date.now() - DEDUPE_WINDOW_MS;
  for (const [key, ts] of recentSubmissions.entries()) {
    if (ts < cutoff) recentSubmissions.delete(key);
  }
};

const checkAndRecordDuplicate = (email, phone) => {
  cleanupOldSubmissions();
  const emailKey = `e:${(email || '').toLowerCase().trim()}`;
  const phoneDigits = (phone || '').replace(/\D/g, '');
  const phoneKey = phoneDigits ? `p:${phoneDigits}` : null;

  const isDup =
    (emailKey !== 'e:' && recentSubmissions.has(emailKey)) ||
    (phoneKey && recentSubmissions.has(phoneKey));

  if (isDup) return true;

  const now = Date.now();
  if (emailKey !== 'e:') recentSubmissions.set(emailKey, now);
  if (phoneKey) recentSubmissions.set(phoneKey, now);
  return false;
};

const normalizeCountryCode = (code) =>
  (code || '').toString().replace('+', '').trim();

const extractLocalPhone = (googleSheetsPhone, countryCodeDigits, fallbackPhone) => {
  const safeDigits = (googleSheetsPhone || '').replace(/\D/g, '');
  if (safeDigits && countryCodeDigits && safeDigits.startsWith(countryCodeDigits)) {
    return safeDigits.slice(countryCodeDigits.length);
  }
  if (safeDigits) return safeDigits;
  return (fallbackPhone || '').replace(/\D/g, '');
};

export const POST = async (req) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      googleSheetsPhone,
      country,
      visaType,
      formSource,
      countryCode,
      from,
      fromCategory,
      pageLink,
      pageName,
      extraInfo,
      userLocation,
      userPincode,
      userIp,
    } = await req.json();
    const name = `${firstName ? firstName : ''} ${lastName ? lastName : ''}`.trim();

    if (!firstName || !lastName || !email || !phone || !country || !visaType) {
      return new Response(
        JSON.stringify({
          error: 'All fields are required!',
          receivedData: { firstName, lastName, email, phone, country, visaType, formSource }
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (checkAndRecordDuplicate(email, phone)) {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Form already submitted recently.',
          duplicate: true,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const emailUser = process.env.NEXT_PUBLIC_EMAIL_USER || process.env.EMAIL_USER;
    const emailPass = process.env.NEXT_PUBLIC_EMAIL_APP_PASS || process.env.NEXT_PUBLIC_EMAIL_APP_PASSWORD || process.env.EMAIL_APP_PASS;
    const emailReceiver = process.env.NEXT_PUBLIC_EMAIL_RECEIVER || process.env.EMAIL_RECEIVER || 'info@jmvisaservices.com';

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const indianTime = getIndianTime();

    const mailOptions = {
      from: `"JM Visa Consultation" <${emailUser}>`,
      to: emailReceiver,
      subject: `New Visa Consultation Request - ${visaType} - ${country}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="background: #2563eb; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">New Visa Consultation Request</h1>
          </div>
          
          <div style="padding: 20px; background: #ffffff;">
            <h2 style="color: #2563eb; margin-top: 0;">Visa Details</h2>
            <p><strong>Type:</strong> ${visaType}</p>
            <p><strong>Country:</strong> ${country}</p>
            <p><strong>Form Source:</strong> ${formSource || 'ads-visa'}</p>
            
            <h2 style="color: #2563eb; margin-top: 20px;">Applicant Information</h2>
            <p><strong>First Name:</strong> ${firstName}</p>
            <p><strong>Last Name:</strong> ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>

            <h2 style="color: #2563eb; margin-top: 20px;">User Location Details (Auto-Fetched)</h2>
            <p><strong>Location:</strong> ${userLocation || 'Unknown'}</p>
            <p><strong>Pincode:</strong> ${userPincode || 'Unknown'}</p>
            <p><strong>IP Address:</strong> ${userIp || 'Unknown'}</p>
          </div>
          
          <div style="background: #f1f5f9; padding: 15px; text-align: center; font-size: 12px; color: #64748b;">
            <p style="margin: 0;">This request was submitted at <strong>${indianTime}</strong></p>
          </div>
        </div>
      `,
    };

    let emailSent = false;
    try {
      if (emailUser && emailPass) {
        await transporter.sendMail(mailOptions);
        emailSent = true;
      }
    } catch (emailErr) {
      console.error('Email send failed (lead will still be saved to sheet):', emailErr?.message);
    }

    const sourceValue = from || fromCategory || formSource || 'ads-visa';
    const pageValue = pageName || pageLink || formSource || 'ads-visa landing page';
    const digitsCountryCode = normalizeCountryCode(countryCode);
    const phoneWithoutCode = extractLocalPhone(googleSheetsPhone, digitsCountryCode, phone);

    await sendToGoogleSheets(
      {
        firstName: firstName || '',
        lastName: lastName || '',
        name,
        email: email || '',
        phone: googleSheetsPhone || phone || '',
        googleSheetsPhone: googleSheetsPhone || '',
        countryCode: digitsCountryCode,
        phoneWithoutCode,
        country: country || '',
        countryName: country || '',
        visaType: visaType || '',
        serviceSelected: visaType || '',
        formSource: formSource || 'ads-visa',
        from: sourceValue,
        fromCategory: sourceValue,
        source: sourceValue,
        pageLink: pageLink || '',
        pageName: pageValue,
        extraInfo: extraInfo || '',
        userLocation: userLocation || '',
        userPincode: userPincode || '',
        userIp: userIp || '',
        submittedAt: indianTime,
      },
      'visa consultation form'
    );

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Form submitted successfully!',
        emailSent,
        data: {
          name,
          firstName,
          lastName,
          email,
          phone,
          country,
          visaType,
          formSource,
          submittedAt: indianTime
        }
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error submitting form:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Error submitting form. Please try again later.',
        error: error.message
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
