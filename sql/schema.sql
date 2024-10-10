
DROP TABLE IF EXISTS fruit CASCADE;

CREATE TABLE fruit(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), data jsonb);

