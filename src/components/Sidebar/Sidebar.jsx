import React,{useState, useContext} from 'react'
import './Sidebar.css'
// import runChat from '../config/gemini';

import {assets} from '../../assets/assets'
import { Context } from '../../context/Contest'
const Sidebar = () => {
    const [extended,setExtended]=useState(false)
    const { newChat, prevPrompts, loadPrompt ,setRecentPrompt, onSent} = useContext(Context)

    const loadPromptHandler = (item) => {
        loadPrompt(item);
    };

  return (
    <div className='sidebar'>
        <div className="top">
            <img onClick={()=>setExtended(prev=>!prev)} className='menu' src={assets.menu_icon} alt="" />
            <div className="new-chat" onClick={newChat}>
                <img src={assets.plus_icon} alt="" />
                {extended?<p>New chat</p>:null}
            </div>
            {extended ? (
              <div className="recent">
                <p className="recent-title">Recent</p>
            {prevPrompts.map((item,index)=>{
                return(
<div onClickCapture={()=>loadPromptHandler(item)} className="recent-entry" key={index}>
                    <img src={assets.message_icon} alt="" />
                    <p>{item[0].prompt.slice(0,18)}..</p>
                  </div>
                    )

                })}
                
              </div>
            ) : null}
            
        </div>
        <div className="bottom">
            <div className="bottom-item recent-entry">
                <img src={assets.question_icon} alt="" />
               {extended?<p>help</p>:null} 
            </div>
             <div className="bottom-item recent-entry">
                <img src={assets.history_icon} alt="" />
               {extended?<p>activity</p>:null} 
            </div>
             <div className="bottom-item recent-entry">
                <img src={assets.setting_icon} alt="" />
                {extended?<p>settings</p>:null} 
            </div>
        </div>
    </div>
    
  )
}

export default Sidebar
