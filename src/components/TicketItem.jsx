import React from 'react'
import { IoCheckmarkCircle } from "react-icons/io5";

const TicketItem = ({ splitted, idx }) => {
    return (
        <div className="ticket-item" key={idx}>
            <IoCheckmarkCircle size={50} color='#198cff' />
            <div className="date-column">
                <div className="date-line">{splitted[0]}</div>
                <div className="time-line">
                    {splitted[1]} {splitted[2]} {splitted[3]} {splitted[4]}
                </div>
            </div>
        </div>
    )
}

export default TicketItem