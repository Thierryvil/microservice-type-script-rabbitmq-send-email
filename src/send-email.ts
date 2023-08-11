import nodemailer from "nodemailer";
import {
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USERNAME,
  EMAIL_PASSWORD,
  EMAIL_FROM,
} from "./settings";

const EMAIL_CONFIG = {
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  auth: {
    user: EMAIL_USERNAME,
    pass: EMAIL_PASSWORD,
  },
};
import { Mail } from "./mail";
import logger from "./logger";

export async function sendEmail(mail: Mail) {
  try {
    if (!mail) {
      throw new Error("Nenhum email informado");
    }

    var transport = nodemailer.createTransport(EMAIL_CONFIG);
    const mailOptions = {
      from: EMAIL_FROM,
      to: mail.to,
      subject: mail.subject,
      text: mail.text,
    };
    const info = await transport.sendMail(mailOptions);
    logger.info(`Email enviado: ${info.response}`);
  } catch (error) {
    logger.error(`[ERROR] SEND EMAIL: ${error}`);
  }
}
