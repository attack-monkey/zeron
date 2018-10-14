
import { forEach } from './for-each.function';
import { transitions } from './transitions.function';

export function pushStateTransitions (componentSocketId) {
    const arr = document.querySelectorAll('#' + componentSocketId + ' zeron-t-a');
    forEach(arr, el => {
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => {
            const path = el.getAttribute('href');
            if (path !== window.location.pathname) {
                try {
                    const transitionData = JSON.parse(el.getAttribute('data-transition'));
                    const transition = transitions().get(transitionData.type);
                    transition(path, transitionData);
                } catch (e) {
                    console.error('Transition failed - most likely due to misconfigured data-transition data');
                }
            }
        });
    })
}