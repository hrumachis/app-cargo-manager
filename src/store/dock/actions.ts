import { ADD_DOCK_CARGO, SET_CARGO_ITEMS, REMOVE_DOCK_CARGO, DockActionTypes, Cargo } from './types'

export function addDockCargo( cargItem: Cargo ): DockActionTypes {
    return {
        type: ADD_DOCK_CARGO,
        cargoItem: cargItem
    }
}

export function setCargoItems( cargoItems: Cargo[] ): DockActionTypes {
    return {
        type: SET_CARGO_ITEMS,
        cargoItems: cargoItems
    }
}

export function removeDockCargo( id: string ): DockActionTypes {
    return {
        type: REMOVE_DOCK_CARGO,
        id: id
    }
}