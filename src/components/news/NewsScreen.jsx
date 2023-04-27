import React from 'react' 
import { useForm } from '../../hooks/useForm';
import { v4 as uuid } from 'uuid';
import { useDispatch } from 'react-redux';
import { addNews } from '../../redux/newsSlice';
import ListNews from './ListNews';

const NewsScreen = () => {
    const dispatch = useDispatch()
    const [formValues, handleInputChange, reset] = useForm({
        news: ""
    })
    const {news} = formValues;

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = uuid();
        
        dispatch(addNews({
            id,
            news
        }))
        reset();        
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='form-content' autoComplete="off">
                <label>
                    NEWS:
                    <textarea 
                        name='news'
                        type='text'
                        placeholder=''
                        value={news}
                        onChange={handleInputChange}
                    />
                </label>
                <button className='button'>
                    SAVE
                </button>
                <ListNews/>
            </form>
        </>
    )
}


export default NewsScreen;