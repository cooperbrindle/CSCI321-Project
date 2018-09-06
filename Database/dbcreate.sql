/* Create Database Tables */
/*    Design Based on RE Database */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/*    Last Edited: Cooper Brindle 24/05/2018 12:14pm*/


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */


/* Cooper 24/05/18 */
CREATE TABLE APPUSER(
    CnBio_ID        VARCHAR(10)     NOT NULL, /* Universal Unique Identifier */
    username        VARCHAR(256)    NOT NULL, /* Unique user name */
    password        VARCHAR(256)    NOT NULL, /* Hash value of password */
    salt            DECIMAL(3)      NOT NULL, /* Random salt value to reduce collision and false positive risk */
    CONSTRAINT USER_pkey PRIMARY KEY (CnBio_ID, username),
    CONSTRAINT USER_fkey1 FOREIGN KEY (CnBio_ID)
        REFERENCES CONSTITUENT (CnBio_ID) );

/* Cooper 06/09/18 */
CREATE TABLE CONSTITUENT(
    CnBio_ID            VARCHAR(10)     NOT NULL, /* Constituent ID Number */
    CnBio_ID2           VARCHAR(10)     NOT NULL, /* Student Number */
    CnBio_Birth_date    DATE            NOT NULL, /* Date of Birth */
    CnBio_Title_1       VARCHAR(10)     NOT NULL, /* Title ie Mr Miss */
    CnBio_First_Name    VARCHAR(36)     NULL, /* First Name */
    CnBio_Nickname      VARCHAR(36)     NULL, /* Nickname */
    CnBio_Middle_Name   VARCHAR(36)     NULL, /* Middle Name */
    CnBio_Surname       VARCHAR(64)     NOT NULL, /* Last Name/s */
    CnBio_Maiden_name   VARCHAR(64)     NULL, /* Maiden Name */
    CnPrBs_Org_Name     VARCHAR(256)    NULL, /* Employer Organisation Name */
    CnPrBs_Position     VARCHAR(256)    NULL, /* Position Name */
    CnAdrPrf_Address    VARCHAR(256)    NOT NULL, /* Home Address */
    CnAdrPrf_Suburb     VARCHAR(256)    NOT NULL, /* Home Suburb */
    CnAdrPrf_State      VARCHAR(256)    NOT NULL, /* Home State */
    CnAdrPrf_County     VARCHAR(256)    NULL, /* Home County */
    CnAdrPrf_Postcode   VARCHAR(256)    NOT NULL, /* Home Postcode */
    CnAdrPrf_CountryLongDescription     VARCHAR(256)    NOT NULL, /* Home Country */
    CnPh_1_01_Phone_number  VARCHAR(256)    NOT NULL, /* Preferred Email */
    CnPh_1_02_Phone_number  VARCHAR(256)    NOT NULL, /* Other Email */
    CnPh_1_03_Phone_number  VARCHAR(256)    NOT NULL, /* LinkedIn URL */
    CnPh_1_04_Phone_number  VARCHAR(256)    NOT NULL, /* Mobile Number */
    CnPh_1_05_Phone_number  VARCHAR(256)    NOT NULL, /* Unknown */

    CONSTRAINT CONSTITUENT_pkey PRIMARY KEY (CnBio_ID),
    CONSTRAINT CONSTITUENT_uni UNIQUE (CnBio_ID2) );

/* Cooper 06/09/2018 */
CREATE TABLE LIBRARYMEM(
    CnBio_ID            VARCHAR(10)     NOT NULL, /* Constituent ID Number */
    CnBio_ID2           VARCHAR(10)     NOT NULL, /* Student Number */
    CnAttrCat_1_01_Description VARCHAR(256) NOT NULL, /* Membership Username */
    CnAttrCat_2_01_Description VARCHAR(256) NOT NULL, /* Membership Password */
    CnMem_1_01_Cur_Expires_on  DATE         NULL, /* Date of Membership Expiry */
    
    CONSTRAINT LIBRARYMEM_pkey PRIMARY KEY (CnBio_ID),
    CONSTRAINT LIBRARYMEM_fkey1 FOREIGN KEY (CnBio_ID)
        REFERENCES CONSTITUENT (CnBio_ID),
    CONSTRAINT LIBRARYMEM_fkey2 FOREIGN KEY (CnBio_ID2)
        REFERENCES CONSTITUENT (CnBio_ID2) );

/* Cooper 06/09/2018 */
CREATE TABLE EVENTS(
    eventname       VARCHAR(256)    NOT NULL, /* Event Name */
    eventgroup      VARCHAR(64)     NOT NULL, /* Organising Department */
    eventtype       VARCHAR(64)     NOT NULL, /* Purpose of Event */
    startdate       DATE            NOT NULL, /* Start of Event */
    enddate         DATE            NOT NULL, /* End of Event */
    starttime       VARCHAR(10)     NOT NULL, /* Start Time */
    endtime         VARCHAR(10)     NOT NULL, /* End Time */
    capacity        DECIMAL(4)      NOT NULL, /* Max number of attendants */
    locationname    VARCHAR(256)    NULL, /* Event Venue */
    address         VARCHAR(256)    NULL, /* Venue Address */
    city            VARCHAR(256)    NULL, /* Venue City */
    State           VARCHAR(256)    NULL, /* Venue State */
    postcode        VARCHAR(256)    NULL, /* Venue Postcode */
    country         VARCHAR(256)    NULL, /* Event Country */
    regLink         VARCHAR(256)    NULL, /* Paid Event Rego Link */
    mapsLink        VARCHAR(256)    NULL, /* Google maps API Link */
    onApp           VARCHAR(3)      NOT NULL, /* To be displayed */
    CONSTRAINT EVENTS_pkey PRIMARY KEY (eventname) );

/* Cooper 31/08/2018 */
CREATE TABLE DISCOUNTS(
    titleID         VARCHAR(24)     NOT NULL, /* Short Hand Unique Name for Discounts */
    partnerType     VARCHAR(24)     NOT NULL, /* UOW, Local, National, Global */
    displayName     VARCHAR(256)    NOT NULL, /* Full display name for Discount */
    discountType    VARCHAR(2)      NOT NULL, /* dc = display card, co = checkout code, em = email, li = link */
    blurb           VARCHAR(1028)   NOT NULL, /* To be displayed on discount page */
    CONSTRAINT DISCOUNTS_pkey PRIMARY KEY (titleID) );