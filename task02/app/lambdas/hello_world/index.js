exports.handler = async (event) => {
  console.log("Received event:", JSON.stringify(event));

  const http = event.requestContext.http;

  if (http.path === "/hello" && http.method === "GET") {
    return {
      statusCode: 200,
      message: "Hello from Lambda"
    };
  }

  return {
    statusCode: 400,
    message: "Bad request syntax or unsupported method. Request path: {path}. HTTP method: {method}"
  };
};
