import { _escape } from './escape.function';

export function getParams(el) {
    return JSON.parse(_escape(el.getAttribute('data-params')).replace(/&#39;/g, '"'));
};



