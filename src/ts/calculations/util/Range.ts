
export class Range {

    public readonly start: number;
    public readonly end: number;
    public readonly length: number;


    constructor(start: number, end: number) {

        if ( start > end ) {
            throw new Error('"start" must not be greater then the "end".');
        }

        this.start = start;
        this.end = end;

        this.length = end - start;
    }



}