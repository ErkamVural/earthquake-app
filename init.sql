CREATE TABLE IF NOT EXISTS todos(
    id      SERIAL              PRIMARY KEY,
    title   VARCHAR(20)                    ,
    done    BOOLEAN DEFAULT false 
);

INSERT INTO todos (title, done)
VALUES ('Erkam Vural', true),
        ('Berke Kaya', true),
        ('Ali Enes Adaklı', true);