import { Method } from '@ts/calculations/methods/Method';


export abstract class MultiStepMethod extends Method {

    getRequiredNumOfPredefinedYValues(): number {
        return 4;
    }
}