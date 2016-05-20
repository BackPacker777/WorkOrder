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
	 *   @todo fix updating; completed button; create work list
	 */

	"use strict";

	const FADE = __webpack_require__(1);

	class main {
	     constructor() {
	          this.workList;
	          this.counter = 0;
	          this.recordCount = 0;
	          main.fade('in', 'title');
	          this.loadData();this.handleForm();
	          this.newEntry();
	          this.goForward();
	          this.goBack();
	     }

	     handleForm() {
	          // document.getElementById('result').style.display = 'none'; //http://stackoverflow.com/questions/133051/what-is-the-difference-between-visibilityhidden-and-displaynone
	          document.getElementById('submit').addEventListener('click', (event) => {
	               let data = new FormData(document.querySelector('form')); // https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
	               let bustCache = '?' + new Date().getTime();
	               const XHR = new XMLHttpRequest();
	               document.getElementById('theForm').reset();
	               XHR.onload = () => {
	                    if (XHR.readyState == 4 && XHR.status == 200) {
	                         this.workList = JSON.parse(XHR.responseText);
	                         this.recordCount = Object.keys(this.workList).length;
	                         document.getElementById('result').innerHTML = XHR.responseText;
	                         main.fade('in', 'result');
	                         main.fade('out', 'result');
	                    }
	               };
	               XHR.open('POST', event.target.dataset.url + bustCache, true);
	               XHR.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	               XHR.send(data);
	          });
	     }

	     static fade(direction, fadeWhat) {
	          new FADE(direction, fadeWhat).doFade();
	     }

	     loadData() {
	          const XHR = new XMLHttpRequest();
	          XHR.open('POST', document.url, true);
	          XHR.setRequestHeader('X-Requested-LOAD', 'XMLHttpRequest2');
	          XHR.send();
	          XHR.onload = () => {
	               if (XHR.readyState == 4 && XHR.status == 200) {
	                    this.workList = JSON.parse(XHR.responseText); //http://stackoverflow.com/questions/32376010/how-to-convert-json-stringify-to-object-javascript
	                    this.recordCount = Object.keys(this.workList).length;
	                    console.log(`COUNTER: ${this.counter}  RECORD_COUNT: ${this.recordCount}`);
	                    this.putData();
	               }
	          };
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
	               document.getElementById('theForm').reset();
	          });
	     }

	     goForward() {
	          document.getElementById('forward').addEventListener('click', () => {
	               this.counter++;
	               if (this.counter < this.recordCount) {
	                    console.log(`COUNTER: ${this.counter}  RECORD_COUNT: ${this.recordCount}`);
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
	                    console.log(`COUNTER: ${this.counter}  RECORD_COUNT: ${this.recordCount}`);
	                    this.putData();
	               } else {
	                    this.counter = 0;
	               }
	          });
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