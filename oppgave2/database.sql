CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

INSERT INTO users (name) VALUES
    ('Joe Biden'),
    ('Donald Trump'),
    ('Kamala Harris');

    INSERT INTO users (name) VALUES
    ('Obama'),
    ('Bin ladin'),
    ('Jeffrey Epstein');

    CREATE TABLE bilmerker (
    id SERIAL PRIMARY KEY,
    merke VARCHAR(100)
);

    INSERT INTO bilmerker (merke) VALUES
    ('Toyota'),
    ('Ford'),
    ('BMW');

     CREATE TABLE filmer (
                        id SERIAL PRIMARY KEY,
                        tittel VARCHAR(100) NOT NULL
                    );

     CREATE TABLE skuespillere (
                        id SERIAL PRIMARY KEY,
                        navn VARCHAR(100) NOT NULL
                    );

     INSERT INTO filmer (tittel) VALUES
                        ('Titanic'),
                        ('Inception'),
                        ('The Matrix');

    INSERT INTO skuespillere (navn) VALUES
                        ('Leonardo DiCaprio'),
                        ('Kate Winslet'),
                        ('Keanu Reeves'),
                        ('Tom Hardy');

CREATE TABLE skuespiller_i_film (
    film_id INTEGER REFERENCES filmer(id),
    skuespiller_id INTEGER REFERENCES skuespillere(id),
    rolle_navn VARCHAR(100),
    PRIMARY KEY (film_id, skuespiller_id)
);

INSERT INTO skuespiller_i_film (film_id, skuespiller_id, rolle_navn) VALUES
    (1, 1, 'Jack Dawson'),
    (1, 2, 'Rose DeWitt'),
    (2, 1, 'Cobb'),
    (2, 4, 'Eames'),
    (3, 3, 'Neo');

    SELECT 
    skuespillere.navn AS skuespiller, 
    filmer.tittel AS film
FROM skuespillere
JOIN skuespiller_i_film ON skuespillere.id = skuespiller_i_film.skuespiller_id
JOIN filmer ON skuespiller_i_film.film_id = filmer.id;

