exports.handler = async (event) => {
    console.log('SNS message: ' + JSON.stringify(event));

    return {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
};
