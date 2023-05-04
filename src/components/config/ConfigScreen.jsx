import React, { useEffect, useState } from 'react' 
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { updateConfig } from '../../redux/configSlice';
import useCopyToClipboard from '../../hooks/useCopyToClipboard';
import MessagePopUp from '../ui/MessagePopUp';

const ConfigScreen = () => {
    const state = useSelector(state => state)
    
    const config = useSelector(state => state.CONFIG)
    const dispatch = useDispatch();

    const [value, copy] = useCopyToClipboard()
    const [cbCompatible, setCbCompatible] = useState(true)
    const [cbValue, handleCBChange] = useForm({
        content: ''
    })

    const [formValues, handleInputChange, reset] = useForm({
        duration: config.duration ? config.duration : 60,
        minChange: config.minChange ? config.minChange : -100,
        maxChange: config.maxChange ? config.maxChange : 100
    })
    const {duration} = formValues;

    const [message, setMessage] = useState({
        isMessage: false,
        error: null,
        msg: null
    })

    useEffect(() => {
        if(!navigator?.clipboard){
            setCbCompatible(false)
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(updateConfig({
            duration
        }))
        setMessage({
            isMessage: true,
            error: null,
            msg: null
        })
        setTimeout(() => {
            setMessage({
                isMessage: false,
                error: null,
                msg: null
            })
        }, 1000)
    }

    const handleCopyToClipboard = (e) => {
        if(cbCompatible){
            copy(JSON.stringify(state))
        }else{
            handleCBChange({
                target: {
                    name: "content",
                    value: JSON.stringify(state)
                }
            })
        }
        setMessage({
            isMessage: true,
            error: null,
            msg: "DATOS COPIADOS"
        })
        setTimeout(() => {
            setMessage({
                isMessage: false,
                error: null,
                msg: null
            })
        }, 1000)
    }

    const handleReadingClipboard = () => {
        if(cbCompatible){
            try {
                navigator.clipboard.readText()
                .then(text => {
                    const data = JSON.parse(text);
    
                    if("ITEMS" in data ){
                        localStorage.setItem('items', JSON.stringify(data.ITEMS))
                    }
                    if("NEWS" in data ){
                        localStorage.setItem('news', JSON.stringify(data.NEWS))
                    }
                    if("CONFIG" in data ){
                        localStorage.setItem('config', JSON.stringify(data.CONFIG))
                    }
    
                    if("ITEMS" in data || "NEWS" in data || "CONFIG" in data){
                        location.reload()
                    }
                })
                .catch( e => {
                    setMessage({
                        isMessage: true,
                        error: 'Invalid Data',
                        msg: null
                    })
                    setTimeout(() => {
                        setMessage({
                            isMessage: false,
                            error: null,
                            msg: null
                        })
                    }, 1000)
                })
            } catch (error) {
                return console.warn(error)
            }
        }else{
            try {
                const data = JSON.parse(cbValue.content)

                if("ITEMS" in data ){
                    localStorage.setItem('items', JSON.stringify(data.ITEMS))
                }
                if("NEWS" in data ){
                    localStorage.setItem('news', JSON.stringify(data.NEWS))
                }
                if("CONFIG" in data ){
                    localStorage.setItem('config', JSON.stringify(data.CONFIG))
                }

                if("ITEMS" in data || "NEWS" in data || "CONFIG" in data){
                    location.reload()
                }
            } catch (error) {
                return console.warn(error)
            }
        }
    }

    return (
        <>
            {
                message.isMessage && <MessagePopUp error={message.error} msg={message.msg}/>
            }
            <form className='form-config' autoComplete="off" onSubmit={handleSubmit}>
                <label>
                    MARKET DURATION (S)
                    <input
                        name='duration'
                        type='number' 
                        min={0} 
                        placeholder='SECONDS' 
                        value={duration} 
                        onChange={handleInputChange}
                    />
                </label>
                <button className='button' type='submit'>
                    SAVE
                </button>

                <div className='load-container'>
                    {
                        !cbCompatible && <textarea
                            className='textarea'
                            name='content'
                            value={cbValue.content}
                            onChange={handleCBChange}
                        ></textarea>
                    }
                    <button className='button' type='button' onClick={handleCopyToClipboard}>
                    <i className="fa-sharp fa-solid fa-copy"/> COPY DATA
                    </button>
                    <button className='button' type='button' onClick={handleReadingClipboard}>
                    <i className="fa-sharp fa-solid fa-paste"/> PASTE DATA
                    </button>
                </div>
            </form>
        </>
    )
}


export default ConfigScreen;