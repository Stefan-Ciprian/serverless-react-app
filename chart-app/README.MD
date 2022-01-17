# React Chart App #

## To build app: ##
    $ cd ./cdk
    $ npm install
    $ npm run build
    $ cdk bootstrap

    $ cd ../chart-app
    $ npm install
    $ npm build
    $ cd ../cdk
    $ cdk deploy SSRAppStack --parameters mySiteBucketName=react-chart-app

## To destroy app: ##
    $ cdk destroy SSRAppStack