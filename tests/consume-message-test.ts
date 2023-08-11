import amqp from "amqplib";
import { consumeMessage } from "../src/consume-message";

jest.mock("../src/send-email", () => ({
  sendEmail: jest.fn(),
}));

describe("consumeMessage", () => {
  it("should ack the message on successful processing", async () => {
    const mockChannel = {} as amqp.Channel;
    const mockMessage = {
      content: Buffer.from(
        JSON.stringify({
          to: "destinatario@example.com",
          subject: "Assunto do Email",
          message: "Olá! Este é um exemplo de mensagem de email.",
        })
      ),
    } as amqp.ConsumeMessage;

    const mockAck = jest.fn();
    const mockSendEmail = require("../src/send-email").sendEmail as jest.Mock;
    mockSendEmail.mockResolvedValueOnce({});
    mockChannel.ack = mockAck;

    await consumeMessage(mockChannel, mockMessage);

    expect(mockSendEmail).toHaveBeenCalledWith(expect.any(Object));
    expect(mockAck).toBeCalledWith(mockMessage);
  });

  it("should nack the message on error", async () => {
    const mockChannel = {} as amqp.Channel;
    const mockMessage = {
      content: Buffer.from(
        JSON.stringify({
          to: "destinatario@example.com",
          subject: "Assunto do Email",
          message: "Olá! Este é um exemplo de mensagem de email.",
        })
      ),
    } as amqp.ConsumeMessage;

    const mockSendEmail = require("../src/send-email").sendEmail as jest.Mock;
    mockSendEmail.mockRejectedValueOnce(new Error("Mocked error"));

    const mockNack = jest.fn();
    mockChannel.nack = mockNack;

    await consumeMessage(mockChannel, mockMessage);

    expect(mockNack).toBeCalledWith(mockMessage);
  });
});
