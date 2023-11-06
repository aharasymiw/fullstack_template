-- db_name="thing_db"

-- Import dependency for using uuid
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create thing table
CREATE TABLE "thing" (
	uuid UUID DEFAULT uuid_generate_v4 (),
    thing_description VARCHAR(255) NOT NULL,
	thing_status BOOLEAN NOT NULL DEFAULT FALSE
);

-- Populate the table table with some default data, so we have some things.
INSERT INTO "thing"
    ("uuid", "thing_description")
VALUES
	('dc39c393-a720-41df-b7f9-34f89c6c6524', 'thing 1'),
	('3b30ce35-c459-403a-8b57-b3a304f50404', 'thing 2'),
	('a50b24a8-a94c-478b-9fb6-85714f2d664f', 'thing 3'),
	('51566df7-2118-49c3-88c3-b553f0753b28', 'thing 4'),
	('4ce2d494-1a78-4aa0-a628-00cbabb09c4f', 'thing 5');

