import transporter from '../config/mailTransporter.js';



// console.log("Message sent: %s", info.messageId);
export default async function sendVerificationEmail(userId) {

	// https://nodemailer.com/usage/testing-with-ethereal
	const verificationMail = await transporter.sendMail({
		from: '"Admin Sender" <test@example.com>',
		to: "recipient@example.com",
		subject: `Verify your Email: User ${userId}`,
		text: "This is a test email sent via Nodemailer",
		html: `<a href='https://localhost/auth/verify-email/${token}'>This is a <b>test verification email</b> sent via Nodemailer!</a>`,
	});
	try {
		console.debug(verificationMail)
	} catch (error) {
		console.debug(error)
	}
}