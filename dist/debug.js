/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./ts/calculations/Core.ts":
/*!*********************************!*\
  !*** ./ts/calculations/Core.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Core": () => (/* binding */ Core)
/* harmony export */ });
/* harmony import */ var _ts_calculations_util_FlexibleTable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ts/calculations/util/FlexibleTable */ "./ts/calculations/util/FlexibleTable.ts");

class Core {
    // eslint-disable-next-line @typescript-eslint/ban-types
    calcMethod(func, range, method, accuracy, initialStepNum) {
        if (initialStepNum && initialStepNum < 1) {
            throw new Error('"initialStepNum" must be greater than zero.');
        }
        const stepNumber = initialStepNum !== undefined ? initialStepNum : 4;
        const rangeLength = range.length;
        let step = rangeLength / stepNumber;
        let resultTableStepH = this.calcWIthFixedStep(method, func, range, step);
        let maxBias;
        do {
            step /= 2;
            const resultTableStepHalfH = this.calcWIthFixedStep(method, func, range, step);
            // считаем погрешность 
            // присваиваем tableH значение tableHalfH
            console.log('resultTableStepH = ', resultTableStepH);
            console.log('resultTableStepHalfH = ', resultTableStepHalfH);
            maxBias = this.getMaxBias(resultTableStepH.getYValues(), resultTableStepHalfH.getYValues(), method.getRequiredNumOfPredefinedYValues());
            resultTableStepH = resultTableStepHalfH;
            console.log('maxBias = ', maxBias);
        } while (!this.isAccuracySufficient(accuracy, maxBias));
    }
    //todo выводить объект с 1) таблицей 2) шагом 3) максимальной погрешностью
    // eslint-disable-next-line @typescript-eslint/ban-types
    calcWIthFixedStep(method, func, range, step) {
        const xValues = new Array();
        const yValues = new Array();
        for (let x = range.start; x < range.end + 0.000001; x += step) {
            xValues.push(x);
        }
        for (let i = 0; i < method.getRequiredNumOfPredefinedYValues(); i++) {
            yValues.push(func.func(xValues[i]));
        }
        return method.calc(new _ts_calculations_util_FlexibleTable__WEBPACK_IMPORTED_MODULE_0__.FlexibleTable(xValues, yValues), func);
    }
    isAccuracySufficient(accuracy, maxBias) {
        return accuracy > maxBias;
    }
    getMaxBias(yValuesH, yValuesHalfH, requiredNumOfPredefinedYValues) {
        if (yValuesH.length * 2 - 1 != yValuesHalfH.length) {
            throw new Error('"yValuesH" length must be 2 times minus 1 shorter than' +
                ' "yValuesHalfH" length.');
        }
        let maxBias = yValuesHalfH[1] - yValuesH[0];
        for (let i = 0; i < yValuesH.length; i++) {
            maxBias = Math.max(maxBias, this.calcRungeBias(yValuesH[i], yValuesHalfH[i * 2], requiredNumOfPredefinedYValues));
        }
        return maxBias;
    }
    calcRungeBias(yH, yHalfH, p) {
        if (p <= 0) {
            throw new Error('"p" must be a positive number');
        }
        return (Math.abs(yH - yHalfH)
            / (Math.pow(2, p) - 1));
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
        return (Math.exp(x) / (this.constant - x * Math.exp(x)));
    }
    funcDerivative(x, y) {
        return (y + (1 + x) * y * y);
    }
    calcConstant(primaryCondition) {
        const x = primaryCondition.x;
        const y = primaryCondition.y;
        return ((Math.exp(x) + y * x * Math.exp(x)) / y);
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
    constructor(primaryCondition) {
        this.constant = this.calcConstant(primaryCondition);
    }
}


/***/ }),

/***/ "./ts/calculations/functions/PrimaryCondition.ts":
/*!*******************************************************!*\
  !*** ./ts/calculations/functions/PrimaryCondition.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrimaryCondition": () => (/* binding */ PrimaryCondition)
