import {createListenerMiddleware, isAnyOf} from '@reduxjs/toolkit'
import {
    addItem, 
    updateItems, 
    deleteItem, 
    stickyItem,
    hideItem,
    modifyItem
} from './itemsSlice'
import { addNews, deleteNews } from './newsSlice';
import { updateConfig } from './configSlice';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    matcher: isAnyOf(addItem, updateItems, deleteItem, modifyItem, stickyItem, hideItem, addNews, deleteNews, updateConfig),
    effect: (action, listenerApi) => {
        action.type.includes("ITEMS") &&
            localStorage.setItem('items', JSON.stringify(listenerApi.getState().ITEMS))

        action.type.includes("NEWS") &&
            localStorage.setItem('news', JSON.stringify(listenerApi.getState().NEWS))

        action.type.includes("CONFIG") &&
            localStorage.setItem('config', JSON.stringify(listenerApi.getState().CONFIG))
    }
})