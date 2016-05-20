/**
 *   @author Bates, Howard [ hbates@northmen.org ]
 *   @version 0.0.1
 *   @summary http server: XX || Created: X.XX.2016
 *   @todo Everything!
 */

"use strict";

const DATA_HANDLER = require('./node/DataHandler');

class app {
     constructor() {
          this.loadServer();
          this.dataHandler = new DATA_HANDLER();
     }

     loadServer() {
          const HTTP = require('http'),
               EJS = require('ejs'),
               PORT = 1337,
               SERVER = HTTP.createServer((req, res) => {
                    let httpHandler = (err, str, contentType) => {  //http://stackoverflow.com/questions/336859/var-functionname-function-vs-function-functionname
                         if (err) {
                              res.writeHead(500, { 'Content-Type': 'text/plain' });
                              res.end('An error has occurred: ' + err.message);
                         } else if (contentType.indexOf('image') >= 0) {
                              res.writeHead(200, { 'Content-Type': contentType });
                              res.end(str, 'binary');
                         } else {
                              res.writeHead(200, { 'Content-Type': contentType });
                              res.end(EJS.render(str, {  // http://stackoverflow.com/questions/4600952/node-js-ejs-example
                                   filename: 'index.ejs'
                              }));
                         }
                    };

                    // console.log(req.headers);

                    if (req.headers['x-requested-with'] === 'XMLHttpRequest') {
                         if (req.method == 'POST') {
                              this.getFormData(req, res);
                         } else {
                              console.log("[405] " + req.method + " to " + req.url);
                              res.writeHead(405, "Method not supported", { 'Content-Type': 'text/html' });
                              res.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
                         }
                    } else if (req.headers['x-requested-load'] === 'XMLHttpRequest2') {
                         this.loadData(res);
                    } else if (req.url.indexOf('/javascripts/') >= 0) {
                         this.render(req.url.slice(1), 'application/ecmascript', httpHandler, 'utf-8');
                    } else if (req.url.indexOf('/css/') >= 0) {
                         this.render(req.url.slice(1), 'text/css', httpHandler, 'utf-8');
                    } else if (req.url.indexOf('/images/') >= 0) {
                         this.render(req.url.slice(1), 'image/jpeg', httpHandler, 'binary');
                    } else {
                         this.render('public/views/index.ejs', 'text/html', httpHandler, 'utf-8');
                    }
               }).listen(PORT, _ => console.log('-= Work Order Server Listening at http://127.0.0.1:' + PORT + ' =-'));
     }

     render(path, contentType, callback, encoding) {
          const FS = require('fs');
		FS.readFile(__dirname + '/' + path, encoding ? encoding : 'utf-8', (err, str) => { // ternary
			callback(err, str, contentType);  // http://stackoverflow.com/questions/8131344/what-is-the-difference-between-dirname-and-in-node-js
		});
     }

     getFormData(req, res) {
          const FORMIDABLE = require('formidable');  // https://docs.nodejitsu.com/articles/HTTP/servers/how-to-handle-multipart-form-data
          let formData = {};
          new FORMIDABLE.IncomingForm().parse(req).on('field', (field, name) => {
                   formData[field] = name;
              }).on('error', (err) => {
                   next(err);
              }).on('end', _ => {
                    this.dataHandler.queryData(formData);
                    res.writeHead(200, {'content-type': 'text/plain'});
                    res.write('Request Received. ');
                    res.end('Thank you!');
          });
     }

     loadData(res) {
          this.dataHandler.loadData((docs) => {
               res.writeHead(200, {'content-type': 'application/json'});
               let jsonDocs = JSON.stringify(docs); // http://stackoverflow.com/questions/5892569/responding-with-a-json-object-in-nodejs-converting-object-array-to-json-string
               res.end(jsonDocs);
          });
     }
}

module.exports = app;