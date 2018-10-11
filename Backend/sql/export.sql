/* Delete Rows already in import Database Tables */
/*    Design Based on RE Database */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/*    Last Edited: Cooper Brindle 24/05/2018 12:14pm*/


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

DELETE FROM EVENTCONSTITUENTEXPORT 
WHERE (id, eventname)
       IN
      (SELECT id, eventname  FROM EVENTCONSTITUENT);

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

SELECT *
FROM CONSTITUENTEXPORT
INTO OUTFILE '/root/export.csv' 
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\r\n';