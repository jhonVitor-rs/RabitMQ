# Desafio BTG Pactual

Este projeto é um servidor Express que aceita pedidos dos clientes através do RabbitMQ e salva em um banco de dados MongoDB.

## Rotas

O servidor possui as seguintes rotas:

- `GET /total_order/:codeOrder`: Retorna o total do pedido com o código fornecido.
- `GET /count_order_client/:codeClient`: Retorna a contagem de pedidos do cliente com o código fornecido.
- `GET /all_orders_client/:codeClient`: Retorna todos os pedidos do cliente com o código fornecido.
- `POST /new_order`: Envia um novo pedido. O pedido deve ter o seguinte formato:

```json
{
  "codigoPedido": 1001,
  "codigoCliente": 1,
  "itens": [
    {
      "produto": "lápis",
      "quantidade": 100,
      "preco": 1.1
    },
    {
      "produto": "caderno",
      "quantidade": 10,
      "preco": 1.0
    }
  ]
}
```

## Executando projeto

Para executar o projeto, você precisa ter o Docker instalado. Depois de instalado, você pode executar o seguinte comando para subir o Docker Compose:

```bash
docker-compose up
```

Isso iniciará todos os serviços necessários para o projeto, incluindo o MongoDB, RabbitMQ e o servidor Express.
