import { createContext, useState } from 'react';
import runChat from '../config/gemini.js';

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    // Change prevPrompts to store arrays of { prompt, response } for conversations
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    // Change resultData to currentChat: array of { prompt, response }
    const [currentChat, setCurrentChat] = useState([]);

    const onSent = async () => {
        console.log("Prompt sent:", input);
        setLoading(true);
        setShowResult(true);
        try {
            // Prepare history from currentChat
            const history = currentChat.flatMap(item => [
                { role: 'user', parts: [{ text: item.prompt }] },
                { role: 'model', parts: [{ text: item.response }] }
            ]);
            const response = await runChat(input, history);
            if (response.error) {
                console.error("API Error:", response.error);
                setCurrentChat(prev => [...prev, { prompt: input, response: "Error: " + response.error }]);
            } else {
                console.log("Response received:", response);
                setCurrentChat(prev => [...prev, { prompt: input, response }]);
            }
        } catch (error) {
            console.error("Exception:", error);
            setCurrentChat(prev => [...prev, { prompt: input, response: "Exception: " + error.message }]);
        }
        setLoading(false);
        setRecentPrompt(input);
        setInput("");
    };

    const newChat = () => {
        // Add current chat to history before clearing
        if (currentChat.length > 0) {
            setPrevPrompts(prev => [...prev, currentChat]);
        }
        setShowResult(false);
        setCurrentChat([]);
        setInput("");
        setRecentPrompt("");
    };

    // loadPrompt now accepts a conversation array
    const loadPrompt = async (conversation) => {
        setCurrentChat(conversation);
        setShowResult(true);
        setLoading(false);
        setInput("");
        setRecentPrompt(conversation[conversation.length - 1].prompt);
    };

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        currentChat,
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
