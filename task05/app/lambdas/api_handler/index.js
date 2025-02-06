const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const tableName = 'Events';

exports.handler = async (event) => {
    console.log('Variables: ' + JSON.stringify(process.env));
    console.log('Event: ' + JSON.stringify(event));

    const requestContext = event.requestContext;

    const lambdaNameGeneral = 'api_handler'
    const lambdaName = process.env.AWS_LAMBDA_FUNCTION_NAME;

    const sessionTableName = lambdaName.replace(lambdaNameGeneral, tableName);

    try {
        if(requestContext.resourcePath === '/events'){
            switch (requestContext.httpMethod) {
                case 'POST':
                    const body = JSON.parse(event.body);

                    console.log('/events POST body: ' + JSON.stringify(body));

                    const params = {
                        TableName: sessionTableName,
                        Item: {
                            id: uuid.v4(),
                            principalId: body.principalId,
                            createdAt: new Date().toISOString(),
                            body: body.content
                        }
                    }

                    console.log('dynamoDb params: ' + JSON.stringify(params));

                    await dynamoDb.put(params).promise();

                    return {
                        statusCode: 201,
                        body: JSON.stringify(params.Item),
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
