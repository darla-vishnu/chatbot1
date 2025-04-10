import { useRef } from "react";

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";

    // Update chat history with the user's message
    setChatHistory((history) => [...history, { role: "user", text: userMessage }]);

    // Delay 400 ms before showing "Typing..." and generating response
    setTimeout(() => {
      // Add a "Typing..." placeholder for the bot's response
      setChatHistory((history) => [...history, { role: "model", text: "Typing..." }]);

      // Call the function to generate the bot's response
      generateBotResponse([...chatHistory, { role: "user", text: `Using the details provided above, please address this query: ${userMessage}` }]);
    }, 400);
  };

  return (
    <form onSubmit={handleFormSubmit} className="chat-form">
      <input ref={inputRef} placeholder="Ask about admissions, courses, facilities..." className="message-input" required />
      <button type="submit" id="send-message" className="material-symbols-outlined">arrow_upward</button>
    </form>
  );
};

export default ChatForm;