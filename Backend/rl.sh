#!/bin/bash 
cd ./sql
mysql -D alumniapp <<EOF
source dbdrop.sql
source dbcreate.sql
source dbload.sql
EOF
cd ..