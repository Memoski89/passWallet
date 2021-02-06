
--users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  admin BOOLEAN DEFAULT FALSE
);

--make sure that you can support multiple admins for 1 site and that
--the sites.id does not change for each admin of the same site.
--sites table
CREATE TABLE sites (
  id SERIAL PRIMARY KEY NOT NULL,
  site_name VARCHAR(255) NOT NULL,
  site_home_page_url VARCHAR(255) NOT NULL,
  site_admin_id INTEGER REFERENCES admins(id)
);


--user_login_per_site table
CREATE TABLE user_login_per_site (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  user_name_for_site_login VARCHAR(255) NOT NULL,
  user_password_for_site_login VARCHAR(255) NOT NULL,
  url_for_login VARCHAR(255) NOT NULL
  --site_id INTEGER REFERENCES sites(id) -- this is needed so that we can use username and pw to login to a site.. think that the user will need to provide the url for which the login details are used for.. we need to look up that site_id and store it here..
);

--admins table
CREATE TABLE admins (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) REFERENCES users(name) ON DELETE CASCADES,
  email VARCHAR(255) REFERENCES users(email) ON DELETE CASCADES,
  site_id INTEGER REFERENCES sites(id),
  user_id INTEGER REFERENCES users(id),
);
