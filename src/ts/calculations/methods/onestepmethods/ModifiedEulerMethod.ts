import { Method } from '@ts/calculations/methods/Method';
import { FlexibleTable } from '@ts/calculations/FlexibleTable';
import { Function } from '@ts/calculations/functions/Function';


export class ModifiedEulerMethod extends Method {
    getAccuracyOrder(): number {
        return 2;
    }


    // eslint-disable-next-line @typescript-eslint/ban-types
    public calc(table: FlexibleTable, func: Function, step: number): FlexibleTable {
        const h = step;

        const  xValues = table.getXValues();
        const yValues = table.getYValues();

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
        }

        return table;
    }

}