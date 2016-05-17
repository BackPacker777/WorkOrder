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
	 *   @todo
	 */

	"use strict";

	const FADE = __webpack_require__(1);

	class main {
	     constructor() {
	          main.handleForm();
	          main.fade('in', 'title');
	          main.loadData();
	     }

	     static handleForm() {
	          document.getElementById('submit').addEventListener('click', function(event) {
	               let data = new FormData(document.querySelector('form')); // https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
	               let bustCache = '?' + new Date().getTime();
	               const XHR = new XMLHttpRequest();
	               XHR.onload = function() {
	                    if (XHR.readyState == 4 && XHR.status == 200) {
	                         document.getElementById('result').style.display = 'none';
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
	                    let response = JSON.parse(XHR.responseText);
	                    console.log(response);
	                    document.getElementsByTagName('building').value = response.building;
	               }
	          };
	          XHR.open('POST', 'http://10.6.3.2:1337', true);
	          XHR.setRequestHeader('X-Requested-LOAD', 'XMLHttpRequest2');
	          XHR.send();

	          /*window.addEventListener('load', function(event) {

	          });*/
	     }
	}

	window.addEventListener('load', function() {
	     new main();
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
	            div.style.display = "block";
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
	                    div.style.display = "none";
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