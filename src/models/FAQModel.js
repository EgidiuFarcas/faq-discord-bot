import Response from '../database/ResponseSchema.js';
import Question from '../database/QuestionSchema.js';

export default class FAQModel {

    static async createResponse(guildID, text){
        let r = new Response({
            text: text,
            guildID: guildID
        });
        await r.save();
        return r.prettyID;
    }

    static async responseExists(guildID, prettyID){
        let r = await Response.exists({
            guildID: guildID,
            prettyID: prettyID
        });
        return r;
    }

    static async createQuestion(guildID, text, responsePrettyID){
        let r = await Response.findOne({guildID: guildID, prettyID: responsePrettyID});
        let q = new Question({
            text: text,
            guildID: guildID,
            owner: r._id
        });
        await q.save();
        r.questions.push(q._id);
        await r.save();
    }

}