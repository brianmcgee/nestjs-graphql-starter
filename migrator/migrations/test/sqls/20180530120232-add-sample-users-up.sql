/* Replace with your SQL commands */


/* Password is '!Pa55word' */
INSERT INTO "user" VALUES
  (2, 'test+1@example.com', '$2a$10$HIzR7/pKnWJCpFJn1Ihb7OryhJkYeCzxWiBsIU2/hI3064Vy8iRvG', 'Test', 'User 1', NOW(), NOW()),
  (3, 'test+2@example.com', '$2a$10$HIzR7/pKnWJCpFJn1Ihb7OryhJkYeCzxWiBsIU2/hI3064Vy8iRvG', 'Test', 'User 2', NOW(), NOW()),
  (4, 'test+3@example.com', '$2a$10$HIzR7/pKnWJCpFJn1Ihb7OryhJkYeCzxWiBsIU2/hI3064Vy8iRvG', 'Test', 'User 3', NOW(), NOW()),
  (5, 'test+4@example.com', '$2a$10$HIzR7/pKnWJCpFJn1Ihb7OryhJkYeCzxWiBsIU2/hI3064Vy8iRvG', 'Test', 'User 4', NOW(), NOW()),
  (6, 'test+5@example.com', '$2a$10$HIzR7/pKnWJCpFJn1Ihb7OryhJkYeCzxWiBsIU2/hI3064Vy8iRvG', 'Test', 'User 5', NOW(), NOW()),
  (7, 'test+6@example.com', '$2a$10$HIzR7/pKnWJCpFJn1Ihb7OryhJkYeCzxWiBsIU2/hI3064Vy8iRvG', 'Test', 'User 6', NOW(), NOW()),
  (8, 'test+7@example.com', '$2a$10$HIzR7/pKnWJCpFJn1Ihb7OryhJkYeCzxWiBsIU2/hI3064Vy8iRvG', 'Test', 'User 7', NOW(), NOW()),
  (9, 'test+8@example.com', '$2a$10$HIzR7/pKnWJCpFJn1Ihb7OryhJkYeCzxWiBsIU2/hI3064Vy8iRvG', 'Test', 'User 8', NOW(), NOW()),
  (10, 'test+9@example.com', '$2a$10$HIzR7/pKnWJCpFJn1Ihb7OryhJkYeCzxWiBsIU2/hI3064Vy8iRvG', 'Test', 'User 9', NOW(), NOW()),
  (11, 'test+10@example.com', '$2a$10$HIzR7/pKnWJCpFJn1Ihb7OryhJkYeCzxWiBsIU2/hI3064Vy8iRvG', 'Test', 'User 10', NOW(), NOW());


ALTER SEQUENCE user_id_seq RESTART WITH 12;
