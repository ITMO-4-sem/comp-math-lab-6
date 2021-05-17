/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./ts/calculations/FlexibleTable.ts":
/*!******************************************!*\
  !*** ./ts/calculations/FlexibleTable.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FlexibleTable": () => (/* binding */ FlexibleTable)
/* harmony export */ });
class FlexibleTable {
    /**
     *
     * @param {Array<number>} xValues
     * @param {Array<number>} yValues
     * @throws Error if xValues.length != yValues.length
     */
    constructor(xValues, yValues) {
        if (xValues.length < yValues.length) {
            throw new Error('xValues row length must be not less then the yValues rows' +
                ' one');
        }
        if (yValues.length === 0) {
            throw new Error('yValues row need to contain least 1 element.');
        }
        this.xValues = xValues;
        this.yValues = yValues;
    }
    clone() {
        return new FlexibleTable(Array.from(this.xValues), Array.from(this.yValues));
    }
    size() {
        return this.xValues.length;
    }
    getXValues() {
        return this.xValues;
    }
    getYValues() {
        return this.yValues;
    }
}


/***/ }),

/***/ "./ts/calculations/functions/FirstFunction.ts":
/*!****************************************************!*\
  !*** ./ts/calculations/functions/FirstFunction.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FirstFunction": () => (/* binding */ FirstFunction)
/* harmony export */ });
/* harmony import */ var _ts_calculations_functions_Function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ts/calculations/functions/Function */ "./ts/calculations/functions/Function.ts");

class FirstFunction extends _ts_calculations_functions_Function__WEBPACK_IMPORTED_MODULE_0__.Function {
    getRepresentation() {
        return 'y + (1 + x) * y^2';
    }
    func(x) {
        return 0;
    }
    funcDerivative(x, y) {
        return (y + (1 + x) * y * y);
    }
}


/***/ }),

/***/ "./ts/calculations/functions/Function.ts":
/*!***********************************************!*\
  !*** ./ts/calculations/functions/Function.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Function": () => (/* binding */ Function)
/* harmony export */ });
class Function {
}


/***/ }),

/***/ "./ts/calculations/methods/Method.ts":
/*!*******************************************!*\
  !*** ./ts/calculations/methods/Method.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Method": () => (/* binding */ Method)
/* harmony export */ });
class Method {
}


/***/ }),

/***/ "./ts/calculations/methods/onestepmethods/EulerMethod.ts":
/*!***************************************************************!*\
  !*** ./ts/calculations/methods/onestepmethods/EulerMethod.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EulerMethod": () => (/* binding */ EulerMethod)
/* harmony export */ });
/* harmony import */ var _ts_calculations_methods_Method__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ts/calculations/methods/Method */ "./ts/calculations/methods/Method.ts");

class EulerMethod extends _ts_calculations_methods_Method__WEBPACK_IMPORTED_MODULE_0__.Method {
    // private xValues: Array<number> = [];
    // private yValues: Array<number> = [];
    // private h: number = 1;
    getAccuracyOrder() {
        return 1;
    }
    /**
     *
     * @param {FlexibleTable} table with prefilled xValues and one or several counted
     * yValues.
     * @param func
     * @param {number} step
     * @return {FlexibleTable}
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    calc(table, func, step) {
        const h = step;
        const xValues = table.getXValues();
        const yValues = table.getYValues();
        for (let i = yValues.length; i < table.size(); i++) {
            yValues[i] = yValues[i - 1] + h * func.funcDerivative(xValues[i - 1], yValues[i - 1]);
        }
        return table;
    }
}


/***/ }),

/***/ "./ts/calculations/methods/onestepmethods/ModifiedEulerMethod.ts":
/*!***********************************************************************!*\
  !*** ./ts/calculations/methods/onestepmethods/ModifiedEulerMethod.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ModifiedEulerMethod": () => (/* binding */ ModifiedEulerMethod)
/* harmony export */ });
/* harmony import */ var _ts_calculations_methods_Method__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ts/calculations/methods/Method */ "./ts/calculations/methods/Method.ts");

class ModifiedEulerMethod extends _ts_calculations_methods_Method__WEBPACK_IMPORTED_MODULE_0__.Method {
    getAccuracyOrder() {
        return 2;
    }
    // eslint-disable-next-line @typescript-eslint/ban-types
    calc(table, func, step) {
        const h = step;
        const xValues = table.getXValues();
        const yValues = table.getYValues();
        for (let i = yValues.length; i < table.size(); i++) {
            yValues[i] = (yValues[i - 1]
                + h / 2
                    * (func.funcDerivative(xValues[i - 1], yValues[i - 1])
                        + func.funcDerivative(xValues[i], yValues[i - 1] + h * func.funcDerivative(xValues[i - 1], yValues[i - 1]))));
        }
        return table;
    }
}


