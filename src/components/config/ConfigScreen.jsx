import React from 'react' 
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { updateConfig } from '../../redux/configSlice';

const ConfigScreen = () => {
    const config = useSelector(state => state.CONFIG)
    const dispatch = useDispatch();
    const [formValues, handleInputChange, reset] = useForm({
        duration: config.duration ? config.duration : 60,
        minChange: config.minChange ? config.minChange : -100,
        maxChange: config.maxChange ? config.maxChange : 100
    })

    const {duration , minChange, maxChange} = formValues;

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(updateConfig({
            duration
        }))
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
                {/* <label>
                    ITEM RANGE CHANGE
                    <div className='range-config'>
                        <input 
                            name='minChange'
                            type='number' 
                            placeholder='MIN' 
                            value={minChange} 
                            onChange={handleInputChange}
                        />
                        <input 
                            name='maxChange'
                            type='number' 
                            placeholder='MAX' 
                            value={maxChange} 
                            onChange={handleInputChange}
                        />
                    </div>
                </label> */}
                <button className='button'>
                    SAVE
                </button>
            </form>
        </>
    )
}


export default ConfigScreen;