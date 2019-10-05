import React, { useState, useEffect, useReducer,useContext } from 'react';
import * as Reducer from '../store/hooks_state/hook_reducer';
import { setTimeout } from 'timers';
import * as ACTIONS from '../store/actions/actions';
import Context from '../Utils/context'

const HooksContainer1 = () => {
    const context = useContext(Context);
    const [stateValue, setValue] = useState(0);
    const [useEffectValue, setUseEffectValue] = useState(null);
    const [state, dispatch] = useReducer(Reducer.HooksReducer, Reducer.initialState);

    const incrementValue = () => {
        setValue(stateValue + 1);
    }
    const decrementValue = () => {
        setValue(stateValue - 1);
    }

    const dispatchTrue=() => {
        dispatch(ACTIONS.success());
    }
    const dispatchFalse=() => {
        dispatch(ACTIONS.failure());
    }

    useEffect(() => {
        setTimeout(() => setUseEffectValue("Use Effect Worked"), 3000)
    }, [])
    // name = " Saravana"
    return (
        <div>
            React Hooks
            <div>
                <button onClick={() => incrementValue()}>Inc Value</button>
                <button onClick={() => decrementValue()}>Dec Value</button>
                <button onClick={() => dispatchTrue()}>Dispatch True</button>
                <button onClick={() => dispatchFalse()}>Dispatch False</button>
                <button onClick={() => context.addGlobalState()}>Inc global state</button>
                <button onClick={() => context.decGlobalState()}>Dec global State</button>
                <button onClick={() => context.dispatchContextTrue()}>DispatchContext True</button>
                <button onClick={() => context.dispatchContextFalse()}>Dispatch Context False</button>
            </div>
            <div>
                <p>Local Value : {stateValue}</p></div>
            {useEffectValue ?
                <p>useEffectValue</p> :
                <p>No Value</p>
            }
            {
                state.stateProp1 ?
                    <p>Is True</p> :
                    <p>Is False</p>
            }
            {context.reducerGlobalState ?
                <p>State props is true</p> :
                <p>State Props is false</p>
            }
            <br/>
            <div>
                <p>Global Value : {context.valueGlobalState}</p></div>
        </div>
    );
}

export default HooksContainer1;
