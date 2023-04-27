import React from 'react' 
import { NavLink, Outlet } from 'react-router-dom';
import { FooterNews } from '../ui/FooterNews';

const BaseScreen = () => {
    return (
        <div className='container'>
            <div className='header'>
                <div className='tabs'>
                    <NavLink className='tab' to='/'>MARKET</NavLink>
                    <NavLink className='tab' to='/items'>ITEM</NavLink>
                    <NavLink className='tab' to='/news'>NEWS</NavLink>
                    <NavLink className='tab' to='/config'>CONFIG</NavLink>
                </div>
            </div>
            <div className='outlet-container'>
                <Outlet/>
            </div>
            <FooterNews/>
        </div>
    )
}


export default BaseScreen;