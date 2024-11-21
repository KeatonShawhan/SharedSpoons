\c sharedspoons;

-- Entry 1
INSERT INTO app_user (id, data)
SELECT
    'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid,
    jsonb_build_object(
        'firstname', 'James',
        'lastname', 'Smith',
        'email', 'james.smith@example.com',
        'username', 'jamesSmith',
        'bio', 'Enthusiastic about coding.',
        'phoneNumber', '(123) 456-7890',
        'location', 'New York',
        'pfp', '10bc9173-ff57-4bd6-8e79-10339a57cc4c.jpg',
        'pwhash', crypt('P4sSw0rD1', s.salt),
        'salt', s.salt
    )
FROM (SELECT gen_salt('bf') AS salt) s;

-- Entry 2
INSERT INTO app_user (id, data)
SELECT
    'e2b3c4d5-6f7a-8b9c-0d1e-2f3a4b5c6d7e'::uuid,
    jsonb_build_object(
        'firstname', 'Mary',
        'lastname', 'Johnson',
        'email', 'mary.johnson@example.com',
        'username', 'maryJohnson',
        'bio', 'Loves reading books.',
        'phoneNumber', '(234) 567-8901',
        'location', 'Los Angeles',
        'pfp', '10bc9173-ff57-4bd6-8e79-10339a57cc4c.jpg',
        'pwhash', crypt('SeCuReP@ss2', s.salt),
        'salt', s.salt
    )
FROM (SELECT gen_salt('bf') AS salt) s;

-- Entry 3
INSERT INTO app_user (id, data)
SELECT
    'd3c4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f'::uuid,
    jsonb_build_object(
        'firstname', 'Robert',
        'lastname', 'Williams',
        'email', 'robert.williams@example.com',
        'username', 'robertWilliams',
        'bio', 'Passionate about music.',
        'phoneNumber', '(345) 678-9012',
        'location', 'Chicago',
        'pfp', '10bc9173-ff57-4bd6-8e79-10339a57cc4c.jpg',
        'pwhash', crypt('QwErTy123', s.salt),
        'salt', s.salt
    )
FROM (SELECT gen_salt('bf') AS salt) s;

-- Entry 4
INSERT INTO app_user (id, data)
SELECT
    'c4d5e6f7-8a9b-0c1d-2e3f-4a5b6c7d8e9f'::uuid,
    jsonb_build_object(
        'firstname', 'Patricia',
        'lastname', 'Brown',
        'email', 'patricia.brown@example.com',
        'username', 'patriciaBrown',
        'bio', 'Enjoys hiking and the outdoors.',
        'phoneNumber', '(456) 789-0123',
        'location', 'Houston',
        'pfp', '10bc9173-ff57-4bd6-8e79-10339a57cc4c.jpg',
        'pwhash', crypt('PaSsWoRd4!', s.salt),
        'salt', s.salt
    )
FROM (SELECT gen_salt('bf') AS salt) s;

-- Entry 5
INSERT INTO app_user (id, data)
SELECT
    'b5c6d7e8-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid,
    jsonb_build_object(
        'firstname', 'John',
        'lastname', 'Jones',
        'email', 'john.jones@example.com',
        'username', 'johnJones',
        'bio', 'Avid gamer and tech enthusiast.',
        'phoneNumber', '(567) 890-1234',
        'location', 'Phoenix',
        'pfp', '10bc9173-ff57-4bd6-8e79-10339a57cc4c.jpg',
        'pwhash', crypt('123456Abc', s.salt),
        'salt', s.salt
    )
FROM (SELECT gen_salt('bf') AS salt) s;

-- Entry 6
INSERT INTO app_user (id, data)
SELECT
    'a6b7c8d9-0e1f-2a3b-4c5d-6e7f8a9b0c1d'::uuid,
    jsonb_build_object(
        'firstname', 'Linda',
        'lastname', 'Davis',
        'email', 'linda.davis@example.com',
        'username', 'lindaDavis',
        'bio', 'Artist and painter.',
        'phoneNumber', '(678) 901-2345',
        'location', 'Philadelphia',
        'pfp', '10bc9173-ff57-4bd6-8e79-10339a57cc4c.jpg',
        'pwhash', crypt('MyP@ssw0rd5', s.salt),
        'salt', s.salt
    )
FROM (SELECT gen_salt('bf') AS salt) s;

-- Entry 7
INSERT INTO app_user (id, data)
SELECT
    '9b0c1d2e-3f4a-5b6c-7d8e-9f0a1b2c3d4e'::uuid,
    jsonb_build_object(
        'firstname', 'Michael',
        'lastname', 'Miller',
        'email', 'michael.miller@example.com',
        'username', 'michaelMiller',
        'bio', 'Fitness enthusiast and runner.',
        'phoneNumber', '(789) 012-3456',
        'location', 'San Antonio',
        'pfp', '10bc9173-ff57-4bd6-8e79-10339a57cc4c.jpg',
        'pwhash', crypt('P@ssw0rd6!', s.salt),
        'salt', s.salt
    )
FROM (SELECT gen_salt('bf') AS salt) s;

-- Entry 8
INSERT INTO app_user (id, data)
SELECT
    '8a9b0c1d-2e3f-4a5b-6c7d-8e9f0a1b2c3d'::uuid,
    jsonb_build_object(
        'firstname', 'Barbara',
        'lastname', 'Wilson',
        'email', 'barbara.wilson@example.com',
        'username', 'barbaraWilson',
        'bio', 'Coffee lover and bookworm.',
        'phoneNumber', '(890) 123-4567',
        'location', 'San Diego',
        'pfp', '10bc9173-ff57-4bd6-8e79-10339a57cc4c.jpg',
        'pwhash', crypt('SecureP@ss7', s.salt),
        'salt', s.salt
    )
FROM (SELECT gen_salt('bf') AS salt) s;

-- Entry 9
INSERT INTO app_user (id, data)
SELECT
    '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid,
    jsonb_build_object(
        'firstname', 'William',
        'lastname', 'Anderson',
        'email', 'william.anderson@example.com',
        'username', 'williamAnderson',
        'bio', 'Photographer and traveler.',
        'phoneNumber', '(901) 234-5678',
        'location', 'Dallas',
        'pfp', '10bc9173-ff57-4bd6-8e79-10339a57cc4c.jpg',
        'pwhash', crypt('P@ssw0rd8#', s.salt),
        'salt', s.salt
    )
FROM (SELECT gen_salt('bf') AS salt) s;

-- Entry 10
INSERT INTO app_user (id, data)
SELECT
    '6c7d8e9f-0a1b-2c3d-4e5f-6a7b8c9d0e1f'::uuid,
    jsonb_build_object(
        'firstname', 'Elizabeth',
        'lastname', 'Thomas',
        'email', 'elizabeth.thomas@example.com',
        'username', 'elizabethThomas',
        'bio', 'Passionate about environmental conservation.',
        'phoneNumber', '(012) 345-6789',
        'location', 'San Jose',
        'pfp', '10bc9173-ff57-4bd6-8e79-10339a57cc4c.jpg',
        'pwhash', crypt('MyP@ssw0rd9', s.salt),
        'salt', s.salt
    )
FROM (SELECT gen_salt('bf') AS salt) s;

-- Entry 11
INSERT INTO app_user (id, data)
SELECT
    '5b6c7d8e-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid,
    jsonb_build_object(
        'firstname', 'David',
        'lastname', 'Taylor',
        'email', 'david.taylor@example.com',
        'username', 'davidTaylor',
        'bio', 'Music producer and DJ.',
        'phoneNumber', '(123) 456-7891',
        'location', 'Austin',
        'pfp', '10bc9173-ff57-4bd6-8e79-10339a57cc4c.jpg',
        'pwhash', crypt('Passw0rd10!', s.salt),
        'salt', s.salt
    )
FROM (SELECT gen_salt('bf') AS salt) s;

-- Entry 12
INSERT INTO app_user (id, data)
SELECT
    '5e85f7d1-49af-4f17-9f1c-2bbdbb7c8a9b'::uuid,
    jsonb_build_object(
        'firstname', 'Jennifer',
        'lastname', 'Moore',
        'email', 'jennifer.moore@example.com',
        'username', 'jenniferMoore',
        'bio', 'Food blogger and chef.',
        'phoneNumber', '(234) 567-8902',
        'location', 'Jacksonville',
        'pfp', '10bc9173-ff57-4bd6-8e79-10339a57cc4c.jpg',
        'pwhash', crypt('P@ssw0rd12', s.salt),
        'salt', s.salt
    )
FROM (SELECT gen_salt('bf') AS salt) s;

-- Entry 13
INSERT INTO app_user (id, data)
SELECT
    'd88a9e3e-4d2a-4ab3-9d69-4ef72b6ad28e'::uuid,
    jsonb_build_object(
        'firstname', 'Richard',
        'lastname', 'Lee',
        'email', 'richard.lee@example.com',
        'username', 'richardLee',
        'bio', 'Tech entrepreneur and investor.',
        'phoneNumber', '(345) 678-9013',
        'location', 'Fort Worth',
        'pfp', '10bc9173-ff57-4bd6-8e79-10339a57cc4c.jpg',
        'pwhash', crypt('SecUr3P@ss13', s.salt),
        'salt', s.salt
    )
FROM (SELECT gen_salt('bf') AS salt) s;

-- Entry 14
INSERT INTO app_user (id, data)
SELECT
    'a37259c7-4e62-482b-8b7d-09275985d6e2'::uuid,
    jsonb_build_object(
        'firstname', 'Susan',
        'lastname', 'Clark',
        'email', 'susan.clark@example.com',
        'username', 'susanClark',
        'bio', 'Yoga instructor and wellness coach.',
        'phoneNumber', '(456) 789-0124',
        'location', 'Columbus',
        'pfp', '10bc9173-ff57-4bd6-8e79-10339a57cc4c.jpg',
        'pwhash', crypt('P@ssw0rd14$', s.salt),
        'salt', s.salt
    )
FROM (SELECT gen_salt('bf') AS salt) s;

-- Entry 15
INSERT INTO app_user (id, data)
SELECT
    '223d5c68-4f9a-43aa-a6e5-82e781c9f079'::uuid,
    jsonb_build_object(
        'firstname', 'Joseph',
        'lastname', 'Lewis',
        'email', 'joseph.lewis@example.com',
        'username', 'josephLewis',
        'bio', 'Graphic designer and illustrator.',
        'phoneNumber', '(567) 890-1235',
        'location', 'Charlotte',
        'pfp', '10bc9173-ff57-4bd6-8e79-10339a57cc4c.jpg',
        'pwhash', crypt('MyP@ssw0rd15', s.salt),
        'salt', s.salt
    )
FROM (SELECT gen_salt('bf') AS salt) s;

-- Entry 16
INSERT INTO app_user (id, data)
SELECT
    'dca6d2af-3c7b-4c9e-85c4-28f6e8f7e6e9'::uuid,
    jsonb_build_object(
        'firstname', 'Karen',
        'lastname', 'Walker',
        'email', 'karen.walker@example.com',
        'username', 'karenWalker',
        'bio', 'Fitness coach and nutritionist.',
        'phoneNumber', '(678) 901-2346',
        'location', 'San Francisco',
        'pfp', '10bc9173-ff57-4bd6-8e79-10339a57cc4c.jpg',
        'pwhash', crypt('P@ssw0rd16%', s.salt),
        'salt', s.salt
    )
FROM (SELECT gen_salt('bf') AS salt) s;

-- Entry 17
INSERT INTO app_user (id, data)
SELECT
    'fa7e4f34-6ef9-4c0f-918e-3fb04b85a1e4'::uuid,
    jsonb_build_object(
        'firstname', 'Thomas',
        'lastname', 'Hall',
        'email', 'thomas.hall@example.com',
        'username', 'thomasHall',
        'bio', 'Digital marketer and blogger.',
        'phoneNumber', '(789) 012-3457',
        'location', 'Indianapolis',
        'pfp', '10bc9173-ff57-4bd6-8e79-10339a57cc4c.jpg',
        'pwhash', crypt('SecureP@ss17', s.salt),
        'salt', s.salt
    )
FROM (SELECT gen_salt('bf') AS salt) s;

-- Entry 18
INSERT INTO app_user (id, data)
SELECT
    'cb0c06d9-56d0-477c-8ec8-4c6eb3cdbb5a'::uuid,
    jsonb_build_object(
        'firstname', 'Sarah',
        'lastname', 'Allen',
        'email', 'sarah.allen@example.com',
        'username', 'sarahAllen',
        'bio', 'Fashion designer and stylist.',
        'phoneNumber', '(890) 123-4568',
        'location', 'Seattle',
        'pfp', '10bc9173-ff57-4bd6-8e79-10339a57cc4c.jpg',
        'pwhash', crypt('P@ssw0rd18^', s.salt),
        'salt', s.salt
    )
FROM (SELECT gen_salt('bf') AS salt) s;

-- Entry 19
INSERT INTO app_user (id, data)
SELECT
    'ab81c11a-7d51-4e8b-b29c-9828a5d978bd'::uuid,
    jsonb_build_object(
        'firstname', 'Christopher',
        'lastname', 'Young',
        'email', 'christopher.young@example.com',
        'username', 'chrisYoung',
        'bio', 'Adventure seeker and blogger.',
        'phoneNumber', '(901) 234-5679',
        'location', 'Denver',
        'pfp', '10bc9173-ff57-4bd6-8e79-10339a57cc4c.jpg',
        'pwhash', crypt('Passw0rd19&', s.salt),
        'salt', s.salt
    )
FROM (SELECT gen_salt('bf') AS salt) s;

-- Entry 20
INSERT INTO app_user (id, data)
SELECT
    'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid,
    jsonb_build_object(
        'firstname', 'Nancy',
        'lastname', 'King',
        'email', 'nancy.king@example.com',
        'username', 'nancyKing',
        'bio', 'Teacher and lifelong learner.',
        'phoneNumber', '(012) 345-6790',
        'location', 'Washington',
        'pfp', '10bc9173-ff57-4bd6-8e79-10339a57cc4c.jpg',
        'pwhash', crypt('MyP@ssw0rd20', s.salt),
        'salt', s.salt
    )
FROM (SELECT gen_salt('bf') AS salt) s;

