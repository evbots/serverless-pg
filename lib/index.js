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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("pg");

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var pg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var pg__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pg__WEBPACK_IMPORTED_MODULE_0__);

/**
 * A function to create a wrapped client instance.
 *
 * @param {object} params - client parameters
 * @returns {object} wrapped client instance
 */

const createClient = ({
  config,
  onConnect = () => {},
  onClose = () => {},
  beforeQuery = () => {},
  afterQuery = () => {}
}) => {
  let connectedPromise;
  let client;
  /**
   * A function to return the pg client instance.
   *
   * @returns {Client} pg client instance
   */

  const getClient = () => client;
  /**
   * A function to connect to the database.
   *
   * @returns {undefined} returns after the connection is attempted
   */


  const connect = async () => {
    if (client === undefined) {
      if (connectedPromise === undefined) {
        const pgClient = new pg__WEBPACK_IMPORTED_MODULE_0__["Client"](config);
        connectedPromise = pgClient.connect().then(() => onConnect()).then(() => {
          client = pgClient;
        });
      }

      await connectedPromise;
    }
  };
  /**
   * A function to create a wrapped client instance.
   *
   * @param {...*} queryParams - query parameters
   * @returns {Promise} resolved query response
   */


  const query = async (...queryParams) => {
    await connect();
    const beforeResult = beforeQuery(...queryParams);
    const queryResponse = await client.query(...queryParams);
    afterQuery(queryResponse, beforeResult);
    return queryResponse;
  };
  /**
   * A function to end the connection to the database.
   *
   * @returns {undefined} returns after the connection is closed
   */


  const end = async () => {
    if (client !== undefined) {
      await client.end();
      client = undefined;
      connectedPromise = undefined;
      onClose();
    }
  };
  /**
   * A function to complete a transaction.
   *
   * @param {Array} collection - a collection of queries
   * @returns {undefined} resolved after transaction completes
   */


  const transaction = async collection => {
    await connect();

    try {
      await client.query('BEGIN');
      await collection.reduce((promiseChain, delayedQuery) => promiseChain.then(() => delayedQuery()), Promise.resolve());
      await client.query('END');
      return undefined;
    } catch (error) {
      await client.query('ROLLBACK');
      return Promise.reject(error);
    }
  };

  return {
    getClient,
    connect,
    query,
    end,
    transaction
  };
};

/* harmony default export */ __webpack_exports__["default"] = (createClient);

/***/ })
/******/ ])["default"];