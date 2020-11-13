import mongoose, { Schema, Document } from 'mongoose';
import shortid from 'shortid';
import { IQuestion } from './QuestionSchema';

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@$');

export interface IResponse extends Document {
    _id: string,
    prettyID: string,
    text: string,
    guildID: string,
    questions: Array<IQuestion['_id']>
}

let ResponseSchema: Schema = new Schema({
    prettyID: {type: String, default: shortid.generate},
    text: { type: String, required: true },
    guildID: { type: String, required: true},
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    }]
});

export default mongoose.model<IResponse>("Response", ResponseSchema);