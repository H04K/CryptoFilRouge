import React from "react";
import { View, Text, NativeModules, Platform, TouchableOpacity } from "react-native";
import MainStyle from "../assets/style/MainStyle";
import { LoginForm, CreateForm } from "./Connect";
const s_main = MainStyle;
// Get the lang
import Lang from "../lang/Lang";
import Poststyle from "../assets/style/Poststyle";
const sysOs = Platform.OS; // ('android', 'ios')
let locale = ""
if(sysOs == "android") {
    locale = NativeModules.I18nManager.localeIdentifier; // "fr_FR"
} else if (sysOs == "ios") {
    locale = NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0]; // "fr_FR"
}
const lang = new Lang(locale);

const Profile = () => {
    const [createform, setCreateForm] = React.useState(false);
    const [loginform, setLoginForm] = React.useState(false);

    const createPress = () => {
        console.log("create")
        setCreateForm(true);
    }

    const loginPress = () => {
        console.log("Login")
        setLoginForm(true)
    }

    return (
        createform ? (<CreateForm />) : (loginform ? (<LoginForm />) : (  
                <View style={s_main.container}>
                    <TouchableOpacity style={Poststyle.BigButton} onPress={loginPress}>
                        <Text style={{fontSize: 20, fontWeight: "bold", color: "#000000"}}>{lang.trans("LoginTitle")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Poststyle.BigButton} onPress={createPress}>
                        <Text style={{fontSize: 20, fontWeight: "bold", color:"#FFFFFF"}}>{lang.trans("CreateTitle")}</Text>
                    </TouchableOpacity>
                </View>
            ))
    );
}

export default Profile;

export const ProfileForm = (props) => {
    const [createform, setCreateForm] = React.useState(false);
    const [loginform, setLoginForm] = React.useState(false);

    const createPress = () => {
        console.log("create")
        setCreateForm(true);
    }

    const loginPress = () => {
        console.log("Login");
        setLoginForm(true);
    }

    return (
        createform ? (<CreateForm />) : (loginform ? (<LoginForm />) : (  
                <View style={s_main.container}>
                    <TouchableOpacity style={Poststyle.BigButton} onPress={loginPress}>
                        <Text style={{fontSize: 20, fontWeight: "bold", color: "#000000"}}>{lang.trans("LoginTitle")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Poststyle.BigButton} onPress={createPress}>
                        <Text style={{fontSize: 20, fontWeight: "bold", color:"#FFFFFF"}}>{lang.trans("CreateTitle")}</Text>
                    </TouchableOpacity>
                </View>
            ))
    );
}