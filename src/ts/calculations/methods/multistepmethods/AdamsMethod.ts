import { Method } from '@ts/calculations/methods/Method';


export class AdamsMethod extends Method {
    getAccuracyOrder(): number {
        return 4;
    }

}