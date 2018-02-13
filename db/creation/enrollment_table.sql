create table enrollment(
    id serial primary key,
    class_id int references classes(id),
    student_id int references students(id),
);