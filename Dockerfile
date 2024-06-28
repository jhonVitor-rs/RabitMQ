# Escolha a imagem base
FROM node:16

# Crie o diretório da aplicação no container
WORKDIR /usr/src/app

# Crie um usuário 'node' e dê permissão a ele para acessar o diretório da aplicação
RUN chown -R node:node /usr/src/app

# Mude para o usuário 'node'
USER node

# Copie o arquivo package.json e package-lock.json
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante dos arquivos do projeto
COPY --chown=node:node . .

# Faça o build do projeto
RUN npm run build

# Exponha a porta que sua aplicação vai usar
EXPOSE 3000

# Comando para iniciar sua aplicação
CMD [ "node", "dist/server.js" ]
