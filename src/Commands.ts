import fs from 'fs';
import path from 'path';
import Discord from 'discord.js';
import { Globals } from './Globals';

export type Command =
{
    onMessage:(message:Discord.Message) => void,
    onReload:(path:string) => void
}

export async function reloadCommands():Promise<boolean>
{
    var commands = fs.readdirSync(path.join(Globals.basePath, "commands"), {encoding: 'utf-8'});
    return new Promise((resolve) =>
    {
        commands.forEach((fileName:string) =>
        {
            if (fileName.endsWith(".ts"))
            {
                var commandShit:Command = require(path.join(Globals.basePath, "commands", fileName));
                commandShit.onReload(Globals.basePath);
                if (!Globals.loadedCommands.includes(commandShit))
                    Globals.loadedCommands.push(commandShit);
            }
        });
        resolve(true);
    });
}