-- Post seed data
INSERT INTO post (id, user_id, data)
    SELECT
        '142f5c6a-8560-4ce5-b93e-e868be6de759'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'michael.miller@example.com'),
        json_build_object(
            'image', 'images/beet_salad/12969.jpg',
            'rating', 4,
            'adds', 0,
            'restaurant', 'Taste Buds Delight',
            'dish', 'Vegan Burger',
            'time', '2024-10-23T04:22:26.041706',
            'caption', 'Ok, could use more seasoning.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '9de41342-88d5-4ff4-8e6d-5e0b7c6d67c7'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'patricia.brown@example.com'),
        json_build_object(
            'image', 'images/beet_salad/21925.jpg',
            'rating', 2,
            'adds', 0,
            'restaurant', 'Zankou Chicken',
            'dish', 'Chicken Alfredo',
            'time', '2024-09-04T03:22:17.055823',
            'caption', 'This was pretty bad.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '401898e8-f5ce-4094-9f1e-b023b58145fe'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'kshawhan@ucsc.edu'),
        json_build_object(
            'image', 'images/beef_carpaccio/60660.jpg',
            'rating', 1,
            'adds', 0,
            'restaurant', 'Food Paradise',
            'dish', 'Baklava',
            'time', '2024-05-17T15:48:27.378319',
            'caption', 'Would highly recommend.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '6331d087-0481-4e66-b9e2-cc907fd4062f'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'william.anderson@example.com'),
        json_build_object(
            'image', 'images/baklava/21435.jpg',
            'rating', 1,
            'adds', 0,
            'restaurant', 'Americana Diner',
            'dish', 'Vegan Burger',
            'time', '2024-10-30T02:56:58.389051',
            'caption', 'Mid.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        'bcafce5c-494e-4c2e-97bc-4b8db13378d3'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'david.taylor@example.com'),
        json_build_object(
            'image', 'images/baklava/65891.jpg',
            'rating', 4,
            'adds', 0,
            'restaurant', 'The Gourmet Kitchen',
            'dish', 'Bibimbap',
            'time', '2024-10-22T16:49:06.112367',
            'caption', 'I am never coming here ever again.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '3d45a873-08da-4678-aa79-d0c790d794bc'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'elizabeth.thomas@example.com'),
        json_build_object(
            'image', 'images/baby_back_ribs/24726.jpg',
            'rating', 5,
            'adds', 0,
            'restaurant', 'Americana Diner',
            'dish', 'Grilled Salmon',
            'time', '2024-08-05T15:50:27.336148',
            'caption', 'Best food I have ever had.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '9c75473b-3a45-44be-afc6-7b8700f8d841'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'kshawhan@ucsc.edu'),
        json_build_object(
            'image', 'images/apple_pie/157083.jpg',
            'rating', 1,
            'adds', 0,
            'restaurant', 'Food Paradise',
            'dish', 'Bibimbap',
            'time', '2024-01-12T11:22:05.752525',
            'caption', 'A culinary masterpiece!'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '20239a0e-8c5f-4b06-9b5a-5012eb108aee'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'patricia.brown@example.com'),
        json_build_object(
            'image', 'images/baby_back_ribs/42451.jpg',
            'rating', 1,
            'adds', 0,
            'restaurant', 'New Culinary World',
            'dish', 'Beignets',
            'time', '2024-01-12T19:02:29.810252',
            'caption', 'Could be better.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '8ed7d23f-87c9-4d96-8949-5db5fc9a24bc'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'robert.williams@example.com'),
        json_build_object(
            'image', 'images/baby_back_ribs/41235.jpg',
            'rating', 2,
            'adds', 0,
            'restaurant', 'Florentine Trattoria',
            'dish', 'Grilled Salmon',
            'time', '2024-02-25T11:06:56.268722',
            'caption', 'Absolutely delicious!'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '4f6fc5ff-58bb-4457-858a-7f57199efa0d'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'susan.clark@example.com'),
        json_build_object(
            'image', 'images/beef_tartare/6149.jpg',
            'rating', 5,
            'adds', 0,
            'restaurant', 'Avanti',
            'dish', 'Beet Salad',
            'time', '2024-10-21T06:23:09.029136',
            'caption', 'Delicious, compliments to the chef.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        'b2b0ae42-5bb2-481d-a5e7-e74e11890de5'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'michael.miller@example.com'),
        json_build_object(
            'image', 'images/baklava/28613.jpg',
            'rating', 1,
            'adds', 0,
            'restaurant', 'Americana Diner',
            'dish', 'Chicken Alfredo',
            'time', '2024-06-21T02:33:51.934352',
            'caption', 'Not my favorite, but decent.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        'e772c111-dad2-4c9c-bb50-f5230624166c'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'kshawhan@ucsc.edu'),
        json_build_object(
            'image', 'images/baklava/21435.jpg',
            'rating', 5,
            'adds', 0,
            'restaurant', 'Achilles Mediterranean',
            'dish', 'Steak Tartare',
            'time', '2023-11-30T08:00:39.894515',
            'caption', 'This was pretty bad.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        'df41a59c-0692-484a-b6da-c73d3bf41125'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'robert.williams@example.com'),
        json_build_object(
            'image', 'images/apple_pie/98449.jpg',
            'rating', 4,
            'adds', 0,
            'restaurant', 'Food Paradise',
            'dish', 'Sushi Platter',
            'time', '2023-11-26T03:33:51.015418',
            'caption', 'Absolutely delicious!'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '4776aba3-5860-4425-be14-48491f1eb4a5'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'james.smith@example.com'),
        json_build_object(
            'image', 'images/bibimbap/28048.jpg',
            'rating', 4,
            'adds', 0,
            'restaurant', 'New Culinary World',
            'dish', 'Beet Salad',
            'time', '2024-05-09T23:45:43.567088',
            'caption', 'Couldnt recommend this more.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '1913d9e6-fc6c-46b4-812a-d3bc85d9cd46'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'lschram@ucsc.edu'),
        json_build_object(
            'image', 'images/apple_pie/64846.jpg',
            'rating', 1,
            'adds', 0,
            'restaurant', 'Americana Diner',
            'dish', 'Apple Pie',
            'time', '2024-10-30T19:17:56.206961',
            'caption', 'Would highly recommend.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '0596f301-4bc4-4bee-a405-647f72ba981e'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'patricia.brown@example.com'),
        json_build_object(
            'image', 'images/bibimbap/115959.jpg',
            'rating', 5,
            'adds', 0,
            'restaurant', 'New Culinary World',
            'dish', 'Grilled Salmon',
            'time', '2024-01-06T04:54:05.332173',
            'caption', 'A culinary masterpiece!'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '2bd7b9f0-a9e2-44a3-9f68-aa583f07851f'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'james.smith@example.com'),
        json_build_object(
            'image', 'images/apple_pie/101251.jpg',
            'rating', 1,
            'adds', 0,
            'restaurant', 'Dish n Dash',
            'dish', 'Beef Carpaccio',
            'time', '2024-05-21T09:09:20.391709',
            'caption', 'Amazing, would eat again.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '87ceddd1-e6e9-47c7-9084-d7089ca719af'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'nancy.king@example.com'),
        json_build_object(
            'image', 'images/apple_pie/157083.jpg',
            'rating', 4,
            'adds', 0,
            'restaurant', 'Achilles Mediterranean',
            'dish', 'Baklava',
            'time', '2024-07-09T21:41:52.893604',
            'caption', 'Ok, could use more seasoning.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        'a2bccfb5-778b-4a36-a6b6-8a52dc67fc74'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'jennifer.moore@example.com'),
        json_build_object(
            'image', 'images/apple_pie/156078.jpg',
            'rating', 1,
            'adds', 0,
            'restaurant', 'Delicious Dishes',
            'dish', 'Chicken Alfredo',
            'time', '2024-06-20T17:17:35.950224',
            'caption', 'Best food I have ever had.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        'c37e598d-22b7-4c22-8050-b7ed4baa783f'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'kshawhan@ucsc.edu'),
        json_build_object(
            'image', 'images/apple_pie/195087.jpg',
            'rating', 3,
            'adds', 0,
            'restaurant', 'Achilles Mediterranean',
            'dish', 'Grilled Salmon',
            'time', '2024-05-10T21:11:03.452616',
            'caption', 'This was pretty bad.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '0a8be25a-6550-464f-ba2a-1ab67bf42f4c'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'james.smith@example.com'),
        json_build_object(
            'image', 'images/beef_tartare/35446.jpg',
            'rating', 1,
            'adds', 0,
            'restaurant', 'Avanti',
            'dish', 'Vegan Burger',
            'time', '2023-12-27T23:47:18.125729',
            'caption', 'Delicious, compliments to the chef.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '1121b25e-3f4e-4c05-8902-f2a6babda153'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'linda.davis@example.com'),
        json_build_object(
            'image', 'images/baby_back_ribs/16366.jpg',
            'rating', 4,
            'adds', 0,
            'restaurant', 'Taste Buds Delight',
            'dish', 'Baby Back Ribs',
            'time', '2024-09-03T02:20:31.051871',
            'caption', 'Yum!'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        'a8e8d04d-a8ed-487f-9a8c-b8f9a5133d73'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'mary.johnson@example.com'),
        json_build_object(
            'image', 'images/baklava/72326.jpg',
            'rating', 5,
            'adds', 0,
            'restaurant', 'Culinary Haven',
            'dish', 'Baby Back Ribs',
            'time', '2024-05-24T02:14:53.532036',
            'caption', 'This was pretty bad.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        'f65e70b7-5ab1-478d-8cdb-0bf075547790'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'david.taylor@example.com'),
        json_build_object(
            'image', 'images/apple_pie/101251.jpg',
            'rating', 5,
            'adds', 0,
            'restaurant', 'Dish n Dash',
            'dish', 'Chicken Alfredo',
            'time', '2024-06-23T18:58:43.226221',
            'caption', 'Yum!'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '31c0fb67-ac5e-4b40-b690-fe8cbf255948'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'michael.miller@example.com'),
        json_build_object(
            'image', 'images/beef_carpaccio/60660.jpg',
            'rating', 5,
            'adds', 0,
            'restaurant', 'Culinary Haven',
            'dish', 'Beet Salad',
            'time', '2023-11-21T21:21:13.434431',
            'caption', 'Amazing, would eat again.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '73016385-c336-408f-b4ed-c39ad235cc26'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'susan.clark@example.com'),
        json_build_object(
            'image', 'images/apple_pie/116697.jpg',
            'rating', 3,
            'adds', 0,
            'restaurant', 'Avanti',
            'dish', 'Chicken Alfredo',
            'time', '2024-10-25T16:13:59.066327',
            'caption', 'Would highly recommend.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '57190eb6-d8d2-47c5-8d78-89f4f71f0d35'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'michael.miller@example.com'),
        json_build_object(
            'image', 'images/apple_pie/118237.jpg',
            'rating', 2,
            'adds', 0,
            'restaurant', 'Zankou Chicken',
            'dish', 'Beignets',
            'time', '2024-03-17T11:15:53.262749',
            'caption', 'Mid.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '7c424400-422e-4371-9fe4-2dfdfe08833e'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'jennifer.moore@example.com'),
        json_build_object(
            'image', 'images/bibimbap/149817.jpg',
            'rating', 4,
            'adds', 0,
            'restaurant', 'Florentine Trattoria',
            'dish', 'Beignets',
            'time', '2024-09-01T03:45:55.948368',
            'caption', 'Not my favorite, but decent.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        'dc12d875-e4eb-4c1d-9e5d-bdbc3271eeeb'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'sarah.allen@example.com'),
        json_build_object(
            'image', 'images/bibimbap/115959.jpg',
            'rating', 4,
            'adds', 0,
            'restaurant', 'Food Paradise',
            'dish', 'Bibimbap',
            'time', '2024-02-29T04:21:57.504069',
            'caption', 'Not my favorite, but decent.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '07064ac0-72fa-4e02-a888-d0a85798835b'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'jennifer.moore@example.com'),
        json_build_object(
            'image', 'images/apple_pie/112378.jpg',
            'rating', 5,
            'adds', 0,
            'restaurant', 'Avanti',
            'dish', 'Steak Tartare',
            'time', '2023-11-24T17:08:46.351931',
            'caption', 'I am never coming here ever again.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '4daf3490-4d51-4a9e-b184-36d42f447df2'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'thomas.hall@example.com'),
        json_build_object(
            'image', 'images/baklava/29744.jpg',
            'rating', 1,
            'adds', 0,
            'restaurant', 'Taste Buds Delight',
            'dish', 'Beignets',
            'time', '2024-09-16T04:15:39.235168',
            'caption', 'Ok, could use more seasoning.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        'd12d1d0b-1628-492a-8e1b-46cd22ae15b5'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'nancy.king@example.com'),
        json_build_object(
            'image', 'images/baklava/50627.jpg',
            'rating', 3,
            'adds', 0,
            'restaurant', 'Zankou Chicken',
            'dish', 'Beet Salad',
            'time', '2024-04-10T11:17:01.904147',
            'caption', 'Couldnt recommend this more.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '33bcc3b2-c271-4b61-9ce8-e7e25410b664'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'christopher.young@example.com'),
        json_build_object(
            'image', 'images/apple_pie/128259.jpg',
            'rating', 2,
            'adds', 0,
            'restaurant', 'Zankou Chicken',
            'dish', 'Beef Carpaccio',
            'time', '2024-10-06T10:33:07.564226',
            'caption', 'I am never coming here ever again.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '4c739a7a-193f-4c4c-bed4-66e2328049d9'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'david.taylor@example.com'),
        json_build_object(
            'image', 'images/beef_tartare/33502.jpg',
            'rating', 2,
            'adds', 0,
            'restaurant', 'Delicious Dishes',
            'dish', 'Vegan Burger',
            'time', '2024-06-02T09:32:05.938290',
            'caption', 'A culinary masterpiece!'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        'f724c445-e135-45da-beba-69df14cbdb64'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'michael.miller@example.com'),
        json_build_object(
            'image', 'images/baklava/72326.jpg',
            'rating', 2,
            'adds', 0,
            'restaurant', 'Achilles Mediterranean',
            'dish', 'Beignets',
            'time', '2024-11-14T14:40:49.029145',
            'caption', 'Best food I have ever had.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        'd84b7325-6ae4-4bf1-ad5d-470c74eac1b2'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'sarah.allen@example.com'),
        json_build_object(
            'image', 'images/apple_pie/89035.jpg',
            'rating', 5,
            'adds', 0,
            'restaurant', 'Avanti',
            'dish', 'Sushi Platter',
            'time', '2024-01-24T07:14:53.392458',
            'caption', 'A culinary masterpiece!'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '1377634f-dbfe-4a79-a2d3-a1d629d4f46c'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'elizabeth.thomas@example.com'),
        json_build_object(
            'image', 'images/beef_tartare/39168.jpg',
            'rating', 2,
            'adds', 0,
            'restaurant', 'New Culinary World',
            'dish', 'Sushi Platter',
            'time', '2024-05-13T07:36:35.583559',
            'caption', 'Ok, could use more seasoning.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '51403b31-5f9b-4c78-8e3f-0305a874e1e0'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'david.taylor@example.com'),
        json_build_object(
            'image', 'images/beef_carpaccio/19705.jpg',
            'rating', 5,
            'adds', 0,
            'restaurant', 'Achilles Mediterranean',
            'dish', 'Vegan Burger',
            'time', '2024-07-13T20:37:13.055781',
            'caption', 'I am never coming here ever again.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        'e3ccffa1-557c-4935-bad2-75b283071789'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'james.smith@example.com'),
        json_build_object(
            'image', 'images/beef_tartare/2896.jpg',
            'rating', 5,
            'adds', 0,
            'restaurant', 'Avanti',
            'dish', 'Steak Tartare',
            'time', '2024-06-27T19:10:22.279698',
            'caption', 'Ok, could use more seasoning.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        'e579798b-c6b2-4f98-ac1a-07d43b40e399'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'michael.miller@example.com'),
        json_build_object(
            'image', 'images/baby_back_ribs/65686.jpg',
            'rating', 4,
            'adds', 0,
            'restaurant', 'Dish n Dash',
            'dish', 'Beef Carpaccio',
            'time', '2024-10-26T03:24:35.466239',
            'caption', 'Not my favorite, but decent.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '0d664d73-a3ff-4e71-82c4-a39d4ab47c10'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'john.jones@example.com'),
        json_build_object(
            'image', 'images/beet_salad/3685.jpg',
            'rating', 4,
            'adds', 0,
            'restaurant', 'New Culinary World',
            'dish', 'Sushi Platter',
            'time', '2024-06-09T04:32:57.154077',
            'caption', 'A culinary masterpiece!'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '979c6624-c33b-4847-8837-b7882bdf2f0d'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'james.smith@example.com'),
        json_build_object(
            'image', 'images/bibimbap/28048.jpg',
            'rating', 5,
            'adds', 0,
            'restaurant', 'Achilles Mediterranean',
            'dish', 'Steak Tartare',
            'time', '2024-01-18T03:36:06.873701',
            'caption', 'I am never coming here ever again.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '8be352ef-fb4f-4088-88bc-686cf4853410'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'mary.johnson@example.com'),
        json_build_object(
            'image', 'images/apple_pie/175848.jpg',
            'rating', 5,
            'adds', 0,
            'restaurant', 'Florentine Trattoria',
            'dish', 'Steak Tartare',
            'time', '2024-11-06T14:18:30.811048',
            'caption', 'Absolutely delicious!'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '22873fa4-78a3-40c6-8d34-edfa5f12b8e1'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'robert.williams@example.com'),
        json_build_object(
            'image', 'images/beet_salad/3685.jpg',
            'rating', 3,
            'adds', 0,
            'restaurant', 'Americana Diner',
            'dish', 'Grilled Salmon',
            'time', '2024-08-25T15:42:00.544477',
            'caption', 'Ok, could use more seasoning.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        'cdfdb794-cbfb-4329-8304-c20986cae576'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'jennifer.moore@example.com'),
        json_build_object(
            'image', 'images/beignets/8028.jpg',
            'rating', 1,
            'adds', 0,
            'restaurant', 'The Gourmet Kitchen',
            'dish', 'Beignets',
            'time', '2024-09-20T19:50:46.781144',
            'caption', 'Couldnt recommend this more.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        'a51cac9a-36ae-4ffb-93f2-7c27dd95bdb6'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'john.jones@example.com'),
        json_build_object(
            'image', 'images/baby_back_ribs/37492.jpg',
            'rating', 3,
            'adds', 0,
            'restaurant', 'Delicious Dishes',
            'dish', 'Sushi Platter',
            'time', '2024-07-05T07:56:03.304382',
            'caption', 'Ok, could use more seasoning.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '5f1c30f5-5f42-4e35-9da0-5bf42c8c1e1f'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'william.anderson@example.com'),
        json_build_object(
            'image', 'images/bibimbap/29190.jpg',
            'rating', 4,
            'adds', 0,
            'restaurant', 'Achilles Mediterranean',
            'dish', 'Steak Tartare',
            'time', '2024-10-10T11:48:08.316395',
            'caption', 'A culinary masterpiece!'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '0e228c98-6396-4c65-91b9-feda10e5ffb0'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'sarah.allen@example.com'),
        json_build_object(
            'image', 'images/beef_carpaccio/11466.jpg',
            'rating', 4,
            'adds', 0,
            'restaurant', 'Avanti',
            'dish', 'Beef Carpaccio',
            'time', '2024-07-29T17:57:02.366898',
            'caption', 'A culinary masterpiece!'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '62e6747b-66f9-4403-ae08-c91027bdcbed'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'barbara.wilson@example.com'),
        json_build_object(
            'image', 'images/beet_salad/53.jpg',
            'rating', 4,
            'adds', 0,
            'restaurant', 'Florentine Trattoria',
            'dish', 'Baby Back Ribs',
            'time', '2024-05-07T19:00:42.655754',
            'caption', 'Couldnt recommend this more.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '07f9fe7d-a915-4147-9cd8-5deb830ae618'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'william.anderson@example.com'),
        json_build_object(
            'image', 'images/bibimbap/32126.jpg',
            'rating', 2,
            'adds', 0,
            'restaurant', 'Americana Diner',
            'dish', 'Apple Pie',
            'time', '2024-05-02T14:57:16.469093',
            'caption', 'Amazing, would eat again.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        'eaa85a07-40a4-4477-8e62-3b4cd56485a5'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'richard.lee@example.com'),
        json_build_object(
            'image', 'images/beef_tartare/6149.jpg',
            'rating', 3,
            'adds', 0,
            'restaurant', 'New Culinary World',
            'dish', 'Beef Carpaccio',
            'time', '2024-10-02T01:39:38.749878',
            'caption', 'Not my favorite, but decent.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '6847a779-7bec-4b9a-82f8-7c427f6ac22a'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'jennifer.moore@example.com'),
        json_build_object(
            'image', 'images/baby_back_ribs/2432.jpg',
            'rating', 4,
            'adds', 0,
            'restaurant', 'Achilles Mediterranean',
            'dish', 'Baklava',
            'time', '2024-06-16T07:16:35.021314',
            'caption', 'Best food I have ever had.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        'e77f0f3e-1651-490a-a392-8103943619de'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'richard.lee@example.com'),
        json_build_object(
            'image', 'images/apple_pie/23893.jpg',
            'rating', 3,
            'adds', 0,
            'restaurant', 'Food Paradise',
            'dish', 'Grilled Salmon',
            'time', '2024-03-11T20:50:11.236554',
            'caption', 'I am never coming here ever again.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        'dc467917-46cd-48b6-8743-1de12611a4b3'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'nancy.king@example.com'),
        json_build_object(
            'image', 'images/bibimbap/152957.jpg',
            'rating', 2,
            'adds', 0,
            'restaurant', 'Culinary Haven',
            'dish', 'Beef Carpaccio',
            'time', '2024-10-25T09:49:25.103896',
            'caption', 'Would highly recommend.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        'e9496372-2b39-40e6-8063-fb058b4ec067'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'barbara.wilson@example.com'),
        json_build_object(
            'image', 'images/beignets/11464.jpg',
            'rating', 2,
            'adds', 0,
            'restaurant', 'Florentine Trattoria',
            'dish', 'Bibimbap',
            'time', '2024-01-23T16:03:36.368800',
            'caption', 'This was pretty bad.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '2ad01c1a-2ac7-4c26-968f-72567046f79d'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'barbara.wilson@example.com'),
        json_build_object(
            'image', 'images/beef_carpaccio/19705.jpg',
            'rating', 1,
            'adds', 0,
            'restaurant', 'The Gourmet Kitchen',
            'dish', 'Beet Salad',
            'time', '2024-08-02T05:48:42.620669',
            'caption', 'Mid.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        'f2fbab68-7ce5-4205-9dcd-3644c907a894'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'jennifer.moore@example.com'),
        json_build_object(
            'image', 'images/beef_carpaccio/11466.jpg',
            'rating', 5,
            'adds', 0,
            'restaurant', 'New Culinary World',
            'dish', 'Apple Pie',
            'time', '2024-02-09T04:48:42.185854',
            'caption', 'A culinary masterpiece!'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        'dd9f8ed9-c3de-42da-9d84-36c1509f45b3'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'david.taylor@example.com'),
        json_build_object(
            'image', 'images/baby_back_ribs/16366.jpg',
            'rating', 3,
            'adds', 0,
            'restaurant', 'Americana Diner',
            'dish', 'Grilled Salmon',
            'time', '2024-06-05T14:31:05.653102',
            'caption', 'Would highly recommend.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '3ab729d3-56dd-4090-9ff9-ac40059ff097'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'barbara.wilson@example.com'),
        json_build_object(
            'image', 'images/apple_pie/83981.jpg',
            'rating', 1,
            'adds', 0,
            'restaurant', 'Taste Buds Delight',
            'dish', 'Bibimbap',
            'time', '2024-07-26T01:25:31.810757',
            'caption', 'This was pretty bad.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '1d34eb5f-77f6-4555-8df3-7e970d29e906'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'lschram@ucsc.edu'),
        json_build_object(
            'image', 'images/apple_pie/80734.jpg',
            'rating', 3,
            'adds', 0,
            'restaurant', 'The Gourmet Kitchen',
            'dish', 'Sushi Platter',
            'time', '2024-05-19T15:00:29.932874',
            'caption', 'Couldnt recommend this more.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '9c9ae696-e9a5-45a9-9c86-c82cfcbaa06d'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'barbara.wilson@example.com'),
        json_build_object(
            'image', 'images/apple_pie/185537.jpg',
            'rating', 2,
            'adds', 0,
            'restaurant', 'Delicious Dishes',
            'dish', 'Bibimbap',
            'time', '2024-05-11T16:27:21.235641',
            'caption', 'Not my favorite, but decent.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '17b76d96-9384-4fbe-9b6f-4cc850c9c64c'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'jennifer.moore@example.com'),
        json_build_object(
            'image', 'images/beet_salad/16364.jpg',
            'rating', 1,
            'adds', 0,
            'restaurant', 'Delicious Dishes',
            'dish', 'Spaghetti Bolognese',
            'time', '2024-09-09T03:23:10.281834',
            'caption', 'Would highly recommend.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '0570d2d6-8982-424f-a244-bcc917eccae0'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'susan.clark@example.com'),
        json_build_object(
            'image', 'images/beet_salad/15302.jpg',
            'rating', 2,
            'adds', 0,
            'restaurant', 'Americana Diner',
            'dish', 'Vegan Burger',
            'time', '2024-05-15T10:47:22.058676',
            'caption', 'Could be better.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '9dc25f09-742a-4401-815a-8e9da40a33c6'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'nancy.king@example.com'),
        json_build_object(
            'image', 'images/baklava/67320.jpg',
            'rating', 4,
            'adds', 0,
            'restaurant', 'Florentine Trattoria',
            'dish', 'Bibimbap',
            'time', '2024-05-12T04:34:45.949932',
            'caption', 'Couldnt recommend this more.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        'a0e6f652-b7c4-47d8-b88e-2a36111bf0c3'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'joseph.lewis@example.com'),
        json_build_object(
            'image', 'images/apple_pie/38795.jpg',
            'rating', 5,
            'adds', 0,
            'restaurant', 'Avanti',
            'dish', 'Baby Back Ribs',
            'time', '2024-02-06T15:53:02.553365',
            'caption', 'Amazing, would eat again.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        'fe41c54f-e43d-498e-b3a9-af5b546c94ef'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'christopher.young@example.com'),
        json_build_object(
            'image', 'images/bibimbap/19793.jpg',
            'rating', 5,
            'adds', 0,
            'restaurant', 'Avanti',
            'dish', 'Beef Carpaccio',
            'time', '2024-06-28T11:42:31.471095',
            'caption', 'A culinary masterpiece!'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        'edc2bd36-8983-49c4-8a14-aa9e55088840'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'kshawhan@ucsc.edu'),
        json_build_object(
            'image', 'images/apple_pie/182745.jpg',
            'rating', 4,
            'adds', 0,
            'restaurant', 'Food Paradise',
            'dish', 'Beignets',
            'time', '2024-10-29T11:15:04.944751',
            'caption', 'Not my favorite, but decent.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '959b9db0-c8a7-43b2-92ad-268e00a8a2e8'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'william.anderson@example.com'),
        json_build_object(
            'image', 'images/beignets/26379.jpg',
            'rating', 2,
            'adds', 0,
            'restaurant', 'Dish n Dash',
            'dish', 'Grilled Salmon',
            'time', '2024-08-30T15:04:07.960071',
            'caption', 'Amazing, would eat again.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '18d89677-c5e6-444a-87fe-a6812d0c45e3'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'joseph.lewis@example.com'),
        json_build_object(
            'image', 'images/apple_pie/142332.jpg',
            'rating', 2,
            'adds', 0,
            'restaurant', 'Achilles Mediterranean',
            'dish', 'Sushi Platter',
            'time', '2024-07-17T04:02:06.092775',
            'caption', 'Amazing, would eat again.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        'a671a089-291f-427b-9392-969fde3f5bb5'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'linda.davis@example.com'),
        json_build_object(
            'image', 'images/apple_pie/116697.jpg',
            'rating', 4,
            'adds', 0,
            'restaurant', 'The Gourmet Kitchen',
            'dish', 'Chicken Alfredo',
            'time', '2024-08-15T07:57:09.189951',
            'caption', 'Mid.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '2466d4ec-5018-4c62-829c-c405b0672ff9'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'barbara.wilson@example.com'),
        json_build_object(
            'image', 'images/beignets/8028.jpg',
            'rating', 4,
            'adds', 0,
            'restaurant', 'Dish n Dash',
            'dish', 'Vegan Burger',
            'time', '2024-04-16T13:02:34.647078',
            'caption', 'Amazing, would eat again.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '3a6f6277-6a39-48a6-9a38-4bf937cd9743'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'thomas.hall@example.com'),
        json_build_object(
            'image', 'images/apple_pie/134.jpg',
            'rating', 4,
            'adds', 0,
            'restaurant', 'Florentine Trattoria',
            'dish', 'Chicken Alfredo',
            'time', '2024-05-27T07:18:52.299313',
            'caption', 'This was pretty bad.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '324a2ae4-fd15-4edb-ae49-ed25c0a2e70f'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'linda.davis@example.com'),
        json_build_object(
            'image', 'images/beet_salad/3685.jpg',
            'rating', 5,
            'adds', 0,
            'restaurant', 'Florentine Trattoria',
            'dish', 'Spaghetti Bolognese',
            'time', '2024-07-21T11:57:36.650276',
            'caption', 'Would highly recommend.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '87f17d4f-a9be-474c-9759-473ff404a61a'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'sarah.allen@example.com'),
        json_build_object(
            'image', 'images/apple_pie/142332.jpg',
            'rating', 2,
            'adds', 0,
            'restaurant', 'Americana Diner',
            'dish', 'Bibimbap',
            'time', '2024-08-26T00:38:27.176238',
            'caption', 'A culinary masterpiece!'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '7f740aee-746b-44c5-8949-77ab1dfd2fe1'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'karen.walker@example.com'),
        json_build_object(
            'image', 'images/apple_pie/182745.jpg',
            'rating', 3,
            'adds', 0,
            'restaurant', 'Culinary Haven',
            'dish', 'Apple Pie',
            'time', '2024-09-12T10:17:16.321077',
            'caption', 'Best food I have ever had.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        'f93a2906-bdc4-4618-bbf2-c40986109083'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'barbara.wilson@example.com'),
        json_build_object(
            'image', 'images/beignets/26379.jpg',
            'rating', 4,
            'adds', 0,
            'restaurant', 'Taste Buds Delight',
            'dish', 'Bibimbap',
            'time', '2023-12-06T23:29:49.063017',
            'caption', 'Amazing, would eat again.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '332c68c6-e8bc-42d5-b782-2139b7f942ab'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'david.taylor@example.com'),
        json_build_object(
            'image', 'images/beet_salad/3685.jpg',
            'rating', 5,
            'adds', 0,
            'restaurant', 'The Gourmet Kitchen',
            'dish', 'Steak Tartare',
            'time', '2023-11-23T02:19:58.610153',
            'caption', 'I am never coming here ever again.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        'c25cfaa8-cb63-45f5-b040-f5c3d2a1af0d'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'linda.davis@example.com'),
        json_build_object(
            'image', 'images/beef_carpaccio/3400.jpg',
            'rating', 5,
            'adds', 0,
            'restaurant', 'Dish n Dash',
            'dish', 'Steak Tartare',
            'time', '2024-02-12T06:34:37.311468',
            'caption', 'Would highly recommend.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        'bb8e3fd4-42b6-4803-b02a-73e444709e38'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'mary.johnson@example.com'),
        json_build_object(
            'image', 'images/beignets/14824.jpg',
            'rating', 2,
            'adds', 0,
            'restaurant', 'Florentine Trattoria',
            'dish', 'Beet Salad',
            'time', '2024-03-25T15:39:52.070062',
            'caption', 'Couldnt recommend this more.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '71176a5c-df07-4af7-a6bc-7bd319d470b0'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'david.taylor@example.com'),
        json_build_object(
            'image', 'images/bibimbap/28048.jpg',
            'rating', 4,
            'adds', 0,
            'restaurant', 'Taste Buds Delight',
            'dish', 'Vegan Burger',
            'time', '2024-09-19T06:40:02.122670',
            'caption', 'Absolutely delicious!'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        'eba7eded-1efb-4a37-b2ef-caffc81d954f'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'thomas.hall@example.com'),
        json_build_object(
            'image', 'images/beef_tartare/39858.jpg',
            'rating', 5,
            'adds', 0,
            'restaurant', 'Achilles Mediterranean',
            'dish', 'Apple Pie',
            'time', '2024-09-11T23:16:28.247690',
            'caption', 'Delicious, compliments to the chef.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        'f1cd2c19-649a-4bf1-a1bc-171b8452d3fa'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'christopher.young@example.com'),
        json_build_object(
            'image', 'images/beignets/5159.jpg',
            'rating', 5,
            'adds', 0,
            'restaurant', 'Culinary Haven',
            'dish', 'Apple Pie',
            'time', '2024-02-24T18:04:06.148172',
            'caption', 'Ok, could use more seasoning.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '4dc3c511-ebd7-4458-bc51-4f4c57d5e491'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'nancy.king@example.com'),
        json_build_object(
            'image', 'images/baby_back_ribs/79780.jpg',
            'rating', 3,
            'adds', 0,
            'restaurant', 'Dish n Dash',
            'dish', 'Beef Carpaccio',
            'time', '2024-09-20T17:14:10.369341',
            'caption', 'A culinary masterpiece!'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        'e5342045-68d1-444b-8a83-41b18757fb04'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'christopher.young@example.com'),
        json_build_object(
            'image', 'images/baklava/29744.jpg',
            'rating', 3,
            'adds', 0,
            'restaurant', 'Florentine Trattoria',
            'dish', 'Spaghetti Bolognese',
            'time', '2024-04-09T06:23:06.474070',
            'caption', 'Could be better.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        'c7813582-d94d-4a5d-8b97-d11a4a06f69a'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'christopher.young@example.com'),
        json_build_object(
            'image', 'images/apple_pie/112378.jpg',
            'rating', 5,
            'adds', 0,
            'restaurant', 'Dish n Dash',
            'dish', 'Beet Salad',
            'time', '2024-02-13T05:44:21.333402',
            'caption', 'Yum!'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '1dbf48de-823e-44b8-b25d-8724bce00087'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'barbara.wilson@example.com'),
        json_build_object(
            'image', 'images/baklava/50627.jpg',
            'rating', 3,
            'adds', 0,
            'restaurant', 'Zankou Chicken',
            'dish', 'Spaghetti Bolognese',
            'time', '2024-03-08T02:19:02.089233',
            'caption', 'Delicious, compliments to the chef.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '36693ef2-0f14-463d-9930-bcdabfb002e0'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'elizabeth.thomas@example.com'),
        json_build_object(
            'image', 'images/baklava/21435.jpg',
            'rating', 3,
            'adds', 0,
            'restaurant', 'Taste Buds Delight',
            'dish', 'Beignets',
            'time', '2024-08-02T05:46:27.962179',
            'caption', 'A culinary masterpiece!'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '82e5dbeb-75b0-44d9-bb8f-8707f7b10c7c'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'william.anderson@example.com'),
        json_build_object(
            'image', 'images/baby_back_ribs/79780.jpg',
            'rating', 3,
            'adds', 0,
            'restaurant', 'The Gourmet Kitchen',
            'dish', 'Bibimbap',
            'time', '2024-09-13T21:42:29.430782',
            'caption', 'Couldnt recommend this more.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '092cd952-2073-4fc7-a901-8bbd60e208ce'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'barbara.wilson@example.com'),
        json_build_object(
            'image', 'images/apple_pie/80735.jpg',
            'rating', 1,
            'adds', 0,
            'restaurant', 'Food Paradise',
            'dish', 'Vegan Burger',
            'time', '2024-08-12T01:05:18.182031',
            'caption', 'Not my favorite, but decent.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '8e3f38f8-d54e-47e4-adb5-c3865c1b8b11'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'elizabeth.thomas@example.com'),
        json_build_object(
            'image', 'images/baby_back_ribs/78713.jpg',
            'rating', 2,
            'adds', 0,
            'restaurant', 'Culinary Haven',
            'dish', 'Baby Back Ribs',
            'time', '2024-11-04T09:38:41.449283',
            'caption', 'Would highly recommend.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '0f01e1e1-aa52-4543-8139-d5da91135606'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'karen.walker@example.com'),
        json_build_object(
            'image', 'images/baklava/788.jpg',
            'rating', 3,
            'adds', 0,
            'restaurant', 'Florentine Trattoria',
            'dish', 'Apple Pie',
            'time', '2024-05-21T22:50:15.016635',
            'caption', 'Couldnt recommend this more.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        'a224dff9-f449-4313-bf90-0663e8b9bcb8'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'christopher.young@example.com'),
        json_build_object(
            'image', 'images/beignets/26379.jpg',
            'rating', 2,
            'adds', 0,
            'restaurant', 'Taste Buds Delight',
            'dish', 'Sushi Platter',
            'time', '2024-07-16T11:39:56.122955',
            'caption', 'Yum!'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '40bab484-a95f-4866-a945-39ee49ee53cb'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'mary.johnson@example.com'),
        json_build_object(
            'image', 'images/beet_salad/16364.jpg',
            'rating', 1,
            'adds', 0,
            'restaurant', 'Taste Buds Delight',
            'dish', 'Steak Tartare',
            'time', '2024-06-12T17:35:41.459801',
            'caption', 'A culinary masterpiece!'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '0a629a3c-daf0-43b8-8bea-b7203486bdd2'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'kshawhan@ucsc.edu'),
        json_build_object(
            'image', 'images/bibimbap/23101.jpg',
            'rating', 4,
            'adds', 0,
            'restaurant', 'Food Paradise',
            'dish', 'Sushi Platter',
            'time', '2023-12-11T15:08:27.155798',
            'caption', 'Could be better.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '071bd9f9-08be-4ade-ada4-3b44d510deb2'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'john.jones@example.com'),
        json_build_object(
            'image', 'images/beignets/35253.jpg',
            'rating', 3,
            'adds', 0,
            'restaurant', 'Americana Diner',
            'dish', 'Grilled Salmon',
            'time', '2023-12-20T07:22:03.904963',
            'caption', 'Mid.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '181cf0ba-dfc9-4c4e-81aa-10e6349bf71f'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'lschram@ucsc.edu'),
        json_build_object(
            'image', 'images/beignets/901.jpg',
            'rating', 3,
            'adds', 0,
            'restaurant', 'Achilles Mediterranean',
            'dish', 'Baklava',
            'time', '2023-11-28T20:18:29.729854',
            'caption', 'Ok, could use more seasoning.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '85ba13ff-0a96-4478-9d31-947539d74f77'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'david.taylor@example.com'),
        json_build_object(
            'image', 'images/beet_salad/21925.jpg',
            'rating', 4,
            'adds', 0,
            'restaurant', 'Taste Buds Delight',
            'dish', 'Baby Back Ribs',
            'time', '2024-01-22T15:30:18.463614',
            'caption', 'Absolutely delicious!'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        '3756792d-6fb4-4ff2-8671-7a27c5118c5e'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'john.jones@example.com'),
        json_build_object(
            'image', 'images/baby_back_ribs/53898.jpg',
            'rating', 3,
            'adds', 0,
            'restaurant', 'Florentine Trattoria',
            'dish', 'Vegan Burger',
            'time', '2024-10-30T09:49:48.633432',
            'caption', 'A culinary masterpiece!'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        'b6c539f8-9bf9-43d1-861a-72f4ca4da820'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'michael.miller@example.com'),
        json_build_object(
            'image', 'images/beignets/38080.jpg',
            'rating', 2,
            'adds', 0,
            'restaurant', 'Culinary Haven',
            'dish', 'Baby Back Ribs',
            'time', '2024-09-05T13:46:15.805769',
            'caption', 'I am never coming here ever again.'
        );
INSERT INTO post (id, user_id, data)
    SELECT
        'fd90bf16-7daa-41f1-a821-c2be9d5e0469'::uuid,
        (SELECT id FROM app_user WHERE data->>'email' = 'joseph.lewis@example.com'),
        json_build_object(
            'image', 'images/baby_back_ribs/7557.jpg',
            'rating', 1,
            'adds', 0,
            'restaurant', 'Achilles Mediterranean',
            'dish', 'Beet Salad',
            'time', '2024-02-12T17:30:24.175420',
            'caption', 'Ok, could use more seasoning.'
        );

-- followers

INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'lschram@ucsc.edu'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'karen.walker@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'lschram@ucsc.edu'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'thomas.hall@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'lschram@ucsc.edu'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'william.anderson@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'lschram@ucsc.edu'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'james.smith@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'lschram@ucsc.edu'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'mary.johnson@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'lschram@ucsc.edu'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'michael.miller@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'lschram@ucsc.edu'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'elizabeth.thomas@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'lschram@ucsc.edu'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'nancy.king@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'james.smith@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'robert.williams@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'james.smith@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'jennifer.moore@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'james.smith@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'richard.lee@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'james.smith@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'sarah.allen@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'mary.johnson@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'patricia.brown@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'mary.johnson@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'linda.davis@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'mary.johnson@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'lschram@ucsc.edu')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'mary.johnson@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'thomas.hall@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'mary.johnson@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'susan.clark@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'robert.williams@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'patricia.brown@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'robert.williams@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'christopher.young@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'robert.williams@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'lschram@ucsc.edu')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'robert.williams@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'linda.davis@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'robert.williams@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'michael.miller@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'robert.williams@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'barbara.wilson@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'robert.williams@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'richard.lee@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'patricia.brown@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'james.smith@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'patricia.brown@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'christopher.young@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'patricia.brown@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'david.taylor@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'john.jones@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'patricia.brown@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'john.jones@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'elizabeth.thomas@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'john.jones@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'joseph.lewis@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'john.jones@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'nancy.king@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'john.jones@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'lschram@ucsc.edu')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'john.jones@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'james.smith@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'john.jones@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'karen.walker@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'linda.davis@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'james.smith@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'linda.davis@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'william.anderson@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'linda.davis@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'nancy.king@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'linda.davis@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'john.jones@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'linda.davis@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'david.taylor@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'linda.davis@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'mary.johnson@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'michael.miller@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'mary.johnson@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'michael.miller@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'jennifer.moore@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'michael.miller@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'susan.clark@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'michael.miller@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'david.taylor@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'michael.miller@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'joseph.lewis@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'michael.miller@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'john.jones@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'barbara.wilson@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'thomas.hall@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'barbara.wilson@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'james.smith@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'barbara.wilson@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'nancy.king@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'barbara.wilson@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'richard.lee@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'barbara.wilson@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'jennifer.moore@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'barbara.wilson@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'sarah.allen@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'william.anderson@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'linda.davis@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'william.anderson@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'joseph.lewis@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'william.anderson@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'susan.clark@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'william.anderson@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'nancy.king@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'william.anderson@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'karen.walker@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'william.anderson@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'lschram@ucsc.edu')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'william.anderson@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'elizabeth.thomas@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'william.anderson@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'david.taylor@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'elizabeth.thomas@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'richard.lee@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'elizabeth.thomas@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'joseph.lewis@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'elizabeth.thomas@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'john.jones@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'elizabeth.thomas@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'thomas.hall@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'elizabeth.thomas@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'barbara.wilson@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'elizabeth.thomas@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'robert.williams@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'david.taylor@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'richard.lee@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'david.taylor@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'lschram@ucsc.edu')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'david.taylor@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'michael.miller@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'david.taylor@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'james.smith@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'david.taylor@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'jennifer.moore@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'david.taylor@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'william.anderson@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'david.taylor@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'sarah.allen@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'jennifer.moore@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'karen.walker@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'jennifer.moore@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'sarah.allen@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'jennifer.moore@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'thomas.hall@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'richard.lee@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'james.smith@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'richard.lee@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'jennifer.moore@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'richard.lee@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'barbara.wilson@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'richard.lee@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'thomas.hall@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'richard.lee@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'michael.miller@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'susan.clark@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'robert.williams@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'susan.clark@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'barbara.wilson@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'susan.clark@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'lschram@ucsc.edu')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'joseph.lewis@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'linda.davis@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'joseph.lewis@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'richard.lee@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'joseph.lewis@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'robert.williams@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'joseph.lewis@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'elizabeth.thomas@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'joseph.lewis@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'mary.johnson@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'karen.walker@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'linda.davis@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'karen.walker@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'david.taylor@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'karen.walker@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'jennifer.moore@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'karen.walker@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'elizabeth.thomas@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'karen.walker@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'robert.williams@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'karen.walker@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'lschram@ucsc.edu')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'thomas.hall@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'richard.lee@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'thomas.hall@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'nancy.king@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'thomas.hall@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'william.anderson@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'thomas.hall@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'karen.walker@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'sarah.allen@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'richard.lee@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'sarah.allen@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'elizabeth.thomas@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'sarah.allen@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'patricia.brown@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'sarah.allen@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'karen.walker@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'sarah.allen@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'joseph.lewis@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'sarah.allen@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'lschram@ucsc.edu')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'christopher.young@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'elizabeth.thomas@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'christopher.young@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'michael.miller@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'christopher.young@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'nancy.king@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'christopher.young@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'david.taylor@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'christopher.young@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'mary.johnson@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'christopher.young@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'james.smith@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'christopher.young@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'linda.davis@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'christopher.young@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'barbara.wilson@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'nancy.king@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'barbara.wilson@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'nancy.king@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'thomas.hall@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'nancy.king@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'richard.lee@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'nancy.king@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'robert.williams@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'nancy.king@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'patricia.brown@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'nancy.king@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'john.jones@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'nancy.king@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'michael.miller@example.com')
                );
INSERT INTO follow (sender, receiver) VALUES
                (
                    (SELECT id FROM app_user WHERE data->>'email' = 'nancy.king@example.com'),
                    (SELECT id FROM app_user WHERE data->>'email' = 'mary.johnson@example.com')
                );

-- likes
INSERT INTO likes (post_id, user_id) VALUES
    ('dc467917-46cd-48b6-8743-1de12611a4b3'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('2466d4ec-5018-4c62-829c-c405b0672ff9'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('a51cac9a-36ae-4ffb-93f2-7c27dd95bdb6'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('36693ef2-0f14-463d-9930-bcdabfb002e0'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('0f01e1e1-aa52-4543-8139-d5da91135606'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('a2bccfb5-778b-4a36-a6b6-8a52dc67fc74'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('eaa85a07-40a4-4477-8e62-3b4cd56485a5'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('51403b31-5f9b-4c78-8e3f-0305a874e1e0'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('85ba13ff-0a96-4478-9d31-947539d74f77'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('324a2ae4-fd15-4edb-ae49-ed25c0a2e70f'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('b2b0ae42-5bb2-481d-a5e7-e74e11890de5'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('c7813582-d94d-4a5d-8b97-d11a4a06f69a'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('9c9ae696-e9a5-45a9-9c86-c82cfcbaa06d'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('a224dff9-f449-4313-bf90-0663e8b9bcb8'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('bb8e3fd4-42b6-4803-b02a-73e444709e38'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('f2fbab68-7ce5-4205-9dcd-3644c907a894'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('0e228c98-6396-4c65-91b9-feda10e5ffb0'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('dc12d875-e4eb-4c1d-9e5d-bdbc3271eeeb'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('8be352ef-fb4f-4088-88bc-686cf4853410'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('332c68c6-e8bc-42d5-b782-2139b7f942ab'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('e5342045-68d1-444b-8a83-41b18757fb04'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('4c739a7a-193f-4c4c-bed4-66e2328049d9'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('6847a779-7bec-4b9a-82f8-7c427f6ac22a'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('7c424400-422e-4371-9fe4-2dfdfe08833e'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('9dc25f09-742a-4401-815a-8e9da40a33c6'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('73016385-c336-408f-b4ed-c39ad235cc26'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('07064ac0-72fa-4e02-a888-d0a85798835b'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('0570d2d6-8982-424f-a244-bcc917eccae0'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('142f5c6a-8560-4ce5-b93e-e868be6de759'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('e3ccffa1-557c-4935-bad2-75b283071789'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('3ab729d3-56dd-4090-9ff9-ac40059ff097'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('1377634f-dbfe-4a79-a2d3-a1d629d4f46c'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('979c6624-c33b-4847-8837-b7882bdf2f0d'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('df41a59c-0692-484a-b6da-c73d3bf41125'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('fd90bf16-7daa-41f1-a821-c2be9d5e0469'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('e772c111-dad2-4c9c-bb50-f5230624166c'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('7f740aee-746b-44c5-8949-77ab1dfd2fe1'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('edc2bd36-8983-49c4-8a14-aa9e55088840'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('2bd7b9f0-a9e2-44a3-9f68-aa583f07851f'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('8e3f38f8-d54e-47e4-adb5-c3865c1b8b11'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('20239a0e-8c5f-4b06-9b5a-5012eb108aee'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('4f6fc5ff-58bb-4457-858a-7f57199efa0d'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('5f1c30f5-5f42-4e35-9da0-5bf42c8c1e1f'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('c37e598d-22b7-4c22-8050-b7ed4baa783f'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('0d664d73-a3ff-4e71-82c4-a39d4ab47c10'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('a8e8d04d-a8ed-487f-9a8c-b8f9a5133d73'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('82e5dbeb-75b0-44d9-bb8f-8707f7b10c7c'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('3d45a873-08da-4678-aa79-d0c790d794bc'::uuid, 'f7a1b0c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c'::uuid),
    ('40bab484-a95f-4866-a945-39ee49ee53cb'::uuid, 'e2b3c4d5-6f7a-8b9c-0d1e-2f3a4b5c6d7e'::uuid),
    ('959b9db0-c8a7-43b2-92ad-268e00a8a2e8'::uuid, 'e2b3c4d5-6f7a-8b9c-0d1e-2f3a4b5c6d7e'::uuid),
    ('82e5dbeb-75b0-44d9-bb8f-8707f7b10c7c'::uuid, 'e2b3c4d5-6f7a-8b9c-0d1e-2f3a4b5c6d7e'::uuid),
    ('17b76d96-9384-4fbe-9b6f-4cc850c9c64c'::uuid, 'e2b3c4d5-6f7a-8b9c-0d1e-2f3a4b5c6d7e'::uuid),
    ('a2bccfb5-778b-4a36-a6b6-8a52dc67fc74'::uuid, 'e2b3c4d5-6f7a-8b9c-0d1e-2f3a4b5c6d7e'::uuid),
    ('2bd7b9f0-a9e2-44a3-9f68-aa583f07851f'::uuid, 'e2b3c4d5-6f7a-8b9c-0d1e-2f3a4b5c6d7e'::uuid),
    ('4c739a7a-193f-4c4c-bed4-66e2328049d9'::uuid, 'e2b3c4d5-6f7a-8b9c-0d1e-2f3a4b5c6d7e'::uuid),
    ('142f5c6a-8560-4ce5-b93e-e868be6de759'::uuid, 'e2b3c4d5-6f7a-8b9c-0d1e-2f3a4b5c6d7e'::uuid),
    ('df41a59c-0692-484a-b6da-c73d3bf41125'::uuid, 'e2b3c4d5-6f7a-8b9c-0d1e-2f3a4b5c6d7e'::uuid),
    ('8be352ef-fb4f-4088-88bc-686cf4853410'::uuid, 'e2b3c4d5-6f7a-8b9c-0d1e-2f3a4b5c6d7e'::uuid),
    ('edc2bd36-8983-49c4-8a14-aa9e55088840'::uuid, 'd3c4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f'::uuid),
    ('7f740aee-746b-44c5-8949-77ab1dfd2fe1'::uuid, 'd3c4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f'::uuid),
    ('8be352ef-fb4f-4088-88bc-686cf4853410'::uuid, 'd3c4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f'::uuid),
    ('979c6624-c33b-4847-8837-b7882bdf2f0d'::uuid, 'd3c4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f'::uuid),
    ('6847a779-7bec-4b9a-82f8-7c427f6ac22a'::uuid, 'd3c4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f'::uuid),
    ('71176a5c-df07-4af7-a6bc-7bd319d470b0'::uuid, 'd3c4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f'::uuid),
    ('f1cd2c19-649a-4bf1-a1bc-171b8452d3fa'::uuid, 'd3c4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f'::uuid),
    ('3d45a873-08da-4678-aa79-d0c790d794bc'::uuid, 'd3c4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f'::uuid),
    ('9c9ae696-e9a5-45a9-9c86-c82cfcbaa06d'::uuid, 'd3c4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f'::uuid),
    ('1913d9e6-fc6c-46b4-812a-d3bc85d9cd46'::uuid, 'd3c4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f'::uuid),
    ('07064ac0-72fa-4e02-a888-d0a85798835b'::uuid, 'd3c4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f'::uuid),
    ('a8e8d04d-a8ed-487f-9a8c-b8f9a5133d73'::uuid, 'd3c4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f'::uuid),
    ('dc12d875-e4eb-4c1d-9e5d-bdbc3271eeeb'::uuid, 'd3c4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f'::uuid),
    ('dc467917-46cd-48b6-8743-1de12611a4b3'::uuid, 'd3c4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f'::uuid),
    ('3d45a873-08da-4678-aa79-d0c790d794bc'::uuid, 'c4d5e6f7-8a9b-0c1d-2e3f-4a5b6c7d8e9f'::uuid),
    ('2bd7b9f0-a9e2-44a3-9f68-aa583f07851f'::uuid, 'c4d5e6f7-8a9b-0c1d-2e3f-4a5b6c7d8e9f'::uuid),
    ('8ed7d23f-87c9-4d96-8949-5db5fc9a24bc'::uuid, 'c4d5e6f7-8a9b-0c1d-2e3f-4a5b6c7d8e9f'::uuid),
    ('71176a5c-df07-4af7-a6bc-7bd319d470b0'::uuid, 'c4d5e6f7-8a9b-0c1d-2e3f-4a5b6c7d8e9f'::uuid),
    ('cdfdb794-cbfb-4329-8304-c20986cae576'::uuid, 'c4d5e6f7-8a9b-0c1d-2e3f-4a5b6c7d8e9f'::uuid),
    ('0596f301-4bc4-4bee-a405-647f72ba981e'::uuid, 'c4d5e6f7-8a9b-0c1d-2e3f-4a5b6c7d8e9f'::uuid),
    ('31c0fb67-ac5e-4b40-b690-fe8cbf255948'::uuid, 'c4d5e6f7-8a9b-0c1d-2e3f-4a5b6c7d8e9f'::uuid),
    ('57190eb6-d8d2-47c5-8d78-89f4f71f0d35'::uuid, 'c4d5e6f7-8a9b-0c1d-2e3f-4a5b6c7d8e9f'::uuid),
    ('e5342045-68d1-444b-8a83-41b18757fb04'::uuid, 'c4d5e6f7-8a9b-0c1d-2e3f-4a5b6c7d8e9f'::uuid),
    ('b2b0ae42-5bb2-481d-a5e7-e74e11890de5'::uuid, 'c4d5e6f7-8a9b-0c1d-2e3f-4a5b6c7d8e9f'::uuid),
    ('3a6f6277-6a39-48a6-9a38-4bf937cd9743'::uuid, 'c4d5e6f7-8a9b-0c1d-2e3f-4a5b6c7d8e9f'::uuid),
    ('a8e8d04d-a8ed-487f-9a8c-b8f9a5133d73'::uuid, 'c4d5e6f7-8a9b-0c1d-2e3f-4a5b6c7d8e9f'::uuid),
    ('4daf3490-4d51-4a9e-b184-36d42f447df2'::uuid, 'c4d5e6f7-8a9b-0c1d-2e3f-4a5b6c7d8e9f'::uuid),
    ('7f740aee-746b-44c5-8949-77ab1dfd2fe1'::uuid, 'c4d5e6f7-8a9b-0c1d-2e3f-4a5b6c7d8e9f'::uuid),
    ('f2fbab68-7ce5-4205-9dcd-3644c907a894'::uuid, 'c4d5e6f7-8a9b-0c1d-2e3f-4a5b6c7d8e9f'::uuid),
    ('332c68c6-e8bc-42d5-b782-2139b7f942ab'::uuid, 'c4d5e6f7-8a9b-0c1d-2e3f-4a5b6c7d8e9f'::uuid),
    ('e772c111-dad2-4c9c-bb50-f5230624166c'::uuid, 'c4d5e6f7-8a9b-0c1d-2e3f-4a5b6c7d8e9f'::uuid),
    ('df41a59c-0692-484a-b6da-c73d3bf41125'::uuid, 'c4d5e6f7-8a9b-0c1d-2e3f-4a5b6c7d8e9f'::uuid),
    ('142f5c6a-8560-4ce5-b93e-e868be6de759'::uuid, 'c4d5e6f7-8a9b-0c1d-2e3f-4a5b6c7d8e9f'::uuid),
    ('dc467917-46cd-48b6-8743-1de12611a4b3'::uuid, 'c4d5e6f7-8a9b-0c1d-2e3f-4a5b6c7d8e9f'::uuid),
    ('092cd952-2073-4fc7-a901-8bbd60e208ce'::uuid, 'c4d5e6f7-8a9b-0c1d-2e3f-4a5b6c7d8e9f'::uuid),
    ('a671a089-291f-427b-9392-969fde3f5bb5'::uuid, 'c4d5e6f7-8a9b-0c1d-2e3f-4a5b6c7d8e9f'::uuid),
    ('eaa85a07-40a4-4477-8e62-3b4cd56485a5'::uuid, 'c4d5e6f7-8a9b-0c1d-2e3f-4a5b6c7d8e9f'::uuid),
    ('4dc3c511-ebd7-4458-bc51-4f4c57d5e491'::uuid, 'c4d5e6f7-8a9b-0c1d-2e3f-4a5b6c7d8e9f'::uuid),
    ('eba7eded-1efb-4a37-b2ef-caffc81d954f'::uuid, 'c4d5e6f7-8a9b-0c1d-2e3f-4a5b6c7d8e9f'::uuid),
    ('9c75473b-3a45-44be-afc6-7b8700f8d841'::uuid, 'c4d5e6f7-8a9b-0c1d-2e3f-4a5b6c7d8e9f'::uuid),
    ('a0e6f652-b7c4-47d8-b88e-2a36111bf0c3'::uuid, 'c4d5e6f7-8a9b-0c1d-2e3f-4a5b6c7d8e9f'::uuid),
    ('85ba13ff-0a96-4478-9d31-947539d74f77'::uuid, 'c4d5e6f7-8a9b-0c1d-2e3f-4a5b6c7d8e9f'::uuid),
    ('edc2bd36-8983-49c4-8a14-aa9e55088840'::uuid, 'c4d5e6f7-8a9b-0c1d-2e3f-4a5b6c7d8e9f'::uuid),
    ('9de41342-88d5-4ff4-8e6d-5e0b7c6d67c7'::uuid, 'b5c6d7e8-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('e3ccffa1-557c-4935-bad2-75b283071789'::uuid, 'b5c6d7e8-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('eba7eded-1efb-4a37-b2ef-caffc81d954f'::uuid, 'b5c6d7e8-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('33bcc3b2-c271-4b61-9ce8-e7e25410b664'::uuid, 'b5c6d7e8-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('959b9db0-c8a7-43b2-92ad-268e00a8a2e8'::uuid, 'b5c6d7e8-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('73016385-c336-408f-b4ed-c39ad235cc26'::uuid, 'b5c6d7e8-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('82e5dbeb-75b0-44d9-bb8f-8707f7b10c7c'::uuid, 'b5c6d7e8-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('979c6624-c33b-4847-8837-b7882bdf2f0d'::uuid, 'b5c6d7e8-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('1913d9e6-fc6c-46b4-812a-d3bc85d9cd46'::uuid, 'b5c6d7e8-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('324a2ae4-fd15-4edb-ae49-ed25c0a2e70f'::uuid, 'b5c6d7e8-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('401898e8-f5ce-4094-9f1e-b023b58145fe'::uuid, 'b5c6d7e8-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('e9496372-2b39-40e6-8063-fb058b4ec067'::uuid, 'b5c6d7e8-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('a0e6f652-b7c4-47d8-b88e-2a36111bf0c3'::uuid, 'b5c6d7e8-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('6331d087-0481-4e66-b9e2-cc907fd4062f'::uuid, 'b5c6d7e8-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('f1cd2c19-649a-4bf1-a1bc-171b8452d3fa'::uuid, 'b5c6d7e8-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('f724c445-e135-45da-beba-69df14cbdb64'::uuid, 'b5c6d7e8-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('8be352ef-fb4f-4088-88bc-686cf4853410'::uuid, 'b5c6d7e8-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('20239a0e-8c5f-4b06-9b5a-5012eb108aee'::uuid, 'b5c6d7e8-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('07f9fe7d-a915-4147-9cd8-5deb830ae618'::uuid, 'b5c6d7e8-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('5f1c30f5-5f42-4e35-9da0-5bf42c8c1e1f'::uuid, 'b5c6d7e8-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('e5342045-68d1-444b-8a83-41b18757fb04'::uuid, 'b5c6d7e8-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('142f5c6a-8560-4ce5-b93e-e868be6de759'::uuid, 'b5c6d7e8-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('c7813582-d94d-4a5d-8b97-d11a4a06f69a'::uuid, 'b5c6d7e8-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('e77f0f3e-1651-490a-a392-8103943619de'::uuid, 'b5c6d7e8-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('e579798b-c6b2-4f98-ac1a-07d43b40e399'::uuid, 'b5c6d7e8-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('18d89677-c5e6-444a-87fe-a6812d0c45e3'::uuid, 'b5c6d7e8-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('f93a2906-bdc4-4618-bbf2-c40986109083'::uuid, 'b5c6d7e8-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('07064ac0-72fa-4e02-a888-d0a85798835b'::uuid, 'b5c6d7e8-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('2ad01c1a-2ac7-4c26-968f-72567046f79d'::uuid, 'b5c6d7e8-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('3756792d-6fb4-4ff2-8671-7a27c5118c5e'::uuid, 'b5c6d7e8-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('d12d1d0b-1628-492a-8e1b-46cd22ae15b5'::uuid, 'b5c6d7e8-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('2bd7b9f0-a9e2-44a3-9f68-aa583f07851f'::uuid, 'b5c6d7e8-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('bcafce5c-494e-4c2e-97bc-4b8db13378d3'::uuid, 'b5c6d7e8-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('3a6f6277-6a39-48a6-9a38-4bf937cd9743'::uuid, 'b5c6d7e8-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('87ceddd1-e6e9-47c7-9084-d7089ca719af'::uuid, 'b5c6d7e8-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('8ed7d23f-87c9-4d96-8949-5db5fc9a24bc'::uuid, 'b5c6d7e8-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('4f6fc5ff-58bb-4457-858a-7f57199efa0d'::uuid, 'b5c6d7e8-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('b6c539f8-9bf9-43d1-861a-72f4ca4da820'::uuid, 'b5c6d7e8-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('332c68c6-e8bc-42d5-b782-2139b7f942ab'::uuid, 'b5c6d7e8-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('4daf3490-4d51-4a9e-b184-36d42f447df2'::uuid, 'b5c6d7e8-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('87f17d4f-a9be-474c-9759-473ff404a61a'::uuid, 'b5c6d7e8-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('a0e6f652-b7c4-47d8-b88e-2a36111bf0c3'::uuid, 'a6b7c8d9-0e1f-2a3b-4c5d-6e7f8a9b0c1d'::uuid),
    ('142f5c6a-8560-4ce5-b93e-e868be6de759'::uuid, 'a6b7c8d9-0e1f-2a3b-4c5d-6e7f8a9b0c1d'::uuid),
    ('dc467917-46cd-48b6-8743-1de12611a4b3'::uuid, 'a6b7c8d9-0e1f-2a3b-4c5d-6e7f8a9b0c1d'::uuid),
    ('a224dff9-f449-4313-bf90-0663e8b9bcb8'::uuid, 'a6b7c8d9-0e1f-2a3b-4c5d-6e7f8a9b0c1d'::uuid),
    ('9c9ae696-e9a5-45a9-9c86-c82cfcbaa06d'::uuid, 'a6b7c8d9-0e1f-2a3b-4c5d-6e7f8a9b0c1d'::uuid),
    ('b2b0ae42-5bb2-481d-a5e7-e74e11890de5'::uuid, 'a6b7c8d9-0e1f-2a3b-4c5d-6e7f8a9b0c1d'::uuid),
    ('1dbf48de-823e-44b8-b25d-8724bce00087'::uuid, '9b0c1d2e-3f4a-5b6c-7d8e-9f0a1b2c3d4e'::uuid),
    ('4c739a7a-193f-4c4c-bed4-66e2328049d9'::uuid, '9b0c1d2e-3f4a-5b6c-7d8e-9f0a1b2c3d4e'::uuid),
    ('7c424400-422e-4371-9fe4-2dfdfe08833e'::uuid, '9b0c1d2e-3f4a-5b6c-7d8e-9f0a1b2c3d4e'::uuid),
    ('57190eb6-d8d2-47c5-8d78-89f4f71f0d35'::uuid, '9b0c1d2e-3f4a-5b6c-7d8e-9f0a1b2c3d4e'::uuid),
    ('51403b31-5f9b-4c78-8e3f-0305a874e1e0'::uuid, '9b0c1d2e-3f4a-5b6c-7d8e-9f0a1b2c3d4e'::uuid),
    ('eba7eded-1efb-4a37-b2ef-caffc81d954f'::uuid, '9b0c1d2e-3f4a-5b6c-7d8e-9f0a1b2c3d4e'::uuid),
    ('cdfdb794-cbfb-4329-8304-c20986cae576'::uuid, '9b0c1d2e-3f4a-5b6c-7d8e-9f0a1b2c3d4e'::uuid),
    ('3d45a873-08da-4678-aa79-d0c790d794bc'::uuid, '9b0c1d2e-3f4a-5b6c-7d8e-9f0a1b2c3d4e'::uuid),
    ('1d34eb5f-77f6-4555-8df3-7e970d29e906'::uuid, '9b0c1d2e-3f4a-5b6c-7d8e-9f0a1b2c3d4e'::uuid),
    ('3a6f6277-6a39-48a6-9a38-4bf937cd9743'::uuid, '9b0c1d2e-3f4a-5b6c-7d8e-9f0a1b2c3d4e'::uuid),
    ('4776aba3-5860-4425-be14-48491f1eb4a5'::uuid, '9b0c1d2e-3f4a-5b6c-7d8e-9f0a1b2c3d4e'::uuid),
    ('1121b25e-3f4e-4c05-8902-f2a6babda153'::uuid, '9b0c1d2e-3f4a-5b6c-7d8e-9f0a1b2c3d4e'::uuid),
    ('82e5dbeb-75b0-44d9-bb8f-8707f7b10c7c'::uuid, '9b0c1d2e-3f4a-5b6c-7d8e-9f0a1b2c3d4e'::uuid),
    ('36693ef2-0f14-463d-9930-bcdabfb002e0'::uuid, '9b0c1d2e-3f4a-5b6c-7d8e-9f0a1b2c3d4e'::uuid),
    ('b6c539f8-9bf9-43d1-861a-72f4ca4da820'::uuid, '9b0c1d2e-3f4a-5b6c-7d8e-9f0a1b2c3d4e'::uuid),
    ('e9496372-2b39-40e6-8063-fb058b4ec067'::uuid, '9b0c1d2e-3f4a-5b6c-7d8e-9f0a1b2c3d4e'::uuid),
    ('8ed7d23f-87c9-4d96-8949-5db5fc9a24bc'::uuid, '9b0c1d2e-3f4a-5b6c-7d8e-9f0a1b2c3d4e'::uuid),
    ('e579798b-c6b2-4f98-ac1a-07d43b40e399'::uuid, '9b0c1d2e-3f4a-5b6c-7d8e-9f0a1b2c3d4e'::uuid),
    ('eaa85a07-40a4-4477-8e62-3b4cd56485a5'::uuid, '9b0c1d2e-3f4a-5b6c-7d8e-9f0a1b2c3d4e'::uuid),
    ('0e228c98-6396-4c65-91b9-feda10e5ffb0'::uuid, '9b0c1d2e-3f4a-5b6c-7d8e-9f0a1b2c3d4e'::uuid),
    ('31c0fb67-ac5e-4b40-b690-fe8cbf255948'::uuid, '9b0c1d2e-3f4a-5b6c-7d8e-9f0a1b2c3d4e'::uuid),
    ('fe41c54f-e43d-498e-b3a9-af5b546c94ef'::uuid, '9b0c1d2e-3f4a-5b6c-7d8e-9f0a1b2c3d4e'::uuid),
    ('d84b7325-6ae4-4bf1-ad5d-470c74eac1b2'::uuid, '9b0c1d2e-3f4a-5b6c-7d8e-9f0a1b2c3d4e'::uuid),
    ('e5342045-68d1-444b-8a83-41b18757fb04'::uuid, '9b0c1d2e-3f4a-5b6c-7d8e-9f0a1b2c3d4e'::uuid),
    ('4f6fc5ff-58bb-4457-858a-7f57199efa0d'::uuid, '9b0c1d2e-3f4a-5b6c-7d8e-9f0a1b2c3d4e'::uuid),
    ('a224dff9-f449-4313-bf90-0663e8b9bcb8'::uuid, '9b0c1d2e-3f4a-5b6c-7d8e-9f0a1b2c3d4e'::uuid),
    ('4dc3c511-ebd7-4458-bc51-4f4c57d5e491'::uuid, '9b0c1d2e-3f4a-5b6c-7d8e-9f0a1b2c3d4e'::uuid),
    ('0a8be25a-6550-464f-ba2a-1ab67bf42f4c'::uuid, '9b0c1d2e-3f4a-5b6c-7d8e-9f0a1b2c3d4e'::uuid),
    ('401898e8-f5ce-4094-9f1e-b023b58145fe'::uuid, '9b0c1d2e-3f4a-5b6c-7d8e-9f0a1b2c3d4e'::uuid),
    ('73016385-c336-408f-b4ed-c39ad235cc26'::uuid, '9b0c1d2e-3f4a-5b6c-7d8e-9f0a1b2c3d4e'::uuid),
    ('1377634f-dbfe-4a79-a2d3-a1d629d4f46c'::uuid, '9b0c1d2e-3f4a-5b6c-7d8e-9f0a1b2c3d4e'::uuid),
    ('40bab484-a95f-4866-a945-39ee49ee53cb'::uuid, '9b0c1d2e-3f4a-5b6c-7d8e-9f0a1b2c3d4e'::uuid),
    ('22873fa4-78a3-40c6-8d34-edfa5f12b8e1'::uuid, '8a9b0c1d-2e3f-4a5b-6c7d-8e9f0a1b2c3d'::uuid),
    ('f1cd2c19-649a-4bf1-a1bc-171b8452d3fa'::uuid, '8a9b0c1d-2e3f-4a5b-6c7d-8e9f0a1b2c3d'::uuid),
    ('bcafce5c-494e-4c2e-97bc-4b8db13378d3'::uuid, '8a9b0c1d-2e3f-4a5b-6c7d-8e9f0a1b2c3d'::uuid),
    ('401898e8-f5ce-4094-9f1e-b023b58145fe'::uuid, '8a9b0c1d-2e3f-4a5b-6c7d-8e9f0a1b2c3d'::uuid),
    ('40bab484-a95f-4866-a945-39ee49ee53cb'::uuid, '8a9b0c1d-2e3f-4a5b-6c7d-8e9f0a1b2c3d'::uuid),
    ('d12d1d0b-1628-492a-8e1b-46cd22ae15b5'::uuid, '8a9b0c1d-2e3f-4a5b-6c7d-8e9f0a1b2c3d'::uuid),
    ('2ad01c1a-2ac7-4c26-968f-72567046f79d'::uuid, '8a9b0c1d-2e3f-4a5b-6c7d-8e9f0a1b2c3d'::uuid),
    ('edc2bd36-8983-49c4-8a14-aa9e55088840'::uuid, '8a9b0c1d-2e3f-4a5b-6c7d-8e9f0a1b2c3d'::uuid),
    ('9c75473b-3a45-44be-afc6-7b8700f8d841'::uuid, '8a9b0c1d-2e3f-4a5b-6c7d-8e9f0a1b2c3d'::uuid),
    ('1913d9e6-fc6c-46b4-812a-d3bc85d9cd46'::uuid, '8a9b0c1d-2e3f-4a5b-6c7d-8e9f0a1b2c3d'::uuid),
    ('87ceddd1-e6e9-47c7-9084-d7089ca719af'::uuid, '8a9b0c1d-2e3f-4a5b-6c7d-8e9f0a1b2c3d'::uuid),
    ('9dc25f09-742a-4401-815a-8e9da40a33c6'::uuid, '8a9b0c1d-2e3f-4a5b-6c7d-8e9f0a1b2c3d'::uuid),
    ('8be352ef-fb4f-4088-88bc-686cf4853410'::uuid, '8a9b0c1d-2e3f-4a5b-6c7d-8e9f0a1b2c3d'::uuid),
    ('142f5c6a-8560-4ce5-b93e-e868be6de759'::uuid, '8a9b0c1d-2e3f-4a5b-6c7d-8e9f0a1b2c3d'::uuid),
    ('17b76d96-9384-4fbe-9b6f-4cc850c9c64c'::uuid, '8a9b0c1d-2e3f-4a5b-6c7d-8e9f0a1b2c3d'::uuid),
    ('a671a089-291f-427b-9392-969fde3f5bb5'::uuid, '8a9b0c1d-2e3f-4a5b-6c7d-8e9f0a1b2c3d'::uuid),
    ('4f6fc5ff-58bb-4457-858a-7f57199efa0d'::uuid, '8a9b0c1d-2e3f-4a5b-6c7d-8e9f0a1b2c3d'::uuid),
    ('8e3f38f8-d54e-47e4-adb5-c3865c1b8b11'::uuid, '8a9b0c1d-2e3f-4a5b-6c7d-8e9f0a1b2c3d'::uuid),
    ('fe41c54f-e43d-498e-b3a9-af5b546c94ef'::uuid, '8a9b0c1d-2e3f-4a5b-6c7d-8e9f0a1b2c3d'::uuid),
    ('e772c111-dad2-4c9c-bb50-f5230624166c'::uuid, '8a9b0c1d-2e3f-4a5b-6c7d-8e9f0a1b2c3d'::uuid),
    ('a2bccfb5-778b-4a36-a6b6-8a52dc67fc74'::uuid, '8a9b0c1d-2e3f-4a5b-6c7d-8e9f0a1b2c3d'::uuid),
    ('0e228c98-6396-4c65-91b9-feda10e5ffb0'::uuid, '8a9b0c1d-2e3f-4a5b-6c7d-8e9f0a1b2c3d'::uuid),
    ('332c68c6-e8bc-42d5-b782-2139b7f942ab'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('f65e70b7-5ab1-478d-8cdb-0bf075547790'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('0f01e1e1-aa52-4543-8139-d5da91135606'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('fe41c54f-e43d-498e-b3a9-af5b546c94ef'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('6847a779-7bec-4b9a-82f8-7c427f6ac22a'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('a8e8d04d-a8ed-487f-9a8c-b8f9a5133d73'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('3756792d-6fb4-4ff2-8671-7a27c5118c5e'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('f1cd2c19-649a-4bf1-a1bc-171b8452d3fa'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('f93a2906-bdc4-4618-bbf2-c40986109083'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('b2b0ae42-5bb2-481d-a5e7-e74e11890de5'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('07f9fe7d-a915-4147-9cd8-5deb830ae618'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('9dc25f09-742a-4401-815a-8e9da40a33c6'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('e77f0f3e-1651-490a-a392-8103943619de'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('1dbf48de-823e-44b8-b25d-8724bce00087'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('36693ef2-0f14-463d-9930-bcdabfb002e0'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('d84b7325-6ae4-4bf1-ad5d-470c74eac1b2'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('4c739a7a-193f-4c4c-bed4-66e2328049d9'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('85ba13ff-0a96-4478-9d31-947539d74f77'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('40bab484-a95f-4866-a945-39ee49ee53cb'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('87f17d4f-a9be-474c-9759-473ff404a61a'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('9de41342-88d5-4ff4-8e6d-5e0b7c6d67c7'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('0e228c98-6396-4c65-91b9-feda10e5ffb0'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('071bd9f9-08be-4ade-ada4-3b44d510deb2'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('20239a0e-8c5f-4b06-9b5a-5012eb108aee'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('0a8be25a-6550-464f-ba2a-1ab67bf42f4c'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('57190eb6-d8d2-47c5-8d78-89f4f71f0d35'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('e772c111-dad2-4c9c-bb50-f5230624166c'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('e3ccffa1-557c-4935-bad2-75b283071789'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('17b76d96-9384-4fbe-9b6f-4cc850c9c64c'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('1913d9e6-fc6c-46b4-812a-d3bc85d9cd46'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('87ceddd1-e6e9-47c7-9084-d7089ca719af'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('979c6624-c33b-4847-8837-b7882bdf2f0d'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('3a6f6277-6a39-48a6-9a38-4bf937cd9743'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('dc12d875-e4eb-4c1d-9e5d-bdbc3271eeeb'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('8e3f38f8-d54e-47e4-adb5-c3865c1b8b11'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('142f5c6a-8560-4ce5-b93e-e868be6de759'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('cdfdb794-cbfb-4329-8304-c20986cae576'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('9c75473b-3a45-44be-afc6-7b8700f8d841'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('e9496372-2b39-40e6-8063-fb058b4ec067'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('1d34eb5f-77f6-4555-8df3-7e970d29e906'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('33bcc3b2-c271-4b61-9ce8-e7e25410b664'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('d12d1d0b-1628-492a-8e1b-46cd22ae15b5'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('c25cfaa8-cb63-45f5-b040-f5c3d2a1af0d'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('62e6747b-66f9-4403-ae08-c91027bdcbed'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('dd9f8ed9-c3de-42da-9d84-36c1509f45b3'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('e579798b-c6b2-4f98-ac1a-07d43b40e399'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('3d45a873-08da-4678-aa79-d0c790d794bc'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('a0e6f652-b7c4-47d8-b88e-2a36111bf0c3'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('4776aba3-5860-4425-be14-48491f1eb4a5'::uuid, '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e'::uuid),
    ('4c739a7a-193f-4c4c-bed4-66e2328049d9'::uuid, '6c7d8e9f-0a1b-2c3d-4e5f-6a7b8c9d0e1f'::uuid),
    ('e5342045-68d1-444b-8a83-41b18757fb04'::uuid, '6c7d8e9f-0a1b-2c3d-4e5f-6a7b8c9d0e1f'::uuid),
    ('e579798b-c6b2-4f98-ac1a-07d43b40e399'::uuid, '6c7d8e9f-0a1b-2c3d-4e5f-6a7b8c9d0e1f'::uuid),
    ('4f6fc5ff-58bb-4457-858a-7f57199efa0d'::uuid, '6c7d8e9f-0a1b-2c3d-4e5f-6a7b8c9d0e1f'::uuid),
    ('f2fbab68-7ce5-4205-9dcd-3644c907a894'::uuid, '6c7d8e9f-0a1b-2c3d-4e5f-6a7b8c9d0e1f'::uuid),
    ('4776aba3-5860-4425-be14-48491f1eb4a5'::uuid, '6c7d8e9f-0a1b-2c3d-4e5f-6a7b8c9d0e1f'::uuid),
    ('959b9db0-c8a7-43b2-92ad-268e00a8a2e8'::uuid, '6c7d8e9f-0a1b-2c3d-4e5f-6a7b8c9d0e1f'::uuid),
    ('4daf3490-4d51-4a9e-b184-36d42f447df2'::uuid, '6c7d8e9f-0a1b-2c3d-4e5f-6a7b8c9d0e1f'::uuid),
    ('20239a0e-8c5f-4b06-9b5a-5012eb108aee'::uuid, '6c7d8e9f-0a1b-2c3d-4e5f-6a7b8c9d0e1f'::uuid),
    ('0a629a3c-daf0-43b8-8bea-b7203486bdd2'::uuid, '6c7d8e9f-0a1b-2c3d-4e5f-6a7b8c9d0e1f'::uuid),
    ('6847a779-7bec-4b9a-82f8-7c427f6ac22a'::uuid, '6c7d8e9f-0a1b-2c3d-4e5f-6a7b8c9d0e1f'::uuid),
    ('8ed7d23f-87c9-4d96-8949-5db5fc9a24bc'::uuid, '6c7d8e9f-0a1b-2c3d-4e5f-6a7b8c9d0e1f'::uuid),
    ('73016385-c336-408f-b4ed-c39ad235cc26'::uuid, '6c7d8e9f-0a1b-2c3d-4e5f-6a7b8c9d0e1f'::uuid),
    ('8be352ef-fb4f-4088-88bc-686cf4853410'::uuid, '6c7d8e9f-0a1b-2c3d-4e5f-6a7b8c9d0e1f'::uuid),
    ('0f01e1e1-aa52-4543-8139-d5da91135606'::uuid, '6c7d8e9f-0a1b-2c3d-4e5f-6a7b8c9d0e1f'::uuid),
    ('9c9ae696-e9a5-45a9-9c86-c82cfcbaa06d'::uuid, '6c7d8e9f-0a1b-2c3d-4e5f-6a7b8c9d0e1f'::uuid),
    ('87ceddd1-e6e9-47c7-9084-d7089ca719af'::uuid, '5b6c7d8e-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('dc12d875-e4eb-4c1d-9e5d-bdbc3271eeeb'::uuid, '5b6c7d8e-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('f65e70b7-5ab1-478d-8cdb-0bf075547790'::uuid, '5b6c7d8e-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('62e6747b-66f9-4403-ae08-c91027bdcbed'::uuid, '5b6c7d8e-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('df41a59c-0692-484a-b6da-c73d3bf41125'::uuid, '5b6c7d8e-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('181cf0ba-dfc9-4c4e-81aa-10e6349bf71f'::uuid, '5b6c7d8e-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('0d664d73-a3ff-4e71-82c4-a39d4ab47c10'::uuid, '5b6c7d8e-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('20239a0e-8c5f-4b06-9b5a-5012eb108aee'::uuid, '5b6c7d8e-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('6331d087-0481-4e66-b9e2-cc907fd4062f'::uuid, '5b6c7d8e-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('e9496372-2b39-40e6-8063-fb058b4ec067'::uuid, '5b6c7d8e-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('1377634f-dbfe-4a79-a2d3-a1d629d4f46c'::uuid, '5b6c7d8e-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('22873fa4-78a3-40c6-8d34-edfa5f12b8e1'::uuid, '5b6c7d8e-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('f2fbab68-7ce5-4205-9dcd-3644c907a894'::uuid, '5b6c7d8e-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('36693ef2-0f14-463d-9930-bcdabfb002e0'::uuid, '5b6c7d8e-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('dc467917-46cd-48b6-8743-1de12611a4b3'::uuid, '5b6c7d8e-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('b2b0ae42-5bb2-481d-a5e7-e74e11890de5'::uuid, '5b6c7d8e-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('9c75473b-3a45-44be-afc6-7b8700f8d841'::uuid, '5b6c7d8e-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('31c0fb67-ac5e-4b40-b690-fe8cbf255948'::uuid, '5b6c7d8e-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('07064ac0-72fa-4e02-a888-d0a85798835b'::uuid, '5b6c7d8e-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('3ab729d3-56dd-4090-9ff9-ac40059ff097'::uuid, '5b6c7d8e-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('3a6f6277-6a39-48a6-9a38-4bf937cd9743'::uuid, '5b6c7d8e-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('edc2bd36-8983-49c4-8a14-aa9e55088840'::uuid, '5b6c7d8e-9f0a-1b2c-3d4e-5f6a7b8c9d0e'::uuid),
    ('82e5dbeb-75b0-44d9-bb8f-8707f7b10c7c'::uuid, '5e85f7d1-49af-4f17-9f1c-2bbdbb7c8a9b'::uuid),
    ('0570d2d6-8982-424f-a244-bcc917eccae0'::uuid, '5e85f7d1-49af-4f17-9f1c-2bbdbb7c8a9b'::uuid),
    ('3d45a873-08da-4678-aa79-d0c790d794bc'::uuid, '5e85f7d1-49af-4f17-9f1c-2bbdbb7c8a9b'::uuid),
    ('20239a0e-8c5f-4b06-9b5a-5012eb108aee'::uuid, '5e85f7d1-49af-4f17-9f1c-2bbdbb7c8a9b'::uuid),
    ('bb8e3fd4-42b6-4803-b02a-73e444709e38'::uuid, '5e85f7d1-49af-4f17-9f1c-2bbdbb7c8a9b'::uuid),
    ('51403b31-5f9b-4c78-8e3f-0305a874e1e0'::uuid, '5e85f7d1-49af-4f17-9f1c-2bbdbb7c8a9b'::uuid),
    ('e5342045-68d1-444b-8a83-41b18757fb04'::uuid, '5e85f7d1-49af-4f17-9f1c-2bbdbb7c8a9b'::uuid),
    ('87f17d4f-a9be-474c-9759-473ff404a61a'::uuid, '5e85f7d1-49af-4f17-9f1c-2bbdbb7c8a9b'::uuid),
    ('959b9db0-c8a7-43b2-92ad-268e00a8a2e8'::uuid, '5e85f7d1-49af-4f17-9f1c-2bbdbb7c8a9b'::uuid),
    ('3a6f6277-6a39-48a6-9a38-4bf937cd9743'::uuid, '5e85f7d1-49af-4f17-9f1c-2bbdbb7c8a9b'::uuid),
    ('c7813582-d94d-4a5d-8b97-d11a4a06f69a'::uuid, '5e85f7d1-49af-4f17-9f1c-2bbdbb7c8a9b'::uuid),
    ('0596f301-4bc4-4bee-a405-647f72ba981e'::uuid, '5e85f7d1-49af-4f17-9f1c-2bbdbb7c8a9b'::uuid),
    ('0e228c98-6396-4c65-91b9-feda10e5ffb0'::uuid, '5e85f7d1-49af-4f17-9f1c-2bbdbb7c8a9b'::uuid),
    ('8ed7d23f-87c9-4d96-8949-5db5fc9a24bc'::uuid, '5e85f7d1-49af-4f17-9f1c-2bbdbb7c8a9b'::uuid),
    ('8be352ef-fb4f-4088-88bc-686cf4853410'::uuid, '5e85f7d1-49af-4f17-9f1c-2bbdbb7c8a9b'::uuid),
    ('0a629a3c-daf0-43b8-8bea-b7203486bdd2'::uuid, '5e85f7d1-49af-4f17-9f1c-2bbdbb7c8a9b'::uuid),
    ('33bcc3b2-c271-4b61-9ce8-e7e25410b664'::uuid, '5e85f7d1-49af-4f17-9f1c-2bbdbb7c8a9b'::uuid),
    ('eba7eded-1efb-4a37-b2ef-caffc81d954f'::uuid, '5e85f7d1-49af-4f17-9f1c-2bbdbb7c8a9b'::uuid),
    ('332c68c6-e8bc-42d5-b782-2139b7f942ab'::uuid, '5e85f7d1-49af-4f17-9f1c-2bbdbb7c8a9b'::uuid),
    ('edc2bd36-8983-49c4-8a14-aa9e55088840'::uuid, '5e85f7d1-49af-4f17-9f1c-2bbdbb7c8a9b'::uuid),
    ('4f6fc5ff-58bb-4457-858a-7f57199efa0d'::uuid, '5e85f7d1-49af-4f17-9f1c-2bbdbb7c8a9b'::uuid),
    ('142f5c6a-8560-4ce5-b93e-e868be6de759'::uuid, 'd88a9e3e-4d2a-4ab3-9d69-4ef72b6ad28e'::uuid),
    ('c37e598d-22b7-4c22-8050-b7ed4baa783f'::uuid, 'd88a9e3e-4d2a-4ab3-9d69-4ef72b6ad28e'::uuid),
    ('eaa85a07-40a4-4477-8e62-3b4cd56485a5'::uuid, 'd88a9e3e-4d2a-4ab3-9d69-4ef72b6ad28e'::uuid),
    ('a671a089-291f-427b-9392-969fde3f5bb5'::uuid, 'd88a9e3e-4d2a-4ab3-9d69-4ef72b6ad28e'::uuid),
    ('7c424400-422e-4371-9fe4-2dfdfe08833e'::uuid, 'd88a9e3e-4d2a-4ab3-9d69-4ef72b6ad28e'::uuid),
    ('62e6747b-66f9-4403-ae08-c91027bdcbed'::uuid, 'd88a9e3e-4d2a-4ab3-9d69-4ef72b6ad28e'::uuid),
    ('df41a59c-0692-484a-b6da-c73d3bf41125'::uuid, 'd88a9e3e-4d2a-4ab3-9d69-4ef72b6ad28e'::uuid),
    ('85ba13ff-0a96-4478-9d31-947539d74f77'::uuid, 'd88a9e3e-4d2a-4ab3-9d69-4ef72b6ad28e'::uuid),
    ('87ceddd1-e6e9-47c7-9084-d7089ca719af'::uuid, 'd88a9e3e-4d2a-4ab3-9d69-4ef72b6ad28e'::uuid),
    ('4776aba3-5860-4425-be14-48491f1eb4a5'::uuid, 'd88a9e3e-4d2a-4ab3-9d69-4ef72b6ad28e'::uuid),
    ('4c739a7a-193f-4c4c-bed4-66e2328049d9'::uuid, 'd88a9e3e-4d2a-4ab3-9d69-4ef72b6ad28e'::uuid),
    ('31c0fb67-ac5e-4b40-b690-fe8cbf255948'::uuid, 'd88a9e3e-4d2a-4ab3-9d69-4ef72b6ad28e'::uuid),
    ('dc12d875-e4eb-4c1d-9e5d-bdbc3271eeeb'::uuid, 'd88a9e3e-4d2a-4ab3-9d69-4ef72b6ad28e'::uuid),
    ('e77f0f3e-1651-490a-a392-8103943619de'::uuid, 'd88a9e3e-4d2a-4ab3-9d69-4ef72b6ad28e'::uuid),
    ('9c75473b-3a45-44be-afc6-7b8700f8d841'::uuid, 'd88a9e3e-4d2a-4ab3-9d69-4ef72b6ad28e'::uuid),
    ('d12d1d0b-1628-492a-8e1b-46cd22ae15b5'::uuid, 'd88a9e3e-4d2a-4ab3-9d69-4ef72b6ad28e'::uuid),
    ('0596f301-4bc4-4bee-a405-647f72ba981e'::uuid, 'd88a9e3e-4d2a-4ab3-9d69-4ef72b6ad28e'::uuid),
    ('fd90bf16-7daa-41f1-a821-c2be9d5e0469'::uuid, 'd88a9e3e-4d2a-4ab3-9d69-4ef72b6ad28e'::uuid),
    ('0e228c98-6396-4c65-91b9-feda10e5ffb0'::uuid, 'd88a9e3e-4d2a-4ab3-9d69-4ef72b6ad28e'::uuid),
    ('a51cac9a-36ae-4ffb-93f2-7c27dd95bdb6'::uuid, 'd88a9e3e-4d2a-4ab3-9d69-4ef72b6ad28e'::uuid),
    ('e772c111-dad2-4c9c-bb50-f5230624166c'::uuid, 'a37259c7-4e62-482b-8b7d-09275985d6e2'::uuid),
    ('eba7eded-1efb-4a37-b2ef-caffc81d954f'::uuid, 'a37259c7-4e62-482b-8b7d-09275985d6e2'::uuid),
    ('33bcc3b2-c271-4b61-9ce8-e7e25410b664'::uuid, 'a37259c7-4e62-482b-8b7d-09275985d6e2'::uuid),
    ('0a629a3c-daf0-43b8-8bea-b7203486bdd2'::uuid, 'a37259c7-4e62-482b-8b7d-09275985d6e2'::uuid),
    ('0596f301-4bc4-4bee-a405-647f72ba981e'::uuid, 'a37259c7-4e62-482b-8b7d-09275985d6e2'::uuid),
    ('d84b7325-6ae4-4bf1-ad5d-470c74eac1b2'::uuid, 'a37259c7-4e62-482b-8b7d-09275985d6e2'::uuid),
    ('e77f0f3e-1651-490a-a392-8103943619de'::uuid, 'a37259c7-4e62-482b-8b7d-09275985d6e2'::uuid),
    ('071bd9f9-08be-4ade-ada4-3b44d510deb2'::uuid, 'a37259c7-4e62-482b-8b7d-09275985d6e2'::uuid),
    ('4dc3c511-ebd7-4458-bc51-4f4c57d5e491'::uuid, 'a37259c7-4e62-482b-8b7d-09275985d6e2'::uuid),
    ('092cd952-2073-4fc7-a901-8bbd60e208ce'::uuid, 'a37259c7-4e62-482b-8b7d-09275985d6e2'::uuid),
    ('f1cd2c19-649a-4bf1-a1bc-171b8452d3fa'::uuid, 'a37259c7-4e62-482b-8b7d-09275985d6e2'::uuid),
    ('e579798b-c6b2-4f98-ac1a-07d43b40e399'::uuid, 'a37259c7-4e62-482b-8b7d-09275985d6e2'::uuid),
    ('7f740aee-746b-44c5-8949-77ab1dfd2fe1'::uuid, 'a37259c7-4e62-482b-8b7d-09275985d6e2'::uuid),
    ('9dc25f09-742a-4401-815a-8e9da40a33c6'::uuid, 'a37259c7-4e62-482b-8b7d-09275985d6e2'::uuid),
    ('51403b31-5f9b-4c78-8e3f-0305a874e1e0'::uuid, 'a37259c7-4e62-482b-8b7d-09275985d6e2'::uuid),
    ('dc12d875-e4eb-4c1d-9e5d-bdbc3271eeeb'::uuid, 'a37259c7-4e62-482b-8b7d-09275985d6e2'::uuid),
    ('6847a779-7bec-4b9a-82f8-7c427f6ac22a'::uuid, 'a37259c7-4e62-482b-8b7d-09275985d6e2'::uuid),
    ('0570d2d6-8982-424f-a244-bcc917eccae0'::uuid, 'a37259c7-4e62-482b-8b7d-09275985d6e2'::uuid),
    ('c37e598d-22b7-4c22-8050-b7ed4baa783f'::uuid, 'a37259c7-4e62-482b-8b7d-09275985d6e2'::uuid),
    ('eaa85a07-40a4-4477-8e62-3b4cd56485a5'::uuid, 'a37259c7-4e62-482b-8b7d-09275985d6e2'::uuid),
    ('40bab484-a95f-4866-a945-39ee49ee53cb'::uuid, 'a37259c7-4e62-482b-8b7d-09275985d6e2'::uuid),
    ('a0e6f652-b7c4-47d8-b88e-2a36111bf0c3'::uuid, 'a37259c7-4e62-482b-8b7d-09275985d6e2'::uuid),
    ('07064ac0-72fa-4e02-a888-d0a85798835b'::uuid, 'a37259c7-4e62-482b-8b7d-09275985d6e2'::uuid),
    ('1377634f-dbfe-4a79-a2d3-a1d629d4f46c'::uuid, 'a37259c7-4e62-482b-8b7d-09275985d6e2'::uuid),
    ('a224dff9-f449-4313-bf90-0663e8b9bcb8'::uuid, 'a37259c7-4e62-482b-8b7d-09275985d6e2'::uuid),
    ('fd90bf16-7daa-41f1-a821-c2be9d5e0469'::uuid, 'a37259c7-4e62-482b-8b7d-09275985d6e2'::uuid),
    ('d12d1d0b-1628-492a-8e1b-46cd22ae15b5'::uuid, 'a37259c7-4e62-482b-8b7d-09275985d6e2'::uuid),
    ('a8e8d04d-a8ed-487f-9a8c-b8f9a5133d73'::uuid, 'a37259c7-4e62-482b-8b7d-09275985d6e2'::uuid),
    ('1dbf48de-823e-44b8-b25d-8724bce00087'::uuid, 'a37259c7-4e62-482b-8b7d-09275985d6e2'::uuid),
    ('31c0fb67-ac5e-4b40-b690-fe8cbf255948'::uuid, 'a37259c7-4e62-482b-8b7d-09275985d6e2'::uuid),
    ('0e228c98-6396-4c65-91b9-feda10e5ffb0'::uuid, 'a37259c7-4e62-482b-8b7d-09275985d6e2'::uuid),
    ('cdfdb794-cbfb-4329-8304-c20986cae576'::uuid, '223d5c68-4f9a-43aa-a6e5-82e781c9f079'::uuid),
    ('4f6fc5ff-58bb-4457-858a-7f57199efa0d'::uuid, '223d5c68-4f9a-43aa-a6e5-82e781c9f079'::uuid),
    ('22873fa4-78a3-40c6-8d34-edfa5f12b8e1'::uuid, '223d5c68-4f9a-43aa-a6e5-82e781c9f079'::uuid),
    ('20239a0e-8c5f-4b06-9b5a-5012eb108aee'::uuid, '223d5c68-4f9a-43aa-a6e5-82e781c9f079'::uuid),
    ('07f9fe7d-a915-4147-9cd8-5deb830ae618'::uuid, '223d5c68-4f9a-43aa-a6e5-82e781c9f079'::uuid),
    ('33bcc3b2-c271-4b61-9ce8-e7e25410b664'::uuid, '223d5c68-4f9a-43aa-a6e5-82e781c9f079'::uuid),
    ('9dc25f09-742a-4401-815a-8e9da40a33c6'::uuid, '223d5c68-4f9a-43aa-a6e5-82e781c9f079'::uuid),
    ('3756792d-6fb4-4ff2-8671-7a27c5118c5e'::uuid, 'dca6d2af-3c7b-4c9e-85c4-28f6e8f7e6e9'::uuid),
    ('e579798b-c6b2-4f98-ac1a-07d43b40e399'::uuid, 'dca6d2af-3c7b-4c9e-85c4-28f6e8f7e6e9'::uuid),
    ('f724c445-e135-45da-beba-69df14cbdb64'::uuid, 'dca6d2af-3c7b-4c9e-85c4-28f6e8f7e6e9'::uuid),
    ('85ba13ff-0a96-4478-9d31-947539d74f77'::uuid, 'dca6d2af-3c7b-4c9e-85c4-28f6e8f7e6e9'::uuid),
    ('57190eb6-d8d2-47c5-8d78-89f4f71f0d35'::uuid, 'dca6d2af-3c7b-4c9e-85c4-28f6e8f7e6e9'::uuid),
    ('dd9f8ed9-c3de-42da-9d84-36c1509f45b3'::uuid, 'dca6d2af-3c7b-4c9e-85c4-28f6e8f7e6e9'::uuid),
    ('e772c111-dad2-4c9c-bb50-f5230624166c'::uuid, 'dca6d2af-3c7b-4c9e-85c4-28f6e8f7e6e9'::uuid),
    ('edc2bd36-8983-49c4-8a14-aa9e55088840'::uuid, 'dca6d2af-3c7b-4c9e-85c4-28f6e8f7e6e9'::uuid),
    ('a8e8d04d-a8ed-487f-9a8c-b8f9a5133d73'::uuid, 'dca6d2af-3c7b-4c9e-85c4-28f6e8f7e6e9'::uuid),
    ('df41a59c-0692-484a-b6da-c73d3bf41125'::uuid, 'dca6d2af-3c7b-4c9e-85c4-28f6e8f7e6e9'::uuid),
    ('a671a089-291f-427b-9392-969fde3f5bb5'::uuid, 'dca6d2af-3c7b-4c9e-85c4-28f6e8f7e6e9'::uuid),
    ('20239a0e-8c5f-4b06-9b5a-5012eb108aee'::uuid, 'dca6d2af-3c7b-4c9e-85c4-28f6e8f7e6e9'::uuid),
    ('87ceddd1-e6e9-47c7-9084-d7089ca719af'::uuid, 'dca6d2af-3c7b-4c9e-85c4-28f6e8f7e6e9'::uuid),
    ('1913d9e6-fc6c-46b4-812a-d3bc85d9cd46'::uuid, 'dca6d2af-3c7b-4c9e-85c4-28f6e8f7e6e9'::uuid),
    ('6847a779-7bec-4b9a-82f8-7c427f6ac22a'::uuid, 'dca6d2af-3c7b-4c9e-85c4-28f6e8f7e6e9'::uuid),
    ('a2bccfb5-778b-4a36-a6b6-8a52dc67fc74'::uuid, 'dca6d2af-3c7b-4c9e-85c4-28f6e8f7e6e9'::uuid),
    ('979c6624-c33b-4847-8837-b7882bdf2f0d'::uuid, 'dca6d2af-3c7b-4c9e-85c4-28f6e8f7e6e9'::uuid),
    ('87f17d4f-a9be-474c-9759-473ff404a61a'::uuid, 'dca6d2af-3c7b-4c9e-85c4-28f6e8f7e6e9'::uuid),
    ('9dc25f09-742a-4401-815a-8e9da40a33c6'::uuid, 'dca6d2af-3c7b-4c9e-85c4-28f6e8f7e6e9'::uuid),
    ('8be352ef-fb4f-4088-88bc-686cf4853410'::uuid, 'dca6d2af-3c7b-4c9e-85c4-28f6e8f7e6e9'::uuid),
    ('fd90bf16-7daa-41f1-a821-c2be9d5e0469'::uuid, 'dca6d2af-3c7b-4c9e-85c4-28f6e8f7e6e9'::uuid),
    ('e77f0f3e-1651-490a-a392-8103943619de'::uuid, 'fa7e4f34-6ef9-4c0f-918e-3fb04b85a1e4'::uuid),
    ('1377634f-dbfe-4a79-a2d3-a1d629d4f46c'::uuid, 'fa7e4f34-6ef9-4c0f-918e-3fb04b85a1e4'::uuid),
    ('a2bccfb5-778b-4a36-a6b6-8a52dc67fc74'::uuid, 'fa7e4f34-6ef9-4c0f-918e-3fb04b85a1e4'::uuid),
    ('31c0fb67-ac5e-4b40-b690-fe8cbf255948'::uuid, 'fa7e4f34-6ef9-4c0f-918e-3fb04b85a1e4'::uuid),
    ('2bd7b9f0-a9e2-44a3-9f68-aa583f07851f'::uuid, 'fa7e4f34-6ef9-4c0f-918e-3fb04b85a1e4'::uuid),
    ('3d45a873-08da-4678-aa79-d0c790d794bc'::uuid, 'fa7e4f34-6ef9-4c0f-918e-3fb04b85a1e4'::uuid),
    ('7f740aee-746b-44c5-8949-77ab1dfd2fe1'::uuid, 'fa7e4f34-6ef9-4c0f-918e-3fb04b85a1e4'::uuid),
    ('17b76d96-9384-4fbe-9b6f-4cc850c9c64c'::uuid, 'fa7e4f34-6ef9-4c0f-918e-3fb04b85a1e4'::uuid),
    ('5f1c30f5-5f42-4e35-9da0-5bf42c8c1e1f'::uuid, 'fa7e4f34-6ef9-4c0f-918e-3fb04b85a1e4'::uuid),
    ('62e6747b-66f9-4403-ae08-c91027bdcbed'::uuid, 'fa7e4f34-6ef9-4c0f-918e-3fb04b85a1e4'::uuid),
    ('0e228c98-6396-4c65-91b9-feda10e5ffb0'::uuid, 'fa7e4f34-6ef9-4c0f-918e-3fb04b85a1e4'::uuid),
    ('3ab729d3-56dd-4090-9ff9-ac40059ff097'::uuid, 'fa7e4f34-6ef9-4c0f-918e-3fb04b85a1e4'::uuid),
    ('092cd952-2073-4fc7-a901-8bbd60e208ce'::uuid, 'fa7e4f34-6ef9-4c0f-918e-3fb04b85a1e4'::uuid),
    ('1913d9e6-fc6c-46b4-812a-d3bc85d9cd46'::uuid, 'fa7e4f34-6ef9-4c0f-918e-3fb04b85a1e4'::uuid),
    ('82e5dbeb-75b0-44d9-bb8f-8707f7b10c7c'::uuid, 'fa7e4f34-6ef9-4c0f-918e-3fb04b85a1e4'::uuid),
    ('4daf3490-4d51-4a9e-b184-36d42f447df2'::uuid, 'fa7e4f34-6ef9-4c0f-918e-3fb04b85a1e4'::uuid),
    ('eba7eded-1efb-4a37-b2ef-caffc81d954f'::uuid, 'cb0c06d9-56d0-477c-8ec8-4c6eb3cdbb5a'::uuid),
    ('324a2ae4-fd15-4edb-ae49-ed25c0a2e70f'::uuid, 'cb0c06d9-56d0-477c-8ec8-4c6eb3cdbb5a'::uuid),
    ('1377634f-dbfe-4a79-a2d3-a1d629d4f46c'::uuid, 'cb0c06d9-56d0-477c-8ec8-4c6eb3cdbb5a'::uuid),
    ('cdfdb794-cbfb-4329-8304-c20986cae576'::uuid, 'cb0c06d9-56d0-477c-8ec8-4c6eb3cdbb5a'::uuid),
    ('3ab729d3-56dd-4090-9ff9-ac40059ff097'::uuid, 'cb0c06d9-56d0-477c-8ec8-4c6eb3cdbb5a'::uuid),
    ('4dc3c511-ebd7-4458-bc51-4f4c57d5e491'::uuid, 'cb0c06d9-56d0-477c-8ec8-4c6eb3cdbb5a'::uuid),
    ('dc467917-46cd-48b6-8743-1de12611a4b3'::uuid, 'cb0c06d9-56d0-477c-8ec8-4c6eb3cdbb5a'::uuid),
    ('07f9fe7d-a915-4147-9cd8-5deb830ae618'::uuid, 'cb0c06d9-56d0-477c-8ec8-4c6eb3cdbb5a'::uuid),
    ('b2b0ae42-5bb2-481d-a5e7-e74e11890de5'::uuid, 'cb0c06d9-56d0-477c-8ec8-4c6eb3cdbb5a'::uuid),
    ('87f17d4f-a9be-474c-9759-473ff404a61a'::uuid, 'cb0c06d9-56d0-477c-8ec8-4c6eb3cdbb5a'::uuid),
    ('82e5dbeb-75b0-44d9-bb8f-8707f7b10c7c'::uuid, 'cb0c06d9-56d0-477c-8ec8-4c6eb3cdbb5a'::uuid),
    ('a671a089-291f-427b-9392-969fde3f5bb5'::uuid, 'cb0c06d9-56d0-477c-8ec8-4c6eb3cdbb5a'::uuid),
    ('332c68c6-e8bc-42d5-b782-2139b7f942ab'::uuid, 'ab81c11a-7d51-4e8b-b29c-9828a5d978bd'::uuid),
    ('cdfdb794-cbfb-4329-8304-c20986cae576'::uuid, 'ab81c11a-7d51-4e8b-b29c-9828a5d978bd'::uuid),
    ('9de41342-88d5-4ff4-8e6d-5e0b7c6d67c7'::uuid, 'ab81c11a-7d51-4e8b-b29c-9828a5d978bd'::uuid),
    ('62e6747b-66f9-4403-ae08-c91027bdcbed'::uuid, 'ab81c11a-7d51-4e8b-b29c-9828a5d978bd'::uuid),
    ('b2b0ae42-5bb2-481d-a5e7-e74e11890de5'::uuid, 'ab81c11a-7d51-4e8b-b29c-9828a5d978bd'::uuid),
    ('4776aba3-5860-4425-be14-48491f1eb4a5'::uuid, 'ab81c11a-7d51-4e8b-b29c-9828a5d978bd'::uuid),
    ('fd90bf16-7daa-41f1-a821-c2be9d5e0469'::uuid, 'ab81c11a-7d51-4e8b-b29c-9828a5d978bd'::uuid),
    ('36693ef2-0f14-463d-9930-bcdabfb002e0'::uuid, 'ab81c11a-7d51-4e8b-b29c-9828a5d978bd'::uuid),
    ('e9496372-2b39-40e6-8063-fb058b4ec067'::uuid, 'ab81c11a-7d51-4e8b-b29c-9828a5d978bd'::uuid),
    ('f2fbab68-7ce5-4205-9dcd-3644c907a894'::uuid, 'ab81c11a-7d51-4e8b-b29c-9828a5d978bd'::uuid),
    ('9dc25f09-742a-4401-815a-8e9da40a33c6'::uuid, 'ab81c11a-7d51-4e8b-b29c-9828a5d978bd'::uuid),
    ('73016385-c336-408f-b4ed-c39ad235cc26'::uuid, 'ab81c11a-7d51-4e8b-b29c-9828a5d978bd'::uuid),
    ('7f740aee-746b-44c5-8949-77ab1dfd2fe1'::uuid, 'ab81c11a-7d51-4e8b-b29c-9828a5d978bd'::uuid),
    ('c7813582-d94d-4a5d-8b97-d11a4a06f69a'::uuid, 'ab81c11a-7d51-4e8b-b29c-9828a5d978bd'::uuid),
    ('e579798b-c6b2-4f98-ac1a-07d43b40e399'::uuid, 'ab81c11a-7d51-4e8b-b29c-9828a5d978bd'::uuid),
    ('0e228c98-6396-4c65-91b9-feda10e5ffb0'::uuid, 'ab81c11a-7d51-4e8b-b29c-9828a5d978bd'::uuid),
    ('401898e8-f5ce-4094-9f1e-b023b58145fe'::uuid, 'ab81c11a-7d51-4e8b-b29c-9828a5d978bd'::uuid),
    ('dd9f8ed9-c3de-42da-9d84-36c1509f45b3'::uuid, 'ab81c11a-7d51-4e8b-b29c-9828a5d978bd'::uuid),
    ('07064ac0-72fa-4e02-a888-d0a85798835b'::uuid, 'ab81c11a-7d51-4e8b-b29c-9828a5d978bd'::uuid),
    ('4f6fc5ff-58bb-4457-858a-7f57199efa0d'::uuid, 'ab81c11a-7d51-4e8b-b29c-9828a5d978bd'::uuid),
    ('3756792d-6fb4-4ff2-8671-7a27c5118c5e'::uuid, 'ab81c11a-7d51-4e8b-b29c-9828a5d978bd'::uuid),
    ('1913d9e6-fc6c-46b4-812a-d3bc85d9cd46'::uuid, 'ab81c11a-7d51-4e8b-b29c-9828a5d978bd'::uuid),
    ('4c739a7a-193f-4c4c-bed4-66e2328049d9'::uuid, 'ab81c11a-7d51-4e8b-b29c-9828a5d978bd'::uuid),
    ('d84b7325-6ae4-4bf1-ad5d-470c74eac1b2'::uuid, 'ab81c11a-7d51-4e8b-b29c-9828a5d978bd'::uuid),
    ('20239a0e-8c5f-4b06-9b5a-5012eb108aee'::uuid, 'ab81c11a-7d51-4e8b-b29c-9828a5d978bd'::uuid),
    ('959b9db0-c8a7-43b2-92ad-268e00a8a2e8'::uuid, 'ab81c11a-7d51-4e8b-b29c-9828a5d978bd'::uuid),
    ('b6c539f8-9bf9-43d1-861a-72f4ca4da820'::uuid, 'ab81c11a-7d51-4e8b-b29c-9828a5d978bd'::uuid),
    ('dc12d875-e4eb-4c1d-9e5d-bdbc3271eeeb'::uuid, 'ab81c11a-7d51-4e8b-b29c-9828a5d978bd'::uuid),
    ('1dbf48de-823e-44b8-b25d-8724bce00087'::uuid, 'ab81c11a-7d51-4e8b-b29c-9828a5d978bd'::uuid),
    ('a0e6f652-b7c4-47d8-b88e-2a36111bf0c3'::uuid, 'ab81c11a-7d51-4e8b-b29c-9828a5d978bd'::uuid),
    ('85ba13ff-0a96-4478-9d31-947539d74f77'::uuid, 'ab81c11a-7d51-4e8b-b29c-9828a5d978bd'::uuid),
    ('eba7eded-1efb-4a37-b2ef-caffc81d954f'::uuid, 'ab81c11a-7d51-4e8b-b29c-9828a5d978bd'::uuid),
    ('071bd9f9-08be-4ade-ada4-3b44d510deb2'::uuid, 'ab81c11a-7d51-4e8b-b29c-9828a5d978bd'::uuid),
    ('c25cfaa8-cb63-45f5-b040-f5c3d2a1af0d'::uuid, 'ab81c11a-7d51-4e8b-b29c-9828a5d978bd'::uuid),
    ('dc467917-46cd-48b6-8743-1de12611a4b3'::uuid, 'ab81c11a-7d51-4e8b-b29c-9828a5d978bd'::uuid),
    ('a224dff9-f449-4313-bf90-0663e8b9bcb8'::uuid, 'ab81c11a-7d51-4e8b-b29c-9828a5d978bd'::uuid),
    ('07f9fe7d-a915-4147-9cd8-5deb830ae618'::uuid, 'ab81c11a-7d51-4e8b-b29c-9828a5d978bd'::uuid),
    ('181cf0ba-dfc9-4c4e-81aa-10e6349bf71f'::uuid, 'ab81c11a-7d51-4e8b-b29c-9828a5d978bd'::uuid),
    ('51403b31-5f9b-4c78-8e3f-0305a874e1e0'::uuid, 'ab81c11a-7d51-4e8b-b29c-9828a5d978bd'::uuid),
    ('3d45a873-08da-4678-aa79-d0c790d794bc'::uuid, 'ab81c11a-7d51-4e8b-b29c-9828a5d978bd'::uuid),
    ('fe41c54f-e43d-498e-b3a9-af5b546c94ef'::uuid, 'ab81c11a-7d51-4e8b-b29c-9828a5d978bd'::uuid),
    ('31c0fb67-ac5e-4b40-b690-fe8cbf255948'::uuid, 'ab81c11a-7d51-4e8b-b29c-9828a5d978bd'::uuid),
    ('9c9ae696-e9a5-45a9-9c86-c82cfcbaa06d'::uuid, 'ab81c11a-7d51-4e8b-b29c-9828a5d978bd'::uuid),
    ('71176a5c-df07-4af7-a6bc-7bd319d470b0'::uuid, 'ab81c11a-7d51-4e8b-b29c-9828a5d978bd'::uuid),
    ('1d34eb5f-77f6-4555-8df3-7e970d29e906'::uuid, 'ab81c11a-7d51-4e8b-b29c-9828a5d978bd'::uuid),
    ('0596f301-4bc4-4bee-a405-647f72ba981e'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid),
    ('a224dff9-f449-4313-bf90-0663e8b9bcb8'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid),
    ('31c0fb67-ac5e-4b40-b690-fe8cbf255948'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid),
    ('f2fbab68-7ce5-4205-9dcd-3644c907a894'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid),
    ('2bd7b9f0-a9e2-44a3-9f68-aa583f07851f'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid),
    ('edc2bd36-8983-49c4-8a14-aa9e55088840'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid),
    ('1913d9e6-fc6c-46b4-812a-d3bc85d9cd46'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid),
    ('b2b0ae42-5bb2-481d-a5e7-e74e11890de5'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid),
    ('87ceddd1-e6e9-47c7-9084-d7089ca719af'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid),
    ('5f1c30f5-5f42-4e35-9da0-5bf42c8c1e1f'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid),
    ('0a629a3c-daf0-43b8-8bea-b7203486bdd2'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid),
    ('2ad01c1a-2ac7-4c26-968f-72567046f79d'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid),
    ('40bab484-a95f-4866-a945-39ee49ee53cb'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid),
    ('1dbf48de-823e-44b8-b25d-8724bce00087'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid),
    ('d12d1d0b-1628-492a-8e1b-46cd22ae15b5'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid),
    ('a8e8d04d-a8ed-487f-9a8c-b8f9a5133d73'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid),
    ('87f17d4f-a9be-474c-9759-473ff404a61a'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid),
    ('a51cac9a-36ae-4ffb-93f2-7c27dd95bdb6'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid),
    ('9dc25f09-742a-4401-815a-8e9da40a33c6'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid),
    ('62e6747b-66f9-4403-ae08-c91027bdcbed'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid),
    ('3756792d-6fb4-4ff2-8671-7a27c5118c5e'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid),
    ('1d34eb5f-77f6-4555-8df3-7e970d29e906'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid),
    ('a2bccfb5-778b-4a36-a6b6-8a52dc67fc74'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid),
    ('4f6fc5ff-58bb-4457-858a-7f57199efa0d'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid),
    ('e772c111-dad2-4c9c-bb50-f5230624166c'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid),
    ('fd90bf16-7daa-41f1-a821-c2be9d5e0469'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid),
    ('e9496372-2b39-40e6-8063-fb058b4ec067'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid),
    ('f93a2906-bdc4-4618-bbf2-c40986109083'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid),
    ('8ed7d23f-87c9-4d96-8949-5db5fc9a24bc'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid),
    ('f1cd2c19-649a-4bf1-a1bc-171b8452d3fa'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid),
    ('dc467917-46cd-48b6-8743-1de12611a4b3'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid),
    ('a0e6f652-b7c4-47d8-b88e-2a36111bf0c3'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid),
    ('7f740aee-746b-44c5-8949-77ab1dfd2fe1'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid),
    ('142f5c6a-8560-4ce5-b93e-e868be6de759'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid),
    ('3ab729d3-56dd-4090-9ff9-ac40059ff097'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid),
    ('4776aba3-5860-4425-be14-48491f1eb4a5'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid),
    ('df41a59c-0692-484a-b6da-c73d3bf41125'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid),
    ('8be352ef-fb4f-4088-88bc-686cf4853410'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid),
    ('71176a5c-df07-4af7-a6bc-7bd319d470b0'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid),
    ('401898e8-f5ce-4094-9f1e-b023b58145fe'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid),
    ('fe41c54f-e43d-498e-b3a9-af5b546c94ef'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid),
    ('bb8e3fd4-42b6-4803-b02a-73e444709e38'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid),
    ('332c68c6-e8bc-42d5-b782-2139b7f942ab'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid),
    ('e3ccffa1-557c-4935-bad2-75b283071789'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid),
    ('1377634f-dbfe-4a79-a2d3-a1d629d4f46c'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid),
    ('3a6f6277-6a39-48a6-9a38-4bf937cd9743'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid),
    ('eaa85a07-40a4-4477-8e62-3b4cd56485a5'::uuid, 'bc5ab32a-90b6-4fa2-8d0b-3a9cceca29e3'::uuid);
