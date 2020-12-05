CREATE TABLE blockbuster(
"Title" TEXT PRIMARY KEY,
"Genre" TEXT,
"Rating" VARCHAR,
"Year" INT,
"Worldwide_Gross" Float,
"Studio" Text);

CREATE TABLE imdb(
"Title" TEXT PRIMARY KEY,
"Director" TEXT,
"Actors" TEXT,
"Rating" FLOAT,
"Votes" INT,
"Revenue" FLOAT,
"Metascore" FLOAT);

CREATE TABLE tmdb(
"Title" TEXT PRIMARY KEY,
"Budget" INT,
"Runtime" INT);

SELECT * FROM blockbuster;
SELECT * FROM imdb;
SELECT * FROM tmbd;

DROP TABLE blockbuster;
DROP TABLE imdb;
DROP TABLE tmdb;

SELECT b."Title", b."Genre", i."Rating", t."Budget", b."Year", b."Worldwide_Gross", (b."Worldwide_Gross" / t."Budget") AS "Return"
FROM blockbuster b
INNER JOIN imdb i
ON b."Title" = i."Title"
INNER JOIN tmdb t
ON i."Title" = t."Title"
ORDER BY b."Worldwide_Gross" DESC
LIMIT 10;
