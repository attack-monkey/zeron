import { component, urlSegments, loadComponent } from 'zeron';
import { viewportTemplate } from './viewport.template';

export function render() {
    component('viewport-component', viewportTemplate(), {
        children: ['home-component'],
        next: () => next()
    });
}

async function next() {
    const homeComponent = await loadComponent('home-component');
    homeComponent.render();
};