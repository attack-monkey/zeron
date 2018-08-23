import { state, getState } from "./store.function";
import { iu } from "./iu.functions";

export function engine() {
    return {
        start: (substate, engineFunction, args?) => engineStart(substate, engineFunction, args),
        stop: substate => engineStop(substate)
    };
}

function engineStop(substate): void {
    state().set(iu(getState(), substate + '/nextAction', 'stop'));
}

function engineStart(substate, engineFunction, args?): void {
    if (!isRunning()) { startRunning(); }
    function isRunning() { return getState()[substate].active }
    function startRunning() {
        state().set(iu(getState(), substate + '/nextAction', null));        // Make sure there are no next actions to stop the engine
        state().set(iu(getState(), substate + '/active', true));            // Active = true so it won't start again
        engineFunction(...args);
    }
}