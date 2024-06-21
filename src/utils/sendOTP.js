const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: 'monopolyuz2024@gmail.com', // Replace with your Gmail address
        pass: 'mlsl eoii haok nitc' // Replace with your Google App Password
    }
});

async function main(otp, email) {
    console.log(otp, email)
    try {
        const info = await transporter.sendMail({
            from: 'monopolyuz2024@gmail.com',
            to: email,
            subject: "3 daqiqalik kodingiz",
            text: "Hello world",
            html: `<h1>Assalomu alaykum sizning 1 daqiqalik kodingiz: ${otp}</h1>`
        });

        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
        throw error; // Propagate the error up if needed
    }
}

module.exports = main;



// const nodemailer = require('nodemailer');
// const { error } = require('winston');

// const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     auth: {
//         user: 'uzbbnbf@gmail.com ', // Replace with your Gmail address
//         pass: 'mxvs xuvh vqyi zled' // Replace with your Google App Password
//     }
// });

// async function main(otp, email) {
//     try {
//         if (!email) {
//             console.log("Email kiritilmang")
//             // throw new Error('No recipient email provided');
//         }
//         if (!otp) {
//             console.log("Otp kiritilmang")

//             // throw new Error('No recipient email provided');
//         }

//         const info = await transporter.sendMail({
//             from: 'monopolyuz2024@gmail.com',
//             to: email,
//             subject: "3 daqiqalik kodingiz",
//             text: "Hello world",
//             html: `<h1>Assalomu alaykum sizning 1 daqiqalik kodingiz: ${otp}</h1>`
//         });

//         console.log("Message sent: %s", info.messageId);
//     } catch (error) {
//         // console.error("Error sending email:", error);
//         throw error; // Propagate the error up if needed
//     }
// }

// main(33234, 'uzbbnbf@gmail.com')
// .then(()=>{console.log("Jonatildi")})
// .catch((err)=>{log(err)})

// module.exports = main;
