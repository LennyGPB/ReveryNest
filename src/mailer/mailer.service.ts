import { Injectable } from '@nestjs/common'
import { Resend } from 'resend'

@Injectable()
export class MailerService {
  private resend = new Resend(process.env.RESEND_API_KEY)

  async sendPasswordResetEmail(email: string, token: string) {
    const resetLink = `revery://reset-password?token=${token}`

    await this.resend.emails.send({
      from: 'Revery <onboarding@resend.dev>',
      to: email,
      subject: 'Reset your password',
      html: `
        <h2>Password Reset</h2>
        <p>You requested to reset your password.</p>
        <p>Click the button below to open the app:</p>
        <a href="${resetLink}" 
           style="padding:12px 20px;background:#8b5cf6;color:white;text-decoration:none;border-radius:6px;">
           Reset Password
        </a>
        <p>This link expires in 1 hour.</p>
      `
    })
  }
}