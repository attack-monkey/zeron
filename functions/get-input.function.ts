import { _escape } from './escape.function';

export function getInput(id) {
    return escape(document.querySelector(id).value);
};