/* harmony export */ });
class PrimaryCondition {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
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

/***/ "./ts/calculations/methods/multistepmethods/AdamsMethod.ts":
/*!*****************************************************************!*\
  !*** ./ts/calculations/methods/multistepmethods/AdamsMethod.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AdamsMethod": () => (/* binding */ AdamsMethod)
/* harmony export */ });
/* harmony import */ var _ts_calculations_methods_multistepmethods_MultiStepMethod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ts/calculations/methods/multistepmethods/MultiStepMethod */ "./ts/calculations/methods/multistepmethods/MultiStepMethod.ts");

class AdamsMethod extends _ts_calculations_methods_multistepmethods_MultiStepMethod__WEBPACK_IMPORTED_MODULE_0__.MultiStepMethod {
    constructor() {
        super(...arguments);
        this.xValues = [];
        this.yValues = [];
    }
    getAccuracyOrder() {
        return 4;
    }
    // eslint-disable-next-line @typescript-eslint/ban-types
    calc(table, func) {
        if (table.getYValues().length < 4) {
            throw new Error('yValues row must contain at least 3 values');
        }
        this.xValues = table.getXValues();
        this.yValues = table.getYValues();
        this.func = func;
        const h = this.xValues[1] - this.xValues[0];
        for (let i = this.yValues.length; i < table.size(); i++) {
            this.yValues[i] = (this.yValues[i - 1]
                + h * this.func.funcDerivative(this.xValues[i - 1], this.yValues[i - 1])
                + h * h * 1 / 2 * this.calcFirstFiniteDifference(i - 1)
                + Math.pow(h, 3) * 5 / 12 * this.calcSecondFiniteDifference(i - 1)
                + Math.pow(h, 4) * 3 / 8 * this.calcThirdFiniteDifference(i - 1));
        }
        return table;
    }
    calcFirstFiniteDifference(index) {
        const i = index;
        if (!this.func) {
            throw new Error('this.func undefined.');
        }
        return (this.func.funcDerivative(this.xValues[i], this.yValues[i])
            - this.func.funcDerivative(this.xValues[i - 1], this.yValues[i - 1]));
    }
    calcSecondFiniteDifference(index) {
        const i = index;
        if (!this.func) {
            throw new Error('this.func undefined.');
        }
        return (this.func.funcDerivative(this.xValues[i], this.yValues[i])
            - 2 * this.func.funcDerivative(this.xValues[i - 1], this.yValues[i - 1])
            + this.func.funcDerivative(this.xValues[i - 2], this.yValues[i - 2]));
    }
    calcThirdFiniteDifference(index) {
        const i = index;
        if (!this.func) {
            throw new Error('this.func undefined.');
        }
        return (this.func.funcDerivative(this.xValues[i], this.yValues[i])
            - 3 * this.func.funcDerivative(this.xValues[i - 1], this.yValues[i - 1])
            + 3 * this.func.funcDerivative(this.xValues[i - 2], this.yValues[i - 2])
            - this.func.funcDerivative(this.xValues[i - 3], this.yValues[i - 3]));
    }
}


/***/ }),

/***/ "./ts/calculations/methods/multistepmethods/MultiStepMethod.ts":
/*!*********************************************************************!*\
  !*** ./ts/calculations/methods/multistepmethods/MultiStepMethod.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MultiStepMethod": () => (/* binding */ MultiStepMethod)
/* harmony export */ });
/* harmony import */ var _ts_calculations_methods_Method__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ts/calculations/methods/Method */ "./ts/calculations/methods/Method.ts");

class MultiStepMethod extends _ts_calculations_methods_Method__WEBPACK_IMPORTED_MODULE_0__.Method {
    getRequiredNumOfPredefinedYValues() {
        return 4;
    }
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
/* harmony import */ var _ts_calculations_methods_onestepmethods_OneStepMethod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ts/calculations/methods/onestepmethods/OneStepMethod */ "./ts/calculations/methods/onestepmethods/OneStepMethod.ts");

