import mongoose from 'mongoose';
import shortid from 'shortid';

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@$');

let QuestionSchema = new mongoose.Schema({
    prettyID: {type: String, default: shortid.generate},
    text: String,
    guildID: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Response"
    }
});

export default mongoose.model("Question", QuestionSchema);