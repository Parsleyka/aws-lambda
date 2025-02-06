const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.target_table || "Events";

exports.handler = async (event) => {
    console.log('Variables: ' + JSON.stringify(process.env));
    console.log('Event: ' + JSON.stringify(event));

    const requestContext = event.requestContext;

    try {
        if(requestContext.resourcePath === '/events'){
            switch (requestContext.httpMethod) {
                case 'POST':
                    const body = JSON.parse(event.body);

                    console.log('/events POST body: ' + JSON.stringify(body));

                    const params = {
                        TableName: tableName,
                        Item: {
                            id: uuid.v4(),
                            principalId: body.principalId,
                            createdAt: new Date().toISOString(),
                            body: body.content
                        }
                    }

                    console.log('dynamoDb params: ' + JSON.stringify(params));

                    await dynamoDb.put(params).promise();

                    console.log('/events POST success');

                    return {
                        statusCode: 201,
                        body: params.Item
                    };
                default:
                    return {
                        statusCode: 404,
                        message: 'Not Found',
                    };
            }
        }
    } catch (err) {
        console.log('Try Catch Error: ' + JSON.stringify(err));

        return {
            "statusCode": 500,
            "message": JSON.stringify(err, null, 2)
        };
    }

    return {
        statusCode: 404,
        body: 'Not Found',
    }
};
