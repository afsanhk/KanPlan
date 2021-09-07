-- WITH days(day) AS (
--   VALUES ( 'Monday' ), ( 'Tuesday' ), ( 'Wednesday' ), ( 'Thursday' ), ( 'Friday' )
-- )
-- INSERT INTO days (name)
-- SELECT day FROM days;

-- WITH times(time) AS (
-- 	VALUES ('12pm'), ('1pm'), ('2pm'), ('3pm'), ('4pm')
-- )
-- INSERT INTO appointments (time, day_id)
-- SELECT time, id as day_id FROM days, times ORDER BY day_id, time;

-- INSERT INTO interviewers (name, avatar)
-- VALUES
--   ('Sylvia Palmer', 'https://i.imgur.com/LpaY82x.png'),
--   ('Tori Malcolm', 'https://i.imgur.com/Nmx0Qxo.png'),
--   ('Mildred Nazir', 'https://i.imgur.com/T2WwVfS.png'),
--   ('Cohana Roy', 'https://i.imgur.com/FK8V841.jpg'),
--   ('Sven Jones', 'https://i.imgur.com/twYrpay.jpg'),
--   ('Susan Reynolds', 'https://i.imgur.com/TdOAdde.jpg'),
--   ('Alec Quon', 'https://i.imgur.com/3tVgsra.jpg'),
--   ('Viktor Jain', 'https://i.imgur.com/iHq8K8Z.jpg'),
--   ('Lindsay Chu', 'https://i.imgur.com/nPywAp1.jpg'),
--   ('Samantha Stanic', 'https://i.imgur.com/okB9WKC.jpg');

-- INSERT INTO available_interviewers (day_id, interviewer_id)
-- SELECT 1 as day_id, interviewers.interviewer_id FROM ( SELECT id AS interviewer_id FROM interviewers ORDER BY RANDOM() LIMIT 5 ) interviewers;

-- INSERT INTO available_interviewers (day_id, interviewer_id)
-- SELECT 2 as day_id, interviewers.interviewer_id FROM ( SELECT id AS interviewer_id FROM interviewers ORDER BY RANDOM() LIMIT 5 ) interviewers;

-- INSERT INTO available_interviewers (day_id, interviewer_id)
-- SELECT 3 as day_id, interviewers.interviewer_id FROM ( SELECT id AS interviewer_id FROM interviewers ORDER BY RANDOM() LIMIT 5 ) interviewers;

-- INSERT INTO available_interviewers (day_id, interviewer_id)
-- SELECT 4 as day_id, interviewers.interviewer_id FROM ( SELECT id AS interviewer_id FROM interviewers ORDER BY RANDOM() LIMIT 5 ) interviewers;

-- INSERT INTO available_interviewers (day_id, interviewer_id)
-- SELECT 5 as day_id, interviewers.interviewer_id FROM ( SELECT id AS interviewer_id FROM interviewers ORDER BY RANDOM() LIMIT 5 ) interviewers;

-- WITH
-- appointments AS (
--   SELECT id as appointment_id, day_id FROM appointments ORDER BY RANDOM() LIMIT 10
-- ),
-- students(name) AS(
--   VALUES
--     ('Liam Martinez'),
--     ('Richard Wong'),
--     ('Lydia Miller-Jones'),
--     ('Archie Cohen'),
--     ('Chad Takahashi'),
--     ('Leopold Silvers'),
--     ('Maria Boucher'),
--     ('Jamal Jordan'),
--     ('Michael Chan-Montoya'),
--     ('Yuko Smith')
-- )
-- INSERT INTO interviews (student, appointment_id, interviewer_id)
-- SELECT
--   DISTINCT ON 
--   (s.name) name,
--   a.appointment_id AS appointment_id,
--   available_interviewers.interviewer_id AS interviewer_id
-- FROM (
--   SELECT
--     *, row_number() OVER(ORDER BY appointment_id) AS rnum
--   FROM appointments
-- ) AS a
-- JOIN (
--   SELECT
--     *, row_number() OVER(ORDER BY name) AS rnum
--   FROM students
-- ) AS s
-- ON a.rnum = s.rnum
-- JOIN available_interviewers
-- ON a.day_id = available_interviewers.day_id;

