import React, {useEffect} from 'react';
import SendMessageForm from '../../components/SendMessageForm/SendMessageForm';
import {MessageType, YourMessage} from '../../types';
import Message from '../../components/Message/Message';
import './Chat.css';
import axiosApi from "../../axiosApi";

const Chat = () => {
    const [messages, setMessages] = React.useState<MessageType[]>([]);

    const getMessages = async () => {
        const {data: allMessages} = await axiosApi.get('/messages');
        console.log(allMessages.length);
        setMessages(allMessages);
    }

    useEffect(() => {
        void getMessages();
    }, []);

    const SendMessage = async (message: YourMessage) => {
        if (message.message.trim().length > 0 && message.author.trim().length > 0) {
            try {
                await axiosApi.post('/messages', {...message});
            } catch (e) {
                console.error(e);
            }
        }
    }

    return (
        <>
            <div className="sendForm">
                <SendMessageForm sendMessageRequest={SendMessage}/>
            </div>
            <div className="cards">
                {messages
                    .slice()
                    .reverse()
                    .map((message) => {
                        return <Message key={message.id} info={message}/>;
                    })}
            </div>
        </>
    );
}

export default Chat