import React, { useEffect, useState } from 'react' 
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { updateConfig } from '../../redux/configSlice';
import useCopyToClipboard from '../../hooks/useCopyToClipboard';

const ConfigScreen = () => {
    const state = useSelector(state => state)
    
    const config = useSelector(state => state.CONFIG)
    const dispatch = useDispatch();

    const [value, copy] = useCopyToClipboard()
    const [cbCompatible, setCbCompatible] = useState(true)
    const [cbValue, handleCBChange, resetCB] = useForm({
        content: ''
    })

    const [formValues, handleInputChange, reset] = useForm({
        duration: config.duration ? config.duration : 60,
        minChange: config.minChange ? config.minChange : -100,
        maxChange: config.maxChange ? config.maxChange : 100
    })
    const {duration , minChange, maxChange} = formValues;

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
    }

    const handleCopyToClipboard = () => {
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
    
                    location.reload()
                })
                .catch( e => console.log)
            } catch (error) {
                console.warn(error)
            }
        }else{
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

            location.reload()
        }
    }

    return (
        <>
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
                <button className='button'>
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
                    <button className='button' onClick={handleCopyToClipboard}>
                    <i className="fa-sharp fa-solid fa-copy"/> COPY DATA
                    </button>
                    <button className='button' onClick={handleReadingClipboard}>
                    <i className="fa-sharp fa-solid fa-paste"/> PASTE DATA
                    </button>
                </div>
            </form>
        </>
    )
}


export default ConfigScreen;