const httpProxy = require('http-proxy');
 
httpProxy.createProxyServer({target:'https://google.com'}).listen(8000);