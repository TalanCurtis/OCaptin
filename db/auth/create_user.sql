insert into users
(user_name, img, auth_id, first_name, last_name)
values
($1, $2, $3, $4, $5)
-- returning returns the new user or row that was created
-- saving db call
returning *;