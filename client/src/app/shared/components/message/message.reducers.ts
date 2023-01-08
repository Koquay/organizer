import * as messageActions from './message.actions';
import { createReducer, on } from "@ngrx/store";

const initialState = {
    error: '',
    info: ''
}

export const MessageReducers =createReducer(initialState,
    on(messageActions.SetError, (state, action) => {        
        return {
            ...state,
            error: action.error,
            info: ''
        }
    }),
    on(messageActions.SetInfo, (state, action) => {        
        return {
            ...state,
            error: '',
            info: action.info
        }
    }),
    on(messageActions.ClearMessage, (state, actiion) => {
        return {
            ...state,
            error: '',
            info: ''
        }
    })
) 