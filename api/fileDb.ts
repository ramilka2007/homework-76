import {promises as fs} from 'fs';
import crypto from 'crypto';
import {Messages, MessageWithoutID} from "./types";

const filename = './db.json';
let data: Messages[] = [];

const fileDb = {
    async init() {
        try {
            const fileContents = await fs.readFile(filename);
            data = JSON.parse(fileContents.toString());
        } catch (e) {
            data = [];
        }
    },
    async getThirtyMessages(messagesArray: Messages[]=data) {
        return messagesArray?.slice(-30);
    },
    async addMessage(msg: MessageWithoutID) {
        const id = crypto.randomUUID();
        const date = new Date().toISOString();
        const message = {id, date, ...msg};
        data.push(message);
        await this.save();
        return message;
    },
    async save() {
        return fs.writeFile(filename, JSON.stringify(data, null, 2));
    }
};

export default fileDb;