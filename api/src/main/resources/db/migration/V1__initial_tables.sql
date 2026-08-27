CREATE TABLE IF NOT EXISTS "tb_user" (
    "id" uuid PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "password_hash" VARCHAR(255) NOT NULL,
    "created_at" timestamptz DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz
    );

CREATE TABLE IF NOT EXISTS "tb_tasklist" (
    "id" uuid PRIMARY KEY,
    "title" varchar(255) NOT NULL,
    "created_at" timestamptz DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz,
    "fk_user_id" uuid,

    CONSTRAINT "fk_user"
    FOREIGN KEY ("fk_user_id")
    REFERENCES tb_user ("id")
    ON UPDATE CASCADE
    ON DELETE CASCADE
    );

CREATE TABLE IF NOT EXISTS "tb_task" (
    "id" uuid PRIMARY KEY,
    "title" varchar(255) NOT NULL,
    "description" text,
    "is_checked" boolean NOT NULL DEFAULT false,
    "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz,
    "fk_tasklist_id" uuid,

    CONSTRAINT "fk_tasklist"
    FOREIGN KEY ("fk_tasklist_id")
    REFERENCES tb_tasklist ("id")
    ON UPDATE CASCADE
    ON DELETE CASCADE
    );
