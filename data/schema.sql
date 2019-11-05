DROP TABLE IF EXISTS stats;
CREATE TABLE stats (
  id SERIAL PRIMARY KEY,
  org VARCHAR(255),
  collaborator VARCHAR(255),
  pullrequest VARCHAR(255),
  mergerequest VARCHAR(255),
  image_url VARCHAR(255),
  description TEXT,
  statpage VARCHAR(255)
  );