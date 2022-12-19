var nodeMailer = require("nodemailer");
const env = require("../config/env")();
var emailTemplates = require("./emailTemplates");

var transport = nodeMailer.createTransport({
	service: "GMAIL",
	auth: {

		user: "goelharish0@gmail.com",
        pass: "fmmydjssxqfyutdx"
	}
    
});
let renderMessageFromTemplateAndVariables = async (templateData, variablesData) => {
	var Handlebars = require("handlebars");
	return await Handlebars.compile(templateData)(variablesData);
};
module.exports = {
	sendMail: async (emailType, emailId, emailVariables,X) => {
		var message = {
			from: `${env.APP_NAME} <${env.EMAIL.SMTP_CREDENTIALS.email}>`,
			to: emailId
		};
		switch (emailType) {
			case "REGISTER_USER":
				message.subject = `Registered with ${env.APP_NAME}`;
				message.html = await renderMessageFromTemplateAndVariables(emailTemplates.registerUser, emailVariables);
				break;
			case "FORGOT_PASSWORD":
				message.subject = "Forgot Password";
				message.html = await renderMessageFromTemplateAndVariables(emailTemplates.forgotPassword, emailVariables);
				break;
			case  "FORGOT_PASSWORD_ADMIN":
				message.subject = "Forgot Password";
				message.html = await renderMessageFromTemplateAndVariables(emailTemplates.forgorPasswordAdmin, emailVariables);
				break;

			case  "PROFILE_HONOR":
				message.subject = `Registered with ${env.APP_NAME}`;
				message.html = await renderMessageFromTemplateAndVariables(emailTemplates.registerProfile, emailVariables);
				break;
		}
		return transport.sendMail(message, (error) => {
			if (error) {
				console.log("send mail error--", error);
			} else {
				console.log("Sucess...");
			}
		});
	},
};

