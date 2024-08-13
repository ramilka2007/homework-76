import React from 'react';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import { MessageType } from '../../../types';

interface MessageProps {
    info: MessageType;
}

const Message: React.FC<MessageProps> = React.memo(
    ({ info }) => {
        const messageDate = (datetime: Date) => {
            const date = new Date(datetime);
            return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()},
            ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        };
        return (
            <Card sx={{ width: 400 }}>
                <CardContent>
                    <Typography
                        variant="h5"
                        component="div"
                        style={{ fontWeight: 700, fontSize: 24 }}
                    >
                        {info.author}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {messageDate(info.datetime)}
                    </Typography>
                    <hr />
                    <h4>
                        <Typography
                            variant="body2"
                            style={{ fontWeight: 500, fontSize: 20 }}
                        >
                            {info.message}
                        </Typography>
                    </h4>
                </CardContent>
            </Card>
        );
    },
    (prevProps, nextProps) => {
        return prevProps.info !== nextProps.info;
    },
);

export default Message;
