import { useState } from "react";
import getGeminiResponse from '../config/gemini.js';
import { Context } from './ContextValue.js';

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const onSent = async (promptText = input) => {
    const text = promptText.trim();
    if (!text) return;

    setLoading(true);
    setShowResult(true);
    setRecentPrompt(text);
    setPrevPrompts((prev) => [...prev, text]);
    setResultData("");
    setInput("");

    try {
      const response = await getGeminiResponse(text);
      setResultData(response);
    } catch (error) {
      console.error(error);
      setResultData("Sorry, I couldn't get a response right now.");
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    input,
    setInput,
    showResult,
    setShowResult,
    loading,
    resultData,
    setResultData,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;