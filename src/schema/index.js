import { default as number } from './number';
import { default as string } from './string';
import { default as boolean } from './boolean';
import { default as array } from './array';
import { default as object } from './object';
import { default as BaseSchema } from './base';

export default {
    number,
    string,
    boolean,
    array,
    object,
    config: (options: Object = {}) => {
        const { locale } = options;
        BaseSchema._locale = locale;
    }
};