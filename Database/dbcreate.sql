/* Create Database Tables
    Design Based on RE Database

    Last Edited: Cooper Brindle 14/05/2018 12:14pm
*/

/* Constituent Table */

/* Cooper 14/05/18 */
CREATE TABLE CONSTITUENT(
    constituentid   VARCHAR(100)    NOT NULL, /* Universal Unique Identifier */
    keyname         VARCHAR(100)	NOT NULL, /* Constituent Surname */
    firstname       VARCHAR(50)     NOT NULL, /* Constituent First Name */
    middlename      VARCHAR(50)     NULL, /* Constituent Middlename */
    maidenname      VARCHAR(100)    NULL, /* Constituent Maidenname */
    nickname        VARCHAR(50)     NULL, /* Preferred name */
    /* Gendercode   */
    birthdate       VARCHAR(8)      NOT NULL, /* Constituent Birth Date ie 27101996 */
    isinactive      BINARY(1)       NOT NULL, /* Are the an active Alumni Member */ /* Get active definition */
    givesanonymously BINARY(1)      NOT NULL, /* Donor Status */
    

);