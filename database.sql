CREATE TABLE "Users" (
	"user_id" serial NOT NULL,
	"email" varchar(50) NOT NULL UNIQUE,
	"username" serial(30) NOT NULL,
	"first_name" serial(15) NOT NULL,
	"last_name" serial(30) NOT NULL,
	"DateCreated" DATE NOT NULL UNIQUE,
	"personId" varchar(36) NOT NULL UNIQUE,
	CONSTRAINT "Users_pk" PRIMARY KEY ("user_id")
);


CREATE TABLE "Mesages" (
	"id" serial NOT NULL,
	"receiver_id" VARCHAR(500) NOT NULL,
	"sender_id" integer NOT NULL,
	"message" VARCHAR(500) NOT NULL,
	"date_created" DATETIME NOT NULL,
	CONSTRAINT "Mesages_pk" PRIMARY KEY ("id")
);



CREATE TABLE "Contacts" (
	"id" serial NOT NULL,
	"user_id" BINARY NOT NULL,
	"contact_id" integer NOT NULL,
	CONSTRAINT "Contacts_pk" PRIMARY KEY ("id")
);



CREATE TABLE "Faces" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"Type" varchar(255) NOT NULL,
	"faceIdNumber" varchar(36) NOT NULL UNIQUE,
	CONSTRAINT "Faces_pk" PRIMARY KEY ("id")
);



ALTER TABLE "UserGroupLinks" ADD CONSTRAINT "UserGroupLinks_fk0" FOREIGN KEY ("group_id") REFERENCES "Groups"("id");

ALTER TABLE "Mesages" ADD CONSTRAINT "Mesages_fk0" FOREIGN KEY ("receiver_id") REFERENCES "Users"("user_id");
ALTER TABLE "Mesages" ADD CONSTRAINT "Mesages_fk1" FOREIGN KEY ("sender_id") REFERENCES "Users"("user_id");

ALTER TABLE "Contacts" ADD CONSTRAINT "Contacts_fk0" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id");
ALTER TABLE "Contacts" ADD CONSTRAINT "Contacts_fk1" FOREIGN KEY ("contact_id") REFERENCES "Users"("user_id");

ALTER TABLE "Faces" ADD CONSTRAINT "Faces_fk0" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id");

