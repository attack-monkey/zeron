export function $(s) {
    try {
        return document.querySelector(s);
    } catch (e) {
        console.error('Unable to select DOM element - ', s);
    }
}