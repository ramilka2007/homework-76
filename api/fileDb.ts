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
    async getThirtyMessages(array: Messages[]=data) {
        if (array) {
            return array.slice(-30);
        } else {
            return data.slice(-30);
        }

    },
    async addMessage(msg: MessageWithoutID) {
        const id = crypto.randomUUID();
        const date = new Date().toISOString();
        const message = {id, datetime: date, ...msg};
        data.push(message);
        await this.save();
        return message;
    },
    getByQueryDatetime(datetime: Date): Messages[] {
        let lastMessages: Messages[] = [];

        data.forEach(message => {
            if (new Date(message.datetime) > datetime) {
                lastMessages.push(message);
            }
        });

        return lastMessages;
    },
    async save() {
        return fs.writeFile(filename, JSON.stringify(data, null, 2));
    }
};

export default fileDb;