update assignments
set description = $2,  max_score = $3
where id = $1;
-- returning *;

select * from assignments
where id = $1;