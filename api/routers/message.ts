import express from 'express';
import fileDb from '../fileDb';

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
})

export default messageRouter;