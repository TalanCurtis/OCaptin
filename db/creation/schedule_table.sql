create table schedule(
    id serial primary key,
    day varchar(20),
    start_time integer,
    end_time integer,
    semester integer,
    class_id int references classes(id) on delete cascade
);