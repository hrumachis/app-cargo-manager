import { SystemState, SystemActionTypes, SET_IS_DRAGGING, SET_DRAG_ITEM_TYPE } from './types'
  
const initialState: SystemState = {
    userGuid: "1BAAAA16-23E4-47F5-ACDA-C9C8FF97B7A9",
    isDragging: false,
    dragItemType: ""
}
  
export function systemReducer( state = initialState, action: SystemActionTypes ): SystemState {
    switch ( action.type ) {
        case SET_IS_DRAGGING:
            return {
                ...state,
                isDragging: action.isDragging
            }
        case SET_DRAG_ITEM_TYPE:
            return {
                ...state,
                dragItemType: action.itemType
            }
        default:
            return state
    }
}