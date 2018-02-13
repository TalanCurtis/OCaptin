create table teachers(
    id serial primary key,
    user_name varchar(20),
    password varchar(20),
    permission varchar(20),
    first_name varchar(20),
    last_name varchar(20),
    email text,
    auth_id text
);