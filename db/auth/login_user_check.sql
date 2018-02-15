select role, first_name, last_name, email
from users
where user_name = $1 and password = $2