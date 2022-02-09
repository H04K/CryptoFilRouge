import fr_FR from "./fr_FR";

export default class Lang {
    constructor(lang) {
        this.language = lang;
    }

    trans(key) {
        if(this.language == "fr_FR") {
            return fr_FR[key];
        } else {
        return key;
        }
    }
}
