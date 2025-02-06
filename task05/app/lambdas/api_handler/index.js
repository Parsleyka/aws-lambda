
const { v4: uuidv4 } = require('uuid');
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.target_table || "Events"

exports.handler = async (event) => {
    console.log(event)
    const params = {
        TableName: tableName,
        Item: {
            "id": uuidv4(),
            "principalId": event["principalId"],
            "createdAt": new Date().toISOString(),
            "body": event["content"]
        }
    };
    try {
        const data = await docClient.put(params).promise();
        console.log("Added item:", JSON.stringify(data, null, 2));
        return {
            "statusCode": 201,
            "event": params['Item']
        };
    } catch (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        return {
            "statusCode": 500,
            "errorMessage": JSON.stringify(err, null, 2)
        };
    }
};
