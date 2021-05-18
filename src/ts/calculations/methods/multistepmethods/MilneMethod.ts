import { Method } from '@ts/calculations/methods/Method';
import { MultiStepMethod } from '@ts/calculations/methods/multistepmethods/MultiStepMethod';
import { FlexibleTable } from '@ts/calculations/util/FlexibleTable';
import { Function } from '@ts/calculations/functions/Function';


export class MilneMethod extends MultiStepMethod {
    getAccuracyOrder(): number {
        return 4;
    }


    // eslint-disable-next-line @typescript-eslint/ban-types
    calc(table: FlexibleTable, func: Function): FlexibleTable {
        throw new Error('Method not implemented.');
    }

}