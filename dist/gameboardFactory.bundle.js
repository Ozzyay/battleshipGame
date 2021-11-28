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

/***/ "./src/gameboardFactory.js":
/*!*********************************!*\
  !*** ./src/gameboardFactory.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n/* eslint-disable class-methods-use-this */\nvar GameBoard = /*#__PURE__*/function () {\n  function GameBoard() {\n    _classCallCheck(this, GameBoard);\n\n    this.board = [];\n    this.ships = 0;\n\n    if (this.board.length < 100) {\n      this.createBoard();\n    }\n\n    this.destroyer = {};\n    this.cruiser = {};\n    this.submarine = {};\n    this.carrier = {};\n    this.battleship = {};\n  }\n\n  _createClass(GameBoard, [{\n    key: \"createBoard\",\n    value: function createBoard() {\n      for (var i = 0; i < 100; i++) {\n        this.board.push({\n          shipPlacement: false,\n          beenShot: false,\n          occupant: ''\n        });\n      }\n    }\n  }, {\n    key: \"receiveAttack\",\n    value: function receiveAttack(coordinates) {\n      if (this.board[coordinates].beenShot === false) {\n        if (this.board[coordinates].shipPlacement === true) {\n          this.board[coordinates].beenShot = true;\n          return this.board[coordinates].occupant.hit();\n        }\n      }\n\n      return false;\n    }\n  }, {\n    key: \"checkLegalityVertical\",\n    value: function checkLegalityVertical(startingCoordinate, length) {\n      var coords = [startingCoordinate];\n\n      for (var i = 1; i < length; i += 1) {\n        var n = i * 10;\n        var newloc = startingCoordinate - n;\n\n        if (newloc >= 0) {\n          coords.push(newloc);\n        } else {\n          return false;\n        }\n      }\n\n      var check = coords.reduce(function (prev, curr) {\n        return Math.max(prev, curr);\n      }, 0);\n\n      if (check !== startingCoordinate) {\n        return false;\n      }\n\n      return coords;\n    }\n  }, {\n    key: \"checkLegalityHorizontal\",\n    value: function checkLegalityHorizontal(startingCoordinate, length) {\n      var coords = [startingCoordinate];\n      var rowEnds = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];\n\n      for (var i = 1; i < length; i++) {\n        var x = startingCoordinate + i;\n        coords.push(x);\n      } // eslint-disable-next-line no-unreachable-loop\n\n\n      var testArray = coords.slice(0, -1);\n      var testResults = testArray.map(function (element) {\n        return rowEnds.includes(element);\n      });\n\n      if (testResults.includes(true)) {\n        return false;\n      }\n\n      return coords;\n    } // eslint-disable-next-line consistent-return\n\n  }, {\n    key: \"checkPlacement\",\n    value: function checkPlacement(startingCoordinate, direction, length) {\n      if (direction === 'vertical') {\n        if (this.checkLegalityVertical(startingCoordinate, length) === false) {\n          return false;\n        }\n\n        return this.checkLegalityVertical(startingCoordinate, length);\n      }\n\n      if (direction === 'horizontal') {\n        if (this.checkLegalityHorizontal(startingCoordinate, length) === false) {\n          return false;\n        }\n\n        return this.checkLegalityHorizontal(startingCoordinate, length);\n      }\n    }\n  }, {\n    key: \"confirmPlacement\",\n    value: function confirmPlacement(coordinatesArray, obj) {\n      var legitArray = [];\n\n      for (var i = 0; i < coordinatesArray.length; i += 1) {\n        if (this.board[coordinatesArray[i]].shipPlacement === false) {\n          legitArray.push(coordinatesArray[i]);\n        }\n      }\n\n      if (legitArray.length === coordinatesArray.length) {\n        if (obj.name === 'submarine') {\n          this.submarine = obj;\n\n          for (var _i = 0; _i < legitArray.length; _i += 1) {\n            this.board[legitArray[_i]].shipPlacement = true;\n            this.board[legitArray[_i]].occupant = this.submarine;\n          }\n        }\n\n        if (obj.name === 'destroyer') {\n          this.destroyer = obj;\n\n          for (var _i2 = 0; _i2 < legitArray.length; _i2 += 1) {\n            this.board[legitArray[_i2]].shipPlacement = true;\n            this.board[legitArray[_i2]].occupant = this.destroyer;\n          }\n        }\n\n        if (obj.name === 'battleship') {\n          this.battleship = obj;\n\n          for (var _i3 = 0; _i3 < legitArray.length; _i3 += 1) {\n            this.board[legitArray[_i3]].shipPlacement = true;\n            this.board[legitArray[_i3]].occupant = this.battleship;\n          }\n        }\n\n        if (obj.name === 'carrier') {\n          this.carrier = obj;\n\n          for (var _i4 = 0; _i4 < legitArray.length; _i4 += 1) {\n            this.board[legitArray[_i4]].shipPlacement = true;\n            this.board[legitArray[_i4]].occupant = this.carrier;\n          }\n        }\n\n        if (obj.name === 'cruiser') {\n          this.cruiser = obj;\n\n          for (var _i5 = 0; _i5 < legitArray.length; _i5 += 1) {\n            this.board[legitArray[_i5]].shipPlacement = true;\n            this.board[legitArray[_i5]].occupant = this.cruiser;\n          }\n        }\n\n        return true;\n      }\n\n      return false;\n    }\n  }, {\n    key: \"checkBoard\",\n    value: function checkBoard() {\n      var unhit = [];\n\n      for (var i = 0; i < this.board.length; i += 1) {\n        if (this.board[i].shipPlacement === true && this.board[i].beenShot === false) {\n          unhit.push(this.board[i]);\n        }\n      }\n\n      if (unhit.length === 0) {\n        return true;\n      }\n\n      return false;\n    }\n  }]);\n\n  return GameBoard;\n}();\n/* module.exports = gameBoard; */\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameBoard);\n\n//# sourceURL=webpack://my-webpack-project/./src/gameboardFactory.js?");

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
/******/ 	__webpack_modules__["./src/gameboardFactory.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;