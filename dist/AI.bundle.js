/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/AI.js":
/*!*******************!*\
  !*** ./src/AI.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar npcAi = /*#__PURE__*/function () {\n  function npcAi() {\n    _classCallCheck(this, npcAi);\n\n    this.suitableShotArray = [];\n    this.refreshArray();\n    this.preset1 = [[70, 'horizontal', 5], [99, 'vertical', 4], [93, 'horizontal', 3], [23, 'horizontal', 3], [57, 'vertical', 2]];\n    this.preset2 = [[52, 'horizontal', 5], [88, 'vertical', 4], [36, 'horizontal', 3], [31, 'vertical', 3], [92, 'vertical', 2]];\n    this.preset3 = [[68, 'vertical', 5], [71, 'horizontal', 4], [93, 'horizontal', 3], [65, 'vertical', 3], [11, 'horizontal', 2]];\n  }\n\n  _createClass(npcAi, [{\n    key: \"selectPreset\",\n    value: function selectPreset() {\n      var x = this.constructor.randomInt(1, 3);\n\n      if (x === 1) {\n        return this.preset1;\n      }\n\n      if (x === 2) {\n        return this.preset2;\n      }\n\n      return this.preset3;\n    }\n  }, {\n    key: \"refreshArray\",\n    value: function refreshArray() {\n      for (var i = 0; i < 100; i++) {\n        this.suitableShotArray.push(i);\n      }\n    }\n  }, {\n    key: \"randomShot\",\n    value: function randomShot() {\n      var shot = this.constructor.randomInt(0, this.suitableShotArray.length);\n      var x = this.suitableShotArray[shot];\n      this.suitableShotArray.splice(shot, 1);\n      return x;\n    }\n  }], [{\n    key: \"randomInt\",\n    value: function randomInt(min, max) {\n      return Math.floor(Math.random() * (max - min + 1) + min);\n    }\n  }]);\n\n  return npcAi;\n}();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (npcAi);\n\n//# sourceURL=webpack://my-webpack-project/./src/AI.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/AI.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;