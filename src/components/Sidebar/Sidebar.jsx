import React,{useState, useContext} from 'react'
import './Sidebar.css'
import {assets} from '../../assets/assets'
import { Context } from '../../context/Contest'
const Sidebar = () => {
    const [extended,setExtended]=useState(false)
    const { newChat, prevPrompts, loadrompt ,setRecentPrompt} = useContext(Context)
    const loadPrompt=async (prompt)=>{
        setRecentPrompt(prompt)
        await onSent(prompt)
    }
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
<div onClickCapture={()=>loadPrompt(item)} className="recent-entry" onClick={() => loadPrompt(prompt)}>
                    <img src={assets.message_icon} alt="" />
                    <p>{item.slice(0,18)}..</p>
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