-- Users
INSERT INTO users (user_name, email)
VALUES 
  ('TJ Jung', 'thisis@email.com'), -- ID 1
  ('Afsanul Khan', '1@1.com'), -- ID 2
  ('Veronica Leung', 'chicken@soup.com'), -- ID 3
  ('Kleir Miranda', 'kleir@example.com'), -- ID 4
  ('Mitch Aldrich', 'mitch@example.com'), -- ID 5
  ('Beatrice Kwan', 'beatrice@example.com'), -- ID 6
  ('Maggie Zhao', 'maggie@example.com'), -- ID 7
  ('Eliza Wong', 'eliza@example.com'), -- ID 8
  ('Sarah Avery', 'sarah@example.com'), -- ID 9
  ('Matt Banks', 'matt@example.com'), -- ID 10
  ('Roshanak Akbarifar', 'roshanak@example.com'), -- ID 11
  ('Mohammad Mozaffari', 'mohammad@example.com'), -- ID 12
  ('David O', 'david@example.com'), -- ID 13
  ('Jamie Huff', 'jamie@example.com'), -- ID 14
  ('Mohamed Ali', 'mohamed@example.com'), -- ID 15
  ('Cathy Li', 'cathy@example.com'), -- ID 16
  ('Hadjira Haya', 'hadjira@example.com'), -- ID 17
  ('Shivani Konuguru', 'shivani@example.com'), -- ID 18
  ('Kathy Tam', 'kathy@example.com'), -- ID 19
  ('Emeka Asogwa', 'emeka@example.com'), -- ID 20
  ('Mona Waseem', 'mona@example.com'), -- ID 21
  ('Sarath Thampuran', 'sarath@example.com'), -- ID 22
  ('Farid Asadpour', 'farid@example.com'), -- ID 23
  ('Cameron Uniac', 'cameron@example.com'), -- ID 24
  ('Anthony Chan', 'anthony@example.com'), -- ID 25
  ('Catherine Hiu', 'catherine@example.com'), -- ID 26
  ('Lawrence Lin', 'lawrence@example.com'), -- ID 27
  ('Alex Mozgovoy', 'alex@example.com'), -- ID 28
  ('Yves Candau', 'yves@example.com'), -- ID 29
  ('Janice Han', 'janice@example.com'), -- ID 30
  ('Luana Teixeira', 'luana@example.com'), -- ID 31
  ('Raphaella Robles', 'raphaella@example.com'), -- ID 32
  ('Shaun Purslow', 'shaun@example.com'), -- ID 33
  ('Emmanuel Etti', 'emmanuel@example.com'), -- ID 34
  ('Ricardo Gomes', 'ricardo@example.com'), -- ID 35
  ('Iuliia Sutygina', 'iuliia@example.com'), -- ID 36
  ('Akshay Seth', 'akshay@example.com'), -- ID 37
  ('Victor Huang', 'victor@example.com'), -- ID 38
  ('Matt MacDonald', 'mattmacdonald@example.com'), -- ID 39
  ('Mathew McLeod', 'matmcleod@example.com'), -- ID 40
  ('Kyle Cruz', 'kyle@example.com'), -- ID 41
  ('Sylas Serne', 'sylas@example.com'), -- ID 42
  ('William Wang', 'william@example.com'), -- ID 43
  ('Minghui Tan', 'minghui@example.com'), -- ID 44
  ('Multi User', 'multi@example.com'); -- ID 45

-- Projects
INSERT INTO projects (proj_name, manager_id, proj_description)
VALUES 
  ('KanPlan', 1, 'KanPlan is a project management web app to make organizing your ideas easier!'), -- ID 1
  ('onlyFriends', 4, 'A tinder-style app to meet new friends with similar interests in your area.'), -- ID 2
  ('Dev Community', 7, 'A social media platform for developers to interact with each other across the globe.'), -- ID 3
  ('Fete', 9, 'An app for planning weddings.'), -- ID 4
  ('Form Generator', 11, 'An app that generates forms, similar to Google Forms.'), -- ID 5
  ('smartville', 13, 'An app that allows a user to take a better decision to buy a smart device'), -- ID 6
  ('NoshFeast', 16, 'An app focused on takeout orders. Users can order from and pick up at the restaurants.'), -- ID 7
  ('DateNite', 19, 'An app to help couples pick a date spot.'), -- ID 8
  ('healthbook', 21, 'healthbook is a patient-healthcare provider app that allows users and providers immediate access to online appointment scheduling, electronic health records, prescriptions, and patient-doctor communications from the ease and safety of their home.'), -- ID 9
  ('biblion', 23, 'An app where users can create posts about books they read'), -- ID 10
  ('SNIFFLES', 25, 'An app for dogs to find new friends within their area. Sharing similar features to dating apps.'), -- ID 11
  ('RegexViz', 28, 'A regular expression visualizer with syntax higlighting, step by step graph mode, and contextual information on the rules and syntax.'), -- ID 12
  ('Lotify', 30, 'A location-based to-do list - app pops up a reminder when you are near the location.'), -- ID 13
  ('findShelter', 33, 'A shelter management software - serve the homeless '), -- ID 14
  ('hotelCalifornia', 36, 'Allows conveners post last minute requests or chat real time with the hotel crew.'), -- ID 15
  ('Super Secret awesome amazing project', 39, 'Address independant delivery amazingness (Skip but way better)'), -- ID 16
  ('gg', 42, 'Social platform for reviewing and recommending video games.'); -- ID 17

