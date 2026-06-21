import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets/assets'
import { Context } from '../../context/ContextValue.js';

const Main = () => {
  const {
    onSent,
    setInput,
    input,
    showResult,
    loading,
    resultData,
    recentPrompt,
  } = useContext(Context);

  const promptCards = [
    'Suggest beautiful places to see on an upcoming road trip',
    'Briefly summarize this concept : urban planning',
    'Brainstorm team bonding activities for our work retreat',
    'Improve the readability of the following code'
  ];

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p><span>Hello, Dev</span></p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              {promptCards.map((card) => (
                <div className="card" key={card} onClick={() => onSent(card)}>
                  <p>{card}</p>
                  <img src={assets.compass_icon} alt="" />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="result-section">
            <div className="result-user">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              {loading ? <p className="loader">Thinking...</p> : <p>{resultData}</p>}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder='Enter a prompt here'
              onKeyDown={(e) => e.key === 'Enter' && onSent()}
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <img onClick={() => onSent()} src={assets.send_icon} alt="" />
            </div>
          </div>
          <p className="bottom-info">
            Gemini may produce inaccurate information about people, places, or facts.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Main
