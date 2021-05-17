import { Method } from '@ts/calculations/methods/Method';
import { FlexibleTable } from '@ts/calculations/FlexibleTable';
import { Function } from '@ts/calculations/functions/Function';


export class EulerMethod extends Method {

    // private xValues: Array<number> = [];
    // private yValues: Array<number> = [];
    // private h: number = 1;


    getAccuracyOrder(): number {
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
    public calc(table: FlexibleTable, func: Function, step: number): FlexibleTable {
        const h = step;

        const  xValues = table.getXValues();
        const yValues = table.getYValues();

        for ( let i = yValues.length; i < table.size(); i++ ) {

            yValues[i] = yValues[i - 1] + h * func.funcDerivative(xValues[i - 1], yValues[i - 1]);
        }

        return table;
    }


}