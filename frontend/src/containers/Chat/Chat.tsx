import React, { useEffect } from 'react';
import SendMessageForm from '../../components/SendMessageForm/SendMessageForm';
import { MessageType } from '../../../types';
import Message from '../../components/Message/Message';
import './Chat.css';

const url = 'http://146.185.154.90:8000/messages';

const Chat = () => {
    const [messages, setMessages] = React.useState<MessageType[]>([]);

    useEffect(() => {
        if (messages.length > 0) {
            const interval = setInterval(() => {
                void fetchNewMessages();
            }, 3000);

            return () => clearInterval(interval);
        } else {
            void fetchMessages();
        }
    }, [messages]);

    const fetchNewMessages = async () => {
        const lastDate = messages[messages.length - 1].datetime;
        const response = await fetch(url + '?datetime=' + lastDate);

        if (response.ok) {
            const newMessages = await response.json();

            setMessages((prev) => [...prev, ...newMessages]);
        }
    };

    const fetchMessages = async () => {
        const response = await fetch(url);

        if (response.ok) {
            const newMessages = await response.json();

            setMessages(newMessages);
        }
    };

    return (
        <>
            <div className="sendForm">
                <SendMessageForm />
            </div>
            <div className="cards">
                {messages
                    .slice()
                    .reverse()
                    .map((message) => {
                        return <Message key={message._id} info={message} />;
                    })}
            </div>
        </>
    );
};

export default Chat;
