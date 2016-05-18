/**
 *   @author Bates, Howard [ hbates@northmen.org ]
 *   @version 0.0.1
 *   @summary http server: Work order app || Created: 05.11.2016
 *   @todo
 */

"use strict";

const FADE = require('./FadeStuff');

class main {
     constructor() {
          main.handleForm();
          main.fade('in', 'title');
          main.loadData();
     }

     static handleForm() {
          document.getElementById('result').style.display = 'none'; //http://stackoverflow.com/questions/133051/what-is-the-difference-between-visibilityhidden-and-displaynone
          document.getElementById('submit').addEventListener('click', function(event) {
               let data = new FormData(document.querySelector('form')); // https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
               let bustCache = '?' + new Date().getTime();
               const XHR = new XMLHttpRequest();
               XHR.onload = function() {
                    if (XHR.readyState == 4 && XHR.status == 200) {
                         document.getElementById('result').innerHTML = XHR.responseText;
                         main.fade('in', 'result');
                         main.fade('out', 'result');
                    }
               };
               XHR.open('POST', event.target.dataset.url + bustCache, true);
               XHR.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
               XHR.send(data);
               document.getElementById('theForm').reset();
          });
     }

     static fade(direction, fadeWhat) {
          new FADE(direction, fadeWhat).doFade();
     }

     static loadData() {
          const XHR = new XMLHttpRequest();
          XHR.onload = function() {
               if (XHR.readyState == 4 && XHR.status == 200) {
                    // let response = JSON.parse(XHR.responseText);
                    let ajaxResponse = JSON.parse(XHR.responseText);  //http://stackoverflow.com/questions/32376010/how-to-convert-json-stringify-to-object-javascript
                    document.getElementById('building').value = ajaxResponse[0].building;  //http://stackoverflow.com/questions/10958112/select-object-value
                    document.getElementById('roomNumber').value = ajaxResponse[0].roomNumber;
                    document.getElementById('submitter').value = ajaxResponse[0].submitter;
                    document.getElementById('problemDesc').value = ajaxResponse[0].problemDesc;
                    document.getElementById('assigned').value = ajaxResponse[0].assigned;
                    document.getElementById('status').value = ajaxResponse[0].status;
               }
          };
          XHR.open('POST', 'http://127.0.0.1:1337', true);
          XHR.setRequestHeader('X-Requested-LOAD', 'XMLHttpRequest2');
          XHR.send();
     }
}

window.addEventListener('load', function() {
     new main();
});