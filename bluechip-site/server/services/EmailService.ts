import nodemailer from 'nodemailer'

export class EmailService {
  private static transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: process.env.SMTP_TLS_REJECT_UNAUTHORIZED !== 'false',
    },
  })

  static async sendOtpEmail(email: string, otp: string): Promise<void> {
    const from = process.env.SMTP_FROM || process.env.SMTP_USER

    if (!from || !process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      throw new Error('SMTP configuration is missing')
    }

    await this.transporter.sendMail({
      from,
      to: email,
      subject: 'Your verification code',
      text: `Your verification code is: ${otp}\n\nThis code expires in 10 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <p>Hello,</p>
          <p>Your verification code is:</p>
          <p style="font-size: 28px; font-weight: bold; letter-spacing: 4px; margin: 18px 0;">${otp}</p>
          <p>This code expires in 10 minutes.</p>
        </div>
      `,
    })
  }
}
