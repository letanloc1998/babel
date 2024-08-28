// import * as fs from "node:fs";
// import * as http from "node:http";
// import * as path from "node:path";

var fs = require('fs');
var http = require('http');
var path = require('path');

const STATIC_FOLDER = "./" // "./static"
const NOT_FOUND_PAGE = "/index.html" // "/404.html"

const PORT = 3000;

const MIME_TYPES = {
  default: "application/octet-stream",
  html: "text/html; charset=UTF-8",
  js: "application/javascript",
  jsx: "application/javascript",
  css: "text/css",
  png: "image/png",
  jpg: "image/jpg",
  gif: "image/gif",
  ico: "image/x-icon",
  svg: "image/svg+xml",
};

const STATIC_PATH = path.join(process.cwd(), STATIC_FOLDER);

const toBool = [() => true, () => false];

const prepareFile = async (url) => {
  // const paths = [STATIC_PATH, url];
  // if (url.endsWith("/")) paths.push("index.html");

  // Remove query params
  // http://example.com/about/?lang=en -> http://example.com/about/index.html?lang=en
  const urlPath = url.split("?").shift();
  const paths = [STATIC_PATH, urlPath];
  if (urlPath.endsWith("/")) paths.push("index.html");

  const filePath = path.join(...paths);
  const pathTraversal = !filePath.startsWith(STATIC_PATH);
  const exists = await fs.promises.access(filePath).then(...toBool);
  const found = !pathTraversal && exists;
  const streamPath = found ? filePath : STATIC_PATH + NOT_FOUND_PAGE;
  const ext = path.extname(streamPath).substring(1).toLowerCase();
  const stream = fs.createReadStream(streamPath);
  return { found, ext, stream };
};

http
  .createServer(async (req, res) => {
    const file = await prepareFile(req.url);
    const statusCode = file.found ? 200 : 404;
    const mimeType = MIME_TYPES[file.ext] || MIME_TYPES.default;

    // if (mimeType.startsWith("image") && req.url != '/resources/ai-image-generator/example/empty.png') {
    //   await new Promise(resolve => setTimeout(resolve, 1000));
    // }

    res.writeHead(statusCode, { "Content-Type": mimeType });
    file.stream.pipe(res);
    console.log(`${req.method} ${req.url} ${statusCode}`);
  })
  .listen(PORT);

console.log(`Server running at http://127.0.0.1:${PORT}/`);
