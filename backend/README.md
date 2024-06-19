# Backend graphical services

O Backend pode ser executado manualmente ou usando Docker. Para uma instalação mais objetiva e rápida, recomendo usar docker, na seção 2.

## Instalação Manual

É necessário ter Nodejs instalado, usamos a versão 20.11. Após ter clonado este repositório, venha até o diretório `backend` e instalar as dependências necessárias:

```bash
    cd backend/
    npm install

```

Após isso, criar um arquivo `.env` no diretório `backend/` com as credenciais corretas para o funcionamento do backend com aws, firebase e mongodb (solicitar credenciais aos donos do repositório ou criar as próprias).

```env
    # arquivo .env. Substituir "token" pelo token de fato

    # CONFIG INFO FOR MONGODB
    DATABASE_URL="token"

    # TOKEN FOR JWT
    TOKEN_SECRET="token"

    # CONFIG INFO FOR FIREBASE
    API_KEY="token"
    AUTH_DOMAIN="token"
    PROJECT_ID="token"
    STORAGE_BUCKET="token"
    MESSAGING_SENDER_ID="token"
    APP_ID="token"
    MEASURAMENT_ID="token"
```

Agora, é necessário iniciar o schema do prisma para a criação inicial de tabelas:

```bash
    npx prisma generate --schema=./src/models/prisma/schema.prisma
```

Se todos os passos foram feitos corretamente, basta iniciar o backend. Obs: é necessário que a porta 8080 esteja livre para uso.

```bash
    npm run dev
```

## Instalação com Docker

Para a instação com docker, é preciso ter o Docker instalado no computador. Para isso, consultar a documentação oficial de acordo com o seu sistema operacional.

Depois de instalado, basta rodar no diretório `backend/`:

```bash
    docker compose up --build
```

Dessa forma a aplicação começará a ser compilada de uma imagem de docker localizada neste [link](https://hub.docker.com/repository/docker/josecarlosandrade/graphical-services-backend/general). Após compilada, rodará o compose configurado em `compose.yaml`, expondo a porta 8080 da aplicação.

## Problemas

Caso seja relatado algum problema ou dúvida, solicitar com os desenvolvedores deste repositório.
