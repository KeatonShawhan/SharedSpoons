
CREATE EXTENSION IF NOT EXISTS pgcrypto;

DROP TABLE IF EXISTS app_user CASCADE;
CREATE TABLE app_user (
    id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),
    data jsonb
);

DROP TABLE IF EXISTS post CASCADE;
CREATE TABLE post (
    id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES app_user(id) ON DELETE CASCADE,
    data jsonb
);

DROP TABLE IF EXISTS sponsor CASCADE;
CREATE TABLE sponsor (
    id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),
    active BOOLEAN,
    data jsonb
);

DROP TABLE IF EXISTS follow CASCADE;
CREATE TABLE follow (
    sender UUID REFERENCES app_user(id) ON DELETE CASCADE,
    receiver UUID REFERENCES app_user(id) ON DELETE CASCADE,
    PRIMARY KEY (sender, receiver),
    CHECK (sender != receiver)
);

DROP TABLE IF EXISTS toEat CASCADE;
CREATE TABLE toEat (
    post_id UUID REFERENCES post(id) ON DELETE CASCADE,
    user_id UUID REFERENCES app_user(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, user_id)
);

DROP TABLE IF EXISTS recommend CASCADE;
CREATE TABLE recommend (
    user_id UUID REFERENCES app_user(id) ON DELETE CASCADE,
    dish TEXT NOT NULL,
    rating INT CHECK (rating >= 0 AND rating <= 5),
    PRIMARY KEY (user_id, dish)
);

DROP TABLE IF EXISTS comment CASCADE;
CREATE TABLE comment (
    id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID REFERENCES post(id) ON DELETE CASCADE,
    user_id UUID REFERENCES app_user(id) ON DELETE CASCADE,
    data jsonb
);

WITH salt AS (
    SELECT gen_salt('bf') AS salt
)
INSERT INTO app_user (id, data)
SELECT
    'a3059ef4-971b-4e60-a692-a3af3365ba85'::uuid,
    jsonb_build_object(
        'firstname', 'Luca', 
        'lastname', 'Schram', 
        'email', 'lschram@ucsc.edu', 
        'username', 'lucaschram', 
        'pfp', '10bc9173-ff57-4bd6-8e79-10339a57cc4c.jpg',
        'pwhash', crypt('$2b$12$725hzYIBj7we05u6X57hXuwNxgPL9Y425nJifesn6MHXQYAuRfzNK', salt.salt), 
        'salt', salt.salt
    )
FROM salt
UNION ALL
SELECT
    '3b9a58b2-2a07-45d6-85c9-f138d63cb466'::uuid,
    jsonb_build_object(
        'firstname', 'Keaton', 
        'lastname', 'Shawhan', 
        'email', 'kshawhan@ucsc.edu', 
        'username', 'keatonshawhan', 
        'pfp', '10bc9173-ff57-4bd6-8e79-10339a57cc4c.jpg',
        'pwhash', crypt('$2a$12$RmHs51Bg1dMHYrLM9x3rIuJ9J3TDP7FwR9nH/DZ8nG9ZCXTqZyWby', salt.salt), 
        'salt', salt.salt
    )
FROM salt;

INSERT INTO post (id, user_id, data) VALUES
    ('a5059ef4-971b-4e60-a692-a3af3365ba85', (SELECT id FROM app_user WHERE data->>'email' = 'lschram@ucsc.edu'), 
    json_build_object('image', '10bc9173-ff57-4bd6-8e79-10339a57cc4c.jpg', 
                      'rating', 4, 'adds', 2, 'restaurant', 'CatFood', 'dish', 'Stare', 'time', '2024-10-24T12:45:00.000Z', 'caption', 'look at cat')),
    ('a9359ef4-971b-4e60-a692-a3af3365ba85', (SELECT id FROM app_user WHERE data->>'email' = 'kshawhan@ucsc.edu'), 
    json_build_object('image', '10bc9173-ff57-4bd6-8e79-10339a57cc4c.jpg', 
                      'rating', 3, 'adds', 1, 'restaurant', 'CatFood', 'dish', 'Stare', 'time', '2024-10-24T11:23:44.336Z', 'caption', 'cat!'));

INSERT INTO sponsor (data, active) VALUES
    (json_build_object('image', '10bc9173-ff57-4bd6-8e79-10339a57cc4c.jpg', 
                       'adds', 3, 'restaurant', 'CatPlace', 'dish', 'catnip', 'start', '2024-10-22T12:45:00.000Z', 'end', '2024-10-25T12:45:00.000Z'), true),
    (json_build_object('image', '10bc9173-ff57-4bd6-8e79-10339a57cc4c.jpg', 
                       'adds', 5, 'restaurant', 'war.', 'dish', 'death', 'start', '2024-10-21T12:45:00.000Z', 'end', '2024-10-24T12:45:00.000Z'), false);

INSERT INTO follow (sender, receiver) VALUES
    ((SELECT id FROM app_user WHERE data->>'email' = 'kshawhan@ucsc.edu'), (SELECT id FROM app_user WHERE data->>'email' = 'lschram@ucsc.edu'));

INSERT INTO toEat (post_id, user_id) VALUES
    ((SELECT id FROM post WHERE data->>'dish' = 'Stare' AND data->>'rating' = '3'), (SELECT id FROM app_user WHERE data->>'email' = 'lschram@ucsc.edu'));

INSERT INTO comment (id, post_id, user_id, data) VALUES
    ('a6666ef4-971b-4e60-a692-a3af3365ba85', (SELECT id FROM post WHERE data->>'dish' = 'Stare' AND data->>'rating' = '3'), 
    (SELECT id FROM app_user WHERE data->>'email' = 'kshawhan@ucsc.edu'),
    json_build_object('time', '2024-10-21T12:45:00.000Z', 'comment', 'I love this cat!'));
