import React from 'react' 

const ProgressBar = ({progress, isPause, handle}) => {
    return (
        <div className={`progress-bar_container ${isPause && 'pause'}`} onClick={handle}>
            <div className='progress-bar_filler' style={{width: `${progress}%`}}>
            </div>
        </div>
    )
}


export default ProgressBar;