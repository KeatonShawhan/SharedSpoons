-- Users Table
DROP TABLE IF EXISTS user CASCADE;
CREATE TABLE user (
    id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),
    data jsonb
);

-- Posts Table
DROP TABLE IF EXISTS post CASCADE;
CREATE TABLE post (
    id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES user(id) ON DELETE CASCADE,
    data jsonb
);

-- Sponsors Table
DROP TABLE IF EXISTS sponsor CASCADE;
CREATE TABLE sponsor (
    id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),
    active BOOLEAN,
    data jsonb
);

-- Follow Table
DROP TABLE IF EXISTS follow CASCADE;
CREATE TABLE follow (
    sender UUID REFERENCES user(id) ON DELETE CASCADE,
    receiver UUID REFERENCES user(id) ON DELETE CASCADE,
    PRIMARY KEY (sender, receiver),
    CHECK (sender != receiver)
);

-- To Eat Table
DROP TABLE IF EXISTS toEat CASCADE;
CREATE TABLE toEat (
    post_id UUID REFERENCES post(id) ON DELETE CASCADE,
    user_id UUID REFERENCES user(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, user_id)
);

-- Recommend Table
DROP TABLE IF EXISTS review CASCADE;
CREATE TABLE recommend (
    user_id UUID REFERENCES user(id) ON DELETE CASCADE,
    dish TEXT NOT NULL,
    rating INT CHECK (rating >= 0 AND rating <= 5),
    PRIMARY KEY (user_id, dish)
);

