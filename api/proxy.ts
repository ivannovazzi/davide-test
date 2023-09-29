// Create a proxy to redirect requests of the "/api/*" path to "https://example.org".
//
// Examples:
// GET /api/hello → GET https://example.org/hello
// POST /api/test?color=red → POST https://example.org/test?color=red
//
// Additionally, the proxy will:
// - Add an "x-added" header
// - Remove the "x-removed" header
// From the proxied response.
//
// You can/should update the proxy to suit your needs.
// See https://github.com/chimurai/http-proxy-middleware for more details.
import { createProxyMiddleware } from "http-proxy-middleware";
 
const apiProxy = createProxyMiddleware({
  target: "https://cdn.cadcrowd.com/3d-models/21/28/2128bb3c-d673-4031-a08a-1df6d8105930/viewer/50553642-b5b5-44bd-ae12-c60a4799abe7/wolvic_3d_model.glb",
  changeOrigin: true,
  pathRewrite: {
    "*": "", // strip "/api" from the URL
  },
  onProxyRes(proxyRes) {
    proxyRes.headers["x-added"] = "foobar"; // add new header to response
    delete proxyRes.headers["x-removed"]; // remove header from response
  },
});
 
// Expose the proxy on the "/api/*" endpoint.
export default function handler(req, res) {
  // @ts-ignore
  return apiProxy(req, res);
}