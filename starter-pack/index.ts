import { setState, store, debug, onRouteChange, loadComponent } from 'zeron';
import { preload } from './preload-components';

preload();

// Run the app
run();
async function run() {
    debug().on({
        onlyLogCurrentState: true
    });
    store().maxLength(2);
    
    setState({});

    const viewPortComponent = await loadComponent('viewport-component');
    viewPortComponent.render();
}