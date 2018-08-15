export function on(el, e, f) {
    try {
        el.addEventListener(e, f);
    } catch (e) {
        console.error('Unable to add event listener to - ', el);
    }
}