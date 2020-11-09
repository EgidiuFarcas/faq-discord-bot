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

    static async questionExists(guildID, prettyID){
        let r = await Question.exists({
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

    static async getAll(guildID, populate = true){
        if(populate) return await Response.find({guildID: guildID}).populate('questions');
        else return await Response.find({guildID: guildID});
    }

    static async get(guildID, responsePrettyID){
        return await Response.findOne({guildID: guildID, prettyID: responsePrettyID}).populate('questions');
    }

    static async removeResponse(guildID, responsePrettyID) {
        let r = await Response.findOne({guildID: guildID, prettyID: responsePrettyID});
        r.questions.forEach(question => Question.findByIdAndDelete(question._id));
        r.deleteOne();
    }

    static async removeQuestion(guildID, questionPrettyID) {
        return await Question.findOneAndDelete({guildID: guildID, prettyID: questionPrettyID});
    }

    static async updateResponse(guildID, prettyID, text){
        let r = await Response.findOne({guildID: guildID, prettyID: prettyID});
        r.text = text;
        return await r.save();
    }
}