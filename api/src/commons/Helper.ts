import { isArray, isBoolean, isEmpty, isNaN, isNil, isNull, map, find } from 'lodash';

// tslint:disable-next-line:max-classes-per-file
export class Formatter {
    public static toNumber(subject?: any): number {
        if (subject === undefined) { return subject; }

        if (Stringy.isNullOrWhiteSpace(subject)) { return null; }

        const result = Number(subject);
        return isNaN(result) ? undefined : result;
    }
}

export class Stringy {
    public static isNullOrWhiteSpace(subject: string): boolean {
        if (isNil(subject)) { return true; }
        if (typeof subject !== 'string') { return false; }

        const target = subject.trim();
        return !!isEmpty(target);

    }
}

export class Helper {
    public static findValueByPropertyName<TResult>(data: any, propName: string, defaultVal?: any): TResult {
        if (data && propName) {
            const result = find(data, (val, key) => (key.toString().toLowerCase() === propName.toString().toLowerCase()));
            return !isNil(result) ? result : defaultVal;
        }

        return defaultVal;
    }
}