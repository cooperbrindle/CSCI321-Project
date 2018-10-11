#!/bin/bash
export PATH=/bin:/usr/bin

# modify the following to suit your environment
export DB_USER='cooperb'
export DB_PASSWD='Balotelli45'

# title and version
echo ""
echo "Daily Tabbed Report: " $THEDATE
echo "----------------------"
echo "* Rotating backups…"
rm /tmp/constexport.csv
rm /tmp/eventconexport.csv
rm /tmp/eventguestexport.csv
rm /tmp/libmemexport.csv

source="source /home/cooperb/export.sql"
echo "* Creating new backup..."
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


sshpass -p '9HZ0jcPjXzf84fu' sftp -oBatchMode=no -b - -oStrictHostKeyChecking=no alumniapp@files4.blackbaudhosting.com <<_EOF_
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