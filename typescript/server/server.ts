// Import necessary functions and types
import { onClientCallback, triggerClientCallback } from '@overextended/ox_lib/server';

// Get core and library exports
const exp = global.exports;
const Core = exp["vorp_core"].GetCore();
const lib = exp["redux_lib"];
const Inv = exp["vorp_inventory"];

// Define types for better type-checking
type Character = {
    identifier: string;
    charIdentifier: string;
    group: string;
    job: string;
    jobGrade: number;
    jobLabel: string;
    money: number;
    gold: number;
    rol: number;
    xp: number;
    firstname: string;
    lastname: string;
    fullname: string;
    status: string;
    coords: string;
    isdead: number;
    skin: string;
    comps: string;
    compTints: string;
    age: number;
    gender: string;
    charDescription: string;
    nickname: string;
    invCapacity: number;
    getUsedCharacter: any; // Replace `any` with the actual type of `getUsedCharacter` if known
};

type User = {
    group: string;
    hours: number;
    source: number;
};

// Handle client callbacks
onClientCallback('redux_bridge:getCharacter', () => {
    let src = source || global.source as number;
    const data = GetCharacter(src);
    return data;
});

// Retrieve character data for a given source
function GetCharacter(source: number): Character | undefined {
    let src = source || global.source as number;
    const User = Core.getUser(src);
    if (!User) return;

    const character = User.getUsedCharacter;
    if (!character) return;

    return {
        identifier: character.identifier as string,
        charIdentifier: character.charIdentifier as string,
        group: character.group as string,
        job: character.job as string,
        jobGrade: character.jobGrade as number,
        jobLabel: character.jobLabel as string,
        money: character.money as number,
        gold: character.gold as number,
        rol: character.rol as number,
        xp: character.xp as number,
        firstname: character.firstname as string,
        lastname: character.lastname as string,
        fullname: `${character.firstname} ${character.lastname}`,
        status: character.status as string,
        coords: character.coords as string,
        isdead: character.isdead as number,
        skin: character.skin as string,
        comps: character.comps as string,
        compTints: character.compTints as string,
        age: character.age as number,
        gender: character.gender as string,
        charDescription: character.charDescription as string,
        nickname: character.nickname as string,
        invCapacity: character.invCapacity as number,
        getUsedCharacter: character
    };
}

// Retrieve user data for a given source
function GetUser(source: number): User | undefined {
    let src = source || global.source as number;
    const User = Core.getUser(src);
    if (!User) return;

    return {
        group: User.getGroup(),
        hours: User.hours,
        source: User.source
    };
}

// Set character metadata
function SetMeta(source: number, type: string, data: any, flag: boolean = false) {
    let src = source || global.source as number;
    const User = Core.getUser(src);
    if (!User) return { success: false, message: "User not found" };

    const character = User.getUsedCharacter;
    if (!character) return { success: false, message: "Character not found" };

    try {
        switch (type) {
            case "job":
                character.setJob(data, flag);
                break;
            case "jobgrade":
                character.setJobGrade(data, flag);
                break;
            case "joblabel":
                character.setJobLabel(data);
                break;
            case "group":
                character.setGroup(data, flag);
                break;
            case "rol":
                character.setRol(data);
                break;
            case "xp":
                character.setXp(data);
                break;
            case "firstname":
                character.setFirstname(data);
                break;
            case "lastname":
                character.setLastname(data);
                break;
            case "skin":
                character.updateSkin(data);
                break;
            case "comps":
                character.updateComps(data);
                break;
            case "comptints":
                character.updateCompTints(data);
                break;
            case "addCurrency":
                character.addCurrency(data.type, data.amount);
                break;
            case "removeCurrency":
                character.removeCurrency(data.type, data.amount);
                break;
            case "addXp":
                character.addXp(data);
                break;
            case "removeXp":
                character.removeXp(data);
                break;
            case "age":
                character.setAge(data);
                break;
            case "charDescription":
                character.setCharDescription(data);
                break;
            case "nickName":
                character.setNickName(data);
                break;
            case "gender":
                character.setGender(data);
                break;
            case "updateInvCapacity":
                character.updateInvCapacity(data);
                break;
            default:
                return { success: false, message: "Unknown type" };
        }

        return { success: true, message: "Character meta updated successfully" };
    } catch (error) {
        return { success: false, message: `Error updating character meta: ${error.message}` };
    }
}

// Set currency for a character
function SetCurrency(source: number, type: number, amount: number) {
    let src = source || global.source as number;
    const User = Core.getUser(src);
    const character = User.getUsedCharacter();
    character.addCurrency(type, amount);
    TriggerClientEvent('vorp:TipBottom', source, `Lisati raha summas: ${amount}$`, 9000);
}

// Remove item from a character's inventory
function RemoveItem(source: number, name: string, amount: number) {
    let src = source || global.source as number;
    const User = Core.getUser(src);
    const character = User.getUsedCharacter();
    // Implement item removal logic
    TriggerClientEvent('vorp:TipBottom', source, `Eemaldatud esemed: ${amount}`, 9000);
}

// Check if a character's job matches the required job
function CheckJob(source: number, required: string): boolean {
    let src = source || global.source as number;
    const User = Core.getUser(src);
    const character = User.getUsedCharacter();
    return character && character.job === required;
}

// Export functions for use in other parts of the system
exp("CheckJob", CheckJob);
exp("GetCharacter", GetCharacter);
exp("SetMeta", SetMeta);
exp("GetUser", GetUser);
exp("SetCurrency", SetCurrency);
exp("RemoveItem", RemoveItem);


RegisterCommand("datacheck", (source) =>  {
    let src = source || global.source as number;
    const data = GetCharacter(src);

    console.log(JSON.stringify(data))
}, false)
