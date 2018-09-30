var http = require("http");
var request = require("request");
var fs = require('fs');
var express = require('express');
var qs = require('querystring');
var port = 3000;
const path = require('path');
var url = require('url');

var server = http.createServer(function (req, res) {
    
     console.log('Request for ' + req.url + ' by method ' + req.method);

    if (req.method == 'GET') {
    var fileUrl;
        if (req.url == '/')
         fileUrl = '/index.html';
       
        else fileUrl = req.url;

    var filePath = path.resolve('./public'+fileUrl);
    const fileExt = path.extname(filePath);
    if (fileExt == '.html') {
      fs.exists(filePath, (exists) => {
        if (!exists) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html');
          res.end('<html><body><h1>Error 404: ' + fileUrl + 
                      ' not found</h1></body></html>');
          return;
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        fs.createReadStream(filePath).pipe(res);
      });
    }
    else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      res.end('<html><body><h1>Error 404: ' + fileUrl + 
              ' not a HTML file</h1></body></html>');
    }
  }
  else if (req.method == 'POST'){
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        console.log(req.body);
        res.end("manisha");
  }
  else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      res.end('<html><body><h1>Error 404: ' + req.method + 
              ' not supported</h1></body></html>');
  }

});
server.listen(port);
 
console.log('Server Started listening on 3000');