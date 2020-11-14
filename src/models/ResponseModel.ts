import Response, { IResponse } from '../database/ResponseSchema';
import Question from '../database/QuestionSchema';

export default class ResponseModel {

    static async create(guildID: string, text: string): Promise<string>{
        let r = new Response({
            text: text,
            guildID: guildID
        });
        await r.save();
        return r.prettyID;
    }

    static async exists(guildID: string, prettyID: string): Promise<boolean>{
        let r = await Response.exists({
            guildID: guildID,
            prettyID: prettyID
        });
        return r;
    }

    static async getAll(guildID: string, populate: boolean = true): Promise<IResponse[]>{
        if(populate) return await Response.find({guildID: guildID}).populate('questions');
        else return await Response.find({guildID: guildID});
    }

    static async find(guildID: string, responsePrettyID: string): Promise<IResponse>{
        return await Response.findOne({guildID: guildID, prettyID: responsePrettyID}).populate('questions');
    }

    static async remove(guildID: string, responsePrettyID: string): Promise<boolean> {
        try{
            let r = await Response.findOne({guildID: guildID, prettyID: responsePrettyID});
            r.questions.forEach((question: any) => Question.findByIdAndDelete(question._id));
            r.deleteOne();
        }catch(err){
            console.error(err);
            return false;
        }
        return true;
    }

    static async update(guildID: string, prettyID: string, text: string): Promise<IResponse>{
        let r = await Response.findOne({guildID: guildID, prettyID: prettyID});
        r.text = text;
        return await r.save();
    }
}