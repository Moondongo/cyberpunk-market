import React, { useState } from 'react' 
import { useForm } from '../../hooks/useForm';
import { v4 as uuid } from 'uuid';
import { useDispatch } from 'react-redux';
import { addItem } from '../../redux/itemsSlice';
import ListItems from './ListItems';
import MessagePopUp from '../ui/MessagePopUp';


const ItemsScreen = () => {
    const dispatch = useDispatch();
    const [formValues, handleInputChange, reset] = useForm({
        url: "",
        name: "",
        value: "",
        min: "",
        max: "",
    })
    const {url, name, value, min, max} = formValues;

    const [message, setMessage] = useState({
        isMessage: false,
        error: null
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        const isUrl = /(https:\/\/fontawesome.com\/icons\/([a-z, -]*)\?f=\w+&s=\w+)/.test(url)
        const hasName = name.length > 0
        const hasValue = value.length > 0 && !isNaN(value) && Number(value) > 0
        const isRange = min.length===0 && max.length===0 || !isNaN(min) && !isNaN(max) && Number(min) < Number(max)

        if(!isUrl){
            setMessage({
                isMessage: true,
                error: "el ICON URL no es valido o no existe"
            })
            setTimeout(() => {
                setMessage({
                    isMessage: false,
                    error: null
                })
            }, 3000)
            return
        }
        if(!hasName){
            setMessage({
                isMessage: true,
                error: "el nombre del item es obligatorio"
            })
            setTimeout(() => {
                setMessage({
                    isMessage: false,
                    error: null
                })
            }, 3000)
            return
        }
        if(!hasValue){
            setMessage({
                isMessage: true,
                error: "El Precio del item tiene que ser un entero positivo"
            })
            setTimeout(() => {
                setMessage({
                    isMessage: false,
                    error: null
                })
            }, 3000)
            return
        }
        if(!isRange){
            setMessage({
                isMessage: true,
                error: "El Rango no es valido"
            })
            setTimeout(() => {
                setMessage({
                    isMessage: false,
                    error: null
                })
            }, 3000)
            return
        }

        const n = url.match(/\/(.*?)\?/)[1].split("/").slice(-1)[0]
        const f = url.match(/(f=)\w+/g)[0].split('=')[1];
        const s = url.match(/(s=)\w+/g)[0].split('=')[1];

        const item = {
            id: uuid(),
            ico: {
                name: n,
                family: f,
                style: s
            },
            name: name,
            alteration: 0,
            value: {
                initial: Number(value),
                current: null
            },
            range: {
                min: min ? Number(min): null,
                max: max ? Number(max): null
            },
            sticky: false
        };
        dispatch(addItem(item))
        reset()  
        
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
                    ICON URL:
                    <input 
                        name='url'
                        type='text'
                        placeholder='https://fontawesome.com/icons/***?f=***&s=***'
                        value={url}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    NAME:
                    <input 
                        name='name'
                        type='text'
                        placeholder='ITEM NAME'
                        value={name}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    PRICE:
                    <input 
                        name='value'
                        type='number'
                        placeholder='999'
                        min={0}
                        value={value}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    RANGE:
                    <div className='range-item'>
                        <input 
                            name='min'
                            type='number' 
                            placeholder='MIN' 
                            max={0}
                            value={min} 
                            onChange={handleInputChange}
                        />
                        <input 
                            name='max'
                            type='number' 
                            placeholder='MAX' 
                            min={0}
                            value={max} 
                            onChange={handleInputChange}
                        />
                    </div>
                </label>
                <button className='button'>
                    SAVE
                </button>
            <ListItems/>
            </form>
        </>
    )
}


export default ItemsScreen;