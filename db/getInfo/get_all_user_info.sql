select u.id as user_id ,
c.id as class_id, c.class_name as class_name,
e.user_id as student_id
from users u
inner join classes c on u.id = c.user_id
inner join enrollment e on class_id = e.class_id

where u.id = 16

///////////////

select u.id as teacher_id,
c.id as class_id, c.class_name as class_name,
e.user_id as student_id,
s.first_name as student_first_name, s.last_name as student_last_name
-- m.score as mark_score, m.notes as mark_note
from users u
inner join classes c on u.id = c.user_id
inner join enrollment e on c.id = e.class_id
inner join users s on e.user_id = s.id
-- inner join marks m on s.id = m.user_id
where u.id = 16