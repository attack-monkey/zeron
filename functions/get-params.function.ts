import { _escape } from './escape.function';

export function getParams(el) {
    try {
        const  params = el.getAttribute('data-params');
        if (!params) { return undefined } else {
            // replace any &quot; with replacer string
            const replacedParams_ = params.replace(/"/g,'~*#%');
            // replace singles with doubles
            const replacedParams__ = replacedParams_.replace(/\'/g,'"');
            // replace replacer with singles
            const replaceParams___ = replacedParams__.replace(/~\*#%/g, "'");
            // parse result
            const parsedParams = JSON.parse(replaceParams___);
            return parsedParams;
        }
    } catch (e) {
        console.error('data-params ' + el.getAttribute('data-params') + ' is in the incorrect format...');
        console.error('data-params should be in format data-params="{\'key\': \'value\'}"');
        console.error('Double quotes must be written as &quot;');
    }
};



