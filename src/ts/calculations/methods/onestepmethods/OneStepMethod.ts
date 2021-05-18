import { Method } from '@ts/calculations/methods/Method';


export abstract class OneStepMethod extends Method {

    getRequiredNumOfPredefinedYValues(): number {
        return 1;
    }
}