import React from 'react' 
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem } from '../../redux/itemsSlice';

const ListItems = () => {
    const dispatch = useDispatch();
    const items = useSelector(state => state.ITEMS)

    const handleDelete = (id) => {
        dispatch(deleteItem(id))
    }

    return (
        <div className='list-item'>
            <div className='item-container'>
                    <div>ICON</div>
                    <div>NAME</div>
                    <div>MIN</div>
                    <div>MAX</div>
                    <div className='last-child'>$</div>
            </div>
            {
                items.map(item => (
                    <div className='item-container' key={item.id}>
                        <i className={`fa-${item.ico.name} fa-${item.ico.family} fa-${item.ico.style}`}/>
                        <div>{item.name}</div>
                        <div>{item.range.min ? item.range.min : -100}</div>
                        <div>{item.range.max ? item.range.max : 100}</div>
                        <div>{item.value.initial}</div>
                        <button type='button' onClick={()=> handleDelete(item.id)}>
                            X
                        </button>
                    </div>
                ))
            }
        </div>
    )
}


export default ListItems;