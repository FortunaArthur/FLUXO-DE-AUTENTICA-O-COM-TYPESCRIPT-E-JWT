import { PrismaClient } from '@prisma/client';

// Criando e exportando uma instância do Prisma Client
export const prisma = new PrismaClient();

// Função para configurar o banco de dados: A REGRA
async function regra() {
  // Conectando ao banco de dados
  await prisma.$connect();

  // comandos SQL para criar tabelas, se não existirem
  await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS Usuario (id INT AUTO_INCREMENT, nome VARCHAR(255), email VARCHAR(255) UNIQUE, senha VARCHAR(255))`;

  console.log('Tabela Usuario criada ou já existente.');
}

// Executando a função de configuração
regra()
  .catch((e) => {
    throw e;
  });
