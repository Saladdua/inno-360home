import nodemailer from "nodemailer"

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
  secure: process.env.NODE_ENV === "production",
})

export async function sendPasswordResetEmail(email: string, name: string, resetLink: string) {
  const mailOptions = {
    from: `"360HOME" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: "Đặt lại mật khẩu 360HOME",
    text: `Xin chào ${name},\n\nBạn đã yêu cầu đặt lại mật khẩu cho tài khoản 360HOME của mình. Vui lòng nhấp vào liên kết sau để đặt lại mật khẩu:\n\n${resetLink}\n\nLiên kết này sẽ hết hạn sau 1 giờ.\n\nNếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.\n\nTrân trọng,\nĐội ngũ 360HOME`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #00796b; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">360HOME</h1>
        </div>
        <div style="padding: 20px; border: 1px solid #e0e0e0; border-top: none;">
          <p>Xin chào ${name},</p>
          <p>Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản 360HOME của mình. Vui lòng nhấp vào nút bên dưới để đặt lại mật khẩu:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" style="background-color: #00796b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Đặt lại mật khẩu</a>
          </div>
          <p>Liên kết này sẽ hết hạn sau 1 giờ.</p>
          <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
          <p>Trân trọng,<br>Đội ngũ 360HOME</p>
        </div>
        <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #757575;">
          <p>© ${new Date().getFullYear()} 360HOME. Tất cả các quyền được bảo lưu.</p>
        </div>
      </div>
    `,
  }

  await transporter.sendMail(mailOptions)
}

