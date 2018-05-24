/* Create Database Tables */
/*    Design Based on RE Database */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/*    Last Edited: Cooper Brindle 24/05/2018 12:14pm*/


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* Constituent Table */

/* Cooper 14/05/18 */
CREATE TABLE CONSTITUENT(
    constituentID   VARCHAR(100)    NOT NULL, /* Universal Unique Identifier */ /* check storage method */
    keyName         VARCHAR(100)	NOT NULL, /* Constituent Surname */
    firstName       VARCHAR(50)     NOT NULL, /* Constituent First Name */
    middleName      VARCHAR(50)     NULL, /* Constituent Middlename */
    maidenName      VARCHAR(100)    NULL, /* Constituent Maidenname */
    nickName        VARCHAR(50)     NULL, /* Preferred name */
    ssn             DECIMAL(7)      NOT NULL, /* Student Number */ 
    /*SSNIndex*/
    /*Title Code ID*/
    /*Suffix Code ID*/
    /*Gendercode*/
    birthDate       VARCHAR(8)      NOT NULL, /* Constituent Birth Date ie 27101996 */
    isInactive      BINARY(1)       NOT NULL, /* Are the an active Alumni Member */ /* Get active definition */
    givesAnonymously BINARY(1)      NOT NULL, /* Donor Status */
    webAddress      VARCHAR(2047)   NULL, /* Constituent Web Address */
    /*Picture*/
    /*Picture Thumbnail*/
    isOrganisation  BINARY(1)       NOT NULL, /* Is this entity an Organisation */
    /*Marital Status*/
    netCommunityMember  BINARY(1)   NOT NULL, /* Net Community Member Status */
    doNotMail       BINARY(1)       NOT NULL, /* Recieve mail notifications */
    doNotEmail       BINARY(1)       NOT NULL, /* Recieve email notifications */
    doNotPhone       BINARY(1)       NOT NULL, /* Recieve phone calls */
    customIdentifier VARCHAR(100)   NULL,   /* Check current use */
    addedBy         VARCHAR(100)    NOT NULL, /* ID of user who added constituent */
    changedBy       VARCHAR(100)    NULL, /* ID of user who changed constituent info */
    /*Date Added */
    /*Date Changed */
    /*Time Stamp */
    /*Time Stamp Long */
    isGroup         BINARY(1)       NOT NULL,
    displayName     VARCHAR(100)    NOT NULL, /* Display Name */
    gender          VARCHAR(7)      NOT NULL, /* Gender */
    /* Title 2 Code ID */
    /* Suffix 2 Code ID */
    lookupID        VARCHAR(100)    NOT NULL, /* Unknown use */
    isConstituent   BINARY(1)       NOT NULL, /* ??????? Why would you need this */
    age             DECIMAL(3)      NOT NULL, /* Age */
    name            VARCHAR(154)    NOT NULL, /* Because you need five variables to hold name */ 
    CONSTRAINT CONSTITUENT_pkey PRIMARY KEY (constituentID) );

/* Cooper 24/05/18 */
CREATE TABLE APPUSER(
    constituentID   VARCHAR(100)    NOT NULL, /* Universal Unique Identifier */ /* check storage method */
    username        VARCHAR(20)     NOT NULL, /* Unique user name */
    passHash        VARCHAR(32)     NOT NULL, /* Hash value of password */
    salt            DECIMAL(3)      NOT NULL, /* Random salt value to reduce collision and false positive risk */
    CONSTRAINT USER_pkey PRIMARY KEY (constituentID, username),
    CONSTRAINT USER_fkey1 FOREIGN KEY (constituentID)
        REFERENCES CONSTITUENT (constituentID) );

/* Cooper 24/05/18 */
CREATE TABLE EDUCATIONALINSTITUTION(
    /*uniID*/   
    addedBy         VARCHAR(100)    NOT NULL, /* ID of user who added constituent */
    changedBy       VARCHAR(100)    NULL, /* ID of user who changed constituent info */
    /*Date Added */
    /*Date Changed */
    /*Time Stamp */
    /*Time Stamp Long */
    ficeCode        NVARCHAR(50)    NULL, /* Unknown */
    classificationCode TINYINT      NULL, /* Unknown */
    name            NVARCHAR(100)   NOT NULL, /* Name of University */
    isAffiliated    BINARY(1)       NOT NULL, /* Is the Institution Associated with UOW */
    city            NVARCHAR(150)   NOT NULL, /* City the institution is based in */
    /*stateID*/         
    /*countryID*/
    CONSTRAINT EDUCATIONALINSTITUTION_pkey PRIMARY KEY (name) );