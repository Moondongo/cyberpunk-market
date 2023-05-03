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

    const [seconds, reset, pause, isPause] = useTimer()
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
        const tempOrder = [...items].sort((a, b) => {
            const first = a.value.current ? a.value.current : a.value.initial;
            const second = b.value.current ? b.value.current : b.value.initial;
            return second - first
        })

        const tempShow = tempOrder.filter(item => !item?.hide)
        const temp = [
            ...tempShow.filter(item => item?.sticky),
            ...tempShow.filter(item => !item?.sticky)
        ]
        
        setFirstTenItems(
            temp.length > 9 ? temp.slice(0, 10) : temp
        )
    }, [items])

    const handleClick = () => {
        pause()
    }

    return (
        <>
        <ProgressBar progress={progress} isPause={isPause} handle={handleClick}/>
        <div className='items-container'>
            {
                firstTenItems.map( item => <Item key={item.id} {...item}/>)
            }
        </div>
        </>
    )
}


export default MarketScreen;