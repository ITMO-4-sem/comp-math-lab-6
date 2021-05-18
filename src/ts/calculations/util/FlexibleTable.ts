import { Table } from '@ts/calculations/util/Table';
import { Clonable } from '@ts/calculations/util/Clonable';


export class FlexibleTable implements Clonable<FlexibleTable> {

    private readonly xValues: Array<number>;
    private readonly yValues: Array<number>;


    /**
     *
     * @param {Array<number>} xValues
     * @param {Array<number>} yValues
     * @throws Error if xValues.length != yValues.length
     */
    constructor(xValues: Array<number>, yValues: Array<number>) {

        if ( xValues.length < yValues.length) {
            throw new Error('xValues row length must be not less then the yValues rows' +
                ' one');
        }

        if ( yValues.length === 0 ) {
            throw new Error('yValues row need to contain least 1 element.');
        }

        this.xValues = xValues;
        this.yValues = yValues;
    }


    clone(): FlexibleTable {
        return new FlexibleTable(
            Array.from(this.xValues),
            Array.from(this.yValues)
        );
    }


    public size(): number {
        return this.xValues.length;
    }


    public getXValues(): Array<number> {
        return this.xValues;
    }


    public getYValues(): Array<number> {
        return this.yValues;
    }

}