
export abstract class Function {

    public abstract getRepresentation(): string;

    public abstract func(x: number): number;
    public abstract funcDerivative(x: number, y: number): number;

}