import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome } from "@expo/vector-icons";
import { NativeModules, Button } from "react-native";
import { MainStyle } from '../assets/style/Mainstyle';

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

// components
import Home from "../components/Home";
import Profile from "../components/Profile";
import Chats from "../components/Chats";
import { CreatePost } from "../components/Posts";

const Tabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name={lang.trans("TitleHome")} component={ Home }
                options={{
                    tabBarIcon: ({color, size }) => (
                        <FontAwesome name="home" color={color} size={26} />
                        )
                    }}/>
            {/* <Tab.Screen 
                name={(lang.trans("TitleCreatePost"))} 
                component= { CreatePost }
            /> */}
            {/* <Tab.Screen name={lang.trans("TitleChats")} component={ Chats }
                options={{
                    tabBarIcon: ({color, size}) => (
                        <FontAwesome name="comment" color={color} size={26} />
                    )
                }}/> */}
            <Tab.Screen name={lang.trans("TitleProfile")} component={ Profile }
                options={{
                    tabBarIcon: ({color, size }) => (
                        <FontAwesome name="user" color={color} size={26} />
                    )
                }}/>
        </Tab.Navigator>
    );
}

export default Tabs;