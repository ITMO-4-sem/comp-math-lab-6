import { Function } from '@ts/calculations/functions/Function';


export class FirstFunction extends Function {


    getRepresentation(): string {
        return 'y + (1 + x) * y^2';
    }


    func(x: number): number {
        return 0;
    }


    funcDerivative(x: number, y: number): number {
        return (
            y + (1 + x) * y * y
        );
    }




}