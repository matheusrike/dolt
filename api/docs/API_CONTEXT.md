# API Context

> Contexto de referencia para desenvolvimento assistido por IA da API do Dolt. Atualize este arquivo quando uma decisao de arquitetura, contrato HTTP, regra de negocio ou schema for alterado.

## Objetivo e Escopo

A API sustenta um aplicativo pessoal de listas de tarefas. Ela expoe uma API REST para um frontend que atua como BFF; o navegador nao deve se comunicar diretamente com esta aplicacao.

Escopo do MVP:

- Cadastro e autenticacao de usuarios.
- CRUD de listas de tarefas.
- CRUD de tarefas de uma lista.
- Marcacao e desmarcacao de tarefas concluidas.
- Isolamento rigoroso dos dados por usuario.

Fora do MVP: compartilhamento de listas, tags, prazos, lembretes e reordenacao.

## Estado Atual

- Projeto Maven em `api/`, groupId `com.matheusrike.dolt`, artifactId `api`.
- Java 21 e Spring Boot 4.1.0.
- Dependencias disponiveis: Spring Web MVC, Data JPA, Security, Validation, Flyway, PostgreSQL e Lombok.
- A unica entidade Java implementada e `entity/User`.
- A migration inicial existe em `src/main/resources/db/migration/V1__init_database.sql`.
- Controllers, services, repositories, DTOs, seguranca JWT e tratamento global de erros ainda nao foram implementados.

Nao apresente endpoints ou classes planejadas como se ja estivessem disponiveis. Ao implementar algo, mantenha este documento consistente com o codigo e com as migrations.

## Arquitetura

Use arquitetura em camadas, organizada por responsabilidade tecnica sob `com.matheusrike.dolt.api`:

```text
config/       configuracao de framework e seguranca
controller/   adaptadores HTTP
service/      regras de negocio e autorizacao por recurso
repository/   interfaces Spring Data JPA e queries
entity/       mapeamentos JPA das tabelas
dto/          contratos de entrada e saida HTTP
security/     JWT e usuario autenticado
exception/    excecoes de dominio e tratamento global
```

Fluxo obrigatorio:

```text
Controller -> Service -> Repository -> PostgreSQL
```

- Controllers validam DTOs de entrada com Bean Validation, delegam para services e respondem com DTOs.
- Services concentram regras de negocio e confirmam a propriedade dos recursos antes de qualquer leitura ou escrita.
- Repositories nao devem conter regra de negocio.
- Entities nao podem ser serializadas diretamente nas respostas HTTP.
- Migrations versionadas pelo Flyway sao a fonte de verdade do schema; nao usar `ddl-auto` para evoluir tabelas.

Para GETs de controller, use `index` para colecoes e `show` para um unico recurso.

## Dominio e Schema

O schema atual da migration V1 e:

```text
tb_user
  id            UUID PK
  name          VARCHAR(255) NOT NULL
  email         VARCHAR(255) NOT NULL UNIQUE
  password_hash VARCHAR(255) NOT NULL
  created_at    TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
  updated_at    TIMESTAMPTZ

tb_tasklist
  id            UUID PK
  title         VARCHAR(255) NOT NULL
  created_at    TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
  updated_at    TIMESTAMPTZ
  fk_user_id    UUID FK -> tb_user(id), ON UPDATE/DELETE CASCADE

tb_task
  id              UUID PK
  title           VARCHAR(255) NOT NULL
  description     TEXT
  is_checked      BOOLEAN NOT NULL DEFAULT false
  created_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
  updated_at      TIMESTAMPTZ
  fk_tasklist_id  UUID FK -> tb_tasklist(id), ON UPDATE/DELETE CASCADE
```

Convencoes de persistencia:

- Tabelas usam prefixo `tb_` e nomes no singular.
- Chaves estrangeiras usam prefixo `fk_`.
- Todas as PKs atuais sao UUID. Nao introduza IDs inteiros sem uma migration e decisao explicita.
- Listas e tarefas usam o campo `title`, nao `name`.
- A exclusao de uma lista deve remover suas tarefas em cascata.
- `User` gera UUID via JPA e preenche timestamps em `@PrePersist` e `@PreUpdate`.

## Regras de Negocio

- Um usuario ve e altera somente suas proprias listas e tarefas.
- Uma lista pertence a exatamente um usuario.
- Uma tarefa pertence a exatamente uma lista; seu dono e o dono dessa lista.
- Antes de ler, editar ou excluir uma lista, validar que `taskList.user.id` e o ID do usuario autenticado.
- Antes de ler, editar, alterar status ou excluir uma tarefa, validar o dono por meio da lista associada.
- Nunca confiar em ID de usuario enviado pelo cliente para determinar propriedade.
- `title` de lista e tarefa nao pode ser vazio; o backend e a fonte de verdade da validacao.
- Senhas devem ser persistidas somente com hash BCrypt.

## Contrato HTTP Planejado

Os caminhos usam plural e `kebab-case`. Estes endpoints sao o contrato do MVP a implementar:

```text
POST   /auth/register
POST   /auth/login
GET    /users/me

GET    /task-lists
POST   /task-lists
PUT    /task-lists/{id}
DELETE /task-lists/{id}

GET    /task-lists/{id}/tasks
POST   /task-lists/{id}/tasks
PUT    /tasks/{id}
PATCH  /tasks/{id}/status
DELETE /tasks/{id}
```

- Rotas fora de `/auth/*` devem exigir JWT valido.
- O login emitira JWT assinado; o BFF e responsavel por armazena-lo em cookie httpOnly.
- DTOs de requisicao devem usar Bean Validation, como `@NotBlank` e `@Size`.
- Respostas e erros devem ser JSON. Um `@ControllerAdvice` global deve converter erros de validacao, recurso inexistente e acesso negado para status HTTP adequados.
- Nao exponha `passwordHash` ou entities nos contratos JSON.

## Banco e Configuracao Local

- PostgreSQL e iniciado pelo `api/docker-compose.yml`.
- A configuracao da datasource fica em `src/main/resources/application.properties`.
- Credenciais e segredos nao devem ser colocados neste documento, em commits ou em valores padrao de producao. Prefira variaveis de ambiente para configuracao sensivel.
- Novas alteracoes de schema exigem uma migration Flyway adicional e imutavel em `src/main/resources/db/migration/`; nunca edite uma migration que ja tenha sido aplicada fora do ambiente local descartavel.

## Qualidade

- Escreva testes para services e para os contratos HTTP das funcionalidades novas.
- Prefira erros de dominio explicitos a retornar `null` ou deixar excecoes de persistencia vazarem para a API.
- Preserve a separacao controller/service/repository mesmo para operacoes simples.
- Use convencoes Java: classes em PascalCase e metodos/variaveis em camelCase.
