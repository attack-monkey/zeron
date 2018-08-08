import { _escape } from './escape.function';
import { forEach } from './for-each.function';
import { getInput } from './get-input.function';

export function zOn (componentSocketId, obj) {
    const arr = document.querySelectorAll('#' + componentSocketId + ' [z-on]');
    forEach(arr, el => {
        const event = el.getAttribute('z-on');
        el.addEventListener(event, () => {
            const func = el.getAttribute('z-bind');
            let params = el.getAttribute('params');
            params = _escape(params);
            params = params.replace(/&#39;/g, '"');
            params = JSON.parse(params);
            console.log(el.value);
            params = params.map(param => param = param === 'VALUE' ? el.value : param);
            params = params.map(param => param = param === 'ID' ? el.id : param);
            console.log(params);
            obj[func].apply(null, params);
        });
    });
}