import { Channel, Connection, Message, connect } from "amqplib";

export default class RabbitMQ {
  private conn: Connection | null = null;
  private channel: Channel | null = null;

  constructor(private uri: string) {}

  async start(): Promise<void> {
    while (!this.conn) {
      try {
        this.conn = await connect(this.uri);
        this.channel = await this.conn.createChannel();
      } catch (error) {
        console.error('Failed to connect to RabbitMQ, retrying in 5 seconds', error);
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
  }

  async createQueue(queue: string) {
    this.channel?.assertQueue(queue, {
      durable: false
    })
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
