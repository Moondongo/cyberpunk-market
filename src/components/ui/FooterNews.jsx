import React, {useEffect, useRef, useState, useCallback} from 'react'
import { useSelector } from 'react-redux'

// const list = [
//     "important annoucement!",
//     "another important announcement.",
//     "crime is up",
//     "gas prices are down",
//     "this is even more important!",
//     "someone important said something important",
//     "there is trouble in the world",
//     "love will conquer all"
// ]

export const FooterNews = () => {
    const list = useSelector(state => state.NEWS)
    const [news, setNews] = useState(list)
    const wrapperRef = useRef();
    const indexRef = useRef();

    useEffect(()=>{
        list.length > 0 ? setNews(list) : setNews([{
            id: '0',
            news: ''
        }]);
    }, [list])

    const handleRefUpdate = useCallback(node => {
            if (node !== null && news.length > 0) {
                indexRef.current = node.firstChild;
                wrapperRef.current = node;
                document.documentElement.style.setProperty('--animationDistance', `${0 - indexRef.current.offsetWidth}px`);
                document.documentElement.style.setProperty('--animationDuration', `${Math.round(indexRef.current.offsetWidth / 100)}s`);
                wrapperRef.current.classList.add('moving');
            }
    }, [news]);
        
    const handleLoop = () => {
        wrapperRef.current.classList.remove('moving');
        wrapperRef.current.style.animation = 'none';
        const t = wrapperRef.current.offsetHeight; /* trigger reflow */
        wrapperRef.current.style.animation = null;
        shiftNext([...news]);
    };
        
    const shiftNext = (copy) => {
        const firstitem = copy.shift();
        copy.splice(copy.length, 0, firstitem);
        setNews(copy);
    };
        
    const handleAnimationEnd = () => {
        handleLoop();
    }


    return (
        <div className='footer-container'>
            <div className='footer-header'>
                {
                    [...Array(18*2)].map((e, i) => <div key={i}>BREAKING NEWS</div>)
                }                
            </div>
            <div className='footer-content' >
                <div className='inner' ref={handleRefUpdate} onAnimationEnd={handleAnimationEnd}>
                    {
                        news?.map((e) => <div key={e.id} className='content'>{e.news}</div>)
                    }
                </div>
            </div>
        </div>
    )
}
