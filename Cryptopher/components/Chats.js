import React from "react";
import { NativeModules, Text, View } from "react-native";

// Get the lang
import Lang from "../lang/Lang";
const sysOs = Platform.OS; // ('android', 'ios')
let locale = ""
if(sysOs == "android") {
    locale = NativeModules.I18nManager.localeIdentifier; // "fr_FR"
} else if (sysOs == "ios") {
    locale = NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0]; // "fr_FR"
}
const lang = new Lang(locale);


const Chats = () => {
    return (
        <View>
            {/* <Text>{lang.trans('PageChats')}</Text> */}
        </View>
    )
}

export default Chats;