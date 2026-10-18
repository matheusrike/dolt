# PROJECT_CONTEXT.md

> Documento de referência único para o desenvolvimento da v2 do projeto de tasklist (v1 em PHP, nome atual do repositório: `dolt`). Toda decisão nova de arquitetura, regra de negócio ou funcionalidade deve ser refletida aqui antes de virar código.

---

## 1. Visão Geral

**Descrição**
Reescrita completa de um app de lista de tarefas. A v1 foi feita em PHP puro com persistência em arquivo JSON, sem framework, sem banco relacional e sem separação real entre frontend e backend. A v2 mantém o mesmo domínio (usuários organizam tarefas em grupos/listas) mas troca a stack inteira: backend em Java com Spring Boot, frontend em TanStack Start, banco Postgres.

**Objetivo principal**
Servir como projeto de estudo guiado para aprender Java (com Spring Boot) e TanStack na prática, construindo algo com arquitetura de verdade em vez de scripts soltos.

**Problema que resolve**
Para o usuário final: organizar tarefas em listas/grupos, com autenticação própria. Para quem está desenvolvendo: a v1 não ensina nada sobre camadas, banco relacional ou separação frontend/backend, então o "problema" real que a v2 resolve é o de aprendizado.

**Público-alvo**
Uso pessoal e como peça de portfólio. Não há previsão de uso por terceiros em produção.

---

## 2. Goals

**Objetivos principais**
- Aprender Java na prática usando Spring Boot como framework principal.
- Aprender TanStack (Start + Router) como camada de frontend que também atua como BFF (backend-for-frontend).
- Modelar o domínio em um banco relacional (Postgres) em vez de arquivo JSON.
- Entender e aplicar separação em camadas (controller, service, repository) no backend.

**Objetivos secundários**
- Corrigir os problemas de segurança da v1 (senha em texto puro, sessão amarrada direto no dado).
- Praticar Docker para orquestrar backend, frontend e banco juntos.
- Ter uma base de código organizada o suficiente para evoluir depois (ex: migrar para arquitetura hexagonal numa v3, se fizer sentido).

**Escopo inicial (MVP)**
- Cadastro e login de usuário.
- CRUD de listas de tarefas (equivalente aos "grupos" da v1).
- CRUD de tarefas dentro de uma lista.
- Marcar/desmarcar tarefa como concluída.
- Cada usuário só enxerga e mexe nas próprias listas e tarefas.

**Funcionalidades futuras (fora do MVP)**
- Compartilhamento de listas entre usuários.
- Tags ou categorias de tarefas.
- Prazos e lembretes.
- Reordenação de tarefas (drag and drop).

---

## 3. Arquitetura

**Arquitetura adotada**
Backend em camadas (layered architecture) exposto como API REST, consumido por um frontend TanStack Start que funciona como BFF. Banco Postgres com migrations versionadas via Flyway. Tudo orquestrado com Docker Compose.

```
[ Browser ] <-> [ TanStack Start (route loaders / server functions) ] <-> [ Spring Boot REST API ] <-> [ Postgres ]
```

O browser nunca fala direto com o Spring. Toda requisição passa pelo servidor do TanStack Start primeiro.

**Justificativa**
Camadas simples (sem hexagonal, sem DDD tático) porque o objetivo agora é aprender Java e Spring, não aprender um estilo arquitetural avançado ao mesmo tempo. Complexidade extra nesse estágio atrapalha mais do que ajuda. Fica registrado aqui como candidato natural de refatoração numa v3, depois que o fluxo básico estiver dominado.

TanStack Start como BFF faz sentido porque quem está desenvolvendo é mais forte em backend: a maior parte do tempo do lado do frontend vai ser pensar em requisição/resposta dentro de route loaders e server functions, que é um raciocínio de backend aplicado ao TanStack, e não em estado de componente. Como já existe experiência prévia com Next.js, a virada de chave aqui é entender que loader e server function rodam no servidor de verdade, assim como acontecia no Remix que tinha sido a escolha original.

**Organização de pastas (proposta)**

