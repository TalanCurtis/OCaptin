create table assignments(
    id serial primary key,
    kind varchar(20),
    max_score integer,
    description varchar(250),
    due_date varchar(60),
    class_id int references classes(id)
);