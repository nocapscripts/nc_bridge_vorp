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
    //console.log(JSON.stringify(character))
    // Ensure that `character` exists before attempting to access its properties
    if (!character) {
        return;
    }

    return {
        identifier: character.identifier as string,  // Fixed typo from `idenfifier` to `identifier`
        charidentifier: character.charIdentifier as string,
        group: character.group as string,
        job: character.job as string,
        jobgrade: character.jobGrade as number,
        joblabel: character.jobLabel as string,  // Fixed property access (removed `character.` prefix)
        money: character.money as number,
        gold: character.gold as number,
        rol: character.rol as number,
        xp: character.xp as number,
        firstname: character.firstname as string,
        lastname: character.lastname as string,
        fullname: character.firstname + ' ' + character.lastname,
        status: character.status as string,
        coords: character.coords as string,
        isdead: character.isdead as number,  // Fixed property name from `character.isdead` to `isdead`
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

    // Ensure that `character` exists before attempting to access its properties
    if (!character) {
        return { success: false, message: "Character not found" };
    }

    try {
        // Perform different operations based on the `type` parameter
        switch (type) {
            case "job":
                character.setJob(data, flag); // `data` should be the job name
                break;
            case "jobgrade":
                character.setJobGrade(data, flag); // `data` should be the job grade
                break;
            case "joblabel":
                character.setJobLabel(data); // `data` should be the job label
                break;
            case "group":
                character.setGroup(data, flag); // `data` should be the group name
                break;
            case "rol":
                character.setRol(data); // `data` should be the role amount
                break;
            case "xp":
                character.setXp(data); // `data` should be the experience points
                break;
            case "firstname":
                character.setFirstname(data); // `data` should be the first name
                break;
            case "lastname":
                character.setLastname(data); // `data` should be the last name
                break;
            case "skin":
                character.updateSkin(data); // `data` should be the skin info
                break;
            case "comps":
                character.updateComps(data); // `data` should be the components info
                break;
            case "comptints":
                character.updateCompTints(data); // `data` should be the component tints info
                break;
            case "addCurrency":
                character.addCurrency(data.type, data.amount); // `data` should be an object with type and amount
                break;
            case "removeCurrency":
                character.removeCurrency(data.type, data.amount); // `data` should be an object with type and amount
                break;
            case "addXp":
                character.addXp(data); // `data` should be the XP amount
                break;
            case "removeXp":
                character.removeXp(data); // `data` should be the XP amount
                break;
            case "age":
                character.setAge(data); // `data` should be the age
                break;
            case "charDescription":
                character.setCharDescription(data); // `data` should be the character description
                break;
            case "nickName":
                character.setNickName(data); // `data` should be the nickname
                break;
            case "gender":
                character.setGender(data); // `data` should be the gender
                break;
            case "updateInvCapacity":
                character.updateInvCapacity(data); // `data` should be the amount to change the inventory capacity
                break;
            default:
                return { success: false, message: "Unknown type" };
        }

        return { success: true, message: "Character meta updated successfully" };
    } catch (error) {
        return { success: false, message: `Error updating character meta: ${error.message}` };
    }
}

// Expose the SetMeta function to be used by other scripts




// Expose the GetCharacter function to be used by other scripts
exp("GetCharacter", GetCharacter);
exp("SetMeta", SetMeta);