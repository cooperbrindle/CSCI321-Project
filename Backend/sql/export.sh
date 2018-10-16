#!/bin/bash
export PATH=/bin:/usr/bin

source ./exConfig.sh

# Remove Old Export Files
echo ""
echo "Daily Database Export" $THEDATE
echo "----------------------"
echo "Deleting Yesterday's Exports"
rm /tmp/constexport.csv
rm /tmp/eventconexport.csv
rm /tmp/eventguestexport.csv
rm /tmp/libmemexport.csv

# Export to csv files
source="source /home/cooperb/export.sql"

echo "* Creating New Exports"
mysql -u $DB_USER -p$DB_PASSWD <<_EOF_
use alumniapp;
$source
exit
_EOF_

echo "Logging into external Blackbaud SFTP server"

export const=/tmp/constexport.csv
export eventconst=/tmp/eventconexport.csv
export eventguest=/tmp/eventguestexport.csv
export libmem=/tmp/libmemexport.csv

# Push to Blackbaud SFTP Server
sshpass -p$SFTP_PASSWD sftp -c aes256-cbc $SFTP_USER  <<_EOF_
cd ./14660/1.\ Alumni\ App/Import\ to\ RE/
put $const
put $eventconst
put $eventguest
put $libmem
bye
_EOF_

echo "Logging off external Blackbaud server"
echo "----------------------"

exit 0