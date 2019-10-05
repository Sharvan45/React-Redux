import React, { useState, useContext, useReducer } from 'react';
import * as ACTIONS from '../store/actions/actions';
import * as UserReducer from '../store/hooks_state/user_input_hooks_reducer';



const HookForms = () => {
    const [valueChange, setValueChange] = useState('');
    const [valueSubmit, setValueSubmit] = useState('');
    const [userState, userDispatch] = useReducer(UserReducer.UserReducer, UserReducer.initialState);

    const handleUseStateChange = (event) => {
        setValueChange(event.target.value);
    }

    const handleUseStateSubmit = (event) => {
        event.preventDefault();
        setValueSubmit(event.target.useState.value);
    }

    const handleUserReducerChange = (event) => {
        userDispatch(ACTIONS.user_input_change(event.target.value));
    }

    const handleUserReducerSubmit = (event) => {
        event.preventDefault();
        userDispatch(ACTIONS.user_input_submit(event.target.useReducer.value));
    }

    return (
        <div>
            <form onSubmit={handleUseStateSubmit}>
                <label>React UseState</label>
                <input id='useState' type='text' onChange={handleUseStateChange} />
                <button type='submit'> Submit </button>
            </form>
            <h2>React UseState</h2><br />
            <h2>Change : {valueChange}</h2><br />
            <h2>Submit : {valueSubmit}</h2><br />
            <form onSubmit={handleUserReducerSubmit}>
                <label>User reducer State</label>
                <input id='useReducer' type='text' onChange={handleUserReducerChange} />
                <button type='submit'> Submit </button>
            </form>
            <h2>User Reducer State</h2><br />
            <h2>Change : {userState.user_input_change}</h2><br />
            <h2>Submit : {userState.user_input_submit}</h2><br />
        </div>
    );
}

export default HookForms;