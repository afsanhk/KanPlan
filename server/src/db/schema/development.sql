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
  ('Minghui Tan', 'minghui@example.com'); -- ID 44

INSERT INTO projects (proj_name, manager_id, proj_description)
VALUES 
  ('KanPlan', 1, 'Project management(not boring!)'), -- ID 1
  ('onlyFriends', 4, 'A tinder-style app to meet new friends with similar interests in your area'), -- ID 2
  ('Dev Community', 7, 'A social media platform for developers to interact with each other across the globe.'), -- ID 3
  ('Fete', 9, 'TBD'), -- ID 4
  ('Roshanak and Mohammads Project', 11, 'TBD'), -- ID 5
  ('David, Jamie and Mohameds Project', 13, 'TBD'), -- ID 6
  ('NoshFeast', 16, 'An app focused on takeout orders; Users can order from and pick up at the restaurants.'), -- ID 7
  ('Kathy and Emekas Project', 19, 'TBD'), -- ID 8
  ('Mona and Saraths Project', 21, 'TBD'), -- ID 9
  ('Farid and Camerons Project', 23, 'TBD'), -- ID 10
  ('SNIFFLES', 25, 'An app to discover other dog owners within your area sharing similar features to dating apps.'), -- ID 11
  ('RegexViz', 28, 'A regular expression visualizer with syntax higlighting,step by step graph mode, and contextual information on the rules and syntax.'), -- ID 12
  ('Lotify', 30, 'A location-based to-do list - app pops up a reminder when you are near the location.'), -- ID 13
  ('findShelter', 33, 'A shelter management software - serve the homeless '), -- ID 14
  ('hotelCalifornia', 36, 'Allows conveners post last minute requests or chat real time with the hotel crue'), -- ID 15
  ('Super Secret awesome amazing project', 39, 'Address independant delivery amazingness (Skip but way better)'), -- ID 16
  ('gg', 42, 'social platform for reviewing and recommending video games'); -- ID 17

INSERT INTO kanban_status (status)
VALUES 
  ('To-Do'), -- ID 1
  ('Late'), -- ID 2
  ('In Progress'), -- ID 3
  ('Done'); -- ID 4

INSERT INTO priority (status)
VALUES 
  ('None'), -- ID 1
  ('Low'), -- ID 2
  ('High'), -- ID 3

INSERT INTO tasks (title, task_description, priority_id, status_id, project_id)
VALUES 
  ('Seeds', 'Making api seeds', 3, 3, 1);