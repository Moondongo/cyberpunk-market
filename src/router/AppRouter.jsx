import React from 'react'
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom'
import BaseScreen from '../components/base/BaseScreen'
import MarketScreen from '../components/market/MarketScreen'
import ItemsScreen from '../components/items/ItemsScreen'
import NewsScreen from '../components/news/NewsScreen'
import ConfigScreen from '../components/config/ConfigScreen'

const router = createBrowserRouter([
    {
        path: '/cyberpunk-market',
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
        ],
        errorElement: <h1>PAGINA DE ERRROR</h1>
    }
])




const AppRouter = () => {
    return (
        <RouterProvider router={router}/>
    )
}


export default AppRouter;