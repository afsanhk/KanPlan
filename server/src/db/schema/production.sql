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
INSERT INTO users (name, email)

INSERT INTO projects (name, manager_id, description)
VALUES ('KanPlan', 1, 'Project management(not boring!)')

WITH
name AS (
  VALUES
    ('To-Do'),
    ('Late'),
    ('In Progress'),
    ('Done')
)
INSERT INTO kanban_status (name)

INSERT INTO tasks (title, description, priority, status_id, project_id)
VALUES ('Seeds', 'Making api seeds', 'High', 3, 1)