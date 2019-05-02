export interface SystemState {
    userGuid: string,
    isDragging: boolean,
    dragItemType: string
}

// Actions
export const SET_IS_DRAGGING = 'SET_IS_DRAGGING'
interface SetIsDraggingAction {
    type: typeof SET_IS_DRAGGING
    isDragging: boolean
}

export const SET_DRAG_ITEM_TYPE = 'SET_DRAG_ITEM_TYPE'
interface SetDragItemTypeAction {
    type: typeof SET_DRAG_ITEM_TYPE
    itemType: string
}

export type SystemActionTypes = SetIsDraggingAction | SetDragItemTypeAction