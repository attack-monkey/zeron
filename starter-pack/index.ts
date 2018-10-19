import { setState, store, debug, onRouteChange, loadComponent } from 'zeron';
import { preload } from './preload-components';

preload();

// Run the app
run();
async function run() {
    debug().on({
        autoLog: false /* can als be ... 'fullStore' | 'currentState'*/
    });
    store().maxLength(2);
    
    setState({
        todoList: {}
    });

    const viewPortComponent = await loadComponent('viewport-component');
    onRouteChange(viewPortComponent.render);
}