create table users(
    id serial primary key,
    role varchar(20),
    user_name varchar(20),
    password varchar(20),
    first_name varchar(20),
    last_name varchar(20),
    email varchar(100),
    img text
);