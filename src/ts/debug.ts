import { FlexibleTable } from '@ts/calculations/FlexibleTable';
import { EulerMethod } from '@ts/calculations/methods/onestepmethods/EulerMethod';
import { FirstFunction } from '@ts/calculations/functions/FirstFunction';
import { ModifiedEulerMethod } from '@ts/calculations/methods/onestepmethods/ModifiedEulerMethod';
import { RungeKuttaMethod } from '@ts/calculations/methods/onestepmethods/RungeKuttaMethod';


const firstFunction = new FirstFunction();


const flexibleTable = new FlexibleTable(
    [1, 1.1, 1.2, 1.3, 1.4, 1.5],
    [-1]
);

const h = 0.1;


const eulerMethod = new EulerMethod();
const eulerMethodResult = eulerMethod.calc(flexibleTable.clone(), firstFunction, h);
console.log('eulerMethodResult = ', eulerMethodResult);

const modifiedEulerMethod = new ModifiedEulerMethod();
const modifiedEulerMethodResult = modifiedEulerMethod.calc(flexibleTable.clone(), firstFunction, h);
console.log('modifiedEulerMethodResult = ', modifiedEulerMethodResult);

const rungeKuttaMethod = new RungeKuttaMethod();
const rungeKuttaMethodResult = rungeKuttaMethod.calc(flexibleTable.clone(), firstFunction, h);
console.log('rungeKuttaMethodResult = ', rungeKuttaMethodResult);