INSERT INTO kanban_status (status)
VALUES 
  ('To-Do'), -- ID 1
  ('Late'), -- ID 2
  ('In Progress'), -- ID 3
  ('Done'); -- ID 4

INSERT INTO priorities (priority_name)
VALUES 
  ('None'), -- ID 1
  ('Low'), -- ID 2
  ('High'); -- ID 3

-- Project Members
INSERT INTO project_members(project_id, user_id)
VALUES
  (1,1), -- KanPlan
  (1,2),
  (1,3),
  (1,45),
  (2,4), -- OF
  (2,5), 
  (2,6),
  (2,45),
  (3,7), -- Dev Community
  (3,8),
  (4,9), -- Fete 
  (4,10),
  (5,11), -- Rosh and Mohammad
  (5,12),
  (6,13), -- David, Jamie and Mohamed
  (6,14),
  (6,15),
  (7,16), -- NoshFeast
  (7,17), 
  (7,18),
  (8,19), -- Kathy and Emeka
  (8,20),
  (9,21), -- Mona and Sarath
  (9,22),
  (10,23), -- Farid and Cameron
  (10,24),
  (11,25), -- Sniffles
  (11,26),
  (11,27),
  (12,28), -- RegexViz
  (12,29), 
  (13,30), -- Lotify
  (13,31),
  (13,32),
  (14,33), -- Find Shelter 
  (14,34),
  (14,35),
  (15,36), -- hotelCalifornia
  (15,37), 
  (15,38),
  (16,39), -- ssaap 
  (16,40),
  (16,41), 
  (17,42), -- gg
  (17,43),
  (17,44),

  -- TJ SUPER USER 
  (2,1),(3,1),(4,1),(5,1),(6,1),(7,1),(8,1),(9,1),(10,1),(11,1),(12,1),(13,1),(14,1),(15,1),(16,1),(17,1);

-- Tasks
INSERT INTO tasks (title, task_description, priority_id, status_id, project_id, plan_start, plan_end)
VALUES
-- Kanplan
  -- To-Do (ID1)
  ('API Routes', 'Set up API Routes', 2, 4, 1,'2021-08-27','2021-08-28'), -- These 3 are actually done now, but not moved due to ID requirements in task_users seeding.
  ('React Components', 'Build react components', 3, 4, 1,'2021-08-27','2021-09-01'),
  ('Kanban DnD', 'Build Kanban containers and drag and drop', 3, 4, 1,'2021-08-27','2021-09-01'),
  -- Late (ID2)
  ('Relax', 'Relax a bit', 1, 2, 1,'2021-08-13','2021-09-11'),
  -- In-progress (ID3)
  -- Done (ID4)
  ('Seeds', 'Making api seeds', 3, 4, 1,'2021-08-28','2021-08-28'),
  ('Gantt Research & Build', 'Find a good library to use for the gantt chart', 2, 4, 1,'2021-08-27','2021-09-02'),
  ('React Component - Storybook Testing', 'Test components in storybook', 1, 4, 1,'2021-08-27','2021-09-03'),
  ('Build out back-end', 'Make sure api, DB and server are all working okay', 3, 4, 1,'2021-08-31','2021-08-31'),
  ('ERD', 'Plan data relations with team', 2, 4, 1,'2021-08-25','2021-08-25'),
  ('Wireframes', 'Create wireframes for visual reference', 3, 4, 1,'2021-08-25','2021-08-26'),
  ('User Stories', 'Create user stories to develop ERD and Wireframes', 1, 4, 1,'2021-08-25','2021-08-25'),

-- OnlyFriends
  -- To-Do (ID1)
  ('Learn react-native', 'Mobile stuff is fun', 3, 1, 2,'2021-08-31','2021-12-12'),
  -- Late (ID2)
  ('Make friends', 'That''s why we''re making this app!', 3, 2, 2,'2021-08-31','2021-12-12'),
  -- In-progress (ID3)
  ('Figure out the back-end', 'Server no bueno', 2, 3, 2,'2021-08-31','2021-12-12'),
  -- Done (ID4)
  ('Figure out a name!', 'onlyFrands', 1, 4, 2,'2021-08-31','2021-12-12'),

