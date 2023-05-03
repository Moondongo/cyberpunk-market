import React, { useState } from 'react' 
import { useForm } from '../../hooks/useForm';
import { v4 as uuid } from 'uuid';
import { useDispatch } from 'react-redux';
import { addNews } from '../../redux/newsSlice';
import ListNews from './ListNews';
import MessagePopUp from '../ui/MessagePopUp';

const NewsScreen = () => {
    const dispatch = useDispatch()
    const [formValues, handleInputChange, reset] = useForm({
        news: ""
    })
    const {news} = formValues;

    const [message, setMessage] = useState({
        isMessage: false,
        error: null
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        if(news.length === 0){
            setMessage({
                isMessage: true,
                error: "El campo NEWS no puede estar vacio"
            })
            setTimeout(() => {
                setMessage({
                    isMessage: false,
                    error: null
                })
            }, 3000)

            return
        }

        const id = uuid();        
        dispatch(addNews({
            id,
            news
        }))
        reset();
        setMessage({
            isMessage: true,
            error: null
        })
        setTimeout(() => {
            setMessage({
                isMessage: false,
                error: null
            })
        }, 3000)
    }

    return (
        <>
            {
                message.isMessage && <MessagePopUp error={message.error}/>
            }
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