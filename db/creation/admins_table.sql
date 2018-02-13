create table admins(
    id serial primary key,
    permission varchar(20),
    first_name varchar(20),
    last_name varchar(20),
    email text,
    auth_id text
);