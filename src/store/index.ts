import { combineReducers, createStore, applyMiddleware } from 'redux';
import { dockReducer } from './dock/reducers'
import { DockState } from './dock/types'
import { systemReducer } from './system/reducers'
import { SystemState } from './system/types'
import { shipsReducer } from './ships/reducers'
import { ShipsState } from './ships/types'
import thunk from 'redux-thunk'

export interface RootState {
    system: SystemState,
    dock: DockState,
    ships: ShipsState
}

const store = createStore<RootState, any, any, any> (
    combineReducers( {
        system: systemReducer,
        dock: dockReducer,
        ships: shipsReducer
    } ), applyMiddleware( thunk )
);

export default store;