-- DevCommunity 
  -- To-Do (ID1)
  ('Build the DBs', 'Mobile stuff is fun', 3, 1, 3,'2021-08-31','2021-12-12'),
  -- Late (ID2)
  ('Don''t stress', 'The entire bootcamp has been stress', 3, 2, 3,'2021-08-31','2021-12-12'),
  -- In-progress (ID3)
  ('Planning!', 'So many documents so little time.', 2, 3, 3,'2021-08-31','2021-12-12'),
  -- Done (ID4)
  ('Find teammates!', 'Eliza and Maggie gonna kill it!', 1, 4, 3,'2021-08-31','2021-12-12');

-- user_tasks
INSERT INTO user_tasks(task_id, user_id)
VALUES
-- KanPlan
  (1,2),
  (2,1),
  (2,2),
  (2,3),
  (3,1),
  (4,1),
  (4,2),
  (4,3),
  (5,1),
  (5,2),
  (6,1),
  (6,2),
  (7,3),
  (8,1),
  (8,2),
  (9,1),
  (9,2),
  (9,3),
  (10,3),
  (11,1),
  (11,2),
  (11,3),
-- OnlyFrands
  (12,4),
  (12,5),
  (12,6),
  (13,4),
  (13,5),
  (13,6),
  (14,4),
  (14,5),
  (15,4),
  (15,5),
  (15,6),
-- DevCommunity
  (16,7),
  (17,8),
  (18,7),
  (19,8);

-- Further seeds 
INSERT INTO tasks (title, task_description, priority_id, status_id, project_id, plan_start, plan_end)
VALUES
-- Kanplan(ID1)
  -- To-Do (ID1)
  ('Practice demos', 'Prepare pitch and flow', 2, 1, 1, '2021-09-07','2021-09-07'),
  ('Dry run demo!', 'Show the mentors our work...', 1, 1, 1, '2021-09-08','2021-09-08'),
  ('Demo the project!', 'Time to show everyone what we''ve been working on!', 3, 1, 1, '2021-09-09','2021-09-09'),
  ('Enjoy some well-deserved time off.', 'Bootcamp is over!', 1, 1, 1, '2021-09-09','2021-09-30'),
  -- Late (ID2)

  -- In-progress (ID3)
  ('Small bug and styling fixes', 'Polishing up the app.', 3,3,1,'2021-09-03','2021-09-06'),

  -- Done (ID4)
  ('Find teammates!', 'TJ, Veronica and Afsan', 1, 4, 1, '2021-08-10','2021-08-13'),
  ('What features to work on?', 'Drag n Drop, Gantt Chart', 2, 4, 1, '2021-08-13','2021-08-25'),
  ('Agree on project', 'Project Management', 3, 4, 1, '2021-08-13','2021-08-25'),
  ('Decide stack', 'PostgreSQL,Express, React, Node', 3, 4, 1, '2021-08-23','2021-08-25'),
  ('Build user dashboard', 'Storybook testing and react renderimg', 3, 4, 1, '2021-08-27','2021-09-02');

INSERT INTO user_tasks(task_id, user_id)
VALUES
  (20,1), (20,2), (20,3),
  (21,1), (21,2), (21,3),
  (22,1), (22,2), (22,3),
  (23,1), (23,2), (23,3),
  (24,1), (24,2), (24,3),
  (25,1), (25,2), (25,3),
  (26,1), (26,2), (26,3),
  (27,1), (27,2), (27,3),
  (28,1), (28,2), (28,3),
                  (29,3);

-- Messages
INSERT INTO messages (user_id, message_text, created_at)
VALUES
  (1, 'What is KanPlan?', '2021-09-01 08:33:33'),
  (2, 'KanPlan is a project management web app to make organizing your ideas easier!', '2021-09-01 09:15:00'),
  (1, 'How does it work?', '2021-09-01 13:10:00'),
  (3, 'KanPlan has 5 different pages which can help with project management: 1. Project Dashboard, 2. All projects, 3. Project Overview, 4. Gantt Chart, and 5. Kanban', '2021-09-03 15:15:00'),
  (1, 'Awesome!', '2021-09-04 16:20:00'),
  (1, 'Is there anything else you can do on the website?','2021-09-04 16:21:00'),
  (3, 'So much! We have a pomodoro timer if you need help with time management and...','2021-09-04 16:21:00'),
  (2, 'We also have a chat room where all the users can ask questions!','2021-09-04 16:26:00'),
  (2, 'Do you have any other questions?', '2021-09-05 14:25:00'),
  (1, 'That sounds great - I wonder what else you''ll add in the future!', '2021-09-05 14:30:00');