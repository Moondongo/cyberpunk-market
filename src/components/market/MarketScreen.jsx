import React, { useEffect, useState } from 'react' 
import Item from './Item';
import { useDispatch, useSelector } from 'react-redux';
import { updateItems } from '../../redux/itemsSlice';
import { useTimer } from '../../hooks/useTimer'
import ProgressBar from '../ui/ProgressBar';

const MarketScreen = () => {
    const dispatch = useDispatch()
    const items = useSelector(state => state.ITEMS)
    const {duration} = useSelector(state => state.CONFIG)
    const [firstTenItems, setFirstTenItems] = useState([])

    const [seconds, reset] = useTimer()
    const [progress, setProgress] = useState(0)

    useEffect(()=>{
        if(seconds >= duration) {
            dispatch(updateItems())
            reset()
        }else{
            setProgress(((seconds * 100) / duration) + 100/duration)
        }
    }, [seconds])

    useEffect(() => {
        //!const temp = items.sort((a, b) => b.value - a.value) ERRROR por mutar el array "items"
        const temp = [...items].sort((a, b) => b.value - a.value)
        
        setFirstTenItems(
            temp.length > 9 ? temp.slice(0, 10) : temp
        )
        console.log(items[0])
    }, [items])

    return (
        <>
        <ProgressBar progress={progress}/>
        <div className='items-container'>
            {
                firstTenItems.map( item => <Item key={item.id} {...item}/>)
            }
        </div>
        </>
    )
}


export default MarketScreen;