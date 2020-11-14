import Response, { IResponse } from '../database/ResponseSchema';
import Shortcut, { IShortcut } from '../database/ShortcutSchema';

export default class ShortcutModel {

    static async create(guildID: string, text: string, responsePrettyID: string): Promise<IResponse>{
        let r = await Response.findOne({guildID: guildID, prettyID: responsePrettyID});
        let s = new Shortcut({
            text: text,
            guildID: guildID,
            owner: r._id
        });
        await s.save();
        r.shortcuts.push(s._id);
        await r.save();
        return r;
    }

    static async exists(guildID: string, prettyID: string): Promise<boolean>{
        let r = await Shortcut.exists({
            guildID: guildID,
            prettyID: prettyID
        });
        return r;
    }

    static async getAll(guildID: string): Promise<IShortcut[]>{
        return await Shortcut.find({guildID: guildID, owner: {$ne: null}}).populate('owner');
    }

    static async remove(guildID: string, shortcutPrettyID: string): Promise<boolean>{
        try{
            await Shortcut.findOneAndDelete({guildID: guildID, prettyID: shortcutPrettyID});
        }catch(err){
            console.error(err);
            return false;
        }
        return true;
    }

}