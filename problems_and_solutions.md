# **Documentação de Problemas e Soluções no Projeto Task Manager**

## **Desenvolvimento do Back-End**

Para o back-end, optei por utilizar **MongoDB** e **Redis** para persistência de dados e gerenciamento de cache. Embora o desenvolvimento tenha sido tranquilo na maior parte do tempo, enfrentei alguns desafios. Um exemplo foi o **problema do double hash** que surgiu durante o registro de usuários.

> **Problema:** Ocorreu uma dupla criptografia (hash) das senhas, porque implementei o hash tanto na pré-persistência quanto no envio dos dados para o banco.  
> **Solução:** Reestruturei o fluxo de registro, garantindo que a senha fosse criptografada apenas uma vez.

Fora esse detalhe, o restante do desenvolvimento do back-end foi fluido e sem grandes complicações.

---

## **Desenvolvimento do Front-End**

No front-end, utilizei **Tailwind CSS** combinado com **CSS puro** para garantir uma interface responsiva e eficiente. Um dos pequenos obstáculos foi a integração com o back-end devido à falta da configuração do **CORS**.

> **Problema:** A integração falhou porque eu não havia configurado o CORS corretamente, o que bloqueava as requisições do front para o back-end.  
> **Solução:** Ajustei as configurações do CORS, permitindo as origens corretas e garantindo a comunicação entre as duas partes.

---

## **Desafios no Deploy**

O deploy, sem dúvidas, foi a parte mais desafiadora do projeto, já que eu nunca havia feito deploy com **AWS** ou **Google Cloud** antes.

### **Deploy na AWS**

Inicialmente, optei pela **EC2 da AWS**. Após configurar a instância, o projeto funcionou, mas houve um problema com a segurança de acesso.

> **Problema:** Sem um domínio próprio, tive que usar o IP público da AWS. Isso fez com que navegadores identificassem o site como inseguro e bloqueassem o acesso.  
> **Solução:** Busquei alternativas e encontrei o **Firebase Hosting**, que oferecia um domínio gratuito.

### **Deploy no Google Cloud**

Decidi então mover o **front-end** para o Firebase e o **back-end** para o **Google Cloud**. O processo de deploy no Google Cloud foi diferente do que eu tinha feito na AWS, mas consegui realizar sem grandes problemas.

No entanto, um novo desafio surgiu:

> **Problema:** O **MongoDB** e o **Redis** estavam configurados localmente e não poderiam ser usados no Google Cloud sem custos adicionais.  
> **Solução em Progresso:** Estou implementando soluções gratuitas, como o **MongoDB Atlas** e buscando alternativas para o Redis, para garantir que a aplicação funcione plenamente sem extrapolar o budget disponível.

---

## **Experiência com JavaScript**

Depois de alguns meses focado em **Golang**, retornar ao **JavaScript** foi um desafio interessante. A mudança de paradigma de uma linguagem fortemente tipada para uma dinâmica como JavaScript exigiu um ajuste no mindset.

### **Principais Desafios:**

- **Manuseio de Funções Assíncronas:** Lidar com **async/await** e callbacks no fluxo da aplicação exigiu atenção especial.
- **Integração com APIs:** A integração com o back-end, especialmente na parte de autenticação e manuseio de erros, foi uma parte crucial do projeto.

Mesmo com essa mudança de foco, foi uma excelente oportunidade para me reconectar com práticas que já utilizava antes e me adaptar rapidamente, garantindo que o projeto fosse entregue no prazo.

---

## **Conclusão**

O projeto Task Manager foi uma excelente oportunidade de aprendizado, especialmente na parte de deploy em diferentes plataformas de cloud. Embora alguns desafios ainda estejam sendo resolvidos, o processo como um todo tem sido extremamente enriquecedor. Continuo trabalhando para garantir que todas as funcionalidades estejam operando como esperado e que a aplicação atenda a todos os requisitos propostos.

<!--
# Documentação de Problemas e Soluções no Projeto Task Manager

Para o desenvolvimento do back-end, escolhi usar MongoDB e Redis para persistência e gerenciamento de cache. Durante o desenvolvimento do back-end, identifiquei diversas possíveis melhorias, visto que nunca tinha feito deploy de um projeto full-stack na AWS ou em outras clouds. Sempre usei ferramentas como Vercel e similares, então entendi que seria mais adequado manter a simplicidade, com foco em entregar o máximo dentro do prazo. Não tive muitas dificuldades ou problemas ao desenvolver o back-end. O que mais me tomou tempo foi um problema de double hash. Isso aconteceu porque, durante o desenvolvimento inicial das funcionalidades, eu já tinha implementado um hash antes da persistência, mas depois, ao revisar os requisitos de segurança, acabei implementando o hash de novo quando o usuário enviava o nome e a senha no processo de registro. Fora esse detalhe, o desenvolvimento do back-end foi bem tranquilo.

Para o desenvolvimento do front-end, optei por usar Tailwind, além de CSS puro, para manter o front responsivo e agilizar a produtividade. Tive um pequeno problema na integração com o back-end, porque esqueci de configurar o CORS e definir as origens permitidas nas requisições, mas foi algo simples de resolver.

O deploy em cloud foi a parte mais complicada para mim, já que nunca tinha feito deploy em plataformas como AWS ou Google Cloud. Fiquei em dúvida sobre qual serviço seria mais adequado, então optei inicialmente pela EC2 da AWS. Fiz toda a configuração e o projeto chegou a funcionar integrado na instância. No entanto, como eu não tinha condições de comprar um domínio e não encontrei um gratuito que resolvesse, precisei configurar o NGINX usando o IP público da AWS. O problema foi que, ao tentar acessar, os navegadores identificavam a rota como insegura e bloqueavam o tráfego. Após pesquisar um pouco, descobri que o Google Cloud oferecia um domínio gratuito via Firebase, então decidi fazer o deploy do front-end no Firebase e do back-end no Google Cloud.

No Google Cloud, o processo de deploy foi diferente do que eu estava acostumado na AWS, mas consegui realizar o deploy sem grandes dificuldades. No entanto, enfrentei um novo desafio relacionado à configuração do MongoDB e do Redis, que inicialmente estavam sendo executados localmente. Como as soluções de bancos de dados e cache no Google Cloud são pagas e não faziam sentido para o meu contexto, precisei encontrar alternativas viáveis para contornar esse problema. Até o momento, estou configurando instâncias gratuitas de MongoDB e Redis para recuperar as funcionalidades da aplicação e garantir que o projeto esteja funcionando corretamente sem ultrapassar as limitações de budget.

### Experiência com JavaScript

Vale destacar que, depois de alguns meses focado em Golang, voltar a trabalhar com JavaScript foi um desafio interessante. Apesar de já ter experiência com a linguagem, senti a diferença de mudar o mindset entre uma linguagem fortemente tipada e JavaScript, que é mais dinâmico. Um exemplo foi o manuseio das funções assíncronas e a parte de integração com APIs, que exigiram um pouco mais de atenção. Mesmo com essa mudança de foco, a experiência foi importante para relembrar práticas que eu já tinha usado antes e me adaptar rapidamente, o que foi essencial para entregar o projeto a tempo.
-->
