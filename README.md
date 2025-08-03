# 📝 Node Task Manager - API de Gerenciamento de Tarefas

## 🎯 Objetivo de Aprendizado
Projeto desenvolvido para estudar **Node.js puro** e **arquitetura de APIs**, implementando um sistema completo de gerenciamento de tarefas com autenticação JWT, cache Redis, persistência MongoDB e containerização Docker.

## 🛠️ Tecnologias Utilizadas
- **Runtime:** Node.js
- **Framework:** Express.js
- **Banco de Dados:** MongoDB
- **Cache:** Redis
- **Autenticação:** JWT (JSON Web Tokens)
- **Validação:** Express-validator
- **Containerização:** Docker, Docker Compose
- **Qualidade:** SonarCloud
- **Conceitos estudados:**
  - APIs RESTful com Node.js
  - Autenticação e autorização
  - Cache strategies com Redis
  - NoSQL com MongoDB
  - Containerização e orquestração
  - Middleware e validações

## 🚀 Demonstração
```javascript
// Middleware de autenticação JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Token de acesso requerido' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.user = user;
    next();
  });
};

// Controller com cache Redis
const getTasks = async (req, res) => {
  try {
    // Verificar cache primeiro
    const cachedTasks = await redisClient.get(`tasks:${req.user.id}`);
    if (cachedTasks) {
      return res.json(JSON.parse(cachedTasks));
    }
    
    // Buscar no banco se não estiver em cache
    const tasks = await Task.find({ userId: req.user.id });
    
    // Salvar no cache por 5 minutos
    await redisClient.setex(`tasks:${req.user.id}`, 300, JSON.stringify(tasks));
    
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

## 💡 Principais Aprendizados

### 🌐 API RESTful
- **Endpoints:** CRUD completo para tarefas
- **HTTP Methods:** GET, POST, PUT, DELETE
- **Status Codes:** Uso correto de códigos de resposta
- **Middleware:** Autenticação, validação, logging

### 🔐 Autenticação e Segurança
- **JWT:** Tokens para autenticação stateless
- **Bcrypt:** Hash de senhas
- **Middleware:** Proteção de rotas
- **Validação:** Express-validator para dados

### 📊 Persistência e Cache
- **MongoDB:** Banco NoSQL para dados
- **Redis:** Cache para performance
- **Mongoose:** ODM para MongoDB
- **Cache Strategy:** Cache-aside pattern

## 🧠 Conceitos Técnicos Estudados

### 1. **Estrutura de API RESTful**
```javascript
// Routes com middleware de autenticação
router.get('/tasks', authenticateToken, getTasks);
router.post('/tasks', authenticateToken, validateTask, createTask);
router.put('/tasks/:id', authenticateToken, validateTask, updateTask);
router.delete('/tasks/:id', authenticateToken, deleteTask);

// Validação com express-validator
const validateTask = [
  body('title').notEmpty().withMessage('Título é obrigatório'),
  body('status').optional().isIn(['pending', 'complete']),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
```

### 2. **Cache com Redis**
```javascript
class CacheService {
  static async get(key) {
    try {
      const data = await redisClient.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }
  
  static async set(key, data, ttl = 300) {
    try {
      await redisClient.setex(key, ttl, JSON.stringify(data));
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }
  
  static async invalidate(pattern) {
    try {
      const keys = await redisClient.keys(pattern);
      if (keys.length > 0) {
        await redisClient.del(...keys);
      }
    } catch (error) {
      console.error('Cache invalidate error:', error);
    }
  }
}
```

### 3. **Docker Compose Setup**
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - MONGO_URI=mongodb://mongo:27017/taskmanager
      - REDIS_URL=redis://redis:6379
    depends_on:
      - mongo
      - redis
  
  mongo:
    image: mongo:5.0
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
  
  redis:
    image: redis:6.2-alpine
    ports:
      - "6379:6379"
```

## 📁 Estrutura do Projeto
```
node-task-manager/
├── src/
│   ├── controllers/        # Lógica de negócio
│   ├── models/            # Modelos MongoDB
│   ├── routes/            # Definição de rotas
│   ├── middleware/        # Middlewares customizados
│   ├── services/          # Serviços (cache, auth)
│   └── utils/             # Utilitários
├── docker-compose.yml     # Orquestração de containers
├── Dockerfile            # Imagem da aplicação
├── package.json          # Dependências
└── .env                  # Variáveis de ambiente
```

## 🔧 Como Executar

### Docker (Recomendado)
```bash
# Clone o repositório
git clone <repo-url>
cd node-task-manager

# Configure variáveis de ambiente
cp .env.example .env

# Inicie com Docker Compose
docker-compose up -d --build

# Verifique se está funcionando
curl http://localhost:3000/tasks
```

### Local
```bash
# Instale dependências
npm install

# Configure MongoDB e Redis localmente
# Inicie a aplicação
npm start
```

## 📊 Endpoints da API

### Autenticação
```bash
# Registrar usuário
POST /users/register
{
  "username": "testuser",
  "password": "password123"
}

# Login
POST /users/login
{
  "username": "testuser", 
  "password": "password123"
}
```

### Tarefas (Requer autenticação)
```bash
# Listar tarefas
GET /tasks
Authorization: Bearer <token>

# Criar tarefa
POST /tasks
{
  "title": "Nova tarefa"
}

# Atualizar tarefa
PUT /tasks/:id
{
  "status": "complete"
}

# Deletar tarefa
DELETE /tasks/:id
```

## 🚧 Desafios Enfrentados
1. **Autenticação JWT:** Implementar middleware de autenticação
2. **Cache Strategy:** Invalidação inteligente de cache
3. **Docker Networking:** Comunicação entre containers
4. **Error Handling:** Tratamento consistente de erros
5. **Validação:** Sanitização e validação de dados
6. **Performance:** Otimização com cache Redis

## 📚 Recursos Utilizados
- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/)
- [MongoDB Manual](https://docs.mongodb.com/)
- [Redis Documentation](https://redis.io/documentation)
- [JWT.io](https://jwt.io/) - Entendimento de tokens
- [Docker Documentation](https://docs.docker.com/)

## 📈 Próximos Passos
- [ ] Implementar testes unitários (Jest)
- [ ] Adicionar testes de integração
- [ ] Implementar rate limiting
- [ ] Adicionar logging estruturado
- [ ] Implementar health checks
- [ ] Adicionar métricas de performance

## 🔗 Projetos Relacionados
- [Nest Task Manager](../nest-taskmanager-app/) - Versão com NestJS
- [React Task Manager](../react-taskmanager-app/) - Frontend da aplicação
- [Front Task Manager](../front-task-manager/) - Interface HTML/CSS/JS

---

**Desenvolvido por:** Felipe Macedo  
**Contato:** contato.dev.macedo@gmail.com  
**GitHub:** [FelipeMacedo](https://github.com/felipemacedo1)  
**LinkedIn:** [felipemacedo1](https://linkedin.com/in/felipemacedo1)

> 💡 **Reflexão:** Este projeto consolidou meus conhecimentos em Node.js e arquitetura de APIs. A experiência com MongoDB, Redis e Docker estabeleceu bases sólidas para desenvolvimento backend moderno e escalável.