/* Create Database Tables
    Design Based on RE Database

    Last Edited: Cooper Brindle 14/05/2018 12:14pm
*/

/* Constituent Table */

/* Cooper 14/05/18 */
CREATE TABLE CONSTITUENT(
    constituentid   VARCHAR(100)    NOT NULL, /* Universal Unique Identifier */ /* check storage method */
    keyname         VARCHAR(100)	NOT NULL, /* Constituent Surname */
    firstname       VARCHAR(50)     NOT NULL, /* Constituent First Name */
    middlename      VARCHAR(50)     NULL, /* Constituent Middlename */
    maidenname      VARCHAR(100)    NULL, /* Constituent Maidenname */
    nickname        VARCHAR(50)     NULL, /* Preferred name */
    #SSN
    #SSNIndex
    #Title Code ID
    #Suffix Code ID
    #Gendercode
    birthdate       VARCHAR(8)      NOT NULL, /* Constituent Birth Date ie 27101996 */
    isinactive      BINARY(1)       NOT NULL, /* Are the an active Alumni Member */ /* Get active definition */
    givesanonymously BINARY(1)      NOT NULL, /* Donor Status */
    webaddress      VARCHAR(2047)   NULL, /* Constituent Web Address */
    #Picture
    #Picture Thumbnail
    isorganisation  BINARY(1)       NOT NULL, /* Is this entity an Organisation */
    #Marital Status
    netcommunitymember  BINARY(1)   NOT NULL, /* Net Community Member Status */
    donotmail       BINARY(1)       NOT NULL, /* Recieve mail notifications */
    donotemail       BINARY(1)       NOT NULL, /* Recieve email notifications */
    donotphone       BINARY(1)       NOT NULL, /* Recieve phone calls */
    customidentifier VARCHAR(100)   NULL,   /* Check current use */
    addedby         VARCHAR(100)    NOT NULL, /* ID of user who added constituent */
    changedby       VARCHAR(100)    NULL, /* ID of user who changed constituent info */
    #Date Added
    #Date Changed
    #Time Stamp
    #Time Stamp Long
    isgroup         BINARY(1)       NOT NULL,
    displayname     VARCHAR(100)    NOT NULL, /* Display Name */
    gender          VARCHAR(7)      NOT NULL, /* Gender */
    #Title 2 Code ID
    #Suffix 2 Code ID
    lookupid        VARCHAR(100)    NOT NULL, /* Unknown use */
    isconstituent   BINARY(1)       NOT NULL, /* ??????? Why would you need this */
    age             DECIMAL(3)      NOT NULL, /* Age */
    name            VARCHAR(154)    NOT NULL, /* Because you need five variables to hold name */ 
    CONSTRAINT PK_Person PRIMARY KEY (constituentid)   
);