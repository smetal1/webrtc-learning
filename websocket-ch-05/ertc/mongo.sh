#!/bin/sh

# mongo Uri
URI=$URI

# S3 bucket name
BUCKET=$BUCKET


# Current time
TIME=`/bin/date +%d-%m-%Y-%T`

# Backup directory
DEST=/mongo

# Tar file of backup directory
TAR=$DEST/../$TIME.tar

# Create backup dir (-p to avoid warning if already exists)
mkdir -p $DEST

# Log
echo "Backing up $HOST/$DBNAME to s3://$BUCKET/ on $TIME";
# Dump from mongodb host into backup directory
mongodump --uri $URI -o $DEST

# Create tar of backup directory
tar cvf $TAR -C $DEST .

# Upload tar to s3
aws s3 cp $TAR s3://$BUCKET/

# Remove tar file locally
/bin/rm -f $TAR

# Remove backup directory
/bin/rm -rf $DEST

# All done
echo "Backup available at https://s3.amazonaws.com/$BUCKET/$TIME.tar"