// import { useBackHandler } from "react-native-community/hooks";
import React from "react";
import { View, Text, TextInput, NativeModules, TouchableOpacity } from "react-native";
import { FormStyle, FormStyleDark } from "../assets/style/FormStyle";
import Poststyle from "../assets/style/Poststyle";


// Get the lang
import Lang from "../lang/Lang";
// import Home from "./Home";
const sysOs = Platform.OS; // ('android', 'ios')
let locale = ""
if(sysOs == "android") {
    locale = NativeModules.I18nManager.localeIdentifier; // "fr_FR"
} else if (sysOs == "ios") {
    locale = NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0]; // "fr_FR"
}
const lang = new Lang(locale);

const s_post = Poststyle;
const s_form = FormStyle;

export const Post = (props) => {
    return(
        <View style={s_post.post_card}>
            <Text>{props.creator}</Text>
            <Text>{props.category}</Text>
            <Text>{props.title}</Text>
            <Text>{props.descr}</Text>
        </View>
    );
}

export const PostLight = (props) => {
    return(
        <View style={s_post.post_card_light}>
            <Text style={{fontWeight: "bold", fontSize: 17}}>{props.title}</Text>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <Text style={{color: "#AAAAAA"}}>{props.creator}</Text>
                <Text style={{color: "#AAAAAA"}}>{props.category}</Text>
            </View>
            <Text>{props.descr}</Text>
        </View>
    );
}
