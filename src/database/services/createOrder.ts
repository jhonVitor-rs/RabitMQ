import { order as OrderModel, Order } from '../schema';

export async function createOrder(orderData: Order): Promise<Order> {
  console.log(orderData)
  try {
    // Crie uma nova ordem
    const newOrder: Order = new OrderModel(orderData);

    // Salve a ordem no banco de dados
    const savedOrder = await newOrder.save();

    console.log("Order created successfully!");

    return savedOrder;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}
