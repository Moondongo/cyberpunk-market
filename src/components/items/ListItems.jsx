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
                    <div>%</div>
                    <div className='last-child'>$</div>
            </div>
            {
                items.map(item => (
                    <div className='item-container' key={item.id}>
                        <div>{item.ico.name}</div>
                        <div>{item.name}</div>
                        <div>{item.alteration.toFixed(2)}%</div>
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