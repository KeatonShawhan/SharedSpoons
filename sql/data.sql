\c sharedspoons;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Insert data into app_user table
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
        'bio', 'I love dogs',
        'phoneNumber', '(123) 123-1232',
        'location', 'Santa Cruz',
        'pfp', '10bc9173-ff57-4bd6-8e79-10339a57cc4c.jpg',
        'pwhash', crypt('lucasucks123', salt.salt), 
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
        'bio', 'I love cats',
        'phoneNumber', '(858) 688-4237',
        'location', 'Santa Cruz',
        'pfp', '10bc9173-ff57-4bd6-8e79-10339a57cc4c.jpg',
        'pwhash', crypt('keatoniscool123', salt.salt), 
        'salt', salt.salt
    )
FROM salt;
-- Insert data into post table
INSERT INTO post (id, user_id, data) VALUES
    ('a5059ef4-971b-4e60-a692-a3af3365ba85', (SELECT id FROM app_user WHERE data->>'email' = 'lschram@ucsc.edu'), 
    json_build_object('image', '10bc9173-ff57-4bd6-8e79-10339a57cc4c.jpg', 
                      'rating', 4, 'adds', 2, 'restaurant', 'CatFood', 'dish', 'Stare', 'time', '2024-10-24T12:45:00.000Z', 'caption', 'look at cat')),
    ('a9359ef4-971b-4e60-a692-a3af3365ba85', (SELECT id FROM app_user WHERE data->>'email' = 'kshawhan@ucsc.edu'), 
    json_build_object('image', '10bc9173-ff57-4bd6-8e79-10339a57cc4c.jpg', 
                      'rating', 3, 'adds', 1, 'restaurant', 'CatFood', 'dish', 'Stare', 'time', '2024-10-24T11:23:44.336Z', 'caption', 'cat!'));

-- Insert data into sponsor table
INSERT INTO sponsor (data, active) VALUES
    (json_build_object('image', '10bc9173-ff57-4bd6-8e79-10339a57cc4c.jpg', 
                       'adds', 3, 'restaurant', 'CatPlace', 'dish', 'catnip', 'start', '2024-10-22T12:45:00.000Z', 'end', '2024-10-25T12:45:00.000Z'), true),
    (json_build_object('image', '10bc9173-ff57-4bd6-8e79-10339a57cc4c.jpg', 
                       'adds', 5, 'restaurant', 'war.', 'dish', 'death', 'start', '2024-10-21T12:45:00.000Z', 'end', '2024-10-24T12:45:00.000Z'), false);

-- Insert data into follow table
INSERT INTO follow (sender, receiver) VALUES
    ((SELECT id FROM app_user WHERE data->>'email' = 'kshawhan@ucsc.edu'), (SELECT id FROM app_user WHERE data->>'email' = 'lschram@ucsc.edu'));

-- Insert data into toEat table
-- Adjusting this to reference an existing post with the dish 'Stare', since 'death' might not be a valid dish in post table
INSERT INTO toEat (post_id, user_id) VALUES
    ((SELECT id FROM post WHERE data->>'dish' = 'Stare' AND data->>'rating' = '3'), (SELECT id FROM app_user WHERE data->>'email' = 'lschram@ucsc.edu'));

INSERT INTO comment (id, post_id, user_id, data) VALUES
    ('a6666ef4-971b-4e60-a692-a3af3365ba85', (SELECT id FROM post WHERE data->>'dish' = 'Stare' AND data->>'rating' = '3'), 
    (SELECT id FROM app_user WHERE data->>'email' = 'kshawhan@ucsc.edu'),
    json_build_object('time', '2024-10-21T12:45:00.000Z', 'comment', 'I love this cat!'));