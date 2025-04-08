import React from 'react'
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdCircle } from "react-icons/md";

const TicketItem = ({ splitted, idx }) => {
    return (
        <div className="ticket-item" key={idx}>
            <div className="icon-stack">
                <MdCircle size={55} color='#fff' className="icon-bg" />
                <IoCheckmarkCircle size={55} color="#198cff" className="icon-fg" />
            </div>
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