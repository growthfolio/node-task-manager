
# To-Do List Application

Este é um projeto de API para gerenciamento de tarefas (To-Do List) desenvolvido em Node.js, com persistência no MongoDB e uso de Redis para cache. A API permite operações de CRUD (Create, Read, Update, Delete) para gerenciar as tarefas, e é construída seguindo boas práticas de desenvolvimento.

## Funcionalidades

- Adicionar uma nova tarefa.
- Atualizar o status de uma tarefa (pendente/completa).
- Remover uma tarefa.
- Listar todas as tarefas com suporte a cache para melhorar a performance.

## Tecnologias Utilizadas

- Node.js
- Express
- MongoDB
- Redis
- Docker
- Docker Compose
- Express-validator (para validação de dados)

## Pré-requisitos

Antes de começar, certifique-se de ter os seguintes itens instalados em sua máquina:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/)

## Como baixar e rodar o projeto

### 1. Clone o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd task-manager
```

### 2. Configuração do ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:

```
# Configurações da aplicação
NODE_ENV=development
PORT=3000

# Configurações do MongoDB
MONGO_URI=mongodb://mongo:27017/taskmanager

# Configurações do Redis
REDIS_URL=redis://redis:6379
```

### 3. Rodando o projeto com Docker

Use o Docker Compose para construir e iniciar os containers:

```bash
docker compose up -d --build
```

Esse comando vai subir três containers:
- `task-manager-app`: o container Node.js com a aplicação.
- `mongo`: o container com o banco de dados MongoDB.
- `redis`: o container com o servidor Redis.

### 4. Verificando se a aplicação está rodando

Após iniciar os containers, acesse a URL abaixo para verificar se a API está respondendo:

```
http://localhost:3000/tasks
```

Esse endpoint deve retornar uma lista de tarefas (inicialmente vazia).

## Endpoints da API

### 1. Listar todas as tarefas

- **GET** `/tasks`

### 2. Adicionar uma nova tarefa

- **POST** `/tasks`
- Corpo da requisição:
  ```json
  {
    "title": "Título da tarefa"
  }
  ```

### 3. Atualizar o status de uma tarefa

- **PUT** `/tasks/:id`
- Corpo da requisição:
  ```json
  {
    "status": "pending" ou "complete"
  }
  ```

### 4. Remover uma tarefa

- **DELETE** `/tasks/:id`

## Parando o projeto

Para parar os containers, execute o comando:

```bash
docker compose down
```

## Melhorias Futuras

- Implementar autenticação com JWT.
- Adicionar testes automatizados.
- Implementar o front-end para interação com a API.
- Configurar HTTPS para segurança.

<!-- 
## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para enviar PRs com melhorias.

## Licença

Este projeto é licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes. -->