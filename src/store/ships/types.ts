import { Cargo } from '../dock/types';

export interface Ship {
    id: string,
    name: string,
    maxWeight: number,
    maxVolume: number,
    cargoItems: Cargo[]
}

export interface ShipsState {
    maxShips: number,
    activeShipId: string, // ship id
    shipList: Ship[]
}

export const SET_ACTIVE_SHIP = 'SET_ACTIVE_SHIP'
interface SetActiveShipAction {
    type: typeof SET_ACTIVE_SHIP
    id: string
}

export const SET_SHIP_LIST = 'SET_SHIP_LIST'
interface SetShipListAction {
    type: typeof SET_SHIP_LIST
    shipList: Ship[]
}

export const ADD_SHIP_CARGO = 'ADD_SHIP_CARGO'
interface AddCargoAction {
    type: typeof ADD_SHIP_CARGO
    cargoItem: Cargo,
    shipId: string
}

export const REMOVE_SHIP_CARGO = 'REMOVE_SHIP_CARGO'
interface RemoveCargoAction {
    type: typeof REMOVE_SHIP_CARGO
    cargoId: string,
    shipId: string
}


export type ShipsActionTypes = SetActiveShipAction | SetShipListAction | AddCargoAction | RemoveCargoAction