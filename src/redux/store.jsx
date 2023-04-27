import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import itemsReducer from './itemsSlice'
import { listenerMiddleware } from "./middleware";
import newsReducer from "./newsSlice";
import configReducer from './configSlice'

const itemsState = JSON.parse(localStorage.getItem("items") || "null");
const newsState = JSON.parse(localStorage.getItem('news') || "null")
const configState = JSON.parse(localStorage.getItem('config') || "null")

export const store = configureStore({
    preloadedState: {
        ITEMS: itemsState === null ? [] : itemsState,
        NEWS: newsState === null ? [] : newsState,
        CONFIG: configState === null ? {} : configState
    },
    reducer:{
        ITEMS: itemsReducer,
        NEWS: newsReducer,
        CONFIG:configReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware)
})