import React from 'react'

const SearchBar = ({ inputUrl, setInputUrl, handleGetDate }) => {
    return (
        <div className="search-box">
            <input
                type="text"
                placeholder="url을 입력해주세요."
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
            />
            <button onClick={handleGetDate}>조회</button>
        </div>
    )
}

export default SearchBar