class EulerMethod extends _ts_calculations_methods_onestepmethods_OneStepMethod__WEBPACK_IMPORTED_MODULE_0__.OneStepMethod {
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
     * @return {FlexibleTable}
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    calc(table, func) {
        const xValues = table.getXValues();
        const yValues = table.getYValues();
        const h = xValues[1] - xValues[0];
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
/* harmony import */ var _ts_calculations_methods_onestepmethods_OneStepMethod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ts/calculations/methods/onestepmethods/OneStepMethod */ "./ts/calculations/methods/onestepmethods/OneStepMethod.ts");

class ModifiedEulerMethod extends _ts_calculations_methods_onestepmethods_OneStepMethod__WEBPACK_IMPORTED_MODULE_0__.OneStepMethod {
    getAccuracyOrder() {
        return 2;
    }
    // eslint-disable-next-line @typescript-eslint/ban-types
    calc(table, func) {
        const xValues = table.getXValues();
        const yValues = table.getYValues();
        const h = xValues[1] - xValues[0];
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

/***/ "./ts/calculations/methods/onestepmethods/OneStepMethod.ts":
/*!*****************************************************************!*\
  !*** ./ts/calculations/methods/onestepmethods/OneStepMethod.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OneStepMethod": () => (/* binding */ OneStepMethod)
/* harmony export */ });
/* harmony import */ var _ts_calculations_methods_Method__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ts/calculations/methods/Method */ "./ts/calculations/methods/Method.ts");

class OneStepMethod extends _ts_calculations_methods_Method__WEBPACK_IMPORTED_MODULE_0__.Method {
    getRequiredNumOfPredefinedYValues() {
        return 1;
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
/* harmony import */ var _ts_calculations_methods_onestepmethods_OneStepMethod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ts/calculations/methods/onestepmethods/OneStepMethod */ "./ts/calculations/methods/onestepmethods/OneStepMethod.ts");

class RungeKuttaMethod extends _ts_calculations_methods_onestepmethods_OneStepMethod__WEBPACK_IMPORTED_MODULE_0__.OneStepMethod {
    getAccuracyOrder() {
        return 4;
    }
    // eslint-disable-next-line @typescript-eslint/ban-types
    calc(table, func) {
        const xValues = table.getXValues();
        const yValues = table.getYValues();
        const h = xValues[1] - xValues[0];
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


/***/ }),

/***/ "./ts/calculations/util/FlexibleTable.ts":
/*!***********************************************!*\
  !*** ./ts/calculations/util/FlexibleTable.ts ***!
  \***********************************************/
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

/***/ "./ts/calculations/util/Range.ts":
/*!***************************************!*\
  !*** ./ts/calculations/util/Range.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Range": () => (/* binding */ Range)
/* harmony export */ });
class Range {
    constructor(start, end) {
        if (start > end) {
            throw new Error('"start" must not be greater then the "end".');
        }
        this.start = start;
        this.end = end;
        this.length = end - start;
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
/* harmony import */ var _ts_calculations_util_FlexibleTable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ts/calculations/util/FlexibleTable */ "./ts/calculations/util/FlexibleTable.ts");
/* harmony import */ var _ts_calculations_methods_onestepmethods_EulerMethod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ts/calculations/methods/onestepmethods/EulerMethod */ "./ts/calculations/methods/onestepmethods/EulerMethod.ts");
/* harmony import */ var _ts_calculations_functions_FirstFunction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ts/calculations/functions/FirstFunction */ "./ts/calculations/functions/FirstFunction.ts");
/* harmony import */ var _ts_calculations_methods_onestepmethods_ModifiedEulerMethod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ts/calculations/methods/onestepmethods/ModifiedEulerMethod */ "./ts/calculations/methods/onestepmethods/ModifiedEulerMethod.ts");
/* harmony import */ var _ts_calculations_methods_onestepmethods_RungeKuttaMethod__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ts/calculations/methods/onestepmethods/RungeKuttaMethod */ "./ts/calculations/methods/onestepmethods/RungeKuttaMethod.ts");
/* harmony import */ var _ts_calculations_methods_multistepmethods_AdamsMethod__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ts/calculations/methods/multistepmethods/AdamsMethod */ "./ts/calculations/methods/multistepmethods/AdamsMethod.ts");
/* harmony import */ var _ts_calculations_functions_PrimaryCondition__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ts/calculations/functions/PrimaryCondition */ "./ts/calculations/functions/PrimaryCondition.ts");
/* harmony import */ var _ts_calculations_Core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ts/calculations/Core */ "./ts/calculations/Core.ts");
/* harmony import */ var _ts_calculations_util_Range__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ts/calculations/util/Range */ "./ts/calculations/util/Range.ts");









