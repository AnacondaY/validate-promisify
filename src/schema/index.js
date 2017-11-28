import { default as number } from './number';
import { default as string } from './string';
import { default as BaseSchema } from './base';

export default {
    number,
    string,
    config: (options: Object = {}) => {
        const { locale } = options;
        BaseSchema._locale = locale;
    }
};