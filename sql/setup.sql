-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS songs;

CREATE TABLE songs (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    artist TEXT NOT NULL
);

DROP TABLE IF EXISTS animes;

CREATE TABLE animes (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    favorite_character TEXT NOT NULL,
    year BIGINT NOT NULL
);

DROP TABLE IF EXISTS books;

CREATE TABLE books (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    author TEXT NOT NULL
);

DROP TABLE IF EXISTS mookie;

CREATE TABLE mookie (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    fav_toy TEXT NOT NULL,
    num_treats INT NOT NULL
)