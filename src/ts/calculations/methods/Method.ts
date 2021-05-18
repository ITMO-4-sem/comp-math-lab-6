import { FlexibleTable } from '@ts/calculations/util/FlexibleTable';
import { Function } from '@ts/calculations/functions/Function';


export abstract class Method {

    public abstract getAccuracyOrder(): number;

    // eslint-disable-next-line @typescript-eslint/ban-types
    public abstract calc(table: FlexibleTable, func: Function): FlexibleTable;


    /**
     *
     * @return {number} number of required predefined "y values"
     */
    public abstract getRequiredNumOfPredefinedYValues(): number;
}