import { SET_IS_DRAGGING, SET_DRAG_ITEM_TYPE, SystemActionTypes } from './types'

export const setIsDragging = ( isDragging: boolean ): SystemActionTypes => {
    return { type: SET_IS_DRAGGING, isDragging }
}

export const setDragItemType = ( itemType: string ): SystemActionTypes => {
    return { type: SET_DRAG_ITEM_TYPE, itemType }
}