import { _escape } from './escape.function';

export function getParams(el) {
    try {
        const  params = el.getAttribute('data-params');
        if (!params) { return undefined } else {
            const escapedParams = _escape(params);
            const replacedParams = escapedParams.replace(/&#39;/g, '"')
            const parsedParams = JSON.parse(replacedParams);
            return parsedParams;
        }
    } catch (e) {
        console.error('data-params ' + el.getAttribute('data-params') + ' is in the incorrect format...');
        console.error('data-params should be in format data-params="{\'key\': \'value\'}"');
    }
};



