-- USER is a reserved keyword with Postgres
-- You MUST use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

DROP TABLE "repertoire";
DROP TABLE "gigs";
DROP TABLE "rep_by_gig";
DROP TABLE "composers" CASCADE;

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "repertoire" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT NOT NULL REFERENCES "user",
	"title" VARCHAR(500) NOT NULL,
	"composer_id" INT NOT NULL REFERENCES "composers",
	"collection" VARCHAR(255),
	"notes" VARCHAR(1000),
	"scorelink" VARCHAR(512),
	"reclink" VARCHAR(512)
);

CREATE TABLE "gigs" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT NOT NULL REFERENCES "user",
	"date" DATE NOT NULL,
	"ensemble" VARCHAR(255) NOT NULL,
	"show" VARCHAR(128),
	"fee" INT,
	"venue" VARCHAR(255),
	"notes" VARCHAR(1000)
);

CREATE TABLE "composers" (
	"id" SERIAL PRIMARY KEY,
	"firstname" VARCHAR(255) NOT NULL,
	"lastname" VARCHAR(255) NOT NULL,
	"period" VARCHAR(50) NOT NULL,
	"nationality" VARCHAR(75) NOT NULL,
	"school" VARCHAR(255),
	"yob" INT,
	"yod" INT,
	"notes" VARCHAR(1000)
);
	
CREATE TABLE "rep_by_gig" (
	"id" SERIAL PRIMARY KEY,
	"rep_id" INT REFERENCES "repertoire",
	"gig_id" INT REFERENCES "gigs"
);

INSERT INTO "composers" ("firstname", "lastname", "period", "nationality", "yob", "yod")
VALUES 	('Johann Sebastian', 'Bach', 'Baroque', 'German', '1685', '1750'),
		('Wolfgang Amadeus', 'Mozart', 'Classical', 'Austrian', '1758', '1797'),
		('Ludwig van', 'Beethoven', 'Romantic', 'German', '1770', '1827');

INSERT INTO "repertoire" ("user_id", "title", "composer_id", "scorelink", "reclink")
VALUES 	('4', 'Ich habe genug', '2', 'https://imslp.org/wiki/Ich_habe_genug,_BWV_82_(Bach,_Johann_Sebastian)', 'https://www.youtube.com/watch?v=Q_5DG9BD-SU'),
		('4', 'Passacaglia and Fugue in C minor', '2', 'https://imslp.org/wiki/Passacaglia_in_C_minor,_BWV_582_(Bach,_Johann_Sebastian)', 'youtube.com/watch?v=zzBXZ__LN_M');