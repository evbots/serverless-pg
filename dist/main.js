module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("pg");

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es6_object_to_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var core_js_modules_es6_object_to_string__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_to_string__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var bluebird__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var bluebird__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bluebird__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var pg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1);
/* harmony import */ var pg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(pg__WEBPACK_IMPORTED_MODULE_3__);



function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




class DbClient {
  constructor(clientParams) {
    this._clientParams = clientParams;
    this._client = null;
  }

  dbConnect() {
    this._client = new bluebird__WEBPACK_IMPORTED_MODULE_2___default.a(resolve => {
      const client = new pg__WEBPACK_IMPORTED_MODULE_3__["Client"](this._clientParams);
      return client.connect().then(() => {
        resolve(client);
      });
    });
    return this._client;
  }

  query(text, params) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const start = Date.now();

      if (!_this._client) {
        yield _this.dbConnect();
      }

      const resolvedClient = yield _this._client;
      return resolvedClient.query(text, params).then(queryResponse => {
        const duration = Date.now() - start;
        console.log('executed query', {
          text,
          duration,
          rowCount: queryResponse.rowCount
        });
        return queryResponse;
      }).catch(error => {
        console.error('attempted query', text);
        return bluebird__WEBPACK_IMPORTED_MODULE_2___default.a.reject(error);
      });
    })();
  }

  end() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      if (_this2._client) {
        const resolvedClient = yield _this2._client;
        yield resolvedClient.end();
        _this2._client = null;
        return bluebird__WEBPACK_IMPORTED_MODULE_2___default.a.resolve();
      }

      return bluebird__WEBPACK_IMPORTED_MODULE_2___default.a.resolve();
    })();
  }

  transaction(collection) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      try {
        yield _this3.query('BEGIN');
        yield bluebird__WEBPACK_IMPORTED_MODULE_2___default.a.mapSeries(collection, delayedQuery => delayedQuery());
        return yield _this3.query('END');
      } catch (error) {
        yield _this3.query('ROLLBACK');
        return bluebird__WEBPACK_IMPORTED_MODULE_2___default.a.reject(error);
      }
    })();
  }

}

/* harmony default export */ __webpack_exports__["default"] = (DbClient);

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("core-js/modules/es6.promise");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("core-js/modules/es6.object.to-string");

/***/ })
/******/ ]);