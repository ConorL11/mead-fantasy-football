import React, { useState, useEffect } from 'react';

const CountdownTimer = ({countdownDate}) => {
    const calculateTimeLeft = () => {

        const difference = +new Date(countdownDate) - +new Date();
        let timeLeft = [];

        if (difference > 0) {

            timeLeft = [
                {label: 'days', value: Math.floor(difference / (1000 * 60 * 60 * 24))},
                {label: 'hours', value: Math.floor((difference / (1000 * 60 * 60)) % 24)},
                {label: 'minutes', value: Math.floor((difference / 1000 / 60) % 60)},
                {label: 'seconds', value: Math.floor((difference / 1000) % 60)}

            ]
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    return (
        <div className="countdownTimerContainer">
            <h2 className='countdownTimerHeader'>NFL Kickoff</h2>
            {timeLeft.length ? (
                <div className='timerBody'>
                    {timeLeft.map((interval) => (
                        <div key={interval.label} className='timerValues'>
                            <div className='justifyCenter'>{interval.value} </div>
                            {interval.label !== 'seconds' && <div className='justifyEnd'> : </div>}
                        </div>
                    ))}
                    {timeLeft.map((interval) => (
                        <div key={interval.label} className='timerLabels'>
                            {interval.label}
                        </div>
                    ))}
                </div>
            ) : (
                <span>Countdown is over!</span>)}
        </div>
    );
};

export default CountdownTimer;