const firstFunction = new _ts_calculations_functions_FirstFunction__WEBPACK_IMPORTED_MODULE_2__.FirstFunction(new _ts_calculations_functions_PrimaryCondition__WEBPACK_IMPORTED_MODULE_6__.PrimaryCondition(1, -1));
const range1 = new _ts_calculations_util_Range__WEBPACK_IMPORTED_MODULE_8__.Range(1, 1.5);
const flexibleTable1 = new _ts_calculations_util_FlexibleTable__WEBPACK_IMPORTED_MODULE_0__.FlexibleTable([1, 1.1, 1.2, 1.3, 1.4, 1.5], [-1]);
const flexibleTable1Prefilled = new _ts_calculations_util_FlexibleTable__WEBPACK_IMPORTED_MODULE_0__.FlexibleTable([1, 1.1, 1.2, 1.3, 1.4, 1.5], [-1, -0.909091, -0.833333, -0.769231]);
const h = 0.1;
const eulerMethod = new _ts_calculations_methods_onestepmethods_EulerMethod__WEBPACK_IMPORTED_MODULE_1__.EulerMethod();
const eulerMethodResult = eulerMethod.calc(flexibleTable1.clone(), firstFunction);
console.log('eulerMethodResult = ', eulerMethodResult);
const modifiedEulerMethod = new _ts_calculations_methods_onestepmethods_ModifiedEulerMethod__WEBPACK_IMPORTED_MODULE_3__.ModifiedEulerMethod();
const modifiedEulerMethodResult = modifiedEulerMethod.calc(flexibleTable1.clone(), firstFunction);
console.log('modifiedEulerMethodResult = ', modifiedEulerMethodResult);
const rungeKuttaMethod = new _ts_calculations_methods_onestepmethods_RungeKuttaMethod__WEBPACK_IMPORTED_MODULE_4__.RungeKuttaMethod();
const rungeKuttaMethodResult = rungeKuttaMethod.calc(flexibleTable1.clone(), firstFunction);
console.log('rungeKuttaMethodResult = ', rungeKuttaMethodResult);
const adamsMethod = new _ts_calculations_methods_multistepmethods_AdamsMethod__WEBPACK_IMPORTED_MODULE_5__.AdamsMethod();
const adamsMethodResult = adamsMethod.calc(flexibleTable1Prefilled.clone(), firstFunction);
console.log('adamsMethodResult = ', adamsMethodResult);
for (let i = 0; i < flexibleTable1.size(); i++) {
    const x = flexibleTable1.getXValues()[i];
    console.log('x = ', x, ' F(x) = ', firstFunction.func(x));
}
const core = new _ts_calculations_Core__WEBPACK_IMPORTED_MODULE_7__.Core();
const accuracy = 0.001;
console.log(core.calcMethod(firstFunction, range1, eulerMethod, accuracy, 5));

})();

/******/ })()
;
//# sourceMappingURL=debug.js.map