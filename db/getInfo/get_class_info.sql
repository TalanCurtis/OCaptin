select *
from enrollment e
inner join users u on e.user_id = u.id
inner join assignments a on e.class_id = a.class_id
where e.class_id = $1
group by e.id, u.id, a.id