\c sharedspoons;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Insert data into app_user table
WITH salt AS (
  SELECT gen_salt('bf') AS salt
)
INSERT INTO app_user (id, data)
VALUES
    ('a3059ef4-971b-4e60-a692-a3af3365ba85'::uuid, 
     jsonb_build_object(
         'firstname', 'Luca', 
         'lastname', 'Schram', 
         'email', 'lschram@ucsc.edu', 
         'username', 'lucaschram', 
         'pfp', 'https://imgur.com/a/zazu-soldier-cat-two-thousand-yard-stare-meme-restoration-0UhrRnU',
         'pwhash', crypt('$2b$12$725hzYIBj7we05u6X57hXuwNxgPL9Y425nJifesn6MHXQYAuRfzNK', salt.salt), 
         'salt', salt.salt
     )
    ),
    ('3b9a58b2-2a07-45d6-85c9-f138d63cb466'::uuid,
     jsonb_build_object(
         'firstname', 'Keaton', 
         'lastname', 'Shawhan', 
         'email', 'kshawhan@ucsc.edu', 
         'username', 'keatonshawhan', 
         'pfp', 'https://imgur.com/a/zazu-soldier-cat-two-thousand-yard-stare-meme-restoration-0UhrRnU',
         'pwhash', crypt('$2a$12$RmHs51Bg1dMHYrLM9x3rIuJ9J3TDP7FwR9nH/DZ8nG9ZCXTqZyWby', salt.salt), 
         'salt', salt.salt
     )
    )
FROM salt;
-- Insert data into post table
INSERT INTO post (user_id, data) VALUES
    ((SELECT id FROM app_user WHERE data->>'email' = 'lschram@ucsc.edu'), 
    json_build_object('image', 'https://imgur.com/a/zazu-soldier-cat-two-thousand-yard-stare-meme-restoration-0UhrRnU', 
                      'rating', 4, 'adds', 2, 'restaurant', 'CatFood', 'dish', 'Stare', 'time', '2024-10-24T12:45:00.000Z', 'caption', 'look at cat')),
    ((SELECT id FROM app_user WHERE data->>'email' = 'kshawhan@ucsc.edu'), 
    json_build_object('image', 'https://imgur.com/a/zazu-soldier-cat-two-thousand-yard-stare-meme-restoration-0UhrRnU', 
                      'rating', 3, 'adds', 1, 'restaurant', 'CatFood', 'dish', 'Stare', 'time', '2024-10-24T11:23:44.336Z', 'caption', 'cat!'));

-- Insert data into sponsor table
INSERT INTO sponsor (data, active) VALUES
    (json_build_object('image', 'https://imgur.com/a/zazu-soldier-cat-two-thousand-yard-stare-meme-restoration-0UhrRnU', 
                       'adds', 3, 'restaurant', 'CatPlace', 'dish', 'catnip', 'start', '2024-10-22T12:45:00.000Z', 'end', '2024-10-25T12:45:00.000Z'), true),
    (json_build_object('image', 'https://imgur.com/a/zazu-soldier-cat-two-thousand-yard-stare-meme-restoration-0UhrRnU', 
                       'adds', 5, 'restaurant', 'war.', 'dish', 'death', 'start', '2024-10-21T12:45:00.000Z', 'end', '2024-10-24T12:45:00.000Z'), false);

-- Insert data into follow table
INSERT INTO follow (sender, receiver) VALUES
    ((SELECT id FROM app_user WHERE data->>'email' = 'kshawhan@ucsc.edu'), (SELECT id FROM app_user WHERE data->>'email' = 'lschram@ucsc.edu'));

-- Insert data into toEat table
-- Adjusting this to reference an existing post with the dish 'Stare', since 'death' might not be a valid dish in post table
INSERT INTO toEat (post_id, user_id) VALUES
    ((SELECT id FROM post WHERE data->>'dish' = 'Stare' AND data->>'rating' = '3'), (SELECT id FROM app_user WHERE data->>'email' = 'lschram@ucsc.edu'));

-- Insert data into recommend table
INSERT INTO recommend (user_id, dish, rating) VALUES
    ((SELECT id FROM app_user WHERE data->>'email' = 'lschram@ucsc.edu'), 'catnip', 4);
