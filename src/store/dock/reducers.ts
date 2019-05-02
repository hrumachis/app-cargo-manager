import { DockState, DockActionTypes, ADD_DOCK_CARGO, SET_CARGO_ITEMS, REMOVE_DOCK_CARGO } from './types'
  
const dockState: DockState = {
    maxCargo: 200,
    cargoItems: []
}
  
export function dockReducer( state = dockState, action: DockActionTypes ): DockState {
    switch ( action.type ) {
        case ADD_DOCK_CARGO:
            state.cargoItems.push( action.cargoItem );

            return {
                ...state,
                cargoItems: [ ...state.cargoItems ]
            }
        case SET_CARGO_ITEMS:
            return {
                ...state,
                cargoItems: action.cargoItems
            }
        case REMOVE_DOCK_CARGO:
            let index: number = state.cargoItems.map( ( cargo ) => { return cargo.id; } ).indexOf( action.id );
            state.cargoItems.splice( index, 1 );
            
            return {
                ...state,
                cargoItems: [ ...state.cargoItems ]
            }
        default:
            return state
    }
}