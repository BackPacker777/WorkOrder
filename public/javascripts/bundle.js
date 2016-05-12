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
/***/ function(module, exports) {

	/**
	 *   @author Bates, Howard [ hbates@northmen.org ]
	 *   @version 0.0.1
	 *   @summary http server: Work order app || Created: 05.11.2016
	 *   @todo
	 */

	"use strict";

	class main {
	     constructor() {
			 main.handleForm();
	     }

	     static handleForm() {
	          document.getElementById('submit').addEventListener('click', function(event) {
	               let data = new FormData(document.querySelector('form')); // https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
	               let bustCache = '?' + new Date().getTime();
	               const XHR = new XMLHttpRequest();
	               XHR.onload = function() {
	                    if (XHR.readyState == 4 && XHR.status == 200) {
	                         document.getElementById('name').innerHTML = XHR.responseText;
	                    }
	               };
	               XHR.open('POST', event.target.dataset.url + bustCache, true);
	               XHR.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	               XHR.send(data);
	          });
	     }
	}

	window.addEventListener("load", function() {
	     new main();
	});

/***/ }
/******/ ]);