import mongoose, { Schema, Document } from 'mongoose';
import shortid from 'shortid';
import { IResponse } from './ResponseSchema';

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@$');

export interface IShortcut extends Document {
    _id: string,
    prettyID: string,
    text: string,
    guildID: string,
    owner: IResponse["_id"]
}

let ShortcutSchema: Schema = new Schema({
    prettyID: { type: String, default: shortid.generate },
    text: { type: String, required: true },
    guildID: { type: String, required: true},
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Response"
    }
});

export default mongoose.model<IShortcut>("Shortcut", ShortcutSchema);