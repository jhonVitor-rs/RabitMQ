import mongoose from 'mongoose';

// Crie uma variável para armazenar a conexão
let database: mongoose.Connection;

export async function connectDatabase() {
  // Verifique se já estamos conectados ao banco de dados
  if (database) {
    return;
  }

  // Conecte ao banco de dados
  const db = await mongoose.connect(process.env.DATABASE_URL as string);

  // Armazene a conexão do banco de dados
  database = db.connection;

  database.once('open', async () => {
    console.log('Connected to database');
  });

  database.on('error', () => {
    console.log('Error connecting to database');
  });
}

export async function disconnectDatabase() {
  if (!database) {
    return;
  }
  await mongoose.disconnect();
}
