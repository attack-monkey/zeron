# 2.1.0

## Added

- engine

## engine

`engine` helps to manage asynchronous engines. Engines are asynchronous functions that continue  
to produce values until a 'stop' condition is met.

```javascript

export function onClick_EmitNumsForName() {
    fromEvent($('#button'), 'click')
        .subscribe(() => {

            // starts the engine and makes getState().numberEmitter.active set to true
            // If the button is pushed again, the engine will already be active, and won't run again
            engine().start('numberEmitter', numberEmitterObservable);

            // emits a number every 2 seconds until `keepRunning` returns false
            function numberEmitterObservable() {
                interval(2000)
                    .pipe(takeWhile(keepRunning))
                    .subscribe(v => {
                        state().set(iu(zeron.getState(), 'numberEmitter/value', v));
                        set('name', v);
                        nameOutput(zeron.getState().numberEmitter.value);
                    });
            }

            // When getState().numberEmitter.nextAction === 'stop' the engine is set to active: false
            function keepRunning(): boolean {
                if (zeron.getState().numberEmitter.nextAction === 'stop') {
                    state().set(iu(zeron.getState(), 'numberEmitter/active', false));
                    return false;
                } else {
                    return true;
                };
            }
        });
}

```

and to stop the engine...

```javascript

export function onClick_StopEmittingNumbers() {
    fromEvent($('#stop-button'), 'click').subscribe(() => engine().stop('numberEmitter'));
}

```

This sets `getState().nextAction` to 'stop' which the `keepRunning` function uses to determine whether to  
keep running or stop.

----

# Changes from v 1.x to v 2.0

## Deleted

- dispatch
- reducers
- zOn

## Added

- on
- $
- getParams
- onRouteChange

## Major Changes

v 2.0 Removes `reducers`, `dispatch`, and `zOn` altogether.

### Reducers are no longer supported

As of v1.1 `reducers` and `dispatch` usaged stopped in favor of immutable update (`iu`) and functions in general.  
In place of `reducers` and `dispatch`, use immutable functions, such as Zeron's `iu` to make state changes.  

## zOn is no longer supported

As of v1.1 `zOn` stopped being used and instead *Rxjs* took it's place.  
In place of zOn, continue to use *Rxjs* or Zeron's `on` function.
*Rxjs*'s `fromEvent` can be directly used in place on `on`, however `on` can be used if Observables are not required.  
`getParams` has also been added which takes the place of `zOn`'s html `params` attribute.

eg.

```html

<button id="some-button" data-params="['hello', 'world']">new stuff</button>

```

```javascript

on($('#some-button'), 'click', () => {
    doThis(getParams($('#some-button')));

    function doThis(arr) {
        arr.forEach(arg => { console.log(arg); });
    }
});

```

## DOM selection

v 2.0 also adds `$` - a jQuery-like DOM selector. While it looks like jQuery it is simply returning `document.querySelector(selector)`.  
Furthermore any functions that used DOM ids or selectors, have now been converted to take `$(selector)` as an argument.

eg.

```javascript

getInput($('#some-id'));

```

## getUniqueId.function.ts is now get-unique-id.function.ts