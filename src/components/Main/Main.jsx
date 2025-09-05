import React, { useContext, useState } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Contest'

const Main = () => {
  const { onSent, recentPrompt, showResult, loading, currentChat, input, setInput } = useContext(Context)
  const [localInput, setLocalInput] = useState("")

  const handleSend = async () => {
    await onSent()
  }

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? 
          <>
            <div className="greet">
              <p><span>Hello, dev</span></p>
              <p>how i can help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>suggest beautiful places to se on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>breifly summarize this concept:urban planing</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>brainstrom team boding actiovitoes for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>improve readability of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
         :
          <div className="result">
            {currentChat.map((item, index) => (
              <div key={index} className="chat-entry">
                <div className="result-title">
                  <img src={assets.user_icon} alt="" />
                  <p>{item.prompt}</p>
                </div>
                <div className="result-data">
                  <img src={assets.gemini_icon} alt="" />
                  <p dangerouslySetInnerHTML={{__html: item.response}}></p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="result-data">
                <img src={assets.gemini_icon} alt="" />
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              </div>
            )}
          </div>
        }
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="enter a prompt"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleSend()
                }
              }}
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <img onClick={handleSend} src={assets.send_icon} alt="" />
            </div>
          </div>
          <p className="bottom-info">
            gemini display inaccurate info,in
          </p>
        </div>
      </div>
    </div>
  )
}

export default Main
