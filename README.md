# todo endpoints using Serverless Framework

Install node dependencies

    $ npm install
    
Set up AWS credentials in your user directory, and add Admin Access to Role in IAM

    ~/.aws/credentials
    
Adjust config details in `serverless.yml` and lambda functions in `handler.js`
    
Trigger a new deploy, and test new endpoints with Postman or cURL

    $ serverless deploy
    
From tutorials:

https://cloudonaut.io/create-a-serverless-restful-api-with-the-serverless-framework-powered-by-api-gateway-lambda-and-dynamodb/

https://github.com/AWSinAction/apigateway#use-the-restful-api