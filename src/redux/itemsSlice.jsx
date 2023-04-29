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
                
                const min = Math.ceil(oldValue * (minChange/100));
                const max = Math.ceil(oldValue * (maxChange/100));
                const random = Math.floor((Math.random() * (max - min + 1)) + min) 
                
                const alteration = (oldValue + random < 10) ? -(oldValue - 9) : random;
                const percent = alteration / oldValue * 100;

                return {
                    ...item,
                    alteration: percent,
                    value: {
                        initial: item.value.initial,
                        current: oldValue + alteration
                    },
                    hide: false
                }
            })
            return [
                ...newState
            ]
        },
        deleteItem: (state, action) => {
            return state.filter(item => item.id !== action.payload)
        },
        stickyItem: (state, action) => {
            const newState = state.map(item => {
                if(item.id === action.payload){
                    return {
                        ...item,
                        sticky: item.sticky ? !item.sticky : true
                    }
                }

                return {...item}
            })

            return [
                ...newState
            ]
        },
        hideItem: (state, action) => {
            const newState = state.map(item => {
                if(item.id === action.payload){
                    return {
                        ...item,
                        value: {
                            ...item.value,
                            current: null
                        },
                        hide: true
                    }
                }

                return {...item}
            })

            return [
                ...newState
            ]
        }
    }
})

export const { addItem, updateItems, deleteItem, stickyItem, hideItem } = itemsSlice.actions;
export default itemsSlice.reducer