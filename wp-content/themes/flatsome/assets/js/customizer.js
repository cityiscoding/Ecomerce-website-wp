/******/ (function (modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if (installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
			/******/
};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
		/******/
}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
	/******/
})
/************************************************************************/
/******/([
/* 0 */
/***/ function (module, exports, __webpack_require__) {

		module.exports = __webpack_require__(1);


		/***/
},
/* 1 */
/***/ function (module, exports) {

		// Modules
		// import 'arrive'
		// import 'feature.js'
		"use strict";

		/***/
}
/******/]);
//# sourceMappingURL=customizer.js.map
// custom.js
document.addEventListener('DOMContentLoaded', function () {
	var buttonElement = document.querySelector('.nav-top-link');
	buttonElement.addEventListener('click', function (event) {
		event.preventDefault();
		var popupElement = document.querySelector('#login-form-popup');
		if (popupElement.classList.contains('xoo-el-login-tgr')) {
			popupElement.classList.remove('xoo-el-login-tgr');
		} else {
			popupElement.classList.add('xoo-el-login-tgr');
		}
	});
});
