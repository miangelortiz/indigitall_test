-- Users table
create table if not exists users (
  id integer primary key autoincrement,
  username text not null,
  email text not null unique,
  password text not null,
  location text not null,
  language text not null
);

-- Friendships table
-- This table represents the many-to-many relationship between users
create table if not exists friendships (
  id integer primary key autoincrement,
  user_id integer not null,
  friend_id integer not null,
  foreign key (user_id) references users (id) on delete cascade,
  foreign key (friend_id) references users (id) on delete cascade,
  unique (user_id, friend_id)
);

