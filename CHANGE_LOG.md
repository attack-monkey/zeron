# 3.0.0

Zeron3 is still a function over oo framework!
It still utilizes pure javaScript `${templates}` instead of proprietry template syntax.
Zeron3 simply gets simpler around a few core concepts.

Zeron has until now had a heavy reliance on DOM ids, creating some complexity when building large applications.
Zeron3 doesn't have a reliance on DOM ids and instead opts for 'data-on' and 'data-params' attributes in the html.
These attributes map events to functions when a component renders.
 
Zeron3 introduces 'shadow components' which utilises a *shadow dom* concept.
A map of rendered component templates are stored.
Before a component loads anything onto the DOM, it first checks the above map to see if the rendered template has changed at all.
If there is no change then nothing needs to be injected into the DOM and no remapping of events to functions needs to occur.