import { config } from "dotenv";

config();

export const RABBITMQ_CONNECTION_STRING =
  process.env.RABBITMQ_CONNECTION_STRING ?? "";

export const RABBITMQ_QUEUE_NAME = process.env.RABBITMQ_QUEUE_NAME ?? "";
export const EMAIL_HOST = process.env.EMAIL_HOST ?? "";
export const EMAIL_PORT = Number(process.env.EMAIL_PORT ?? 0);
export const EMAIL_USERNAME = process.env.EMAIL_USERNAME ?? "";
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD ?? "";
export const EMAIL_FROM = process.env.EMAIL_FROM ?? "";

function validateEnvVariable(variableName: string, value: string): void {
  if (!value) {
    throw new Error(
      `Environment variable ${variableName} is missing or empty.`
    );
  }
}

validateEnvVariable("RABBITMQ_CONNECTION_STRING", RABBITMQ_CONNECTION_STRING);
validateEnvVariable("RABBITMQ_QUEUE_NAME", RABBITMQ_QUEUE_NAME);
validateEnvVariable("EMAIL_HOST", EMAIL_HOST);
validateEnvVariable("EMAIL_USERNAME", EMAIL_USERNAME);
validateEnvVariable("EMAIL_PASSWORD", EMAIL_PASSWORD);
validateEnvVariable("EMAIL_FROM", EMAIL_FROM);
