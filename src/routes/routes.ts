import { Router } from "express"
import { countOrderClient, ordersClient, totalOrder } from "../controller/read"
import RabbitMQ from "../rabbitmq"

const routes = Router()

routes.get('/', (_, res) => {
  return res.send('Ola DEV!!!')
})

routes.get('/total_order/:codeOrder', totalOrder)
routes.get('/count_order_client/:codeClient', countOrderClient)
routes.get('/all_orders_client/:codeClient', ordersClient)

routes.post('/new_order', async function(req, res, next) {
  const server = new RabbitMQ(process.env.RABBITMQ_URL as string)
  await server.start()
  await server.publishInQueue('orders', JSON.stringify(req.body))
  res.send(req.body)
})

export default routes