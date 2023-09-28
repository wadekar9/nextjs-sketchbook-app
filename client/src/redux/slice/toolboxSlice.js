import { MENU_ITEMS, COLORS } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    [MENU_ITEMS.PENCIL] : {
        color : COLORS.BLACK,
        size : 3
    },
    [MENU_ITEMS.ERASER] : {
        color : COLORS.WHITE,
        size : 3
    },
    [MENU_ITEMS.UNDO] : {},
    [MENU_ITEMS.REDO] : {},
    [MENU_ITEMS.DOWNLOAD] : {},
}

const toolBoxSlice = createSlice({
    name : "menu",
    initialState : initialState,
    reducers : {
        changeColor : (state, action) => {
            state[action.payload.item].color = action.payload.color;
        },
        changeBrushSize : (state, action) => {
            state[action.payload.item].size = action.payload.size;
        }
    }
})

export default toolBoxSlice.reducer; 
export const { changeBrushSize, changeColor } = toolBoxSlice.actions;