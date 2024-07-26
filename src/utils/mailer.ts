import nodemailer from 'nodemailer'

export const sendMail = async({email, emailType, userId}:any) =>{
    try{
        // TODO: configure mail (logic part)

        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: "maddison53@ethereal.email",
              pass: "jn7jnAPss4f63QBp6D",
            },
          });

          const mailOptions = {
            from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', 
            to: email, 
            subject: emailType==='VERIFY' ? 'Verify your email!' : 'Reset your password', 
            text:  "Hello world?", 
            html: "<b>Hello world?</b>", 
          };

          const mailRes = await transporter.sendMail(mailOptions);
          return mailRes
    }catch(err:any){
        throw new err
    }
}