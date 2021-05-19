import { Method } from '@ts/calculations/methods/Method';
import { FlexibleTable } from '@ts/calculations/util/FlexibleTable';
import { Function } from '@ts/calculations/functions/Function';
import { MultiStepMethod } from '@ts/calculations/methods/multistepmethods/MultiStepMethod';
import { NumberUtil } from '@ts/calculations/util/NumberUtil';


export class AdamsMethod extends MultiStepMethod {

    private xValues: Array<number> = [];
    private yValues: Array<number> = [];
    // eslint-disable-next-line @typescript-eslint/ban-types
    private func: Function | undefined;


    getAccuracyOrder(): number {
        return 4;
    }


    // eslint-disable-next-line @typescript-eslint/ban-types
    public calc(table: FlexibleTable, func: Function): FlexibleTable {

        if ( table.getYValues().length < 4 ) {
            throw new Error('yValues row must contain at least 3 values');
        }

        this.xValues = table.getXValues();
        this.yValues = table.getYValues();
        this.func = func;

        const h = this.xValues[1] - this.xValues[0];

        for ( let i = this.yValues.length; i < table.size(); i++ ) {

            this.yValues[i] = (
                this.yValues[i - 1]
                + h * this.func.funcDerivative(this.xValues[i - 1], this.yValues[i - 1])
                + h * h * 1/2 * this.calcFirstFiniteDifference(i - 1)
                + Math.pow(h, 3) * 5/12 * this.calcSecondFiniteDifference(i - 1)
                + Math.pow(h, 4) * 3/8 * this.calcThirdFiniteDifference(i - 1)
            );

            if ( ! NumberUtil.isValidNumber(this.yValues[i]) ) {
                throw new Error(`Invalid "yi" value appeared during calculations:' +
                    ' "${this.yValues[i]}".`);
            }
        }

        return table;
    }


    private calcFirstFiniteDifference(index: number): number {
        const i = index;
        if ( ! this.func ) {
            throw new Error('this.func undefined.');
        }
        return (
            this.func.funcDerivative(this.xValues[i], this.yValues[i])
            - this.func.funcDerivative(this.xValues[i - 1], this.yValues[i - 1])
        );
    }

    private calcSecondFiniteDifference(index: number): number {
        const i = index;
        if ( ! this.func ) {
            throw new Error('this.func undefined.');
        }
        return (
            this.func.funcDerivative(this.xValues[i], this.yValues[i])
            - 2 * this.func.funcDerivative(this.xValues[i - 1], this.yValues[i - 1])
            + this.func.funcDerivative(this.xValues[i - 2], this.yValues[i - 2])
        );
    }

    private calcThirdFiniteDifference(index: number): number {
        const i = index;
        if ( ! this.func ) {
            throw new Error('this.func undefined.');
        }
        return (
            this.func.funcDerivative(this.xValues[i], this.yValues[i])
            - 3 * this.func.funcDerivative(this.xValues[i - 1], this.yValues[i - 1])
            + 3 * this.func.funcDerivative(this.xValues[i - 2], this.yValues[i - 2])
            - this.func.funcDerivative(this.xValues[i - 3], this.yValues[i - 3])
        );
    }

}