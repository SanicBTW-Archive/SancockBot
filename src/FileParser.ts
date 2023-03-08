// Custom file parser following my custom option file code and modifying it with new syntax and shit

import fs from 'fs';
import { Globals } from './Globals';

export async function parseFile(pathArray:Array<string>):Promise<Array<object>>
{
    return new Promise((resolve, reject) =>
    {
        console.log("Parsing file");
        
        var returnObjects:Array<object> = [];
        var path = pathArray.join("/");
        if (!fs.existsSync(path))
            reject(`A module tried to get ${path} but it doesn't exist`);

        fs.readFile(path, {encoding: 'utf-8'}, (err, data) =>
        {
            if (err) reject(err);
            
            var fileLines:Array<string> = data.trim().split("\n");
            fileLines.forEach(async (line:string) =>
            {
                returnObjects.push(await parseObject(line));
            });
        });
        resolve(returnObjects);
    });
}

function parseObject(line:string):Promise<object>
{
    return new Promise((resolve, reject) =>
    {
        // - 1 to remove the ( / + 1 to get the full class "Funky()"
        var classType:string = line.substring(0, line.indexOf(")") - 1).trim();

        if (!Reflect.has(Globals, classType))
            reject(`Class ${classType} wasn't found on the Globals namespace`);

        var classInstance:object = Reflect.construct(Reflect.get(Globals, classType), []);

        var classFields:Array<string> = line.substring(line.indexOf("{") + 1, line.indexOf("}")).trim().split(",");
        classFields.forEach((field:string) => 
        {
            field = field.trim();
            // + 1 to remove the ( / leave alone to get the full field()
            var classFieldArguments:Array<string> = field.substring(field.indexOf("(") + 1, field.indexOf(")")).split("-");
            var classField:string = field.substring(0, field.lastIndexOf("("));

            if (!Reflect.has(classInstance, classField))
                reject(`Field ${classField} wasn't found on class ${classType}`);

            Reflect.set(classInstance, classField, classFieldArguments);
        });

        resolve(classInstance);
    });
}