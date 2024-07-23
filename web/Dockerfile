# Usar a imagem node:16.14-alpine como base
FROM node:16.14-alpine
# RUN apt update
# RUN apt install lsof
# Mudar para o diretório de trabalho /app-backend
WORKDIR /app-frontend
# Copiar os package.json, package-lock.json e packages.npm para o container
# COPY package.json .
# COPY package-lock.json . 
# COPY tsconfig.json ./
COPY . .
# Instalar as dependências Node
RUN npm install
# Copiar o restante dos arquivos da aplicação para o container
COPY src src
# Sinalize que aplicação expõe a porta 3001
EXPOSE 5173
# Configurar os comandos para iniciar a aplicação de acordo com as boas práticas
# Dica: Leia a seção Docker e Docker-compose no README para mais informações
ENTRYPOINT [ "npm", "run" ]
CMD ["dev","--", "--host", "0.0.0.0"] 