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