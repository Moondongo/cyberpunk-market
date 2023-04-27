import React from 'react' 
import { useDispatch, useSelector } from 'react-redux';
import { deleteNews } from '../../redux/newsSlice';

const ListNews = () => {
    const dispatch = useDispatch()
    const news = useSelector(state => state.NEWS);


    const handleDelete = (id) => {
        dispatch(deleteNews(id))
    }

    return (
        <div className='list-news'>
            {
                news.map(n => (
                    <div className='news-container' key={n.id}>
                        <div>{n.news}</div>
                        <button type='button' onClick={()=> handleDelete(n.id)}>
                            X
                        </button>
                    </div>
                ))
            }
        </div>
    )
}


export default ListNews;