import React, { useState, useEffect } from 'react';

const CountdownTimer = ({countdownDate}) => {
    const calculateTimeLeft = () => {

        const difference = +new Date(countdownDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
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

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {

        timerComponents.push(
            <div key={interval} className='intervalContainer'>
                <div className='interval'>
                    <div className='countdownTime'> {timeLeft[interval]}</div>
                    <div className='countdownLabel'> {interval}{' '}</div>
                </div>
                {interval !== 'seconds' && <div className='countdownTime'> : </div>}
            </div>
        );
    });

    return (
        <div className="countdownTimerContainer">
            <h2>NFL Kickoff</h2>
            <div className="timeContainer">
                {timerComponents.length ? (
                    timerComponents
                ) : (
                    <span>Countdown is over!</span>
                )}
            </div>
        </div>
    );
};

export default CountdownTimer;