const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<h1>Hello there</h1>');
    res.write('<ul>');
    res.write('<li>User 1</li>');
    res.write('<li>User 2</li>');
    res.write('<li>User 3</li>');
    res.write('</ul>');
    res.write(
      '<form action="/message" method="post"><input type="text" name="username"><button type="submit">Send</button></form>'
    );
    res.write('</html>');
    return res.end();
  }
  if (url === '/message' && method === 'POST') {
    const body = [];

    req.on('data', chunk => {
      body.push(chunk);
    });

    return req.on('end', () => {
      const message = Buffer.concat(body)
        .toString()
        .split('=')[1];
      console.log(message);
      fs.writeFile('wfFile', message, () => {
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }

  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<h1>404</h1>');
  res.write('</html>');
  res.end();
});

server.listen(3000);
