exports.handler = async (event) => {
    console.log("Request:", JSON.stringify(event));

    const res = {
        headers: { "Content-Type": "application/json" },
        statusCode: 200,
        body: JSON.stringify(
          {
              statusCode: 200,
              message: "Hello from Lambda"
          }
        )
    };

    console.log("Response", JSON.stringify(res));

    return res;
};