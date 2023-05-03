import { useEffect, useState } from 'react' 

export const useTimer = () => {
    const [seconds, setSeconds] = useState(0)
    const [isPause, setPause] = useState(false)
    
    useEffect(()=>{
        const intervalId = setInterval(() => {
            !isPause && update();
        }, 1000);

        return () => clearInterval(intervalId);
    }, [isPause])

    const update = () => {
        setSeconds((prev) => prev + 1)        
    }

    const reset = () => {
        setSeconds(0)
    }

    const pause = () => {
        setPause(!isPause)
    }

    return [seconds, reset, pause, isPause]
}