exports.handler = async (event) => {
  console.log("Received event:", JSON.stringify(event));

  const http = event.requestContext.http;

  const res = {
    statusCode: 200,
    message: "Hello from Lambda"
  };

  if (http.path === "/hello" && http.method === "GET") {
    res.statusCode = 200;
    res.message = "Hello from Lambda";
  } else {
    res.statusCode = 400;
    res.message = `Bad request syntax or unsupported method. Request path: ${http.path}. HTTP method: ${http.method}`;
  }

  console.log(res);

  return res;
};
