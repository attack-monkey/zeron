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

In your package - add the start script and build script

```json

"scripts" : {
    "start": "parcel index.html",
    "build": "parcel build index.html --public-url /",
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

To build ...

```

npm build

```

## [Over to the Docs](https://github.com/attack-monkey/zeron/wiki)

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

import { zeron } from 'zeron';

// set initial state

zeron.state().set({
    greeting: 'hello world'
});

// Run the app

run();

function run() {

    // load the #entry-socket node with html

    zeron.component(
        document.querySelector('#entry-socket'),
        `<div id='hello-world-component'>
            <h1>${zeron.getState().greeting}<h2>
            <button z-on="click" z-bind="changeGreeting" params="['yo earth']">push me</button>
        </div>`
    );

    // bind the changeGreeting function to the dom

    zeron.zOn('hello-world-component', {
        changeGreeting: (newGreeting) => {

            // Save the new state
            zeron.state().set({ greeting: newGreeting });

            // rerun the app
            run();
        }
    });
}

```
