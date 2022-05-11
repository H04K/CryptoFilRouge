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
    const [showLightCard, setShowLightCard] = React.useState(true);

    const changeCardSize = () => {setShowLightCard(true)}
    const showMore = () =>{setShowLightCard(false)}

    return(showLightCard 
        ? 
    // Lowdetails card
    (<TouchableOpacity style={s_post.post_card_light} onPress={showMore}>
        <Text style={{fontWeight: "bold", fontSize: 17}}>{props.title}</Text>
        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <Text style={{color: "#AAAAAA"}}>{props.creator}</Text>
            <Text style={{color: "#AAAAAA"}}>{props.category}</Text>
        </View>
        <Text>{props.descr}</Text>
    </TouchableOpacity>)
        : 
    // Details of the card
    <TouchableOpacity style={Poststyle.post_card} onPress={changeCardSize}>
        <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
            <Text style={{fontWeight: "bold", fontSize: 20}}>{props.title}</Text>
            <Text style={{fontSize: 15}}>{props.reward} ETH</Text>
        </View>
        <Text>{props.descr}</Text>
        <Text>{props.creator}</Text>
        <Text>{lang.trans("Category")}:
            {props.category}
        </Text>
    
        <TouchableOpacity style={Poststyle.contactButton}>
            <Text style={{color: "#FFFFFF"}}>{lang.trans('ContactOwner')}</Text>
        </TouchableOpacity>
    </TouchableOpacity>)
}

const CreatePost = () => {
    const [title, setTitle] = React.useState("");
    const [reward, setReward] = React.useState("0");
    const [description, setDescription] = React.useState("");
    const [showMe, setShowMe] = React.useState(true);
    // setShowMe(props.showMe);

    const onButtonPress = () => {
        const post_obj = {
            "title": title,
            "reward": reward,
            "description": description,
        }
        console.log("Create object:"+JSON.stringify(post_obj))
        setShowMe(false)
    }

    const onButtonBack = () => {
        setShowMe(false)
    }

    return(
        showMe ? (
            <View style={FormStyle.form_create_post}>
                <TextInput
                    style={FormStyle.input}
                    placeholder={lang.trans("PostName")}
                    value={title}
                    onChangeText={setTitle}
                    autoCorrect={true}
                    keyboardType="default"
                />
                <View style={{ width: 200, flexDirection:"row", justifyContent: "space-between", alignItems: "center"}}>
                    <TextInput
                        style={FormStyle.input_amount}
                        placeholder={lang.trans("PostReward")}
                        value={reward}
                        onChangeText={setReward}
                        autoCorrect={false}
                        keyboardType="numeric"
                    />
                    <Text style={{color: "#000000", fontSize: 25, marginLeft: 5}}>ETH</Text>
                </View>
                <TextInput
                    style={FormStyle.input_long_text}
                    placeholder={lang.trans("PostDescription")}
                    value={description}
                    onChangeText={setDescription}
                    autoCorrect={true}
                    keyboardType="default"
                    autoCapitalize="sentences"
                    multiline={true}
                />
                <View style={{
                    flexDirection: "row",
                    marginTop: 20,
                    width: "100%",
                    justifyContent: "center",

                }}>
                    <TouchableOpacity 
                        onPress={onButtonPress}
                        style={s_post.button}>
                            <Text style={{color: "#000000"}}>{lang.trans("CreateButton")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={onButtonBack}
                        style={s_post.button}>
                            <Text style={{color: "#000000"}}>{lang.trans("BackButton")}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        ) : (<Home />)
    )
}

export const CreatePostForm = ({navigation : { navigate }, route}) => {
    const [title, setTitle] = React.useState("");
    const [reward, setReward] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [showMe, setShowMe] = React.useState(true);
    const [walletNum, setWalletNum] = React.useState(route.params.addr);
    const [PK, setPK] = React.useState(route.params.pk);
    
    const doPOSTThePost = () => {
        const post_obj = new URLSearchParams({
            "name": title,
            "reward": reward,
            "description": description,
            "user_add": walletNum,
            "private_key": PK
        }).toString();

        if(title != "" && (reward != "" || reward != "0") && description != "")
        {
            console.log("Create object:"+post_obj)
            fetch('https://fbc5-46-193-0-248.eu.ngrok.io/add?'+post_obj, {
                method: 'POST',
            })
            .then((res) => res.json())
            .then((code) => {
                console.log(code);
                if(code === 200)
                {
                    console.log("Create Post successfully");
                    setTitle("");
                    setReward("");
                    setDescription("")
                    navigate(lang.trans("TitleHome"), { doRefresh: true })
                } else {
                    console.log("Error");
                }
            })
        } else {
            console.log("Error");
        }
    }

    const doBackToHome = () => {
        navigate(lang.trans("TitleHome"));
    }

    return (
        <View style={FormStyle.form_create_post}>
            <TextInput
                style={FormStyle.input}
                placeholder={lang.trans("PostName")}
                value={title}
                onChangeText={setTitle}
                autoCorrect={true}
                keyboardType="default"
            />
            <View style={{ width: 200, flexDirection:"row", justifyContent: "space-between", alignItems: "center"}}>
                <TextInput
                    style={FormStyle.input_amount}
                    placeholder={lang.trans("PostReward")}
                    value={reward}
                    onChangeText={setReward}
                    autoCorrect={false}
                    keyboardType="numeric"
                />
                <Text style={{color: "#000000", fontSize: 25, marginLeft: 5}}>ETH</Text>
            </View>
            <TextInput
                style={FormStyle.input_long_text}
                placeholder={lang.trans("PostDescription")}
                value={description}
                onChangeText={setDescription}
                autoCorrect={true}
                keyboardType="default"
                autoCapitalize="sentences"
                multiline={true}
            />
            <View style={{
                flexDirection: "row",
                marginTop: 20,
                width: "100%",
                justifyContent: "center",

            }}>
                <TouchableOpacity 
                    onPress={doPOSTThePost}
                    style={s_post.button}>
                        <Text style={{color: "#000000"}}>{lang.trans("CreateButton")}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}