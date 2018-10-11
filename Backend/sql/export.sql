/* Delete Rows already in import Database Tables */
/*    Design Based on RE Database */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/*    Last Edited: Cooper Brindle 24/05/2018 12:14pm*/


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */


/* Delete all rows that have already been re-imported from RE */
DELETE FROM EVENTCONSTITUENTEXPORT 
WHERE (id, eventname)
       IN
      (SELECT id, eventname  FROM EVENTCONSTITUENT);

DELETE FROM EVENTGUESTEXPORT 
WHERE (id, eventname)
       IN
      (SELECT id, eventname  FROM EVENTGUEST);

DELETE FROM LIBRARYMEMEXPORT
WHERE (id)
       IN
      (SELECT id FROM LIBRARYMEM);

DELETE FROM CONSTITUENTEXPORT
WHERE (id, stdNum, birthDate, title, firstName, nickname, middleName, lastName, maidenName, 
            orgName, position, 
            address, suburb, state, county, postcode, country,
            email, emailOther, linkedIn, mobile, postSub, mobileSub, emailSub, promotions, outlook)
       IN
      (SELECT * FROM CONSTITUENT);

/* Export tables to a .csv file */

SELECT *
FROM EVENTCONSTITUENTEXPORT
INTO OUTFILE '/tmp/eventconexport.csv' 
FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n';

SELECT *
INTO OUTFILE '/tmp/eventguestexport.csv' 
FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
FROM EVENTGUESTEXPORT;

SELECT *
INTO OUTFILE '/tmp/libmemexport.csv' 
FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
FROM LIBRARYMEMEXPORT;

SELECT *
INTO OUTFILE '/tmp/constexport.csv' 
FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
FROM CONSTITUENTEXPORT;

