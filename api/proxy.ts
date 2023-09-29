const httpProxy = require('http-proxy');
 

export default function handler(req, res) {
  httpProxy.createProxyServer({target:'https://google.com'});
  // res.statusCode = 200;
  // res.setHeader('Content-Type', 'application/json');
  // res.json({ name: 'John Doe' });

  // pipe the request to the proxy
  req.pipe(httpProxy).pipe(res);
}