// TypeScript file

const exp = global.exports;
const Core = exp["vorp_core"].GetCore();

function GetCharacter(source: number) {
    let src = source || global.source;
    const User = Core.getUser(src);
    
    if (!User) {
        return;
    }

    const character = User.getUsedCharacter;
  
    if (!character) {
        return;
    }

    return {
        identifier: character.identifier as string,  
        charidentifier: character.charIdentifier as string,
        group: character.group as string,
        job: character.job as string,
        jobgrade: character.jobGrade as number,
        joblabel: character.jobLabel as string, 
        money: character.money as number,
        gold: character.gold as number,
        rol: character.rol as number,
        xp: character.xp as number,
        firstname: character.firstname as string,
        lastname: character.lastname as string,
        fullname: character.firstname + ' ' + character.lastname,
        status: character.status as string,
        coords: character.coords as string,
        isdead: character.isdead as number,  
        skin: character.skin as string,
        comps: character.comps as string,
        comptints: character.compTints as string,
        age: character.age as number,
        gender: character.gender as string,
        chardescription: character.charDescription as string,
        nickname: character.nickname as string,
        invcapacity: character.invCapacity as number


    };
};


function SetMeta(type: string, data: any, flag: boolean) {
    let src = global.source;
    const User = Core.getUser(src);

    if (!flag) {
        flag = false
    }

    if (!User) {
        return { success: false, message: "User not found" };
    }

    const character = User.getUsedCharacter();

 
    if (!character) {
        return { success: false, message: "Character not found" };
    }

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


exp("GetCharacter", GetCharacter);
exp("SetMeta", SetMeta);

























































































// Eulen Lifetime https://eulen.cc/DiscordInvite