import { Method } from '@ts/calculations/methods/Method';
import { FlexibleTable } from '@ts/calculations/util/FlexibleTable';
import { Function } from '@ts/calculations/functions/Function';
import { OneStepMethod } from '@ts/calculations/methods/onestepmethods/OneStepMethod';
import { NumberUtil } from '@ts/calculations/util/NumberUtil';


export class ModifiedEulerMethod extends OneStepMethod {
    getAccuracyOrder(): number {
        return 2;
    }


    // eslint-disable-next-line @typescript-eslint/ban-types
    public calc(table: FlexibleTable, func: Function): FlexibleTable {

        const  xValues = table.getXValues();
        const yValues = table.getYValues();

        const h = xValues[1] - xValues[0];

        for ( let i = yValues.length; i < table.size(); i++ ) {

            yValues[i] = (
                yValues[i - 1]
                + h/2
                * (
                    func.funcDerivative(xValues[i - 1], yValues[i - 1])
                    + func.funcDerivative(
                        xValues[i],
                      yValues[i - 1] + h * func.funcDerivative(xValues[i - 1], yValues[i - 1])
                    )
                )
            );

            if ( ! NumberUtil.isValidNumber(yValues[i]) ) {
                throw new Error(`Invalid "yi" value appeared during calculations:' +
                    ' "${yValues[i]}".`);
            }

        }

        return table;
    }

}