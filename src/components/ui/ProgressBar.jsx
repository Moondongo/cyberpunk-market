import React from 'react' 

const ProgressBar = ({progress, isPause, handle}) => {
    return (
        <div className='progress-container'>
            <div className={`progress-bar_container ${isPause && 'pause'}`}>
                <div className='progress-bar_filler' style={{width: `${progress}%`}}>
                </div>
            </div>
            <button onClick={handle}>
                {
                    isPause 
                        ? <i className="fa-solid fa-pause"></i>
                        : <i className="fa-solid fa-play"></i>
                }
            </button>
        </div>
    )
}


export default ProgressBar;