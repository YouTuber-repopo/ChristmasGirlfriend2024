import React, { useState } from 'react';

const Bot: React.FC = () => {
    const [messages, setMessages] = useState<{ sender: string, text: string }[]>([]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim()) {
            setMessages([...messages, { sender: 'boyfriend', text: input }]);
            setInput('');
            setTimeout(() => {
                const response = generateResponse(input);
                setMessages(prevMessages => [...prevMessages, { sender: 'girlfriend', text: response }]);
            }, 1000);
        }
    };

    const generateResponse = (message: string) => {
        // Simple response logic for demonstration
        if (message.includes('好き')) {
            return '私も好きよ！';
        } else if (message.includes('元気')) {
            return '元気だよ！あなたは？';
        } else {
            return 'そうなんだ！';
        }
    };

    return (
        <div>
            <div>
                {messages.map((msg, index) => (
                    <div key={index} style={{ textAlign: msg.sender === 'boyfriend' ? 'left' : 'right' }}>
                        <strong>{msg.sender === 'boyfriend' ? '彼氏' : '彼女'}:</strong> {msg.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>送信</button>
        </div>
    );
};

export default Bot;