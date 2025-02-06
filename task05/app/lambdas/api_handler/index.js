const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const tableName = 'cmtr-72e50b99-Events';

exports.handler = async (event) => {
    console.log('Event: ' + JSON.stringify(event));

    const requestContext = event.requestContext;

    if(requestContext.resourcePath === '/events'){
        switch (requestContext.httpMethod) {
            case 'POST':
                const body = JSON.parse(event.body);

                const params = {
                    TableName: tableName,
                    Item: body
                }

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

    return {
        statusCode: 404,
        body: JSON.stringify('Not Found'),
    }
};
