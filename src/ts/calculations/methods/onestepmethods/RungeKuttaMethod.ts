import { Method } from '@ts/calculations/methods/Method';
import { FlexibleTable } from '@ts/calculations/util/FlexibleTable';
import { Function } from '@ts/calculations/functions/Function';
import { OneStepMethod } from '@ts/calculations/methods/onestepmethods/OneStepMethod';
import { NumberUtil } from '@ts/calculations/util/NumberUtil';


export class RungeKuttaMethod extends OneStepMethod {
    getAccuracyOrder(): number {
        return 4;
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    public calc(table: FlexibleTable, func: Function): FlexibleTable {

        const  xValues = table.getXValues();
        const yValues = table.getYValues();

        const h = xValues[1] - xValues[0];


        for ( let i = yValues.length; i < table.size(); i++ ) {

            const xiPrev = xValues[i - 1];
            const yiPrev = yValues[i - 1];

            const k1 = h * func.funcDerivative(xiPrev, yiPrev);
            const k2 = h * func.funcDerivative( xiPrev + h/2, yiPrev + k1/2);
            const k3 = h * func.funcDerivative( xiPrev + h/2, yiPrev + k2/2);
            const k4 = h * func.funcDerivative(xiPrev + h, yiPrev + k3);

            yValues[i] = yiPrev + 1/6 * (k1 + 2 * k2 + 2 * k3 + k4);

            if ( ! NumberUtil.isValidNumber(yValues[i]) ) {
                throw new Error(`Invalid "yi" value appeared during calculations:' +
                    ' "${yValues[i]}".`);
            }

        }

        return table;
    }

}