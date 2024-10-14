import { mailtrapClient , sender } from "./mailtrap.config.js";
import {VERIFICATION_EMAIL_TAPMLATE , PASSWORD_RESET_REQUEST_TEMPLATE , PASSWORD_RESET_SUCCESS_TEMPLATE, } from "./emailTemplates.js";

export const sendVerificationEmail = async ( email , verificationToken) =>{

    const recipient =  [{email}];
    try {

        const response = await mailtrapClient.send({
            from:sender,
            to:recipient,
            subject:"Verify Your Email",
            html:VERIFICATION_EMAIL_TAPMLATE.replace("{verificationCode}",verificationToken),
            category:"Email Verification"

        });

        console.log("Email send successfully", response);
        
    } catch (error) {

        console.error(`Error sending verification email`, error);

        throw new Error(`Error sending verification email : ${error}`)
    
    }

}

export const sendWelcomeEmail = async (email, name) =>{


    const recipient = [{email}];

    try {

   
    const response =  await mailtrapClient.send({
        from: sender,
        to: recipient,
        template_uuid: process.env.WELCOME_TEMPLATE,
        template_variables: {
          "company_info_name": process.env.COMPANY_NAME,
          "name": name,
        }
      })

        console.log("Welcome Email sent succesfully" , response );
        
    } catch (error) {

        console.error("Error sending welcome email" , error);
        throw new Error(`Error sending welcome email ${error}`)
        
    }

}

export const sendPasswordResetEmail = async (email , resetURL) =>{

    const recipient =[{email}];

    try {
        const response = await mailtrapClient.send({
            from:sender,
            to: recipient,
            subject:"Reset Your Password",
            html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category:"Password Reset",

        });

        console.log("Reset password sent to your email successfully " , response );


        
    } catch (error) {
        
        console.error("Error sending password reset email" , error);
        throw new Error(`Error sending password reset email: ${error}`);
    }


}

export const  sendResetSuccessfulEmail = async (email) =>{

    const recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from:sender,
            to:recipient,
            subject:"Password reset successful",
            html:PASSWORD_RESET_SUCCESS_TEMPLATE,
            category:"Password reset"
        });
        console.log("Password reset email sent successfully" , response);
    } catch (error) {
        
        console.error("Error sending password reset success email" , error);
        throw new Error(`Error sending password reset success email: ${error}`); 
    }

}