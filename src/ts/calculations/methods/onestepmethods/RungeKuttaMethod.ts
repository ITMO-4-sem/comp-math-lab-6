import { Method } from '@ts/calculations/methods/Method';
import { FlexibleTable } from '@ts/calculations/FlexibleTable';
import { Function } from '@ts/calculations/functions/Function';


export class RungeKuttaMethod extends Method {
    getAccuracyOrder(): number {
        return 4;
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    public calc(table: FlexibleTable, func: Function, step: number): FlexibleTable {
        const h = step;

        const  xValues = table.getXValues();
        const yValues = table.getYValues();

        for ( let i = yValues.length; i < table.size(); i++ ) {

            const xiPrev = xValues[i - 1];
            const yiPrev = yValues[i - 1];

            const k1 = h * func.funcDerivative(xiPrev, yiPrev);
            const k2 = h * func.funcDerivative( xiPrev + h/2, yiPrev + k1/2);
            const k3 = h * func.funcDerivative( xiPrev + h/2, yiPrev + k2/2);
            const k4 = h * func.funcDerivative(xiPrev + h, yiPrev + k3);

            yValues[i] = yiPrev + 1/6 * (k1 + 2 * k2 + 2 * k3 + k4);
        }

        return table;
    }

}