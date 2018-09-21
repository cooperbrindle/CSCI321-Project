/* Create Database Test Entries */
/*    Design Based on RE Database */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/*    Last Edited: Cooper Brindle 29/08/2018 12:14pm*/


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/* Load Constituents */
LOAD DATA LOCAL INFILE 'constituent.csv' 
INTO TABLE CONSTITUENT 
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

/* Load Events */
LOAD DATA LOCAL INFILE 'event.csv' 
INTO TABLE EVENTS 
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

/* Load Users */
INSERT INTO APPUSER VALUES ('129062', 'sclaypole', 'password');
INSERT INTO APPUSER VALUES ('165537', 'ewarren', 'password');
/* Load Discounts */
INSERT INTO DISCOUNTS VALUES ('unibar', 'uow', 'UNIBAR', 'card', 'Purchase event tickets at student prices!', 'https://unibar.uow.edu.au/content/groups/webasset/@web/documents/siteelement/img_unibar_logo.png');
INSERT INTO DISCOUNTS VALUES ('studperf', 'uow', 'Student Performances', 'card', 'Discounted tickets to all theatre productions!', 'https://lha.uow.edu.au/content/groups/public/@web/@lha/@taem/documents/mm/uow222855.jpg');
INSERT INTO DISCOUNTS VALUES ('uniActive', 'uow', 'UNIACTIVE Wollongong Campus and Innovation Campus Gyms', 'card', 'Concession rate on a variety of memberships, visit passes and casual visits!', 'https://uniactive.uow.edu.au/content/groups/webasset/@web/documents/siteelement/logo_uniactive_monogram.png');
INSERT INTO DISCOUNTS VALUES ('uniCentre', 'uow', 'UNICENTRE Market Alley', 'card', 'Stall fees at student prices for this fortnightly open-air market!', 'https://pulse.uow.edu.au/content/groups/webasset/@web/@unic/documents/siteelement/logo_pulse_emoji.png');
INSERT INTO DISCOUNTS VALUES ('uowFC', 'uow', 'UOW Football Club', 'card', 'Free admission to all UOW Football Club home games at Kooloobong Oval!', 'https://clubs.uow.edu.au/assets/clubs/uow-sport/Uploads/_resampled/SetWidth3-UOWFootballNavy-White-Background.jpg');
INSERT INTO DISCOUNTS VALUES ('rmb', 'local', 'RMB Lawyers', 'card', '10% discount!*', 'https://www.uow.edu.au/content/groups/public/@web/@community/documents/mm/uow192897.jpg');
INSERT INTO DISCOUNTS VALUES ('livingroom', 'local', 'The Living Room', 'card', '15% discount, 7 days a week!*', 'https://www.uow.edu.au/content/groups/public/@web/@community/documents/mm/uow192916.png');
INSERT INTO DISCOUNTS VALUES ('northbeach', 'local', 'Northbeach Pavilion', 'card', '10% discount on dining for breakfast, lunch and dinner!*', 'https://www.uow.edu.au/content/groups/public/@web/@community/documents/mm/uow192900.jpg');
INSERT INTO DISCOUNTS VALUES ('relish', 'local', 'Relish on Addison', 'card', '10% discount!*', 'https://www.uow.edu.au/content/groups/public/@web/@community/documents/mm/uow192901.jpg');
INSERT INTO DISCOUNTS VALUES ('littleprince', 'local', 'The Little Prince', 'card', 'Happy Hour prices!*', 'https://www.uow.edu.au/content/groups/public/@web/@community/documents/mm/uow192902.jpg');
INSERT INTO DISCOUNTS VALUES ('wgolfclub', 'local', 'Wollongong Golf Club', 'card', '10% discount @ The Best Western City Sand!*', 'https://www.uow.edu.au/content/groups/public/@web/@community/documents/mm/uow199360.jpg');
INSERT INTO DISCOUNTS VALUES ('skydive', 'national', 'Skydive Australia', 'card', '$40 off your 14,000ft tandem skydive!', 'https://www.uow.edu.au/content/groups/public/@web/@community/documents/mm/uow192893.png');
INSERT INTO DISCOUNTS VALUES ('dell', 'national', 'DELL Computers', 'code', 'Receive an exclusive discount on Dell products!', 'https://www.uow.edu.au/content/groups/public/@web/@community/documents/mm/uow192889.jpg');
/* AVIS and Budget */
INSERT INTO DISCOUNTS VALUES ('winedirect', 'national', 'Wine Direct', 'link', 'They have amazing deals on mixed packs and offer personal service to alumni!', 'https://www.uow.edu.au/content/groups/public/@web/@community/documents/mm/uow192891.jpg')
/* TFE Hotels */
/* Hotel Storm */
/* Experience OZ */

