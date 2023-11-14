const nodemailer = require("nodemailer");
const { env } = require("process");

const transporter = nodemailer.createTransport({
    host: "smtp.forwardemail.net",
    port: 465,
    secure: true,
    auth: {
        user: env.EMAIL_ACCOUNT,
        pass: env.EMAIL_PASSWORD,
    },
});

exports.handler = async (event) => {
    let body;
    try {
        body = JSON.parse(event.body);
    } catch (parseError) {
        console.error('Invalid JSON format: ', parseError);
        return{
            statusCode: 400,
            body: JSON.stringify({ error: 'JSON Error.', parseError }),
        };
    }

    const { name, email, message } = body;

    const info = await transporter.sendMail({
        from: '"Stover Mailer" <stover-mailer@tayven-stover.com>',
        to: "tayvenstover@gmail.com",
        subject: `New Contact From: ${name}`,
        text: `Name: ${name}
        Email: ${email}
        Message: ${message}`,
        html: `<style>*{font-family:verdana;}.data-span{font-weight:100;}</style>
        <h3>Name: <span class="data-span">${name}</span></h3>
        <h3>Email: <span class="data-span">${email}</span></h3>
        <h3>Message: <span class="data-span">${message}</span></h3>`,
    });

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Email sent.' }),
    };
}