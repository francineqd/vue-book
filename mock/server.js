let http = require('http');
let fs = require('fs');
let url = require('url');

// 封装方法 读取文件数据
function read(cb) {
  fs.readFile('./books.json','utf8',(err,data)=>{
    if(err || data.length == 0) {
      cb([]);
    } else {
      cb(JSON.parse(data));
    }
  });
}  

// 封装方法 将数据写入文件
function write(data,cb) {
  fs.writeFile('./books.json',JSON.stringify(data),cb)
}

http.createServer((req,res)=>{
  // nodejs设置响应头解决跨域的方法
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');
  res.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Access-Token');
  res.setHeader('X-Powered-By', '3.2.1')
  res.setHeader('content-type','application/json;charset=utf8');
  
  let {pathname,query} = url.parse(req.url,true);
  let id = parseInt(query.id);
  const pageSize = 5;
  if (req.method == 'OPTIONS') return res.end('');
  switch(req.method) {
    case 'GET':
      if(pathname == '/sliders') {
        // 获取轮播图数据  /sliders
        let sliders = require('./index.js'); 
        res.end(JSON.stringify(sliders));
      }
    
      // 获取热门图书信息
      if(pathname == '/hot') {
        read(function(books) {
          books = books.reverse().slice(0,6);
          res.end(JSON.stringify(books));
        });
      }
    
      //获取所有图书信息
      // if(pathname == '/getAllBooks') {
      //   read(function(books) {
      //     res.end(JSON.stringify(books));
      //   });
      // }

      // 将获取的所有图书信息进行分页
      if(pathname == '/page') {
        //拿到前台传递的数据
        let index = parseInt(query.index) || 0;
        let hasMore = true;
        read(function(books) {
          result = books.reverse().slice(index,index+pageSize);
          if(books.length <= index + pageSize) {
            hasMore = false;
          }
          res.end(JSON.stringify({hasMore,books:result}));
        });
      }

      // 获取指定图书信息
      if(pathname == '/book') {
        read(function(books) {
          book = books.find(item=>item.bookId === id);
          if(!book) book = {};
          res.end(JSON.stringify(book));
        });
      }
      break;

    case 'POST':
      break;

    case 'PUT':
      let str = '';
      req.on('data',chunck=>{
        str += chunck;
        
      });
      
      req.on('end',()=>{
        book = JSON.parse(str);
        read(function(books) {
          books = books.map(item=>{
            if(item.bookId === id) {
              return book;
            }
            return item;
          });
          write(books,function() {
            res.end(JSON.stringify(book));
          });
        });
      });
      break;

    case 'DELETE':
      read(function(books) {
        books = books.filter(item=>item.bookId !== id);
        write(books,function() {
          res.end(JSON.stringify({}));// 删除成功后向前台返回空对象
        });
      });
      break;
  }
}).listen(4000);