```
backend/
  src/main/java/io/github/matheusrike/dolt/
    config/
    controller/
    service/
    repository/
    entity/
    dto/
    security/
    exception/
  src/main/resources/
    db/migration/       (scripts Flyway)
    application.properties
  pom.xml

frontend/
  src/
    routes/             (rotas do TanStack Router, file-based)
    components/
    lib/                (cliente HTTP para a API Java)
    styles/
  public/
  package.json

infra/
  docker-compose.yml
  Dockerfile.backend
  Dockerfile.frontend
```

**Fluxo de comunicação**
1. Usuário interage com uma rota do TanStack Router.
2. O loader da rota (GET) ou uma server function (POST/PUT/DELETE) do TanStack Start chama a API Java via fetch, incluindo o JWT salvo em cookie httpOnly.
3. Spring Boot valida o JWT, executa a regra de negócio na service, acessa o Postgres via repository (Spring Data JPA).
4. Resposta volta como JSON para o TanStack Start, que já entrega o HTML renderizado (ou os dados, se for uma chamada client-side dentro de uma rota já carregada).

---

## 4. Stack Tecnológica

- **Linguagem backend**: Java 21
- **Framework backend**: Spring Boot 4.1.0 (Web, Data JPA, Security, Validation)
- **Build backend**: Maven
- **Metadados do projeto**: Group `io.github.matheusrike`, Artifact `dolt`, Package `io.github.matheusrike.dolt`, Packaging Jar, Configuration via `application.properties`
- **Linguagem frontend**: TypeScript
- **Framework frontend**: TanStack Start (com TanStack Router e TanStack Query)
- **Banco de dados**: PostgreSQL
- **Migrations**: Flyway
- **Autenticação**: JWT (lib jjwt) + cookie httpOnly gerenciado pelo TanStack Start
- **Gerenciador de pacotes frontend**: pnpm ou npm (a definir na hora de iniciar o projeto)
- **Infraestrutura**: Docker + Docker Compose
- **Versionamento**: Git, seguindo o mesmo repositório atual (nova branch/tag para a v2)

---

## 5. Módulos do Sistema

### 5.1 Módulo de Autenticação (Auth)
- **Objetivo**: garantir que só o dono de uma conta acesse seus próprios dados.
- **Responsabilidades**: cadastro, login, emissão e validação de JWT, hash de senha.
- **Funcionalidades**: registro de usuário, login, logout (invalidação do cookie no client), guard de proteção de rotas no TanStack Router.
- **Dependências**: nenhuma de outros módulos do domínio, mas todos os outros módulos dependem dele para saber quem é o usuário autenticado.

### 5.2 Módulo de Usuário (User)
- **Objetivo**: manter os dados de conta do usuário.
- **Responsabilidades**: CRUD básico de usuário (criação vem do Auth, edição de perfil é opcional no MVP).
- **Funcionalidades**: consultar dados do próprio usuário.
- **Dependências**: Auth.

### 5.3 Módulo de Listas de Tarefas (TaskList / equivalente aos "grupos" da v1)
- **Objetivo**: agrupar tarefas relacionadas.
- **Responsabilidades**: CRUD de listas, garantir que uma lista pertence a um único usuário.
- **Funcionalidades**: criar lista, renomear, excluir, listar todas as listas do usuário logado.
- **Dependências**: User (toda lista pertence a um usuário).

### 5.4 Módulo de Tarefas (Task)
- **Objetivo**: representar as tarefas em si.
- **Responsabilidades**: CRUD de tarefas, alternar status de concluída.
- **Funcionalidades**: criar tarefa dentro de uma lista, editar nome, excluir, marcar/desmarcar como feita.
- **Dependências**: TaskList (toda tarefa pertence a uma lista, que pertence a um usuário).

---

## 6. Backend

**Estrutura do projeto**
Projeto Maven único, pacotes organizados por camada técnica (controller, service, repository, entity, dto) dentro do pacote raiz `io.github.matheusrike.dolt`. Sem agrupamento extra tipo `domain`, entity e dto ficam cada um na sua própria pasta no mesmo nível de controller e service.

**Camadas da aplicação**
- **Controller**: recebe a requisição HTTP, valida entrada com Bean Validation, delega pra service, devolve DTO. Métodos que listam recursos seguem o nome `index`, métodos que retornam um único recurso seguem o nome `show` (ex: `index()` pra `GET /task-lists`, `show(id)` pra `GET /task-lists/{id}`). As rotas em si não mudam, é só o nome do método no código.
- **Service**: contém a regra de negócio (ex: garantir que a lista pertence ao usuário antes de deixar criar uma tarefa nela).
- **Repository**: interface Spring Data JPA, sem lógica além de queries.
- **Entity**: representa a tabela do banco. Nunca é exposta direto na resposta HTTP; sempre convertida pra DTO na service ou no controller.
- **DTO**: molda o que entra e sai da API, separado da entity desde o início.

