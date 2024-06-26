import { Channel, Connection, Message, connect } from "amqplib";

export default class RabbitMQ {
  private conn: Connection | null = null;
  private channel: Channel | null = null;

  constructor(private uri: string) {}

  async start(): Promise<void> {
    this.conn = await connect(this.uri);
    this.channel = await this.conn.createChannel();
  }

  async publishInQueue(queue: string, message: string) {
    return this.channel?.sendToQueue(queue, Buffer.from(message));
  }

  async consumer(queue: string, callback: (message: Message | null) => void) {
    return this.channel?.consume(queue, (message) => {
      callback(message);
      if (message) this.channel?.ack(message);
    });
  }
}
