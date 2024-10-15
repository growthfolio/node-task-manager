# To-Do List Application

<div align="left">

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=felipemacedo1_node-task-manager&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=felipemacedo1_node-task-manager)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=felipemacedo1_node-task-manager&metric=bugs)](https://sonarcloud.io/summary/new_code?id=felipemacedo1_node-task-manager)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=felipemacedo1_node-task-manager&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=felipemacedo1_node-task-manager)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=felipemacedo1_node-task-manager&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=felipemacedo1_node-task-manager)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=felipemacedo1_node-task-manager&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=felipemacedo1_node-task-manager)

</div>


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
git clone git@github.com:felipemacedo1/node-task-manager.git
cd node-task-manager
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

## Endpoints de Usuários

### 1. Registrar Usuário

- **URL**: `/users/register`
- **Método**: `POST`
- **Descrição**: Registra um novo usuário no sistema.
- **Body da Requisição**:
  ```json
  {
    "username": "testuser",
    "password": "password123"
  }
  ```
- **Headers**:
  - `Content-Type: application/json`

### 2. Login de Usuário

- **URL**: `/users/login`
- **Método**: `POST`
- **Descrição**: Autentica um usuário existente e retorna um token JWT.
- **Body da Requisição**:
  ```json
  {
    "username": "testuser",
    "password": "password123"
  }
  ```
- **Headers**:
  - `Content-Type: application/json`

## Endpoints de Tarefas

### 1. Listar Todas as Tarefas

- **URL**: `/tasks`
- **Método**: `GET`
- **Descrição**: Retorna uma lista de todas as tarefas com suporte opcional a cache.
- **Headers**:
  - `Authorization: Bearer {{ jwt_token }}`

### 2. Adicionar Nova Tarefa

- **URL**: `/tasks`
- **Método**: `POST`
- **Descrição**: Adiciona uma nova tarefa.
- **Body da Requisição**:
  ```json
  {
    "title": "New Task"
  }
  ```
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer {{ jwt_token }}`

### 3. Atualizar o Status de uma Tarefa

- **URL**: `/tasks/:id`
- **Método**: `PUT`
- **Descrição**: Atualiza o status de uma tarefa existente.
- **Body da Requisição**:
  ```json
  {
    "status": "complete"
  }
  ```
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer {{ jwt_token }}`

### 4. Deletar Tarefa por ID

- **URL**: `/tasks/:id`
- **Método**: `DELETE`
- **Descrição**: Remove uma tarefa existente com base no seu ID.
- **Headers**:
  - `Authorization: Bearer {{ jwt_token }}`

## Ambiente

- **Base URL**: `http://localhost:3000`
- **JWT Token**: Adicionado no header como `Authorization: Bearer {{ jwt_token }}`.

### Exemplo de Configuração de Ambiente:

```json
{
  "base_url": "http://localhost:3000",
  "jwt_token": "your-jwt-token-here"
}
```

### Endpoints Cobertos:

- Registrar Usuário
- Login de Usuário
- Listar Todas as Tarefas
- Adicionar Nova Tarefa (Precisa estar autenticado)
- Atualizar o Status de uma Tarefa
- Deletar Tarefa por ID (Precisa estar autenticado)

---

## Proximas melhorias:

- **Testes unitários**: Implementar testes unitários para as funções principais da API, para garantir que o básico esteja bem coberto.
- **Testes de integração**: Implementar testes de integração para verificar se a API, MongoDB e Redis estão funcionando bem juntos.
- **Cobertura de testes**: Garantir que a cobertura de testes seja superior a 70%, usando ferramentas como Jest ou SonarCloud para monitorar isso.

<!-- 
## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para enviar PRs com melhorias.

## Licença

Este projeto é licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes. -->
