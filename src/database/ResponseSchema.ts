import mongoose, { Schema, Document } from 'mongoose';
import shortid from 'shortid';
import { IQuestion } from './QuestionSchema';
import { IShortcut } from './ShortcutSchema';

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@$');

export interface IResponse extends Document {
    _id: string,
    prettyID: string,
    text: string,
    guildID: string,
    questions: Array<IQuestion['_id']>,
    shortcuts: Array<IShortcut['_id']>
}

let ResponseSchema: Schema = new Schema({
    prettyID: {type: String, default: shortid.generate},
    text: { type: String, required: true },
    guildID: { type: String, required: true},
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    }],
    shortcuts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shortcut"
    }]
});

export default mongoose.model<IResponse>("Response", ResponseSchema);