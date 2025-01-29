import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import http from 'http'; // 使用 ES6 模組語法
import fs from 'fs';
import path from 'path';

// 使用 async/await 來處理非同步操作
const requestHandler = async (req, res) => {
  if (req.url === '/') {
    try {
      const data = await fs.promises.readFile(path.join(__dirname, 'index.html'), 'utf8');
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    } catch (err) {
      res.statusCode = 500;
      res.end('Server error');
    }
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
};

const server = http.createServer(requestHandler);

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
