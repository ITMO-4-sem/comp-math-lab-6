import { PrimaryCondition } from '@ts/calculations/functions/PrimaryCondition';


export abstract class Function {

    protected readonly constant: number;

    public abstract getRepresentation(): string;

    public abstract func(x: number): number;
    public abstract funcDerivative(x: number, y: number): number;
    protected abstract calcConstant(primaryCondition: PrimaryCondition): number;

    constructor(primaryCondition: PrimaryCondition) {
        this.constant = this.calcConstant(primaryCondition);
    }
}