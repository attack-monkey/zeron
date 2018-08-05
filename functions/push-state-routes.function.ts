
import { route } from 'zeron/functions/route.function';
import { forEach } from 'zeron/functions/for-each.function';

export function pushStateRoutes (componentSocketId) {
    const arr = document.querySelectorAll('#' + componentSocketId + ' zeron-a');
    forEach(arr, el => {
        el.addEventListener('click', () => { 
            const path = el.getAttribute('href');
            route().pushState(path);
        });
    })
}