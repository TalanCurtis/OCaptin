select * from classes
where user_id = $1
order by class_name asc;