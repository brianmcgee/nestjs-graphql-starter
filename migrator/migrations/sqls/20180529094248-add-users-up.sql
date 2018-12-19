/* Replace with your SQL commands */

CREATE TABLE "user" (
  id          SERIAL PRIMARY KEY,
  email       VARCHAR(128) NOT NULL UNIQUE ,
  password    VARCHAR(128) NOT NULL,
  first_name   VARCHAR(64)  NULL,
  family_name VARCHAR(128) NULL,
  created_at  TIMESTAMP    NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMP    NOT NULL DEFAULT NOW()
);

/* Password is '!Pa55word' */
INSERT INTO "user" VALUES (
  1,
  'admin@example.com',
  '$2a$10$HIzR7/pKnWJCpFJn1Ihb7OryhJkYeCzxWiBsIU2/hI3064Vy8iRvG',
  'Default',
  'User',
  NOW(),
  NOW()
);

ALTER SEQUENCE user_id_seq RESTART WITH 2;
