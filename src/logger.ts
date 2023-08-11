import winston from "winston";
import path from "path";
import fs from "fs";

function getLogFileName() {
  return `${new Date().toISOString().slice(0, 10)}.log`;
}

const LOG_PATH = path.join(process.cwd(), "logs");

async function ensureDirectoryExists(directoryPath: string) {
  if (!fs.existsSync(directoryPath)) {
    await fs.promises.mkdir(directoryPath);
  }
}

async function initializeLogger() {
  await ensureDirectoryExists(LOG_PATH);
}

initializeLogger().catch((error) => {
  console.error("Erro ao inicializar o logger:", error);
  process.exit(1);
});

function createLogger() {
  return winston.createLogger({
    level: process.env.LOG_LEVEL || "info",
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.printf(({ level, message, timestamp }) => {
        return `[${timestamp}] ${level}: ${message}`;
      })
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: path.join(LOG_PATH, getLogFileName()),
      }),
    ],
  });
}

const logger = createLogger();

export default logger;
