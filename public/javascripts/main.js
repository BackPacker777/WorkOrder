/**
 *   @author Bates, Howard [ hbates@northmen.org ]
 *   @version 0.0.1
 *   @summary http server: Work order app || Created: 05.11.2016
 *   @todo Add newly input WO's to live JSON;
 */

"use strict";

const FADE = require('./FadeStuff');

class main {
     constructor() {
          this.workList = null;
          this.counter = 0;
          this.recordCount = 0;
          main.fade('in', 'title');
          main.setButton(false);
          main.setDate();
          main.detectEdit();
          this.processForm(false, true);
          this.handleSubmit();
          this.newEntry();
          this.goForward();
          this.goBack();
     }

     processForm(isSubmitButtonClick, calledFromConstructor) {
          let bustCache = '?' + new Date().getTime();
          const XHR = new XMLHttpRequest();
          XHR.open('POST', document.url  + bustCache, true);
          if (isSubmitButtonClick === true) {
               XHR.setRequestHeader('X-Requested-LOAD', 'XMLHttpRequest1');
               let data = new FormData(document.querySelector('form')); // https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
               XHR.send(data);
          } else {
               XHR.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
               XHR.send();
          }
          XHR.onload = () => {
               if (XHR.readyState == 4 && XHR.status == 200) {
                    this.workList = JSON.parse(XHR.responseText);
                    this.recordCount = Object.keys(this.workList).length;
                    if (calledFromConstructor === false) {
                         document.getElementById('result').innerHTML = 'Request received. Thank you';
                         main.fade('in', 'result');
                         main.fade('out', 'result');
                    }
                    this.putData();
               }
          };
     }

     handleSubmit() {
          document.getElementById('submit').addEventListener('click', () => {
               main.setButton(false);
               this.processForm(true, false);
          });
     }

     putData() {
          document.getElementById('building').value = this.workList[this.counter].building;  //http://stackoverflow.com/questions/10958112/select-object-value
          document.getElementById('roomNumber').value = this.workList[this.counter].roomNumber;
          document.getElementById('submitter').value = this.workList[this.counter].submitter;
          document.getElementById('problemDesc').value = this.workList[this.counter].problemDesc;
          document.getElementById('assigned').value = this.workList[this.counter].assigned;
          document.getElementById('status').value = this.workList[this.counter].status;
          document.getElementById('id').value = this.workList[this.counter]._id;
     }

     newEntry() {
          document.getElementById('newSubmission').addEventListener('click', () => {
               document.getElementById('id').value = null;
               delete this.workList[this.counter].id;
               document.getElementById('theForm').reset();
          });
     }

     goForward() {
          document.getElementById('forward').addEventListener('click', () => {
               this.counter++;
               if (this.counter < this.recordCount) {
                    this.putData();
               } else {
                    this.counter = this.recordCount - 1;
               }
          });
     }

     goBack() {
          document.getElementById('back').addEventListener('click', () => {
               this.counter--;
               if (this.counter >= 0) {
                    this.putData();
               } else {
                    this.counter = 0;
               }
          });
     }

     static setButton(isEnabled) {
          if (isEnabled) {
               document.getElementById('submit').disabled = false;
               document.getElementById('submit').classList.remove('disabled');
          } else {
               document.getElementById('submit').disabled = true;
               document.getElementById('submit').classList.add('disabled');
          }
     }

     static detectEdit() {
          document.getElementById('theForm').addEventListener('input', () => {
               main.setButton(true);
          });
     }

     static fade(direction, fadeWhat) {
          new FADE(direction, fadeWhat).doFade();
     }

     static setDate() {
          let date = new Date();
          document.getElementById('date').value = `${date.getMonth()}/${date.getDay()}/${date.getYear()}`;
     }
}

window.addEventListener('load', () => {
     new main();
     $(function () {
          $(document).foundation();
     });
});