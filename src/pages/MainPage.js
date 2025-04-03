import React, { useState, useEffect } from 'react';
import { fetchDateHeader } from '../api/ticketApi';
import '../css/MainPage.css';  // CSS 파일 import

const MainPage = () => {
  const [targetUrl, setTargetUrl] = useState('');
  const [serverTime, setServerTime] = useState('');
  const [clockTime, setClockTime] = useState('');

  // "내가 요청을 보낸 시점"을 저장할 배열
  const [requestTimes, setRequestTimes] = useState([]);

  // 1) 서버 시간을 가져와 시계를 업데이트하는 버튼
  const handleGetDate = async () => {
    const result = await fetchDateHeader(targetUrl);

    if (result.startsWith('Error:')) {
      setServerTime('오류 발생');
    } else {
      setServerTime(result);
    }
  };

  // 2) "내 요청이 서버에 어느 시점에 들어갔는지" 확인하는 버튼
  const handleCheckRequestTime = async () => {
    const result = await fetchDateHeader(targetUrl);

    if (!result.startsWith('Error:')) {
        setRequestTimes((prev) => [...prev, result]);
    }
  };

  useEffect(() => {
    let timerId;

    if (serverTime && !serverTime.startsWith('Error:')) {
      let date = new Date(serverTime);

      if (isNaN(date.getTime())) {
        console.warn('서버가 ISO 형식이 아니어서 Date 변환 실패. 수동 파싱 필요');
      }

      // 시계를 매초 업데이트
      timerId = setInterval(() => {
        date = new Date(date.getTime() + 1000);
        const formattedTime = date.toLocaleTimeString();
        setClockTime(formattedTime);
      }, 1000);

      // 초깃값도 즉시 표시
      setClockTime(date.toLocaleTimeString());
    }

    return () => clearInterval(timerId);
  }, [serverTime]);

  return (
    <div className="mainpage-container">
      <h1 className="mainpage-title">네이비즘 스타일 티켓팅 연습</h1>

      <div className="input-group">
        <input
          type="text"
          placeholder="서버 시간을 가져올 URL을 입력해주세요."
          value={targetUrl}
          onChange={(e) => setTargetUrl(e.target.value)}
        />
        <button onClick={handleGetDate}>Get Time!</button>
      </div>

      {/* 두 번째 버튼: 내 요청이 서버에 들어간 시점 체크 */}
      <button className="fullwidth-button" onClick={handleCheckRequestTime}>
        티켓팅하기
      </button>

      {/* 실시간 시계 표시 */}
      {clockTime ? 
      <div className="clock-text">{clockTime}</div> : 
      <div className="clock-text">URL을 입력해주세요.</div>
      }

      {/* 요청 시점을 쭉 나열: 가장 최근 요청부터 or 오래된 것부터 */}
      {requestTimes.length > 0 && (
        <div className="request-list">
          {requestTimes.map((time, idx) => (
            <p key={idx}>{new Date(time).toLocaleString()}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default MainPage;
