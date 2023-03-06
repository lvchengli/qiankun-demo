const http = require('http');
const httpProxy = require('http-proxy-middleware');
const fs = require('fs');

// 定义目录和前缀
const directoryPath = '.';
// 用来给 github.io 使用的前缀
const prefix = '/qiankun-demo';

// 创建静态资源服务器
const staticServer = http.createServer((req, res) => {
  const options = {
    root: directoryPath,
  };

  const filePath = req.url.replace(prefix, '');
  let fullPath = `${options.root}${filePath}`;

  // 自动给目录增加 index.html 后缀
  if (fullPath.endsWith('/')) {
    fullPath += 'index.html'
  }
  // 如果找不到文件返回 500 避免crush
  fs.stat(fullPath, (error, stats) => {
    if (error) {
      console.error(`Error occurred while serving ${req.url}: ${error}`);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal server error');
      return;
    }

    const fileStream = fs.createReadStream(fullPath);
    fileStream.pipe(res);
  });
});
// 启动静态资源服务器
staticServer.listen(() => {
  console.log(`Static server started on http://localhost:${staticServer.address().port}${prefix}`);

  // 创建代理中间件
  const proxyMiddleware = httpProxy.createProxyMiddleware({
    target: `http://localhost:${staticServer.address().port}`,
    pathRewrite: { [`^${prefix}`]: '/' },
  });

  // 添加代理中间件到静态资源服务器
  const server = http.createServer((req, res) => {
    // 如果转发失败，返回 500 避免crush
    try {
      proxyMiddleware(req, res, () => {
        staticServer.emit('request', req, res);
      });
    } catch (error) {
      console.error(`Error occurred while processing ${req.url}: ${error}`);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal server error');
    }
  });

  // 启动代理服务器
  server.listen(8080, () => {
    console.log(`Proxy server started on http://localhost:8080`);
  });
});
