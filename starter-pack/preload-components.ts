import { preLoadComponents } from 'zeron';

export function preload() {
    preLoadComponents({
        'viewport-component': import('./src/components/viewport/viewport.component'),
    });
}