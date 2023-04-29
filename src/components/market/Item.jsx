import React, { useState } from 'react' 
import { useDispatch } from 'react-redux';
import { hideItem, stickyItem } from '../../redux/itemsSlice';


const Item = ({ id, ico, name, alteration, value, sticky}) => {
    const dispatch = useDispatch()

    const [isMenu, setIsMenu] = useState(false)

    const price = String(value.current ? value.current : value.initial).split('').map(Number)
    const bronce = price.pop();
    const silver = price.length > 0 ? price.pop() : 0;
    const gold = price.length > 0 ? Number(price.join("").toString()) : 0;

    const handleOpenMenu = () => {
        setIsMenu(!isMenu)
    }
    const handleHide = () => {
        dispatch(hideItem(id))
    }
    const handleStick = () => {
        dispatch(stickyItem(id))
    }

    return (
        <>
            <div className={
                (alteration > 0 
                    ? `item-container ${sticky && "sticky"}`
                    : alteration === 0
                            ? `item-container neutral ${sticky && "sticky"}`
                            : `item-container low ${sticky && "sticky"}`)
            } onClick={handleOpenMenu}>
                {
                    isMenu &&
                    <div className='menu-item'>
                        <button className='hide' onClick={handleHide}><i className="fa-solid fa-eye-slash"/>HIDE</button>
                        <button className='stick' onClick={handleStick}><i className="fa-sharp fa-solid fa-expand"/>STICK</button>
                    </div>
                }
                <div className="item-edge"></div>
                <div className="item-outside">
                    <div className="item-inside">
                        <div className="item_icon"><i className={`fa-${ico.name} fa-${ico.family} fa-${ico.style}`}/></div>
                        <p className="item_name">{name}</p>
                        <div className="item_value">
                            <p className="item_value-percent">{value.current ? `${alteration.toFixed(2)}%` : 'NEW'}</p>
                            <div className="item_value-price">
                                <p className="gold">{gold}</p>
                                <p className="silver">{silver}</p>
                                <p className="bronce">{bronce}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Item;