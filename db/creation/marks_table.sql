create table marks(
    id serial primary key,
    score integer,
    date_received varchar(60),
    notes varchar(250),
    student_id int references students(id),
    assignment_id int references assignments(id) 
);