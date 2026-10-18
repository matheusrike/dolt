CREATE TABLE IF NOT EXISTS "tb_role"
(
    "id"         serial primary key,
    "name"       varchar(255) not null unique,
    "created_at" timestamptz  not null default current_timestamp,
    "updated_at" timestamptz
);

insert into "tb_role" ("name")
values ('USER'),
       ('ADMIN');

alter table "tb_user"
    add column "fk_role_id" integer not null default 1;

alter table "tb_user"
    add constraint "fk_role"
        foreign key ("fk_role_id") references "tb_role" ("id")
            on update cascade
            on delete cascade;