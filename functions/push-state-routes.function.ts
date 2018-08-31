
import { route } from './route.function';
import { forEach } from './for-each.function';

export function pushStateRoutes(componentSocketId) {
    const arr = document.querySelectorAll('#' + componentSocketId + ' zeron-a');
    forEach(arr, el => {
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => {
            const path = el.getAttribute('href');
            if (path !== window.location.pathname) {
                route().pushState(path);
            }
        });
    })
}