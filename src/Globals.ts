import path from 'path';
import {Command} from './Commands';


export namespace Globals
{
    // it was originally in funny commands but moved it in here to be able to parse the file correctly
    export class Funky
    {
        public messages:Array<string> = [];
        public answers:Array<string> = [];
    }

    export const basePath = path.join(__dirname, "..");
    export const loadedCommands:Array<Command> = [];
}