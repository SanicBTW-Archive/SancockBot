import fs from 'fs';
import Path from 'path';
import { basePath } from './Globals';

// make user config too???

export function initConfig()
{
    Config.token = fs.readFileSync(Path.join(basePath, "data", "token"), { encoding: "utf-8" }); // init the token lol

    var jsonFile = JSON.parse(fs.readFileSync(Path.join(basePath, "data", "Config.json"), { encoding: "utf-8" }));
    for (var jsonProp in jsonFile)
    {
        Reflect.set(Config, jsonProp, jsonFile[jsonProp]);
    }
}

export class Config
{
    public static token:string = "";
    public static defaultPrefix:string = "";
    public static presence:string = "";
    public static saveMessageLogs:boolean = false;
    public static saveEditedMessages:boolean = false;
    public static saveDeletedMessages:boolean = false;
    public static adminIDS:Array<number> = [];
}