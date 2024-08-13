import React from 'react';
import SendMessageForm from '../../components/SendMessageForm/SendMessageForm';
import { MessageType } from '../../types';
import Message from '../../components/Message/Message';
import './Chat.css';

const Chat = () => {
    const [messages, setMessages] = React.useState<MessageType[]>([]);
    const [date, setDate] = React.useState<string>('');

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
                        return <Message key={message.id} info={message} />;
                    })}
            </div>
        </>
    );
};

export default Chat;
