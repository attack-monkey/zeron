import { _escape } from './escape.function';
import { forEach } from './for-each.function';

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
            obj[func].apply(null, params);
        });
    });
}