import { _escape } from './escape.function';

export function getInput(el) {
    return _escape(el.value);
};