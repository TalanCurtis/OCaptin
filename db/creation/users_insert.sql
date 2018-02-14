--students
insert into users( user_name, password, role, first_name, last_name, email, img)
values ('s1', '123','student', 'Steedy', 'Studenta', 'stee@schoolname.com', 'https://randomuser.me/api/portraits/men/1.jpg');
insert into users( user_name, password, role, first_name, last_name, email, img)
values ('s2', '123','student', 'Little', 'JenBean', 'litt@schoolname.com', 'https://randomuser.me/api/portraits/women/1.jpg');
insert into users( user_name, password, role, first_name, last_name, email, img)
values ('s3', '123','student', 'Lark', 'Flanderboy', 'larkdy@schoolname.com', 'https://randomuser.me/api/portraits/men/2.jpg');
insert into users( user_name, password, role, first_name, last_name, email, img)
values ('s4', '123','student', 'Lay', 'Fishton', 'fish@schoolname.com', 'https://randomuser.me/api/portraits/women/2.jpg');

-- teachers
insert into users( user_name, password, role, first_name, last_name, email, img)
values ('t1', '123','teacher', 'Gan', 'Teachera', 'Teachera@schoolname.com', 'https://randomuser.me/api/portraits/men/50.jpg');
insert into users( user_name, password, role, first_name, last_name, email, img)
values ('t2', '123','teacher', 'Lasy', 'Lodder', 'Lodder@schoolname.com', 'https://randomuser.me/api/portraits/women/50.jpg');
insert into users( user_name, password, role, first_name, last_name, email, img)
values ('t3', '123','teacher', 'Zipp', 'Zipperton', 'Zipperton@schoolname.com', 'https://randomuser.me/api/portraits/men/51.jpg');
insert into users( user_name, password, role, first_name, last_name, email, img)
values ('t4', '123','teacher', 'Chilli', 'Lasandre', 'Lasandre@schoolname.com', 'https://randomuser.me/api/portraits/women/52.jpg');

-- admins
insert into users( user_name, password, role, first_name, last_name, email, img)
values ('admin', '123','admin', 'Alan', 'Curtis', 'Curtis@schoolname.com', 'https://randomuser.me/api/portraits/men/95.jpg');


select * from users;