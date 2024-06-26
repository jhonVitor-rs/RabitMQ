import 'dotenv/config';
import express from 'express';
import http from 'http'
import routes from './routes/routes';
import { connectDatabase, disconnectDatabase } from './database/config';
import RabbitMQ from './rabbitmq';
import { handleOrderMessage } from './controller/create';

class App {
  private express: express.Application
  private http: http.Server
  private rabbitmq: RabbitMQ

  constructor() {
    this.express = express()
    this.http = http.createServer(this.express)
    this.rabbitmq = new RabbitMQ(process.env.RABBITMQ_URL as string)

    this.middlewares()
  }

  private middlewares(): void {
    this.express.use(express.json())
    this.express.use(routes)
  }

  async listenServer() {
    await connectDatabase()
    await this.rabbitmq.start()
    await this.rabbitmq.consumer('orders', (message) => handleOrderMessage(message?.content.toString()))
    // await this.rabbitmq.consumer('orders', (message) => console.log(message?.content.toString()))

    this.http.listen(3000, () => {
      console.log('server is running on http://localhost:3000')
    })

    this.http.on('close', async () => {
      await disconnectDatabase()
    })
  }
}

const app = new App()
app.listenServer()
