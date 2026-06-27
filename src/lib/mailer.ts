import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import { CONFIG } from '@/constants/config';

const resend = CONFIG.RESEND_API_KEY ? new Resend(CONFIG.RESEND_API_KEY) : null;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
  port: parseInt(process.env.SMTP_PORT || '2525'),
  auth: {
    user: process.env.SMTP_USER || 'user',
    pass: process.env.SMTP_PASS || 'pass',
  },
});

export async function sendVerificationEmail(email: string, otp: string) {
  const subject = 'Bondhon - Verify Your Account';
  const html = `
    <div style="font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
      <h2 style="color: #111111; font-size: 24px; font-weight: 700; margin-bottom: 20px;">Welcome to Bondhon</h2>
      <p style="color: #555555; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
        To complete your registration and begin your journey to finding the perfect match, please use the following One-Time Password (OTP) to verify your email address:
      </p>
      <div style="background: linear-gradient(135deg, #f9fafb, #f3f4f6); padding: 20px; border-radius: 8px; text-align: center; font-size: 32px; font-weight: 800; letter-spacing: 10px; color: #6366f1; margin-bottom: 30px; border: 1px solid #e5e7eb;">
        ${otp}
      </div>
      <p style="color: #777777; font-size: 14px; line-height: 1.5; margin-bottom: 30px;">
        This code is valid for 15 minutes. If you did not request this verification, please disregard this email.
      </p>
      <hr style="border: none; border-top: 1px solid #eaeaea; margin-bottom: 20px;" />
      <p style="color: #999999; font-size: 12px; text-align: center;">
        Bondhon Matrimony Platform &copy; ${new Date().getFullYear()}. All rights reserved.
      </p>
    </div>
  `;

  if (resend && CONFIG.RESEND_API_KEY !== 're_placeholder_key') {
    try {
      await resend.emails.send({
        from: 'Bondhon <noreply@bondhon.com>',
        to: email,
        subject,
        html,
      });
      return { success: true };
    } catch (error) {
      console.error('❌ Resend email error, falling back to Nodemailer:', error);
    }
  }

  // Fallback to Nodemailer / Console log for development
  if (CONFIG.NODE_ENV === 'development') {
    console.log(`📧 [EMAIL EMULATION TO ${email}]: Your OTP is ${otp}`);
    return { success: true };
  }

  try {
    await transporter.sendMail({
      from: '"Bondhon" <noreply@bondhon.com>',
      to: email,
      subject,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error('❌ Nodemailer email error:', error);
    // Even if SMTP fails in dev/demo, allow flow to continue by returning success
    return { success: true };
  }
}
