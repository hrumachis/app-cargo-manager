import { ShipsState, Ship, ShipsActionTypes, SET_ACTIVE_SHIP, SET_SHIP_LIST, ADD_SHIP_CARGO, REMOVE_SHIP_CARGO } from './types'
  
const shipsState: ShipsState = {
    maxShips: 5,
    activeShipId: "",
    shipList: []
}
  
export function shipsReducer( state = shipsState, action: ShipsActionTypes ): ShipsState {
    switch ( action.type ) {
        case SET_ACTIVE_SHIP:
            return {
                ...state,
                activeShipId: action.id
            }
        case SET_SHIP_LIST:
            return {
                ...state,
                shipList: action.shipList
            }
        case ADD_SHIP_CARGO: {
            let ship = state.shipList.find( ( ship ) => {
                return ship.id === action.shipId;
            } );

            if ( ship )
                ship.cargoItems.push( action.cargoItem );

            return {
                ...state,
                shipList: [ ...state.shipList ]
            }
        }
        case REMOVE_SHIP_CARGO: {
            let ship: Ship | undefined = state.shipList.find( ( ship ) => { return ship.id === action.shipId; } );
            let index: number | undefined;

            if ( ship)
                index = ship.cargoItems.map( ( cargo ) => { return cargo.id; } ).indexOf( action.cargoId );

            if ( index !== undefined  && ship)
                ship.cargoItems.splice( index, 1 );

            return {
                ...state,
                shipList: [ ...state.shipList ]
            }
        }
        default:
            return state
    }
}