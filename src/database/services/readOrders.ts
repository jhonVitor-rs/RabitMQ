import { order as OrderModel, Order } from "../schema"

export async function calculateTotalOrder({orderCode}: {orderCode: number}): Promise<number> {
  try {
    const order = await OrderModel.findOne({ codigoPedido: orderCode })

    if (order) {
      const total = order.itens.reduce((total, item) => total = item.quantidade * item.preco, 0)
      return total
    }
    else throw new Error('Order is not found!!!')
  } catch (error) {
    console.error('Order is not fount!!!', error)
    throw error
  }
}

export async function totalOrderClient({clientCode}: {clientCode: number}): Promise<number> {
  try {
    const total = await OrderModel.countDocuments({ codigoCliente: clientCode })
    return total
  } catch (error) {
    console.error('Error to count client orders!!!', error)
    throw error
  }
}

export async function allOrderClients({clientCode}: {clientCode: number}): Promise<Order[]> {
  try {
    const orders = await OrderModel.find({ codigoCliente: clientCode })

    if(orders) return orders
    else throw new Error('Error to find client orders!!!')
  } catch (error) {
    console.error('Error to find client orders!!!', error)
    throw error
  }
}