**APIs previstas (MVP)**
- `POST /auth/register`
- `POST /auth/login`
- `GET /users/me`
- `GET /task-lists`
- `POST /task-lists`
- `PUT /task-lists/{id}`
- `DELETE /task-lists/{id}`
- `GET /task-lists/{id}/tasks`
- `POST /task-lists/{id}/tasks`
- `PUT /tasks/{id}`
- `PATCH /tasks/{id}/status`
- `DELETE /tasks/{id}`

**Modelos de dados**

```
tb_user
  id (PK, UUID)
  name          VARCHAR(255)
  email         VARCHAR(255)
  password_hash VARCHAR(255)
  created_at    TIMESTAMPTZ
  updated_at    TIMESTAMPTZ (nullable)

tb_tasklist
  id            (PK, UUID)
  name          VARCHAR(255)
  created_at    TIMESTAMPTZ
  updated_at    TIMESTAMPTZ (nullable)
  fk_user_id    UUID (FK -> tb_user)

tb_task
  id              (PK, INTEGER)
  name            VARCHAR(255)
  description     TEXT (nullable)
  is_checked      BOOLEAN (default false)
  created_at      TIMESTAMPTZ
  updated_at      TIMESTAMPTZ (nullable)
  fk_tasklist_id  UUID (FK -> tb_tasklist)
```

Todas as tabelas usam o prefixo `tb_` pra ficar claro visualmente que é tabela do banco. `tb_user` e `tb_tasklist` usam UUID como PK, `tb_task` usa INTEGER. Colunas de chave estrangeira seguem o prefixo `fk_`.

**Autenticação e autorização**
- Senha armazenada com hash BCrypt (nunca texto puro, diferente da v1).
- Login gera um JWT assinado, devolvido como cookie httpOnly.
- Toda rota fora de `/auth/*` exige JWT válido.
- Autorização a nível de dado: a service sempre confere se o `user_id` do recurso bate com o usuário do JWT antes de qualquer leitura ou escrita. Isso evita que um usuário acesse lista ou tarefa de outro só trocando o id na URL.

**Estratégia de validação**
Bean Validation (`@NotBlank`, `@Size`, etc.) nos DTOs de entrada, validado automaticamente pelo Spring antes de chegar na service.

**Tratamento de erros**
`@ControllerAdvice` global, convertendo exceções de negócio (ex: "lista não encontrada", "não autorizado") em respostas JSON padronizadas com código HTTP correto (404, 403, 400, etc.), em vez do formato `{response, details}` usado na v1.

---

## 7. Frontend

**Estrutura da aplicação**
Rotas do TanStack Router organizadas por recurso, seguindo o file-based routing do TanStack Start: `/login`, `/register`, `/lists`, `/lists/$listId`.

**Organização das telas**
- Tela de login/cadastro.
- Tela principal com a lista de "listas de tarefas" do usuário (equivalente à sidebar de grupos da v1).
- Tela de uma lista específica, mostrando as tarefas dela.

**Componentes principais**
- Formulário de tarefa (criação/edição inline, como já era na v1).
- Item de tarefa com checkbox, botão de editar e excluir.
- Sidebar/lista de listas de tarefas.

**Fluxos de navegação**
Login → tela principal com listas → seleciona uma lista → vê e gerencia as tarefas daquela lista.

**Gerenciamento de estado**
Sem lib de estado global própria além do que o TanStack já traz. Dado assíncrono (as listas e tarefas vindas da API) fica sob TanStack Query, que cuida de cache e revalidação depois de mutations. Estado local de componente (ex: input de edição aberto) fica em `useState` mesmo.

**Consumo das APIs**
Toda chamada à API Java acontece dentro de loaders de rota (GET) e server functions (POST/PUT/DELETE/PATCH) do TanStack Start, nunca direto do componente no client. Isso mantém o JWT só no servidor do TanStack, sem expor nada no browser.

