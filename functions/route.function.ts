let callBack = undefined;

export function route () {
    return {
        onPushState(func) {
            callBack = func;
        },
        pushState(path) {
            history.pushState(null, null, path);
            callBack();
        }
    }
}