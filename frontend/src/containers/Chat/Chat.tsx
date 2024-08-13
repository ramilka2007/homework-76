import React, { useEffect } from 'react';
import SendMessageForm from '../../components/SendMessageForm/SendMessageForm';
import { MessageType, YourMessage } from '../../types';
import Message from '../../components/Message/Message';
import './Chat.css';
import axiosApi from '../../axiosApi';
import { Container } from '@mui/material';
import Spinner from '../../components/Spinner/Spinner';

const Chat = () => {
  const [messages, setMessages] = React.useState<MessageType[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const getMessages = async () => {
    try {
      setLoading(true);
      const { data: allMessages } = await axiosApi.get('/messages');
      setMessages(allMessages);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchNewMessages = async () => {
    try {
      setLoading(true);
      const lastDate = messages[messages.length - 1].datetime;
      const { data: newMessages } = await axiosApi.get(
        '/messages?datetime=' + lastDate,
      );

      setMessages((prev) => [...prev.slice(-30), ...newMessages]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void getMessages();
  }, []);

  const SendMessage = async (message: YourMessage) => {
    if (message.message !== '' && message.author !== '') {
      try {
        await axiosApi.post('/messages', { ...message });
      } catch (e) {
        console.error(e);
      } finally {
        void fetchNewMessages();
      }
    }
  };

  return (
    <>
      <Container className="sendForm">
        <SendMessageForm sendMessageRequest={SendMessage} />
      </Container>
      {messages.length === 0 ? (
        <h1>No messages</h1>
      ) : (
        <>
          {loading ? (
            <Spinner />
          ) : (
            <Container
              className="cards"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {messages
                .slice()
                .reverse()
                .map((message) => {
                  return <Message key={message.id} info={message} />;
                })}
            </Container>
          )}
        </>
      )}
    </>
  );
};

export default Chat;
