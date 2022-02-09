import React from "react";
import { View, Text, NativeModules } from "react-native";
import MainStyle from "../assets/style/Mainstyle";
const s_main = MainStyle;
// Get the lang
import Lang from "../lang/Lang";
const sysOs = Platform.OS; // ('android', 'ios')
let locale = ""
if(Platform.OS == "android") {
    locale = NativeModules.I18nManager.localeIdentifier; // "fr_FR"
} else if (Platform.OS == "ios") {
    locale = NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0]; // "fr_FR"
}
const lang = new Lang(locale);

const Home = () => {
    return (
        <View style={s_main.container}>
        </View>
    );
}

export default Home;