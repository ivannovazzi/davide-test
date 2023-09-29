const httpProxy = require('http-proxy');
 
httpProxy.createProxyServer({target:'https://google.com'});

export default function handler(req, res) {
  // res.statusCode = 200;
  // res.setHeader('Content-Type', 'application/json');
  // res.json({ name: 'John Doe' });

  // pipe the request to the proxy
  req.pipe(httpProxy).pipe(res);
}