/***/ }),

/***/ "./ts/calculations/methods/onestepmethods/RungeKuttaMethod.ts":
/*!********************************************************************!*\
  !*** ./ts/calculations/methods/onestepmethods/RungeKuttaMethod.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RungeKuttaMethod": () => (/* binding */ RungeKuttaMethod)
/* harmony export */ });
/* harmony import */ var _ts_calculations_methods_Method__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ts/calculations/methods/Method */ "./ts/calculations/methods/Method.ts");

class RungeKuttaMethod extends _ts_calculations_methods_Method__WEBPACK_IMPORTED_MODULE_0__.Method {
    getAccuracyOrder() {
        return 4;
    }
    // eslint-disable-next-line @typescript-eslint/ban-types
    calc(table, func, step) {
        const h = step;
        const xValues = table.getXValues();
        const yValues = table.getYValues();
        for (let i = yValues.length; i < table.size(); i++) {
            const xiPrev = xValues[i - 1];
            const yiPrev = yValues[i - 1];
            const k1 = h * func.funcDerivative(xiPrev, yiPrev);
            const k2 = h * func.funcDerivative(xiPrev + h / 2, yiPrev + k1 / 2);
            const k3 = h * func.funcDerivative(xiPrev + h / 2, yiPrev + k2 / 2);
            const k4 = h * func.funcDerivative(xiPrev + h, yiPrev + k3);
            yValues[i] = yiPrev + 1 / 6 * (k1 + 2 * k2 + 2 * k3 + k4);
        }
        return table;
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./ts/debug.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ts_calculations_FlexibleTable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ts/calculations/FlexibleTable */ "./ts/calculations/FlexibleTable.ts");
/* harmony import */ var _ts_calculations_methods_onestepmethods_EulerMethod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ts/calculations/methods/onestepmethods/EulerMethod */ "./ts/calculations/methods/onestepmethods/EulerMethod.ts");
/* harmony import */ var _ts_calculations_functions_FirstFunction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ts/calculations/functions/FirstFunction */ "./ts/calculations/functions/FirstFunction.ts");
/* harmony import */ var _ts_calculations_methods_onestepmethods_ModifiedEulerMethod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ts/calculations/methods/onestepmethods/ModifiedEulerMethod */ "./ts/calculations/methods/onestepmethods/ModifiedEulerMethod.ts");
/* harmony import */ var _ts_calculations_methods_onestepmethods_RungeKuttaMethod__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ts/calculations/methods/onestepmethods/RungeKuttaMethod */ "./ts/calculations/methods/onestepmethods/RungeKuttaMethod.ts");





const firstFunction = new _ts_calculations_functions_FirstFunction__WEBPACK_IMPORTED_MODULE_2__.FirstFunction();
const flexibleTable = new _ts_calculations_FlexibleTable__WEBPACK_IMPORTED_MODULE_0__.FlexibleTable([1, 1.1, 1.2, 1.3, 1.4, 1.5], [-1]);
const h = 0.1;
const eulerMethod = new _ts_calculations_methods_onestepmethods_EulerMethod__WEBPACK_IMPORTED_MODULE_1__.EulerMethod();
const eulerMethodResult = eulerMethod.calc(flexibleTable.clone(), firstFunction, h);
console.log('eulerMethodResult = ', eulerMethodResult);
const modifiedEulerMethod = new _ts_calculations_methods_onestepmethods_ModifiedEulerMethod__WEBPACK_IMPORTED_MODULE_3__.ModifiedEulerMethod();
const modifiedEulerMethodResult = modifiedEulerMethod.calc(flexibleTable.clone(), firstFunction, h);
console.log('modifiedEulerMethodResult = ', modifiedEulerMethodResult);
const rungeKuttaMethod = new _ts_calculations_methods_onestepmethods_RungeKuttaMethod__WEBPACK_IMPORTED_MODULE_4__.RungeKuttaMethod();
const rungeKuttaMethodResult = rungeKuttaMethod.calc(flexibleTable.clone(), firstFunction, h);
console.log('rungeKuttaMethodResult = ', rungeKuttaMethodResult);

})();

/******/ })()
;
//# sourceMappingURL=debug.js.map