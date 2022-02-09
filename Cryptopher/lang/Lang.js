import en_US from "./en_US";
import fr_FR from "./fr_FR";

export default class Lang {
    constructor(lang) {
        this.language = lang;
    }

    trans(key) {
        if(this.language == "fr_FR" && key in fr_FR) {
            return fr_FR[key];
        } else if(this.language == "en_US" && key in en_US) {
            return en_US[key];
        }
        else return key;
    }
}
