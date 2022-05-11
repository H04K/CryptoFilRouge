import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome } from "@expo/vector-icons";
import { NativeModules, TouchableOpacity, Text, View } from "react-native";

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
import { ProfileForm} from "../components/Connect";
import { CreatePostForm } from "../components/Posts"
import MainStyle from "../assets/style/MainStyle";
import Poststyle from "../assets/style/Poststyle";

const Tabs = (props) => {
    const [isConnected, setIsConnected] = useState(props.isConnected);

    return (
        isConnected ?
        (
            <Tab.Navigator>
                <Tab.Screen name={lang.trans("TitleHome")} component={ Home }
                    initialParams={{ addr:props.adress }}
                    options={{
                        tabBarIcon: ({color, size }) => (
                            <FontAwesome name="home" color={color} size={26} />
                            )
                        }}/>
                <Tab.Screen name={lang.trans("NewPost")} component={ CreatePostForm }
                    initialParams={{ addr:props.adress, pk:props.private_key }}
                    options={{
                        headerTitle: lang.trans("NewPost"),
                        tabBarIcon: ({color, size}) => (
                            <FontAwesome name="plus-circle" color={color} size={26} />
                        ),
                    }}
                />
                <Tab.Screen name={lang.trans("TitleChats")} component={ Chats }
                    initialParams={{ roomKey: ""}}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({color, size}) => (
                            <FontAwesome name="comment" color={color} size={26} />
                        )
                    }}/>
                {/* <Tab.Screen name={lang.trans("TitleProfile")} component={ Profile }
                    options={{
                        tabBarIcon: ({color, size }) => (
                            <FontAwesome name="user" color={color} size={26} />
                        )
                    }}/> */}
            </Tab.Navigator>
        ) : (
        <Tab.Navigator>
            <Tab.Screen name="first" component={ ProfileForm }/>
       </Tab.Navigator>)
    )
}

export default Tabs;