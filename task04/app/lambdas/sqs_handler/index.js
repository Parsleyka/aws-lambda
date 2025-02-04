exports.handler = async (event) => {
    console.log('SQS message: ' + JSON.stringify(event));

    return {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
};
