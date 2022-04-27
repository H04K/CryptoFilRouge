import React, { useCallback, useState } from "react";
import "../shim.js";
import { AppRegistry, View, TextInput, NativeModules, ScrollView, Text, TouchableOpacity } from "react-native";
import { GetRequest } from "../routes/Requests.js";
const Req = new GetRequest();
import MainStyle from "../assets/style/Mainstyle";
import Poststyle from "../assets/style/Poststyle";
import { FormStyle } from "../assets/style/FormStyle.js";
import HomeStyle from "../assets/style/HomeStyle";
AppRegistry.registerComponent('x', () => self);
const s_main = MainStyle;
const s_post = Poststyle;
const s_form = FormStyle;
const s_home = HomeStyle;
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

// components
import Category from "./Categories";
import { Post, PostLight } from "./Posts";

let dump_posts = [
    {
        "key": 1,
        "creator": "Charlie Chaplin",
        "category": "Music",
        "price": "2eth",
        "title": "Les temps modernes",
        "description": "Toute musique avec le style moderne",
    },
    {
        "key": 2,
        "creator": "John Cena",
        "category": "Code",
        "price": "1btc",
        "title": "DevWeb pour site vitrine",
        "description": "Je ne fais que des sites vitrines avec interface d'administration",
    },   
]

let dump_categories = [
    {
        "id": 1,
        "bg_pic": { uri: "https://swiftlet.co.th/wp-content/uploads/2020/01/Software-Developer.jpg" },
        "name": "CodeCategory",
        "nb_posts": 55
    },
    {
        "id": 2,
        "bg_pic": { uri: "https://st3.depositphotos.com/1594308/13059/i/950/depositphotos_130595544-stock-photo-musician-playing-the-guitar-in.jpg" },
        "name": "MusicCategory",
        "nb_posts": 300
    },
    {
        "id": 3,
        "bg_pic": { uri: "https://www.fotoartgeist.pl/ebaytemp/malowanki/n-A-0214-d-e/n-A-0214-d-e-w2.jpg" },
        "name": "PaintCategory",
        "nb_posts": 4000
    }
    
]

let user_posts = [
    {
        "key": 1,
        "creator": "Kebabz",
        "category": "Music",
        "price": "2eth",
        "title": "Hard Bass",
        "description": "Grosse hard bass sa mère",
    },
    {
        "key": 2,
        "creator": "Kebabz",
        "category": "Music",
        "price": "1btc",
        "title": "Un peu de jazz",
        "description": "essentiellement du saxophone",
    },
]

const Home = () => {
    const [search, setSearch] = useState("");
    const [posts, setPosts] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);

    const onChangeTxt = useCallback((txt) => {
        setSearch(txt);
    });
    // const potes = "";
    // const ers = Req.getPosts().then((res)=>{
    //     // console.log(res);
    //     setPosts(res);
    // });

    return (
        showCreateForm ? (
            <CreatePost/>
        ) : (
            <View style={s_main.main}>
                <View style={s_form.searchbar_view}>
                    <TextInput 
                        style={s_form.searchbar}
                        placeholder={lang.trans("SearchBarPlaceHolder")}
                        onChangeText={onChangeTxt}
                    />
                </View>
                <ScrollView>
                    <View style={{alignItems: "center"}}>
                        {
                        search === "" ? dump_posts.map((pst) => {
                            return (
                                <PostLight
                                    key={pst.key}
                                    creator={pst.creator}
                                    category={pst.category}
                                    title={pst.title}
                                    descr={pst.description}
                                />
                            )
                        }) : dump_posts.map((pst) => {
                            let res = <Text></Text>;
                            let title = pst.title.toLowerCase();
                            title.includes(search.toLowerCase()) ? res = <PostLight
                            key={pst.key}
                            creator={pst.creator}
                            category={pst.category}
                            title={pst.title}
                            descr={pst.description}
                        /> : res = <View></View>
                            return res;
                        })
                    }
                    </View>
                </ScrollView>
                {/* <TouchableOpacity style={s_home.plus_button} onPress={() => navigate(lang.trans("TitleCreatePost"))}> */}
                <TouchableOpacity style={s_home.plus_button} onPress={() => setShowCreateForm(true)}>
                    <Text style={s_home.plus_button_text}>+</Text>
                </TouchableOpacity>
            </View>
        )

    );
}

export default Home;

const CreatePost = ( props ) => {
    const [title, setTitle] = React.useState("");
    const [reward, setReward] = React.useState("0");
    const [description, setDescription] = React.useState("");
    const [showMe, setShowMe] = React.useState(true);
    // setShowMe(props.showMe);

    const onBackPress = () => {
        if (isSelectionModeEnabled()) {
            disableSelectionMode();
            return true;
        } else {
            return false;
        }
    };

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