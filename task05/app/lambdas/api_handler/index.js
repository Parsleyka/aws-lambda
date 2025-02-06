const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const tableName = 'cmtr-72e50b99-Events';

exports.handler = async (event) => {
    console.log('Event: ' + JSON.stringify(event));

    // const res = await dynamoDb.put({
    //     TableName: tableName,
    //     Item: {
    //         name: 'test',
    //         date: new Date().toISOString(),
    //     },
    // })

    return {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
};
