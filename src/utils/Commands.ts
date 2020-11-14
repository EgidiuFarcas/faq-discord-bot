import Discord from 'discord.js';
import fs from 'fs';
import path from 'path';

export interface Command extends Object {
    name: string,
    execute: Function
}

const commandsPath: string = path.join(__dirname, '../commands');

export default function load(): Discord.Collection<string, Command>{
     let commands: Discord.Collection<string, Command> = new Discord.Collection();
     //Get all command files
     const commandFiles: string[] = fs.readdirSync(`${commandsPath}`).filter(file => !file.endsWith('.map'));
     //Setup Commands
     for(const file of commandFiles){
         let commandFile: any = require(`${commandsPath}/${file}`);
         let command: Command = commandFile.default;
         commands.set(command.name, command);
     }
     return commands;
}