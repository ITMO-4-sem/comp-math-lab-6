import { Range } from '@ts/calculations/util/Range';
import { PrimaryCondition } from '@ts/calculations/functions/PrimaryCondition';
import { Function } from '@ts/calculations/functions/Function';
import { Method } from '@ts/calculations/methods/Method';
import { FlexibleTable } from '@ts/calculations/util/FlexibleTable';


export class Core {


    // eslint-disable-next-line @typescript-eslint/ban-types
    public calcMethod(func: Function, range: Range, method: Method, accuracy: number, initialStepNum?: number) {

        if ( initialStepNum && initialStepNum < 1 ) {
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

        } while ( ! this.isAccuracySufficient(accuracy, maxBias) );

    }










 //todo выводить объект с 1) таблицей 2) шагом 3) максимальной погрешностью










    // eslint-disable-next-line @typescript-eslint/ban-types
    private calcWIthFixedStep(method: Method, func: Function, range: Range, step: number): FlexibleTable {

        const xValues = new Array<number>();
        const yValues = new Array<number>();

        for ( let x = range.start; x < range.end + 0.000001; x += step) {
            xValues.push( x );
        }

        for ( let i = 0; i < method.getRequiredNumOfPredefinedYValues(); i++ ) {
            yValues.push(func.func(xValues[i]));
        }

        return method.calc(new FlexibleTable(xValues, yValues), func);

    }


    private isAccuracySufficient(accuracy: number, maxBias: number): boolean {
        return accuracy > maxBias;
    }


    private getMaxBias(yValuesH: Array<number>, yValuesHalfH: Array<number>, requiredNumOfPredefinedYValues: number): number {

        if ( yValuesH.length * 2 - 1 != yValuesHalfH.length ) {
            throw new Error('"yValuesH" length must be 2 times minus 1 shorter than' +
                ' "yValuesHalfH" length.');
        }

        let maxBias = yValuesHalfH[1] - yValuesH[0];

        for ( let i = 0; i < yValuesH.length; i++ ) {
            maxBias = Math.max(
                maxBias,
                this.calcRungeBias( yValuesH[i], yValuesHalfH[ i * 2], requiredNumOfPredefinedYValues )
            );
        }

        return maxBias;

    }


    private calcRungeBias(yH: number, yHalfH: number, p: number): number {
        if ( p <= 0 ) {
            throw new Error('"p" must be a positive number');
        }
        return (
          Math.abs(yH - yHalfH)
          / ( Math.pow(2, p) - 1)
        );
    }
}