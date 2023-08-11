# Projeto Enviador de Email com RabbitMQ 🚀

Bem-vindo (a)! Este é um projeto incrível que visa realizar o envio de email baseado em eventos.

## Funcionalidades Principais ⭐

- Envio de email com RabbitMQ

## Variáveis de Ambiente 🌐

Para configurar e executar corretamente o projeto, você precisará definir as seguintes variáveis de ambiente:

- `RABBITMQ_HOST`: O endereço do servidor RabbitMQ.
- `RABBITMQ_PORT`: A porta do servidor RabbitMQ.
- `RABBITMQ_USERNAME`: O nome de usuário para autenticação no RabbitMQ.
- `RABBITMQ_PASSWORD`: A senha para autenticação no RabbitMQ.
- `RABBITMQ_QUEUE_NAME`: O nome da fila que a aplicação irá acompanhar
- `EMAIL_HOST`: O servidor de email para envio.
- `EMAIL_PORT`: A porta do servidor de email.
- `EMAIL_USERNAME`: O nome de usuário para autenticação no servidor de email.
- `EMAIL_PASSWORD`: A senha para autenticação no servidor de email.
- `EMAIL_FROM`: O destinatario do email.

Você pode definir essas variáveis de ambiente no arquivo `.env` na raiz do projeto ou configurá-las de acordo com suas preferências.

```dotenv
RABBITMQ_USER=test
RABBITMQ_PASSWORD=test
RABBITMQ_CONNECTION_STRING=amqp://test:test@localhost:5672
RABBITMQ_QUEUE_NAME=SEND-EMAILS
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USERNAME=****0497e
EMAIL_PASSWORD=****963922
EMAIL_FROM=teste@example.com
```

## Como Usar 🚀

Para executar este projeto, siga as etapas abaixo:

### 1. Configuração das Variáveis de Ambiente

Certifique-se de ter configurado as variáveis de ambiente necessárias, conforme mencionado na seção "Variáveis de Ambiente". Você pode definir essas variáveis no arquivo `.env`.

### 2. Iniciar o Docker Compose

Certifique-se de ter o Docker e o Docker Compose instalados em seu sistema.

1. Abra o terminal e navegue até o diretório raiz do projeto.
2. Execute o seguinte comando para iniciar os serviços necessários definidos no arquivo `docker-compose.yml`:

```bash
docker-compose up -d
```

### 3. Iniciando a aplicação:
3. Execute o comando de dev ou start
```bash
yarn dev
yarn start
```

## Tecnologias Utilizadas 🛠️

- Node
- TypeScript
- NodeMailer
- Winston
- DotEnv
- Docker Compose
- RabbitMQ

## Licença 📜

MIT
