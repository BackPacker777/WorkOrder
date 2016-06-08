/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *   @author Bates, Howard [ hbates@northmen.org ]
	 *   @version 0.0.1
	 *   @summary http server: Work order app || Created: 05.11.2016
	 *   @todo Add newly input WO's to live JSON;
	 */

	"use strict";

	const FADE = __webpack_require__(1);

	class main {
	     constructor() {
	          this.workList = [];
	          this.completedList = [];
	          this.counter = 0;
	          this.backCount = 0;
	          this.forwardCount = 0;
	          this.recordCount = 0;
	          main.fade('in', 'title');
	          main.setButton(false);
	          main.setDate();
	          main.detectEdit();
	          this.processForm(false, true);
	          this.handleSubmit();
	          this.countWorkOrders(0);
	          this.newEntry();
	          this.goForward();
	          this.goBack();
	          this.openPanel2();
	          this.openPanel3();
	     }

	     processForm(isSubmitButtonClick, calledFromConstructor) {
	          let bustCache = '?' + new Date().getTime();
	          const XHR = new XMLHttpRequest();
	          XHR.open('POST', document.url  + bustCache, true);
	          if (isSubmitButtonClick === true) {
	               XHR.setRequestHeader('X-Requested-LOAD', 'XMLHttpRequest1');
	               this.setCompleted();
	               let data = new FormData(document.querySelector('form')); // https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
	               XHR.send(data);
	          } else {
	               XHR.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	               XHR.send();
	          }
	          XHR.onload = () => {
	               if (XHR.readyState == 4 && XHR.status == 200) {
	                    this.recordCount = 0;
	                    let tempList = JSON.parse(XHR.responseText);
	                    for (let i = 0; i < Object.keys(tempList).length; i++) {
	                         if (tempList[i].completed == 0) {
	                              this.workList.push(tempList[i]);
	                              this.recordCount++;
	                         } else {
	                              this.completedList.push(tempList[i]);
	                         }
	                    }
	                    if (calledFromConstructor === false) {
	                         document.getElementById('result').innerHTML = 'Request received. Thank you';
	                         main.fade('in', 'result');
	                         main.fade('out', 'result');
	                    }
	                    this.putData();
	                    this.countWorkOrders(this.recordCount);
	               }
	          };
	     }

	     countWorkOrders(currentCount) {
	          this.forwardCount = currentCount;
	          document.getElementById('back').innerText = ` 0`;
	          document.getElementById('forward').innerText = ` ${this.forwardCount - 1}`;
	     }

	     handleSubmit() {
	          document.getElementById('submit').addEventListener('click', () => {
	               main.setButton(false);
	               this.processForm(true, false);
	               window.location.reload(true);
	          });
	     }

	     setCompleted() {
	          if (document.getElementById('completed').checked) {
	               document.getElementById('completedHidden').disabled = true;
	          } else {
	               document.getElementById('completedHidden').disabled = false;
	          }
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
	                    this.backCount++;
	                    this.forwardCount--;
	                    document.getElementById('forward').innerText = ` ${this.forwardCount - 1}`;
	                    document.getElementById('back').innerText = ` ${this.backCount}`;
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
	                    this.backCount--;
	                    this.forwardCount++;
	                    document.getElementById('back').innerText = ` ${this.backCount}`;
	                    document.getElementById('forward').innerText = ` ${this.forwardCount - 1}`;
	                    this.putData();
	               } else {
	                    this.counter = 0;
	               }
	          });
	     }

	     openPanel2() {
	          document.getElementById('panel2Title').addEventListener('click', () => {
	               this.processForm(false, false);
	          });
	     }

	     openPanel3() {
	          document.getElementById('legacyData').style.visibility = 'hidden';
	          document.getElementById('panel3Title').addEventListener('click', () => {
	               document.getElementById('legacyData').style.visibility = 'hidden';
	               let password = prompt(`Please enter password: `);
	               let bustCache = '?' + new Date().getTime();
	               const XHR = new XMLHttpRequest();
	               XHR.open('POST', document.url  + bustCache, true);
	               XHR.setRequestHeader('X-Requested-load', 'XMLHttpRequest2');
	               XHR.send(password);
	               XHR.onload = () => {
	                    if (XHR.readyState == 4 && XHR.status == 200) {
	                         if (XHR.responseText === 'true') {
	                              document.getElementById('legacyData').style.visibility = 'visible';
	                         } else {
	                              alert(`Incorrect password.`);
	                         }
	                    }
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
	          document.getElementById('completed').addEventListener('click', () => {
	               main.setButton(true);
	          });
	     }

	     static fade(direction, fadeWhat) {
	          new FADE(direction, fadeWhat).doFade();
	     }

	     static setDate() {
	          let date = new Date();
	          document.getElementById('date').value = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
	     }
	}

	window.addEventListener('load', () => {
	     new main();
	     $(function () {
	          $(document).foundation();
	     });
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	/*  AUTHOR: hbates@northmen.org
	 *  VERSION: 1.0
	 *  CREATED: 12.01.2015
	 */

	"use strict";

	class FadeStuff {
	    constructor(direction, fadeWhat) {
	        this.direction = direction;
	        this.fadeWhat = fadeWhat;
	    }

	    doFade() {
	        //http://www.chrisbuttery.com/articles/fade-in-fade-out-with-javascript/
	        let div = document.getElementById(this.fadeWhat);
	        if (this.direction == "in") {
	            div.style.opacity = 0;
	            div.style.visibility = 'visible';
	            (function fade() {
	                let val = parseFloat(div.style.opacity);
	                if (!((val += .01) >= 1)) {
	                    div.style.opacity = val;
	                    requestAnimationFrame(fade);
	                }
	            })();
	        } else if (this.direction == "out") {
	            div.style.opacity = 1;
	            (function fade() {
	                if ((div.style.opacity -= .01) <= 0) {
	                    div.style.visibility = 'hidden';
	                } else {
	                    requestAnimationFrame(fade);
	                }
	            })();
	        }
	    }
	}

	module.exports = FadeStuff;

/***/ }
/******/ ]);