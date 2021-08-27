WITH 
name AS (
  VALUES
    ('TJ Tung'),
    ('Afsanul Khan'),
    ('Veronica Leung')
),
email AS (
  VALUES
    ('taejin5314@gmail.com'),
    ('afsanhk@gmail.com'),
    ('tungtungleung233@hotmail.com')
)
INSERT INTO users (user_name, email)

INSERT INTO projects (proj_name, manager_id, proj_description)
VALUES ('KanPlan', 1, 'Project management(not boring!)')

WITH
name AS (
  VALUES
    ('To-Do'),
    ('Late'),
    ('In Progress'),
    ('Done')
)
INSERT INTO kanban_status (status)

INSERT INTO priority (priority_name)
VALUES 
  ('None'), -- ID 1
  ('Low'), -- ID 2
  ('High'), -- ID 3

INSERT INTO tasks (title, task_description, priority_id, status_id, project_id)
VALUES ('Seeds', 'Making api seeds', 3, 3, 1)