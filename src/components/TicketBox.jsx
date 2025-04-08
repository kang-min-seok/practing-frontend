import React from 'react';

import TicketItem from './TicketItem';
import { BsDatabaseFillSlash } from "react-icons/bs";

const TicketBox = ({
  handleCheckRequestTime,
  requestTimes,
  setRequestTimes
}) => {

  // 날짜 문자열 포맷 함수
  const formatKR = (timeStr) => {
    if (!timeStr) return '';
    const d = new Date(timeStr);
    
    const [am_pm, time] = d.toLocaleTimeString('ko-KR').split(' '); // "오후 4:12:05" => [ "오후", "4:12:05" ]
    
    const parse_time = time.split(':'); // "4:12:05" => ["4", "12", "05"]

    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} `
         + `${am_pm} ${parse_time[0]}시 ${parse_time[1]}분 ${parse_time[2]}초`;
  };

  return (
    <div className="ticket-box">
      <div className="ticket-box-header">
        <span>티켓팅 연습하기</span>
        <div className="ticket-box-header-btn">
          <button className="ticket-btn" onClick={handleCheckRequestTime}>
            티켓팅!!
          </button>
          <button
            className="reset-btn"
            onClick={() => setRequestTimes([])}
          >
            초기화
          </button>
        </div>
      </div>

      {/* 요청 기록 표시 */}
      <div className="ticket-list">
        {requestTimes.length === 0 ? (
          // 배열이 비었을 때 표시할 기본 시각 요소
          <div className="default-time">
            <BsDatabaseFillSlash size={80} />
            <p>요청 기록이 없습니다.</p>
          </div>
        ) : (
          // 배열에 기록이 있으면 기존 로직대로
          requestTimes.slice().reverse().map((time, idx) => {
            const formatted = formatKR(time);
            const splitted = formatted.split(' ');
            return (
              <TicketItem
                splitted={splitted}
                idx={idx}
                key={idx}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default TicketBox;
