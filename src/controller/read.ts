import { Request, Response } from "express";
import { allOrderClients, calculateTotalOrder, totalOrderClient } from "../database/services/readOrders";

interface ITotalOrder {
  codeOrder: number
}

export async function totalOrder(req: Request<ITotalOrder>, res: Response) {
  if (!req.params.codeOrder) {
    return res.status(400).json({
      errors: {
        default: 'O parametro "codeOrder" precisa ser informado!!!'
      }
    })
  }

  if (isNaN(req.params.codeOrder) || req.params.codeOrder <= 0) {
    return res.status(400).json({
      errors: {
        default: 'O parametro "codeOrder" precisa ser um número inteiro maior que zero!!!'
      }
    })
  }

  try {
    const total = await calculateTotalOrder({orderCode: req.params.codeOrder})
    return res.status(200).json({
      total: total
    })
  } catch (error) {
    return res.status(500).json({
      errors: error
    })
  }
}

interface IOrderClient {
  codeClient: number
}

export async function countOrderClient(req: Request<IOrderClient>, res: Response) {
   if (!req.params.codeClient) {
    return res.status(400).json({
      errors: {
        default: 'O parametro "clientCode" precisa ser informado!!!'
      }
    })
  }

  if (isNaN(req.params.codeClient) || req.params.codeClient <= 0) {
    return res.status(400).json({
      errors: {
        default: 'O parametro "clientCode" precisa ser um número inteiro maior que zero!!!'
      }
    })
  }

  try {
    const total = await totalOrderClient({clientCode: req.params.codeClient})
    return res.status(200).json({
      total: total
    })
  } catch (error) {
    return res.status(500).json({
      errors: error
    })
  }
}

export async function ordersClient(req: Request<IOrderClient>, res: Response) {
   if (!req.params.codeClient) {
    return res.status(400).json({
      errors: {
        default: 'O parametro "clientCode" precisa ser informado!!!'
      }
    })
  }

  if (isNaN(req.params.codeClient) || req.params.codeClient <= 0) {
    return res.status(400).json({
      errors: {
        default: 'O parametro "clientCode" precisa ser um número inteiro maior que zero!!!'
      }
    })
  }

  try {
    const result = await allOrderClients({clientCode: req.params.codeClient})
    return res.status(200).json({
      orders: result
    })
  } catch (error) {
    return res.status(500).json({
      errors: error
    })
  }
}