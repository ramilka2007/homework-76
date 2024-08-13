import React from 'react';
import { TextField } from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import './SendMessageForm.css';
import { YourMessage } from '../../types';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';

interface Props {
  sendMessageRequest: (message: YourMessage) => void;
}

const SendMessageForm: React.FC<Props> = ({ sendMessageRequest }) => {
  const [sendMessage, setSendMessage] = React.useState<YourMessage>({
    author: '',
    message: '',
  });
  const [loading, setLoading] = React.useState(false);

  const onFormSubmit = async (event: React.FormEvent) => {
    try {
      setLoading(true);
      event.preventDefault();

      await sendMessageRequest(sendMessage);

      setSendMessage({
        author: '',
        message: '',
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
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

      <LoadingButton
        size="medium"
        disabled={sendMessage.message === '' || sendMessage.author === ''}
        endIcon={<SendIcon />}
        loading={loading}
        loadingPosition="end"
        variant="contained"
        type="submit"
      >
        <span>Send</span>
      </LoadingButton>
    </form>
  );
};

export default SendMessageForm;
