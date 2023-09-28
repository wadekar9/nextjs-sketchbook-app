import { MENU_ITEMS } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeMenuItem : MENU_ITEMS.PENCIL,
    actionMenuItem : null
}

const menuSlice = createSlice({
    name : "menu",
    initialState : initialState,
    reducers : {
        onMenuItemClick : (state, action) => {
            state.activeMenuItem = action.payload
        },
        onActionItemClick : (state, action) => {
            state.actionMenuItem = action.payload
        }
    }
})

export default menuSlice.reducer; 
export const { onMenuItemClick, onActionItemClick } = menuSlice.actions;