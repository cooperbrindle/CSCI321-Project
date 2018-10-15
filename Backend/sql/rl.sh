#!/bin/bash 
mysql -D alumniapp <<EOF
source dbdrop.sql
source dbcreate.sql
source dbload.sql
EOF