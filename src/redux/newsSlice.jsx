import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const newsSlice = createSlice({
    name: 'NEWS',
    initialState,
    reducers : {
        addNews: (state, action) => {
            return [
                ...state,
                action.payload
            ]
        },
        deleteNews: (state, action) => {
            return state.filter(news => news.id !== action.payload)
        }
    }
})

export const {addNews, deleteNews} = newsSlice.actions;
export default newsSlice.reducer;