import { Order } from "../database/schema";
import { createOrder } from "../database/services/createOrder";

export async function handleOrderMessage(message?: string) {
  if (!message) return

  const orderData: Order = JSON.parse(message)

  try {
    if (isValidOrder(orderData)) {
      await createOrder(orderData)
    }
    else console.error("Error to create a new order!!!")
  } catch (error) {
    console.error("Error to create a new order!!!", error) 
  }
}

function isValidOrder(order: any): order is Order {
  if (typeof order.codigoPedido !== 'number' ||
      typeof order.codigoCliente !== 'number' ||
      !(Array.isArray(order.itens) && order.itens)) {
    return false;
  }

  for (const item of order.itens) {
    if (typeof item.produto !== 'string' ||
        typeof item.quantidade !== 'number' ||
        typeof item.preco !== 'number') {
      return false;
    }
  }

  return true;
}
