import { FlexibleTable } from '@ts/calculations/util/FlexibleTable';
import { EulerMethod } from '@ts/calculations/methods/onestepmethods/EulerMethod';
import { FirstFunction } from '@ts/calculations/functions/FirstFunction';
import { ModifiedEulerMethod } from '@ts/calculations/methods/onestepmethods/ModifiedEulerMethod';
import { RungeKuttaMethod } from '@ts/calculations/methods/onestepmethods/RungeKuttaMethod';
import { AdamsMethod } from '@ts/calculations/methods/multistepmethods/AdamsMethod';
import { PrimaryCondition } from '@ts/calculations/functions/PrimaryCondition';
import { Core } from '@ts/calculations/Core';
import { Range } from '@ts/calculations/util/Range';


const firstFunction = new FirstFunction(new PrimaryCondition(1, -1));

const range1: Range = new Range(1, 1.5);

const flexibleTable1 = new FlexibleTable(
    [1, 1.1, 1.2, 1.3, 1.4, 1.5],
    [-1]
);
const flexibleTable1Prefilled = new FlexibleTable(
    [1, 1.1, 1.2, 1.3, 1.4, 1.5],
    [-1, -0.909091, -0.833333, -0.769231]
);

const h = 0.1;


const eulerMethod = new EulerMethod();
const eulerMethodResult = eulerMethod.calc(flexibleTable1.clone(), firstFunction);
console.log('eulerMethodResult = ', eulerMethodResult);

const modifiedEulerMethod = new ModifiedEulerMethod();
const modifiedEulerMethodResult = modifiedEulerMethod.calc(flexibleTable1.clone(), firstFunction);
console.log('modifiedEulerMethodResult = ', modifiedEulerMethodResult);

const rungeKuttaMethod = new RungeKuttaMethod();
const rungeKuttaMethodResult = rungeKuttaMethod.calc(flexibleTable1.clone(), firstFunction);
console.log('rungeKuttaMethodResult = ', rungeKuttaMethodResult);

const adamsMethod = new AdamsMethod();
const adamsMethodResult = adamsMethod.calc(flexibleTable1Prefilled.clone(), firstFunction);
console.log('adamsMethodResult = ', adamsMethodResult);


for ( let i = 0; i < flexibleTable1.size(); i++ ) {
    const x = flexibleTable1.getXValues()[i];
    console.log('x = ',x, ' F(x) = ', firstFunction.func(x));
}


const core = new Core();

const accuracy = 0.001;

console.log( core.calcMethod(firstFunction, range1, eulerMethod, accuracy, 5) );