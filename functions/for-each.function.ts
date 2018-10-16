// forEach method, can be used on array-like lists that don't have full support of forEach.
// For example Non-live node-lists, that thatwhich you get back from a querySelectorAll() call.
export function forEach (array, callback) {
    for (var i = 0; i < array.length; i++) {
        callback.call(undefined, array[i], i); // passes back stuff we need
    }
};