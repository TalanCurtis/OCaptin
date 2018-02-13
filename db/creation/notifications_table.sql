create table notifications (
    id serial primary key,
    time_stamp integer,
    message varchar(250),
    admin_id int references admins(id)
);