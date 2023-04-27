import { useEffect, useState } from 'react' 

export const useTimer = () => {
    const [seconds, setSeconds] = useState(0)
    
    useEffect(()=>{
        const intervalId = setInterval(() => {
            update();
        }, 1000);

        return () => clearInterval(intervalId);
    }, [])

    const update = () => {
        setSeconds((prev) => prev + 1)
    }

    const reset = () => {
        setSeconds(0)
    }

    return [seconds, reset]
}