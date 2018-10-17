#!/bin/bash 
echo ""
echo "Reloading SQL Database" $THEDATE
echo "----------------------"
cd ./sql
mysql -D alumniapp <<EOF
source dbdrop.sql
source dbcreate.sql
source dbload.sql
EOF
cd ..
echo ""
echo "----------------------"
echo "Successfully reloaded SQL Database" $THEDATE