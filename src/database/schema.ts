import mongoose from "mongoose";

export interface Order extends mongoose.Document {
  codigoPedido: number,
  codigoCliente: number,
  itens: Array<{
    produto: string,
    quantidade: number,
    preco: number
  }>,
}

const orderSchema = new mongoose.Schema<Order>({
  codigoPedido: {type: Number, unique: true},
  codigoCliente: Number,
  itens: Array<{
    product: String,
    amount: Number,
    price: Number
  }>
})

export const order = mongoose.model<Order>('Order', orderSchema);
