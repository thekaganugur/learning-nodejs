const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<h1>Enter Message</h1>");
    res.write(
      '<div><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></div>'
    );
    res.write();
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];

    req.on("data", chunk => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("message", message, () => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<h1>Hello World</h1>");
  res.write("<div>Hello from node.js server</div>");
  res.write("</html>");
  res.end();
};

module.exports = requestHandler;
