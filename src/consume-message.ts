import { Channel, ConsumeMessage } from "amqplib";
import logger from "./logger";
import { sendEmail } from "./send-email";
import { Mail } from "./mail";

async function consumeMessage(
  channel: Channel,
  message: ConsumeMessage | null
) {
  if (!message) return;

  try {
    const content = message.content.toString();
    logger.info(`Mensagem recebida: ${content}`);

    const mail: Mail = JSON.parse(content);
    await sendEmail(mail);

    channel.ack(message);
  } catch (error) {
    logger.error(`Erro ao enviar email: ${error}`);
    channel.nack(message);
  }
}

export { consumeMessage };