**Estratégia de UI/UX**
Reaproveitar a ideia visual da v1 (lista simples, checkbox, ações de editar/excluir por item), sem compromisso de manter o CSS antigo. Sem definição de design system por enquanto, foco é funcionalidade primeiro.

---

## 8. Regras de Negócio

**Herdadas da v1**
- Uma tarefa pertence a exatamente uma lista/grupo.
- Uma tarefa tem nome e status de concluída (checked/unchecked), nada além disso no MVP.
- Cada usuário só vê e edita suas próprias listas e tarefas.

**Novas para a v2**
- Senha nunca é armazenada nem trafegada em texto puro (hash BCrypt no backend, HTTPS assumido em produção).
- Toda operação de escrita numa tarefa ou lista precisa confirmar que o recurso pertence ao usuário autenticado, checagem feita na service, não confiando em nada vindo do client.
- Nome de tarefa e nome de lista não podem ser vazios (validação tanto no frontend quanto no backend, backend é a fonte de verdade).

**Casos especiais**
- Excluir uma lista exclui em cascata todas as tarefas dela.
- Usuário sem nenhuma lista ainda vê uma tela vazia com convite para criar a primeira.

**Premissas assumidas**
- Sem verificação de e-mail no MVP.
- Sem recuperação de senha no MVP (fica pra versão futura).
- Um usuário só tem uma sessão relevante por vez, sem necessidade de gerenciar múltiplos dispositivos logados no MVP.

---

## 9. Convenções de Desenvolvimento

**Padrões de código**
- Backend: convenções padrão de Java/Spring (camelCase para variáveis e métodos, PascalCase para classes).
- Frontend: convenções padrão de TypeScript/React (camelCase, PascalCase para componentes).

**Nomenclatura**
- Tabelas do banco com prefixo `tb_`, no singular (`tb_user`, `tb_tasklist`, `tb_task`).
- Colunas de chave estrangeira com prefixo `fk_` (`fk_user_id`, `fk_tasklist_id`).
- Endpoints REST em `kebab-case` no plural (`/task-lists`), sem relação com o nome das tabelas.
- Métodos de controller que fazem GET seguem `index` (lista) e `show` (recurso único), independente do path da rota.

**Versionamento**
Git, com a v2 vivendo em branch própria (ex: `v2-java-tanstack`) até estar minimamente funcional, depois vira a branch principal ou uma tag nova.

**Estrutura de commits**
Commits pequenos e descritivos, um assunto por commit (ex: "cria entity Task", "adiciona validação de nome vazio na TaskList"). Sem necessidade de Conventional Commits formal, mas mensagens claras o suficiente pra entender o histórico depois.

**Organização dos arquivos**
Backend por camada técnica (controller/service/repository), como já descrito na seção 6. Frontend por recurso dentro de `src/routes`, seguindo a convenção de arquivos do TanStack Router.

---

## 10. Roadmap de Desenvolvimento

**Fase 1: Banco de dados**
- Modelar o schema (User, TaskList, Task) e escrever as migrations Flyway.
- Entrega: banco Postgres rodando via Docker, com as tabelas criadas.

**Fase 2: Backend sem autenticação**
- Subir o Spring Boot com CRUD completo de TaskList e Task, sem login ainda (usuário fixo/fake pra testar).
- Entrega: API funcional, testável via Postman/Insomnia, cobrindo todos os endpoints do MVP exceto auth.

**Fase 3: Autenticação**
- Implementar cadastro, login, hash de senha, emissão de JWT, proteção de rotas com Spring Security.
- Ajustar as services de TaskList e Task para checar o dono do recurso.
- Entrega: API completa do MVP, com autenticação e autorização funcionando de ponta a ponta.

**Fase 4: Frontend**
- Construir as rotas do TanStack Start (login, cadastro, listas, tarefas), consumindo a API já pronta.
- Entrega: aplicação usável de ponta a ponta pelo browser.

**Fase 5: Infraestrutura**
- Dockerizar backend e frontend, juntar tudo num único `docker-compose.yml` com o Postgres.
- Entrega: `docker compose up` sobe o projeto inteiro.

Dependência entre fases: 1 → 2 → 3 → 4, com a fase 5 podendo começar em paralelo a partir da fase 2, já que o Dockerfile do backend não depende do frontend existir.
