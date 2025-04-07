import React, { useState, useEffect } from 'react';
import { fetchDateHeader } from '../api/ticketApi';
import GLOBAL from '../GlobalVariable';
import '../css/MainPage.css';

// 컴포넌트
import NavBar from '../components/NavBar.jsx';
import SearchBar from '../components/SearchBar.jsx';
import TimeBar from '../components/TimeBar.jsx';
import TicketBox from '../components/TicketBox.jsx';

const MainPage = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [targetUrl, setTargetUrl] = useState(`${GLOBAL.DOMAIN}`);
  const [serverTime, setServerTime] = useState('');
  const [clockTime, setClockTime] = useState('');
  const [requestTimes, setRequestTimes] = useState([]);

  const parseUrl = (url) => {
    let parsedUrl;
    try {
      parsedUrl = new URL(url);
    } catch (error) {
      setClockTime('URL parse error');
      return '잘못된 URL';
    }
    return `${parsedUrl.protocol}//${parsedUrl.host}`;
  }

  const getDate = async (url) => {
    const parsedUrl = parseUrl(url);
    const result = await fetchDateHeader(parsedUrl);
    setServerTime(result.startsWith('Error:') ? '' : result);
    setTargetUrl(parsedUrl);
    setRequestTimes([]);
  }

  // 서버 시간을 가져와 시계를 업데이트하는 버튼
  const handleGetDate = () => {
    getDate(inputUrl);
  };

  // 내 요청이 서버에 어느 시점에 들어갔는지 확인하는 버튼
  const handleCheckRequestTime = async () => {
    const parsedUrl = parseUrl(targetUrl);
    const result = await fetchDateHeader(parsedUrl);

    if (!result.startsWith('Error:')) {
      setRequestTimes((prev) => [...prev, result]);
    }
  };


  useEffect(() => {
    getDate(targetUrl);
  }, []);

  useEffect(() => {
    let timerId;
    if (serverTime) {
      let dateObj = new Date(serverTime);
      timerId = setInterval(() => {
        dateObj = new Date(dateObj.getTime() + 1000);
        const formatted = dateObj.toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
        setClockTime(formatted);
      }, 1000);
    } else {
      setClockTime('');
    }

    return () => clearInterval(timerId);
  }, [serverTime]);

  return (
    <div className="root-container">
      <NavBar />
      {/* 메인 컨텐츠 */}
      <div className="content-wrap">
        <SearchBar 
          inputUrl={inputUrl}
          setInputUrl={setInputUrl}
          handleGetDate={handleGetDate}
        />
        <TimeBar 
          targetUrl={targetUrl}
          clockTime={clockTime}
        />
        {/* 티켓팅 연습 박스 */}
        <TicketBox 
          handleCheckRequestTime={handleCheckRequestTime}
          requestTimes={requestTimes}
          setRequestTimes={setRequestTimes}
        />
       
      </div>
    </div>

  );
};

export default MainPage;
