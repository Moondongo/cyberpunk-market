import React from 'react'
import {
    createHashRouter,
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom'
import BaseScreen from '../components/base/BaseScreen'
import MarketScreen from '../components/market/MarketScreen'
import ItemsScreen from '../components/items/ItemsScreen'
import NewsScreen from '../components/news/NewsScreen'
import ConfigScreen from '../components/config/ConfigScreen'


const router = createHashRouter([
    {
        path: '/',
        element: <BaseScreen/>,
        children: [
            {
                index: true,
                element: <MarketScreen/>
            },
            {
                path: '/items',
                element: <ItemsScreen/>
            },
            {
                path: '/news',
                element: <NewsScreen/>
            },
            {
                path: '/config',
                element: <ConfigScreen/>
            }
        ]
    }
])




const AppRouter = () => {
    return (
        <RouterProvider router={router}/>
    )
}


export default AppRouter;