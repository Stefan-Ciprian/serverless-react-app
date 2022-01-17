# React Chart App #

Requirements: node v16.3.0

## To build app: ##
    $ cd ./chart-app
    $ npm install
    $ npm run build
    $ cd ../cdk

    $ npm install
    $ npm run build
    $ cdk bootstrap
    $ cdk deploy SSRAppStack --parameters mySiteBucketName=react-chart-app

## To destroy app: ##
    $ cdk destroy SSRAppStack