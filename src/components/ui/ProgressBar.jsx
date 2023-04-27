import React from 'react' 

const ProgressBar = ({progress}) => {
    return (
        <div className='progress-bar_container'>
            <div className='progress-bar_filler' style={{width: `${progress}%`}}>
            </div>
        </div>
    )
}


export default ProgressBar;