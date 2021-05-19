import { Function } from '@ts/calculations/functions/Function';
import { PrimaryCondition } from '@ts/calculations/functions/PrimaryCondition';
import { NumberUtil } from '@ts/calculations/util/NumberUtil';


export class FirstFunction extends Function {


    public getRepresentation(): string {
        return 'y + (1 + x) * y^2';
    }


    public func(x: number): number {
        return (
            Math.exp(x) / ( this.constant - x * Math.exp(x))
        );
    }


    public funcDerivative(x: number, y: number): number {
        return (
            y + (1 + x) * y * y
        );
    }

    protected calcConstant(primaryCondition: PrimaryCondition): number {
        const x = primaryCondition.x;
        const y = primaryCondition.y;

        const c = ( Math.exp(x) + y * x * Math.exp(x) ) / y;

        if ( ! NumberUtil.isValidNumber(c) ) {
            throw new Error('Illegal constant value. Choose another primaryCondition');
        }

        return c;
    }




}