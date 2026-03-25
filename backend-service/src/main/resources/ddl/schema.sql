CREATE TABLE users (
    id uuid PRIMARY KEY,
    role varchar(255) NOT NULL,
    user_email varchar(255) NOT NULL UNIQUE,
    user_password varchar(255) NOT NULL,
    user_first_name varchar(255) NOT NULL,
    user_last_name varchar(255) NOT NULL,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_user_id uuid NOT NULL,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_user_id uuid NOT NULL,
    is_deleted boolean NOT NULL DEFAULT false
);

CREATE TABLE rooms (
    id uuid PRIMARY KEY,
    owner_id uuid NOT NULL,
    code text NOT NULL UNIQUE,              
    room_name varchar(255) NOT NULL,        
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_user_id uuid NOT NULL,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_user_id uuid NOT NULL,
    is_deleted boolean NOT NULL DEFAULT false
);

CREATE TABLE room_members (
    id uuid PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES users(id),
    room_id uuid NOT NULL REFERENCES rooms(id),
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_user_id uuid NOT NULL,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_user_id uuid NOT NULL,
    is_deleted boolean NOT NULL DEFAULT false
);

CREATE TABLE channels (
    id uuid PRIMARY KEY,
    room_id uuid NOT NULL REFERENCES rooms(id),
    channel_name varchar(255) NOT NULL,
    is_dm boolean NOT NULL DEFAULT false,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_user_id uuid NOT NULL,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_user_id uuid NOT NULL,
    is_deleted boolean NOT NULL DEFAULT false
);

CREATE TABLE channel_members (
    id uuid PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES users(id),
    channel_id uuid NOT NULL REFERENCES channels(id),
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_user_id uuid NOT NULL,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_user_id uuid NOT NULL,
    is_deleted boolean NOT NULL DEFAULT false
);

CREATE TABLE messages (
    id uuid PRIMARY KEY,
    channel_id uuid NOT NULL REFERENCES channels(id),
    sender_id uuid NOT NULL REFERENCES users(id),
    content text NOT NULL,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_user_id uuid NOT NULL,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_user_id uuid NOT NULL,
    is_deleted boolean NOT NULL DEFAULT false
);