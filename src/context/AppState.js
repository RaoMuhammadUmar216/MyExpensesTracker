import React, { useReducer } from 'react'
import AppContext from './AppContext';
import AppReducer from './AppReducer';
import { ADD_TRANSACTION, DELETE_TRANSACTION } from './types';

const AppState = (props) => {

    const initialState = {
        transactions: []
    }
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const addTransaction = (transactions) => {
        dispatch({
            type: ADD_TRANSACTION,
            payload: transactions
        })
    }
    const deleteTransaction = (transactionID) => {
        dispatch({
            type: DELETE_TRANSACTION,
            payload: transactionID
        })
    }

    return (
        <AppContext.Provider
            value={{
                transactions: state.transactions,
                addTransaction,
                deleteTransaction,
            }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppState;