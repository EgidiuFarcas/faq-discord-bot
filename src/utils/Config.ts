import fs from 'fs';
import path from 'path';

const configPath = path.join(__dirname, '../../config.json');

export interface GuildConfig {
    id: string,
    prefix: string,
    channels: string[]
}

export default class Config {
    static config = JSON.parse(fs.readFileSync(configPath).toString());

    static getChannels(guildID: string){
        let guild = this.config.guilds.find((guild: GuildConfig) => guild.id === guildID);
        return guild.channels;
    }

    static async changePrefix(guildID: string, prefix: string){
        let guild = this.config.guilds.find((guild: GuildConfig) => guild.id === guildID);
        guild.prefix = prefix;
        this.writeConfigAndReload();
    }

    static async addChannels(guildID: string, channelIDs: string[]){
        let guild = this.config.guilds.find((guild: GuildConfig) => guild.id === guildID);
        channelIDs.forEach(id => {
            let exists = guild.channels.find((ch: string) => ch === id);
            if(exists === undefined){
                guild.channels.push(id);
            }
        });
        this.writeConfigAndReload();
    }

    static async removeChannels(guildID: string, channelIDs: string[]){
        let guild = this.config.guilds.find((guild: GuildConfig) => guild.id === guildID);
        channelIDs.forEach(id => {
            guild.channels = guild.channels.filter((ch: string) => ch !== id);
        });
        this.writeConfigAndReload();
    }

    static getGuildPrefix(guildID: string){
        let guild = this.config.guilds.find((guild: GuildConfig) => guild.id === guildID);
        return guild.prefix;
    }

    static async addGuild(guildID: string, defaultPrefix: string){
        let exists = this.config.guilds.find((guild: GuildConfig) => guild.id === guildID);
        if(exists !== undefined) return;
        this.config.guilds.push({
            id: guildID,
            prefix: defaultPrefix,
            channels: []
        });
        this.writeConfigAndReload();
    }

    static async removeGuild(guildID: string){
        this.config.guilds = this.config.guilds.filter((guild: GuildConfig) => guild.id !== guildID);
        this.writeConfigAndReload();
    }

    static async writeConfigAndReload(){
        fs.writeFile(configPath, JSON.stringify(this.config, null, 4),
            (err) => {
                if(err){
                    console.error(err);
                }
                this.config = JSON.parse(fs.readFileSync(configPath).toString());
            }
        );
    }
}