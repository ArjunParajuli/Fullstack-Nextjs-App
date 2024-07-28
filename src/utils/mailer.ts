import nodemailer from "nodemailer";
import { v4 as uuid } from "uuid";
import User from "@/models/userModel";

export const sendMail = async ({ email, emailType, userId }: any) => {
  try {
    // unique token, we can also use bcrypt.hash() to create a unique token
    const token = uuid();

    // this token will be updated in db & also sent to the user's mail
    if (emailType === "VERIFY") {
      await User.findOneAndUpdate(userId, {
        verifyEmailToken: token,
        verifyEmailTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findOneAndUpdate(userId, {
        forgotPasswordToken: token,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "675eb038130812",
        pass: "21c4538a5e0b5a",
      },
    });

    const mailOptions = {
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>',
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      text: "Hello world?",
      html: `<p> Click <a href="${process.env.DOMAIN}/verifyEmail?token=${token}">here</a> to ${
        emailType === "VERIFY" ? "Verify your email" : "Reset your password"
      } </p>`,
    };

    const mailRes = await transport.sendMail(mailOptions);
    return mailRes;
  } catch (err: any) {
    throw new err();
  }
};
