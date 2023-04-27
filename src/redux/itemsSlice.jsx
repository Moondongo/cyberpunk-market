import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"

const initialState = []

const itemsSlice = createSlice({
    name: 'ITEMS',
    initialState,
    reducers:{
        addItem: (state, action) => {
            return [
                ...state,
                action.payload
            ]
        },
        updateItems: (state) => {            
            const newState = state.map((item) => {
                const {oldValue, minChange, maxChange} = {
                    oldValue : item.value.current ? item.value.current : item.value.initial,
                    minChange: item.range.min ? item.range.min : -100,
                    maxChange: item.range.max ? item.range.max : 100
                }                
                
                const min = Math.floor(oldValue * (minChange/100));
                const max = Math.floor(oldValue * (maxChange/100));
                const random = Math.floor((Math.random() * (max - min + 1)) + min) 
                
                const alteration = (oldValue + random < 1) ? -(oldValue - 1) : random;
                const percent = alteration / oldValue * 100;

                return {
                    ...item,
                    alteration: percent,
                    value: {
                        initial: item.value.initial,
                        current: oldValue + alteration
                    }
                }
            })
            return [
                ...newState
            ]
        },
        deleteItem: (state, action) => {
            return state.filter(item => item.id !== action.payload)
        }
    }
})

export const { addItem, updateItems, deleteItem } = itemsSlice.actions;
export default itemsSlice.reducer