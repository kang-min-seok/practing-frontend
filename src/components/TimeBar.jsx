import React from 'react'

const TimeBar = ({ targetUrl, clockTime }) => {
    return (
        <>
            <p className="domain-text">{targetUrl}의 서버시간</p>
            <div className="clock-display">{clockTime}</div>
        </>
    )
}

export default TimeBar