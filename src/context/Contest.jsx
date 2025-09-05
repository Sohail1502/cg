import { createContext, useState } from 'react';
import runChat from '../config/gemini.js';

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const onSent = async () => {
        console.log("Prompt sent:", input);
        setResultData("");
        setLoading(true);
        setShowResult(true);
        try {
            // Assuming runChat is imported and used here
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
