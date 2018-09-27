# Zeron
A lightweight functional frontend framework

- Zeron encourages functional programming over oo to reduce state related complexity
- State is only stored in one place
- State is immutable - so rather than mutating state, any new state is put on top of an 'undo stack'
- Zeron omits any propietry html templating - in favour of pure javaScript `${templating}`
- Zeron uses parcel.js as it's bundler of choice - due to it's simple out of the box power.

## Get started

Create your project

```

npm init

```

Install parcel globally to use parcel from the CLI

```

npm i -g parcel

```

In your package - add the start script

```json

"scripts" : {
    "start": "parcel index.html",
    ...
}

```

Now install Zeron

```

npm i zeron

```

To run Zeron locally ...

```

npm start

```

## [Over to the Docs](https://github.com/attack-monkey/zeron/wiki/Docs)

OR

## [Start from Seed](https://github.com/attack-monkey/zeron-seed)

OR

## Try this very basic Zeron app ...

This basic app shows a hello world message and a button.  
When the button is pushed, the greeting changes.

### index.html

```html

<html>
    <head>
        <title>My Zeron project</title>
    </head>
    <body>
        <!-- Your application's first component-socket -->
        <div id="entry-socket"></div>
        
        <!-- Call index.ts to boot up your javascript / typescript -->
        <script src="./index.ts"></script>
    </body>
</html>
```

### index.ts

```javascript

import { state, getState } from "zeron/functions/store.function";
import { component } from "zeron/functions/component.function";
import { on } from "zeron/functions/on.function";
import { getParams } from "zeron/functions/get-params.function";
import { $ } from "zeron/functions/$.function";
import { iu } from "zeron/functions/iu.functions";

// set initial state

state().set({
    greeting: 'hello world'
});

// Run the app

run();

function run() {

    // load the #entry-socket node with html

    component(
        $('#entry-socket'),
        `<div id='hello-world-component'>
            <h1>${getState().greeting}<h2>
            <button id="a-button" data-params="['yo earth']">push me</button>
        </div>`
    );

    // bind the changeGreeting function to the dom

    on($('#a-button'), 'click', () => {

            // extract the new greeting from data-params of #a-button

            const newGreeting = getParams($('#a-button'));

            // Store holds not only the current state, but also previous states.
            // State doesn't change, but instead new state objects are 'unshifted' to the front of Store's 'undo' stack
            // state().set() adds the new state to the front of the 'undo' stack.

            state().set(

                // immutably produce a new state object, by passing in the original state, 
                // the key that you want to change, and the new value

                iu(getState(), 'greeting', newGreeting)
            );

            // rerun the app

            run();
        }
    );
}

```
