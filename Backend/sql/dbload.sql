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
INSERT INTO DISCOUNTS VALUES ('unibar', 'uow', 'UNIBAR', 'dc', 'Purchase event tickets at student prices!', 'https://unibar.uow.edu.au/content/groups/webasset/@web/documents/siteelement/img_unibar_logo.png');
INSERT INTO DISCOUNTS VALUES ('studperf', 'uow', 'Student Performances', 'dc', 'Discounted tickets to all theatre productions from Australias rising stars!', 'https://lha.uow.edu.au/content/groups/public/@web/@lha/@taem/documents/mm/uow222855.jpg');
INSERT INTO DISCOUNTS VALUES ('uniActive', 'uow', 'UNIACTIVE Wollongong Campus and Innovation Campus Gyms', 'dc', 'Concession rate on a variety of memberships, visit passes and casual visits!', 'https://uniactive.uow.edu.au/content/groups/webasset/@web/documents/siteelement/logo_uniactive_monogram.png');
INSERT INTO DISCOUNTS VALUES ('uniCentre', 'uow', 'UNICENTRE Market Alley', 'dc', 'Stall fees at student prices for this fortnightly open-air market!', 'https://pulse.uow.edu.au/content/groups/webasset/@web/@unic/documents/siteelement/logo_pulse_emoji.png');
INSERT INTO DISCOUNTS VALUES ('uowFC', 'uow', 'UOW Football Club', 'dc', 'Free admission to all UOW Football Club home games at Kooloobong Oval!', 'https://clubs.uow.edu.au/assets/clubs/uow-sport/Uploads/_resampled/SetWidth3-UOWFootballNavy-White-Background.jpg');
INSERT INTO DISCOUNTS VALUES ('rmb', 'local', 'RMB Lawyers', 'dc', '10% discount, except no win no fee work. Phone +61 2 4228 8288!', 'https://www.uow.edu.au/content/groups/public/@web/@community/documents/mm/uow192897.jpg');
INSERT INTO DISCOUNTS VALUES ('livingroom', 'local', 'The Living Room', 'dc', '15% discount, 7 days a week!', 'https://www.uow.edu.au/content/groups/public/@web/@community/documents/mm/uow192916.png');
INSERT INTO DISCOUNTS VALUES ('northbeach', 'local', 'Northbeach Pavilion', 'dc', '10% discount on dining for breakfast, lunch and dinner (not available at the kiosk).', 'https://www.uow.edu.au/content/groups/public/@web/@community/documents/mm/uow192900.jpg');
INSERT INTO DISCOUNTS VALUES ('relish', 'local', 'Relish on Addison', 'dc', '10% discount, max group of 10 Tuesday to Friday!', 'https://www.uow.edu.au/content/groups/public/@web/@community/documents/mm/uow192901.jpg');
INSERT INTO DISCOUNTS VALUES ('littleprince', 'local', 'The Little Prince', 'dc', 'Happy Hour prices until 9pm!', 'https://www.uow.edu.au/content/groups/public/@web/@community/documents/mm/uow192902.jpg');
INSERT INTO DISCOUNTS VALUES ('wgolfclub', 'local', 'Wollongong Golf Club', 'dc', 'Round of gold (18 Holes) for $22. Bookings essential. 10% discount of best available rate of the day at The Best Western City Sand for those playing golf!', 'https://www.uow.edu.au/content/groups/public/@web/@community/documents/mm/uow199360.jpg');
INSERT INTO DISCOUNTS VALUES ('skydive', 'national', 'Skydive Australia', 'dc', '$40 off your 14,000ft tandem skydive at anny of the 15 Skydive the Beach and Byond locations across Australia!', 'https://www.uow.edu.au/content/groups/public/@web/@community/documents/mm/uow192893.png');
INSERT INTO DISCOUNTS VALUES ('dell', 'national', 'DELL Computers', 'em', 'Receive an exclusive discount on Dell products!', 'https://www.uow.edu.au/content/groups/public/@web/@community/documents/mm/uow192889.jpg');
/* AVIS and Budget */
INSERT INTO DISCOUNTS VALUES ('winedirect', 'national', 'Wine Direct', 'li', 'They have amazing deals on mixed packs and offer personal service to alumni!', 'https://www.uow.edu.au/content/groups/public/@web/@community/documents/mm/uow192891.jpg')
/* TFE Hotels */
/* Hotel Storm */
/* Experience OZ */

