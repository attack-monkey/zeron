import { _escape } from './escape.function';

export function getParams(el) {
    try {
        return JSON.parse(_escape(el.getAttribute('data-params')).replace(/&#39;/g, '"'));
    } catch (e) {
        console.error('data-params ' + el.getAttribute('data-params') + ' is in the incorrect format...');
        console.error('data-params should be in format data-params="{\'key\': \'value\'}"');
    }
};



