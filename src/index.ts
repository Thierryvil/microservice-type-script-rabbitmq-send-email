import amqp from "amqplib";
import { RABBITMQ_CONNECTION_STRING, RABBITMQ_QUEUE_NAME } from "./settings";
import logger from "./logger";
import { consumeMessage } from "./consume-message";

async function messageHandler(
  message: amqp.ConsumeMessage | null,
  channel: amqp.Channel
) {
  await consumeMessage(channel, message);
}

async function closeChannelAndConnection(
  channel: amqp.Channel,
  connection: amqp.Connection
) {
  await channel.close();
  await connection.close();
}

function setupShutdownLogger(connection: amqp.Connection) {
  process.on("SIGINT", async () => {
    logger.info("Encerrando conexão com o RabbitMQ...");
    await connection.close();
    process.exit(0);
  });
}

async function consumer() {
  const connection = await amqp.connect(RABBITMQ_CONNECTION_STRING);
  logger.info("Conectado ao RabbitMQ");
  setupShutdownLogger(connection);

  const channel = await connection.createChannel();

  await channel.assertQueue(RABBITMQ_QUEUE_NAME, { durable: false });
  logger.info(`Aguardando mensagens da fila: "${RABBITMQ_QUEUE_NAME}"`);

  await channel.consume(RABBITMQ_QUEUE_NAME, async (message) => {
    await messageHandler(message, channel);
    closeChannelAndConnection(channel, connection);
  });
}

consumer().catch(logger.error);
