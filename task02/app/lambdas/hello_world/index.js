exports.handler = async (event) => {
  console.log("Received event:", JSON.stringify(event));

  const http = event.requestContext.http;

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

  if (http.path !== "/hello" || http.method !== "GET") {
    res.statusCode = 400;
    res.body = JSON.stringify(
      {
        statusCode: 400,
        message: `Bad request syntax or unsupported method. Request path: ${http.path}. HTTP method: ${http.method}`
      });
  }

  console.log(res);

  return res;
};
