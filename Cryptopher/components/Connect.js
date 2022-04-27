import React, { useCallback } from "react";
import { NativeModules, View, Button, Linking, TouchableOpacity, Text, TextInput, Pressable, KeyboardAvoidingView } from "react-native";
// import WalletConnectProvider from '@walletconnect/react-native-dapp';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FormStyle } from "../assets/style/FormStyle";
import MainStyle from "../assets/style/Mainstyle";
import Poststyle from "../assets/style/Poststyle";

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

const CreateForm = (props) => {
    const [walletNum, onChangeWalletNum] = React.useState(null);
    const [pKey, onChangePKey] = React.useState(null);
    const [pwd, onChangePwd] = React.useState(null);
    const [showLogin, setShowLogin] = React.useState(false);

    const onButtonPress = () => {
        console.log("cc");
    }
    const backToLogin = () => {
        setShowLogin(true)
    }

    return (
        showLogin ? <LoginForm /> : 
            <View style={FormStyle.globalForm}>
                <Text style={{fontSize: 30, fontWeight: "bold"}}>{lang.trans("CreateTitle")}</Text>
                <View style={FormStyle.form}>
                    <TextInput
                        style={FormStyle.input}
                        placeholder={lang.trans("WalletNumber")}
                        value={walletNum}
                        onChangeText={onChangeWalletNum}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="default"
                        returnKeyType="next"
                    />
                    <TextInput
                        style={FormStyle.input}
                        placeholder={lang.trans("PrivateKey")}
                        value={pKey}
                        onChangeText={onChangePKey}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="default"
                        returnKeyType="next"
                    />
                    <TextInput
                        style={FormStyle.input}
                        placeholder={lang.trans("Password")}
                        value={pwd}
                        onChangeText={onChangePwd}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="default"
                        returnKeyType="send"
                        secureTextEntry={true}
                    />
                    <View style={FormStyle.formButtonsView}>
                        <TouchableOpacity 
                            style={Poststyle.button}
                            onPress={onButtonPress}>
                                <Text>{lang.trans("Create")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={Poststyle.button}
                            onPress={backToLogin}>
                                <Text>{lang.trans("PreferLogin")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
    )
}

const LoginForm = (props) => {
    const [walletNum, onChangeWalletNum] = React.useState(null);
    const [pKey, onChangePKey] = React.useState(null);
    const [pwd, onChangePwd] = React.useState(null);
    const [showCreate, setShowCreate] = React.useState(false);

    const onButtonPress = () => {
        /*
            /////////////////////////
            {
                "adress" :"0x657a88388ce514e7F16E3227db525f8cA14fDf22",
                "private_key" :"1e29503f7ad9f86e9ebc0435b3a11a038810c91b74437a918da918d727921adf",
                "password" : "JeFaisUnTestLol"
            }
            ///////////////////////////
        */

        const params = new URLSearchParams({
            adress: walletNum,
            private_key: pKey,
            password: pwd,
        }).toString();
        
        //console.log("inputs:"+JSON.stringify({wn: walletNum, pk: pKey, passwd: pwd}));
        console.log("inputs:"+params);
        fetch('http://10.33.0.36:8000/login?'+params, {
            method: 'POST',
        });
    }

    const backToCreate = () => {
        setShowCreate(true)
    }

    return (
        showCreate ? <CreateForm/> :
        <View style={FormStyle.globalForm}>
            <Text style={{fontSize: 30, fontWeight: "bold"}}>{lang.trans("Login")}</Text>
            <View style={FormStyle.form}>
                <TextInput
                    style={FormStyle.input}
                    placeholder={lang.trans("WalletNumber")}
                    value={walletNum}
                    onChangeText={onChangeWalletNum}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="default"
                    returnKeyType="next"
                />
                <TextInput
                    style={FormStyle.input}
                    placeholder={lang.trans("PrivateKey")}
                    value={pKey}
                    onChangeText={onChangePKey}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="default"
                    returnKeyType="next"
                />
                <TextInput
                    style={FormStyle.input}
                    placeholder={lang.trans("Password")}
                    value={pwd}
                    onChangeText={onChangePwd}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="default"
                    returnKeyType="send"
                    secureTextEntry={true}
                />
                <View style={FormStyle.formButtonsView}>
                    <TouchableOpacity 
                            style={Poststyle.button}
                            onPress={onButtonPress}>
                            <Text>{lang.trans("Login")}</Text>
                        </TouchableOpacity>
                    <TouchableOpacity 
                            style={Poststyle.button}
                            onPress={backToCreate}>
                            <Text>{lang.trans("PreferCreate")}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export {LoginForm, CreateForm};