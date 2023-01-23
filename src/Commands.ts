import fs from 'fs';
import path from 'path';
import Discord from 'discord.js';
import { Globals } from './Globals';

export type Command =
{
    onMessage:(message:Discord.Message) => void,
    onReload:(path:String) => void
}

export function reloadCommands()
{
    var commands = fs.readdirSync(path.join(Globals.basePath, "commands"), {encoding: 'utf-8'});
    for (var i in commands)
    {
        if (commands[i].endsWith(".ts"))
        {
            var commandShit:Command = require(path.join(Globals.basePath, "commands", commands[i]));
            commandShit.onReload(Globals.basePath);
            if (!Globals.loadedCommands.includes(commandShit))
                Globals.loadedCommands.push(commandShit);
        }
    }
}