import fs from 'fs';
import path from 'path';
import { basePath, commandsMap } from './Globals';

type Command =
{
    onMessage:string, //onMessage:() => void
    reply:string
}

export function reloadCommands()
{
    var commands = fs.readdirSync(path.join(basePath, "commands"), {encoding: 'utf-8'});
    for (var i in commands)
    {
        var fileDetails:Command = JSON.parse(fs.readFileSync(path.join(basePath, "commands", commands[i]), {encoding: 'utf-8'}));
        if (!commandsMap.has(fileDetails.onMessage))
            commandsMap.set(fileDetails.onMessage, fileDetails.reply);
    }
}