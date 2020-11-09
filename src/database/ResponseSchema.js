import mongoose from 'mongoose';
import shortid from 'shortid';

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@$');

let ResponseSchema = new mongoose.Schema({
    prettyID: {type: String, default: shortid.generate},
    text: String,
    guildID: String,
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    }]
});

export default mongoose.model("Response", ResponseSchema);