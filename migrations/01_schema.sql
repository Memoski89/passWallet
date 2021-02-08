\c midterm

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS sites CASCADE;
DROP TABLE IF EXISTS user_login_per_site CASCADE;
DROP TABLE IF EXISTS ad CASCADE;

--users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  admin BOOLEAN DEFAULT FALSE,
  UNIQUE (email)
);

----user_login_per_site table
CREATE TABLE user_login_per_site (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  user_name_for_site_login VARCHAR(255) NOT NULL,
  user_password_for_site_login VARCHAR(255) NOT NULL,
  url_for_login VARCHAR(255) NOT NULL
  --site_id INTEGER REFERENCES sites(id) -- this is needed so that we can use username and pw to login to a site.. think that the user will need to provide the url for which the login details are used for.. we need to look up that site_id and store it here..
);



--admins table
CREATE TABLE admins (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  email VARCHAR(255) REFERENCES users(email) ON DELETE CASCADE

);



---- removed site_admin_id INTEGER REFERENCES admins(id) and leaving it in the admins table.. does not need to be here and
---- causes an issues when creating tables because site_table refs admins table and vice-versa
-- --make sure that you can support multiple admins for 1 site and that
-- --the sites.id does not change for each admin of the same site.

-- -- why do we need this table? and what do we use it for? we are not storing sites and user_login_per_site_id is

-- -- --sites table
-- CREATE TABLE sites (
--   id SERIAL PRIMARY KEY NOT NULL,
--   site_name VARCHAR(255) NOT NULL,
--   site_home_page_url VARCHAR(255) NOT NULL
-- );

