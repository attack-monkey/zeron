import { component } from 'zeron';
import { viewportTemplate } from './viewport.template';

export function render() {
    component('viewport-component', viewportTemplate(), {
        children: [],
        bind: {},
        next: () => next()
    });
}

async function next() {

};