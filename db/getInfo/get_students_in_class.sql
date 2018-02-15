select u.id, u.first_name, u.last_name, u.img
from enrollment e
inner join users u on e.user_id = u.id
where class_id = $1