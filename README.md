# Zeron
A lightweight functional frontend framework

- Zeron omits any propietry html templating - in favour of pure javaScript `${templating}`
- Zeron encourages functional programming over oo to reduce state related complexity
- Zeron utilizes *shadow components* for a smarter, faster DOM.
- State is only stored in one place
- State is immutable - so rather than mutating state, any new state is put on top of an 'undo stack'

## Get started

Create your project

```

npm init

```

Install parcel globally to use parcel from the CLI

> Zeron uses parcel.js as it's bundler of choice - due to it's simple out of the box power.

```

npm i -g parcel

```

In your package - add the start script

```json

"scripts" : {
    "start": "parcel index.html",
    "build": "parcel build index.html --public-url /"
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
        <!-- Your application's first component -->
        <div id="entry"></div>
        
        <!-- Call index.ts to boot up your javascript / typescript -->
        <script src="./index.ts"></script>
    </body>
</html>
```

### index.ts

```javascript

import { setState, updateState, getState, component } from 'zeron';

// set initial state

setState({
    greeting: 'hello world'
});

// Run the app

run();

function run() {
    component(
        'entry' /* load into #entry node */,
        `
        <h1>${getState('greeting')}<h2>
        <!-- data-on binds events to the onRender methods below, passing in data-params -->
        <button data-on="{'click': 'changeGreeting' }" data-params="{'newGreeting': 'Yo Earth!!'}">
            push me
        </button>
        <!-- data-on binds events to the onRender methods below, passing in data-params -->
        <button id="anotherid" data-on="{'click': 'changeGreeting' }" data-params="{'newGreeting': 'hello world'}">
            push me
        </button>`,
        { onRender: { changeGreeting: changeGreeting } }
    );

    function changeGreeting(params) {
        updateState('greeting', params.newGreeting);
        run(); /* Reload the component */
    }
}

```
