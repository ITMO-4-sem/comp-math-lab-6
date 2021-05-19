
export class NumberUtil {


    public static isValidNumber(num: number): boolean {
        return (
          num != Infinity && num != -Infinity && ! isNaN(num)
        );
    }
}