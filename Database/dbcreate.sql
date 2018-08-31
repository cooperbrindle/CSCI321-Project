/* Create Database Tables */
/*    Design Based on RE Database */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/*    Last Edited: Cooper Brindle 24/05/2018 12:14pm*/


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* Constituent Table */

/* Cooper 14/05/18 */
CREATE TABLE CONSTITUENT(
    constituentID   VARCHAR(100)    NOT NULL, /* Universal Unique Identifier */
    firstName       VARCHAR(50)     NULL, /* Constituent First Name */
    middleName      VARCHAR(50)     NULL, /* Constituent Middlename */
    surName         VARCHAR(50)     NOT NULL,
    maidenName      VARCHAR(100)    NULL, /* Constituent Maidenname */
    nickName        VARCHAR(50)     NULL, /* Preferred name */
    ssn             DECIMAL(7)      NOT NULL, /* Student Number */ 
    title           VARCHAR(5)      NOT NULL, /* Mr Mrs etc */
    suffix          VARCHAR(5)      NULL,   /* Phd etc */
    gender          VARCHAR(1)      NOT NULL, /* m for Male, f for female, n for non-binary, t for trans, o for other */
    birthDate       VARCHAR(8)      NOT NULL, /* Constituent Birth Date ie 27101996 */
    doNotMail       BINARY(1)       NOT NULL, /* Recieve mail notifications */
    doNotEmail       BINARY(1)       NOT NULL, /* Recieve email notifications */
    doNotPhone       BINARY(1)       NOT NULL, /* Recieve phone calls */
    /*Date Added */
    /*Date Changed */
    CONSTRAINT CONSTITUENT_pkey PRIMARY KEY (constituentID),
    UNIQUE (ssn) );

/* Cooper 24/05/18 */
CREATE TABLE APPUSER(
    constituentID   VARCHAR(256)    NOT NULL, /* Universal Unique Identifier */ /* check storage method */
    username        VARCHAR(256)     NOT NULL, /* Unique user name */
    password        VARCHAR(256)     NOT NULL, /* Hash value of password */
    salt            DECIMAL(3)      NOT NULL, /* Random salt value to reduce collision and false positive risk */
    CONSTRAINT USER_pkey PRIMARY KEY (constituentID, username),
    CONSTRAINT USER_fkey1 FOREIGN KEY (constituentID)
        REFERENCES CONSTITUENT (constituentID) );

/* Cooper 24/05/18 */
/*
CREATE TABLE CONTACT(
    /*CONST ID*/  
    /*Phone Number*/
    /* Email */
    /* Addres */