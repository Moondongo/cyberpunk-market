import React from 'react' 

const MessagePopUp = ({error}) => {
    return (
        <div className='msg-container'>
            <div className={`msg-content ${!error && 'check'}`}>
                <div className='msg-icon'>
                    {
                        error 
                            ? <i className="fa-solid fa-circle-exclamation"></i>
                            : <i className="fa-solid fa-circle-check"></i>
                    }
                </div>
                <div className='msg-text'>
                    {
                        error
                            ? error
                            : 'el elemento se guardo con exito'
                    }
                </div>
                <div className='msg-progressbar_container'>
                    <div className='msg-progressbar_filler'>

                    </div>
                </div>
            </div>
        </div>
    )
}


export default MessagePopUp;