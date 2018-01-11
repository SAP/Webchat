#!/usr/bin/env bash
path=`pwd`'/'
cp $path"dist/webchat.js" $path"deploy/preprod"
aws s3 sync $path"deploy/preprod" s3://preprod.webchat2.matcha.wine --acl public-read --delete
rm $path"deploy/preprod/webchat.js"