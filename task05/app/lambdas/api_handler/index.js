const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const tableName = 'Events';

exports.handler = async (event) => {
    console.log('VARIABLES: ' + JSON.stringify(process.env));
    console.log('Event: ' + JSON.stringify(event));

    const requestContext = event.requestContext;

    const lambdaNameGeneral = 'api_handler'
    const lambdaName = process.env.AWS_LAMBDA_FUNCTION_NAME;

    const sessionTableName = lambdaName.replace(lambdaNameGeneral, tableName);

    console.log('Test If Table Name: ' +  process.env.DYNAMODB_TABLE_NAME)

    try {
        if(requestContext.resourcePath === '/events'){
            switch (requestContext.httpMethod) {
                case 'POST':
                    const body = JSON.parse(event.body);

                    console.log('POST Body: ' + JSON.stringify(body));

                    const params = {
                        TableName: sessionTableName,
                        Item: Object.assign({id: uuid.v4()}, body)
                    }

                    console.log('Params: ' + JSON.stringify(params));

                    const res = await dynamoDb.put(params).promise();

                    return {
                        statusCode: 201,
                        body: JSON.stringify(res),
                    };
                default:
                    return {
                        statusCode: 404,
                        body: JSON.stringify('Not Found'),
                    };
            }
        }
    } catch (e) {
        console.log('Try Catch Error: ' + JSON.stringify(e));
    }

    return {
        statusCode: 404,
        body: JSON.stringify('Not Found'),
    }
};
