export interface Cargo {
    id: number,
    weight: number, // Kilogrammes
    volume: number
}

export interface DockState {
    maxCargo: 200,
    cargoItems: Cargo[]
}

export const ADD_DOCK_CARGO = 'ADD_DOCK_CARGO'
interface UpdateSessionAction {
    type: typeof ADD_DOCK_CARGO
    cargoItem: Cargo
}

export const SET_CARGO_ITEMS = 'SET_CARGO_ITEMS'
interface SetCargoItemsAction {
    type: typeof SET_CARGO_ITEMS
    cargoItems: Cargo[]
}

export const REMOVE_DOCK_CARGO= 'REMOVE_DOCK_CARGO'
interface RemoveCargoItemAction {
    type: typeof REMOVE_DOCK_CARGO
    id: number
}

export type DockActionTypes = UpdateSessionAction | SetCargoItemsAction | RemoveCargoItemAction