import React, { useRef, useEffect, useState } from 'react';

const Throttling = () => {
    const [inputValue, setInputValue] = useState('');
    const [throttledValue, setThrottledValue] = useState('');
    const lastThrottleTime = useRef(0);

    useEffect(() => {
        const now = Date.now();
        if (now - lastThrottleTime.current >= 1000) {
            console.log('Throttle over, updating throttle value:', inputValue);
            setThrottledValue(inputValue);
            lastThrottleTime.current = now;
        }
    }, [inputValue]);

    const handleChange = (e) => {
        console.log('input value:', e.target.value);
        setInputValue(e.target.value);
    };

    return (
        <>
            <h2>Throttle</h2>
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
            />
        </>

    )
}

export default Throttling;