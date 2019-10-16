const fs = require('fs');
const path = require('path');
const express = require('express');
const server = express();
server.use(express.static('dist'));

// server.js 服务端渲染主体逻辑
// dist/server.js 就是以 entry-server.js 为入口打包出来的 JS 
const bundle = fs.readFileSync(path.resolve(__dirname, 'dist/server.js'), 'utf-8');
const renderer = require('vue-server-renderer').createBundleRenderer(bundle, {
  template: fs.readFileSync(path.resolve(__dirname, 'dist/index.ssr.html'), 'utf-8')
});

server.get('*', (req, res) => {
  console.log(req.url)
  const context = { url: req.url, pageTitle: 'default-title' }
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      if (err) {
        console.log(err);
        res.status(500).end('服务器内部错误');
        return;
      }
      res.status = 200
      res.type = 'text/html; charset=utf-8'
      res.body = html
      res.end(html);
      resolve(html);
    })
  });
})

server.listen(8002, () => {
  console.log('后端渲染服务器启动， 端口为：8002');
})

const feServer = express();
feServer.use(express.static('dist'));

feServer.get('*', (req, res) => {
  // 输出html
  let html = fs.readFileSync(path.resolve(__dirname, 'dist/index.html'), 'utf-8');
  res.end(html);
});

feServer.listen(8003, () => {
  console.log('前端渲染服务器启动，端口号为：8003')
})

