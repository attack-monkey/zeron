# Zeron
A lightweight functional frontend framework

- Zeron omits any propietry html templating - in favour of pure javaScript `${templating}`
- Zeron encourages functional programming over oo to reduce state related complexity
- Zeron utilizes *shadow components* for a smarter, faster DOM.
- State is only stored in one place
- State is immutable - so rather than mutating state, any new state is put on top of an 'undo stack'
- Automatic code-splitting

## Get started

Create your project

```

npm init

```

Install parcel globally to use parcel from the CLI

```

npm i -g parcel

> Zeron uses parcel.js as it's bundler of choice - due to it's simple out of the box power.

```

In your package - add the start script, and build script

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

Within node_modules/zeron there is a starter pack directory.

Move the contents of starter pack to the root of your application so that it looks like

```
- index.html
- index.ts
- preload-components.ts
- /src
  - /components
    - /viewport
      - viewport-component.ts
      - viewport-template.ts

```

> This starter pack provides your application shell

To run Zeron locally ...

```

npm start

```

To build ...

```

npm run build

```

### Check out the [Docs](https://github.com/attack-monkey/zeron3Docs/wiki/Docs)