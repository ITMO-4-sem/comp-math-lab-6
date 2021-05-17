import { Method } from '@ts/calculations/methods/Method';


export class MilneMethod extends Method {
    getAccuracyOrder(): number {
        return 4;
    }

}