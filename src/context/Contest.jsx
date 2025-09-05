import { createContext, useState } from 'react';
import runChat from '../config/gemini';

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const delayPara=(index,nextWord)=>{
setTimeout(function name()
{
    setResultData(prev=>prev+nextWord);
},75*index)
    }

    const onSent = async () => {
        console.log("Prompt sent:", input);
        setResultData("")
        setLoading(true)
        setShowResult(true)
        setRecentPrompt(input)
        setPrevPrompts(prev=>[...prev,input])
        const response=await runChat(input)
        let responseArray=response.split("**");
        let newResponse="";
        let newArray;
        for(let i=0;i<responseArray.length;i++){
            if(i===0||i%2!==1){
                newResponse+=responseArray[i];
            }
           else{
            newResponse+="<b>"+responseArray[i]+"</b>";
        }}
        let newResponse2=newResponse.split("*").join("<br>")
        let newResposeArray=newResponse2.split(" ");
        for(let i=0;i<newResponseArray.length;i++){
            const nextWord=newResponseArray[i];
            delayPara(i,nextWord+" ")
        }
    
        setResultData(response)
        setLoading(false)
        setInput("")

        try {
            const response = await runChat(input);
            if (response.error) {
                console.error("API Error:", response.error);
                setResultData("Error: " + response.error);
            } else {
                console.log("Response received:", response);
                setResultData(response);
            }
        } catch (error) {
            console.error("Exception:", error);
            setResultData("Exception: " + error.message);
        }
        setLoading(false);
        setInput("");
    };

    const newChat = () => {
        setShowResult(false);
        setResultData("");
        setInput("");
    };

    const loadPrompt = async (prompt) => {
        setInput(prompt);
        await onSent();
    };

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
        loadPrompt
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
