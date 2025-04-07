import React from 'react'

const HelpWidget = ({ openHelp }) => {
    return (
        <div className={`help-widget ${openHelp ? 'open' : ''}`}>
            <p>이 페이지에 대한 설명을 적어보세요.</p>
            <p>예: 서버시간을 조회하고 티켓팅을 연습하는 방법 등을 안내.</p>
        </div>
    )
}

export default HelpWidget