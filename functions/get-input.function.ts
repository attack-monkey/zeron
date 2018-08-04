import { _escape } from './escape.function';

export function getInput(id) {
    return _escape(document.querySelector(id).value);
};