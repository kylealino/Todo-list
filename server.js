const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const jsonServer = require('json-server');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const server = jsonServer.create();
const router = jsonServer.router('todos.json'); 

server.use('/api', router);

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    if (pathname.startsWith('/tasks')) {
      // Serve API requests using json-server
      server(req, res);
    } else {
      // Handle other requests with Next.js
      handle(req, res, parsedUrl);
    }
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3001/tasks');
  });
});
