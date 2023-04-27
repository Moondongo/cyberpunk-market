import { createSlice } from "@reduxjs/toolkit"

const initialState = {}

const configSlice = createSlice({
    name: "CONFIG",
    initialState,
    reducers : {
        updateConfig: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        }
    }
})

export const {updateConfig} = configSlice.actions;
export default configSlice.reducer;