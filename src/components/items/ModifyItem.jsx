import React, { useEffect } from 'react' 
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { modifyItem } from '../../redux/itemsSlice';

const ModifyItem = ({item, handleCancel}) => {
    const dispatch = useDispatch()
    const [formValues, handleInputChange] = useForm({
        name: item.name,
        value: item.value.initial.toString(),
        min: item.range.min ? item.range.min.toString() : "-100",
        max: item.range.max ? item.range.max.toString() : "100",
    })
    const {name, value, min, max} = formValues;

    
    const handleUpdate = () => {

        const hasName = name.length > 0
        const hasValue = value.length > 0 && !isNaN(value) && Number(value) > 0
        const isRange = min.length===0 && max.length===0 || !isNaN(min) && !isNaN(max) && Number(min) < Number(max)
        if(!hasName || !hasValue || !isRange){
            return
        }
        const newItem = {
            ...item,
            name: name,
            value: {
                initial: Number(value),
                current: null
            },
            range: {
                min: min ? Number(min) : null,
                max: max ? Number(max) : null
            }
        }
        dispatch(modifyItem(newItem))
        handleCancel()
    }

    return (
        <>
            <div id="myModal" className="modal">
                <div className="modal-content">
                    <div className='modal-content_form' autoComplete="off">
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
                        <div className='buttons-container'>
                            <button className='button' onClick={handleCancel}>
                                CANCEL
                            </button>
                            <button className='button' onClick={handleUpdate}>
                                UPDATE
                            </button>
                        </div>
                    </div>        
                </div>
            </div>
        </>
    )
}


export default ModifyItem;