create table classes(
    id serial primary key,
    class_name varchar(20),
    size_limit integer,
    size integer,
    teacher_id int references teachers(id)
);