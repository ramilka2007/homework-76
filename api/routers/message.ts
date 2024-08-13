import express from 'express';
import fileDb from '../fileDb';
import {Messages} from "../types";

const messageRouter = express.Router();

messageRouter.post('/', async (req, res) => {
    if (!req.body.author || !req.body.message) {
        return res.status(400).send({ error: 'Author and message fields are required' });
    } else {
        try {
            const message = {
                message: req.body.message,
                author: req.body.author,
            };

            const sendMsg = await fileDb.addMessage(message);

            return res.send(sendMsg);
        } catch (e) {
            return console.error(e)
        }
    }
});

messageRouter.get('/', async (req, res) => {
    try {
        let messages: Messages[] = [];

        if (req.query.datetime) {
            const queryDate = req.query.datetime as string;
            const date = new Date(queryDate);
            if (isNaN(date.getDate())) {
                return res.status(400).send({error: 'Datetime is incorrect'});
            } else {}
        } else {
            messages = await fileDb.getThirtyMessages();
        }

        return res.send(messages);
    } catch (e) {
        return console.error(e);
    }
});

export default messageRouter;