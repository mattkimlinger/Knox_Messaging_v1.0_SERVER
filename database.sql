CREATE TABLE users (
	id serial NOT NULL,
	password varchar NOT NULL,
	email varchar(50) NOT NULL UNIQUE,
	username varchar(30) NOT NULL,
	first_name varchar(15) NOT NULL,
	last_name varchar(30) NOT NULL,
	date_created DATE NOT NULL,
	personId varchar(36) UNIQUE,
	CONSTRAINT users_pk PRIMARY KEY (id)
);

CREATE TABLE messages (
	id serial NOT NULL,
	conversation_id INTEGER NOT NULL,
	receiver_id integer NOT NULL,
	sender_id integer NOT NULL,
	message VARCHAR(500) NOT NULL,
	date_time_created TIMESTAMP NOT NULL default CURRENT_TIMESTAMP,
	CONSTRAINT messages_pk PRIMARY KEY (id)
);

CREATE TABLE conversations (
	id serial NOT NULL,
	receiver_id integer NOT NULL,
	sender_id integer NOT NULL,
	last_message VARCHAR(640) NOT NULL,
	user_read_message BOOLEAN DEFAULT false,
	CONSTRAINT conversations_pk PRIMARY KEY (id)
);


CREATE TABLE contacts (
	id serial NOT NULL,
	user_id integer NOT NULL,
	contact_id integer NOT NULL,
	CONSTRAINT contacts_pk PRIMARY KEY (id)
);



CREATE TABLE faces (
	id serial NOT NULL,
	user_id integer NOT NULL,
	Type varchar(255) NOT NULL,
	faceIdNumber varchar(36) NOT NULL UNIQUE,
	CONSTRAINT faces_pk PRIMARY KEY (id)
);

ALTER TABLE messages ADD CONSTRAINT messages_fk0 FOREIGN KEY (receiver_id) REFERENCES users(id);

ALTER TABLE messages ADD CONSTRAINT messages_fk1 FOREIGN KEY (sender_id) REFERENCES users(id);
ALTER TABLE contacts ADD CONSTRAINT contacts_fk0 FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE contacts ADD CONSTRAINT contacts_fk1 FOREIGN KEY (contact_id) REFERENCES users(id);
ALTER TABLE faces ADD CONSTRAINT faces_fk0 FOREIGN KEY (user_id) REFERENCES users(id);


INSERT INTO users (username, first_name, last_name, email, password, date_created, personId)
VALUES ('Mkimlinger', 'Matt', 'Kimlinger', 'Mkimlinger123@gmail.com', '$2a$10$F6YtZ8x.P.z9Z3z/K.mxheTWsIRGSZyqa1hxNvBi1V2QLB0qQGwE.', '2020-03-20', null);

INSERT INTO users (username, first_name, last_name, email, password, date_created, personId)
VALUES ('JohnDoe', 'John', 'Doe', 'JohnDoe@gmail.com', '$2a$10$F6YtZ8x.P.z9Z3z/K.mxheTWsIRGSZyqa1hxNvBi1V2QLB0qQGwE.', '2020-03-20', null);

INSERT INTO users (username, first_name, last_name, email, password, date_created, personId)
VALUES ('JaneDoe', 'Jane', 'Doe', 'JaneDoe@gmail.com', '$2a$10$F6YtZ8x.P.z9Z3z/K.mxheTWsIRGSZyqa1hxNvBi1V2QLB0qQGwE.', '2020-03-20', null);

INSERT INTO users (username, first_name, last_name, email, password, date_created, personId)
VALUES ('JaneDoe', 'Jane', 'Doe', 'JaneDoe@gmail.com', '$2a$10$F6YtZ8x.P.z9Z3z/K.mxheTWsIRGSZyqa1hxNvBi1V2QLB0qQGwE.', '2020-03-20', null);


INSERT INTO contacts (user_id, contact_id)
VALUES (1, 2);

INSERT INTO contacts (user_id, contact_id)
VALUES (1, 3);

INSERT INTO contacts (user_id, contact_id)
VALUES (2, 1);

INSERT INTO contacts (user_id, contact_id)
VALUES (2, 3);

INSERT INTO contacts (user_id, contact_id)
VALUES (3, 1);

INSERT INTO contacts (user_id, contact_id)
VALUES (3, 2);





CREATE TABLE messages (
	id serial NOT NULL,
	conversation_id INTEGER NOT NULL,
	receiver_id integer NOT NULL,
	sender_id integer NOT NULL,
	message VARCHAR(500) NOT NULL,
	date_time_created TIMESTAMP NOT NULL default CURRENT_TIMESTAMP,
	CONSTRAINT messages_pk PRIMARY KEY (id)
);


INSERT INTO messages ( conversation_id, receiver_id, sender_id, message)
VALUES ( 1, 2, 1, 'Hey john, its matt');



INSERT INTO messages ( conversation_id, receiver_id, sender_id, message)
VALUES ( 1, 1, 2, 'Oh hey Matt. It is I, John!');

INSERT INTO messages ( conversation_id, receiver_id, sender_id, message)
VALUES ( 2, 1, 3, 'Hey Matt have you been talking to John lately? this is Jane btw.');

INSERT INTO messages ( conversation_id, receiver_id, sender_id, message)
VALUES ( 2, 3, 1, 'Yes I have been talking to John, Jane!');

INSERT INTO messages ( conversation_id, receiver_id, sender_id, message)
VALUES ( 1, 2, 3, 'Hey john, its Jane, how ya been');



INSERT INTO conversations ( receiver_id, sender_id, last_message, user_read_message)
VALUES ( 1, 2, 'Oh hey Matt. It is I, John!', false);

INSERT INTO conversations ( receiver_id, sender_id, last_message, user_read_message)
VALUES ( 3, 1, 'Yes I have been talking to John, Jane', false);

INSERT INTO conversations ( receiver_id, sender_id, last_message, user_read_message)
VALUES ( 2, 3, 'Hey john, its Jane, how ya been', false);


UPDATE conversations
SET receiver_id = 3,
sender_id = 1,
last_message = 'Yes I have been talking to John, Jane'
WHERE sender_id = 1
AND receiver_id = 3
OR receiver_id = 1
ANd sender_id = 3;