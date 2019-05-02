import { SET_ACTIVE_SHIP, SET_SHIP_LIST, ADD_SHIP_CARGO, REMOVE_SHIP_CARGO, Ship, ShipsActionTypes } from './types'
import { Cargo } from '../dock/types';

export const setActiveShip = ( id: string ): ShipsActionTypes => {
    return { type: SET_ACTIVE_SHIP, id }
}

export const setShipList = ( shipList: Ship[] ): ShipsActionTypes => {
    return { type: SET_SHIP_LIST, shipList }
}

export const addShipCargo = ( shipId: string, cargoItem: Cargo ): ShipsActionTypes => {
    return { type: ADD_SHIP_CARGO, cargoItem, shipId }
}

export const removeShipCargo = ( shipId: string, cargoId: string ): ShipsActionTypes => {
    return { type: REMOVE_SHIP_CARGO, cargoId, shipId }
}