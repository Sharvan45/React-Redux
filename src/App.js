import React, { useState,useReducer } from 'react';
import Routes from './route';
import Context from './Utils/context';
import * as ACTIONS from './store/actions/actions';
import * as Reducer from './store/hooks_state/hook_reducer';

const App = () => {
    // name = " Saravana"
    const [stateGlobal, setStateGlobal] = useState(0);
    const [stateContextGlobal, dispatchContextGlobal] = useReducer(Reducer.HooksReducer, Reducer.initialState);

    const incrementGlobalState = () => {
        setStateGlobal(stateGlobal + 1);
    }

    const decrementGlobalState = () => {
        setStateGlobal(stateGlobal - 1);
    }


    const handleDispatchContextTrue = () => {
        dispatchContextGlobal(ACTIONS.success());
    }
    const handleDispatchContextFalse = () => {
        dispatchContextGlobal(ACTIONS.failure());
    }

    return (
        <div className="App">
            <Context.Provider
                value={{
                    valueGlobalState: stateGlobal,
                    addGlobalState: () => incrementGlobalState(),
                    decGlobalState: () => decrementGlobalState(),
                    reducerGlobalState: stateContextGlobal.stateProp2,
                    dispatchContextTrue: () => handleDispatchContextTrue(),
                    dispatchContextFalse: () => handleDispatchContextFalse(),
                }}>
                <Routes />
            </Context.Provider>
        </div >
    )
}

export default App;
