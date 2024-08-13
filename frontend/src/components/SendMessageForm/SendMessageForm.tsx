import React from 'react';
import { TextField } from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import './SendMessageForm.css';
import { YourMessage } from '../../types';

interface Props {
    sendMessageRequest: (message: YourMessage) => void;
}

const SendMessageForm: React.FC<Props> = ({sendMessageRequest}) => {
    const [sendMessage, setSendMessage] = React.useState<YourMessage>({
        author: '',
        message: '',
    });

    const onFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        await sendMessageRequest(sendMessage);

        setSendMessage({
            author: '',
            message: '',
        });
    };

    const changeForm = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setSendMessage((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    return (
        <form className="form" onSubmit={onFormSubmit}>
            <TextField
                required
                style={{ width: 500, marginBottom: 30 }}
                label="Username"
                name="author"
                id="author"
                onChange={changeForm}
                value={sendMessage.author}
            />
            <Textarea
                required
                style={{ width: 500, marginBottom: 30 }}
                color="primary"
                minRows={3}
                variant="soft"
                size="lg"
                name="message"
                id="message"
                placeholder="Message"
                onChange={changeForm}
                value={sendMessage.message}
            />

            <button type="submit" className="submitBtn">
                Send
            </button>
        </form>
    );
};

export default SendMessageForm;
