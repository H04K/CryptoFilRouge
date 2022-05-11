import React, { useCallback, useEffect } from "react";
import "../shim.js";
import { AppRegistry, View, TextInput, NativeModules, ScrollView, Text, TouchableOpacity } from "react-native";
import { GetRequest } from "../routes/Requests.js";
import { NavigationContainer } from "@react-navigation/native";
const Req = new GetRequest();
import MainStyle from "../assets/style/MainStyle";
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

// dump values
let dump_posts = [
    {
        "key": 1,
        "creator": "Charlie Chaplin",
        "category": "Music",
        "reward": 2,
        "title": "Les temps modernes",
        "description": "Toute musique avec le style moderne",
    },
    {
        "key": 2,
        "creator": "John Cena",
        "category": "Code",
        "reward": 1,
        "title": "DevWeb pour site vitrine",
        "description": "Je ne fais que des sites vitrines avec interface d'administration",
    },   
]

const Home = ({ navigation, route }) => {
    const [search, setSearch] = React.useState("");
    const [posts, setPosts] = React.useState([]);
    const [wallNum, setWallNum] = React.useState(route.params.addr);
    const [doRefresh, setDoRefresh] = React.useState(route.params.doRefresh);

    // TODO /posts
    const getPosts = () => {
        fetch("https://fbc5-46-193-0-248.eu.ngrok.io/getOffers?user_add="+wallNum)
        .then((res) => res.json())
        .then((json) => {
            setPosts(json);
            console.log(json);
            
        })
    }
    
    if(doRefresh == true) {
        getPosts();
        setDoRefresh(false);
    }

    useEffect(() => {
        getPosts();
    }, [])
    
    const doSearch = useCallback((txt) => {
        // TODO /posts?search=elementtosearch
        setSearch(txt);
    });
    // const potes = "";
    // const ers = Req.getPosts().then((res)=>{
    //     // console.log(res);
    //     setPosts(res);
    // });

    const PostCard = (pst) => {
        const [showLightCard, setShowLightCard] = React.useState(true);
        const changeCardSize = () => {setShowLightCard(!showLightCard)};
        return(
            showLightCard 
                ? 
            // Lowdetails card
            (<TouchableOpacity style={s_post.post_card_light} onPress={changeCardSize} key={pst.key} activeOpacity={1}>
                <Text style={{fontWeight: "bold", fontSize: 17}}>{pst.title}</Text>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={{color: "#AAAAAA"}}>{pst.creator}</Text>
                    <Text style={{color: "#AAAAAA"}}>{pst.category}</Text>
                </View>
                <Text>{pst.description}</Text>
            </TouchableOpacity>)
            :
            // Details of the card
            (<TouchableOpacity style={Poststyle.post_card} onPress={changeCardSize} key={pst.key} activeOpacity={1}>
                <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                    <Text style={{fontWeight: "bold", fontSize: 20}}>{pst.title}</Text>
                    <Text style={{fontSize: 15}}>{pst.reward} ETH</Text>
                </View>
                <Text>{pst.description}</Text>
                <Text></Text>
                {/* <Text>{pst.creator}</Text> */}
                <Text></Text>
                {/* <Text>{lang.trans("Category")}:
                    {pst.category}
                </Text> */}
            
                <TouchableOpacity 
                    onPress={() => navigation.navigate(lang.trans("TitleChats"), { chatTo: pst.creator, user: route.params.addr, roomKey: pst.key, roomTitle: pst.title })}
                    style={Poststyle.contactButton}>
                    <Text style={{color: "#FFFFFF"}}>{lang.trans('ContactOwner')}</Text>
                </TouchableOpacity>
            </TouchableOpacity>)
        );
    }

    return (
        <View style={s_main.main}>
            <View style={s_form.searchbar_view}>
                <TextInput 
                    style={s_form.searchbar}
                    placeholder={lang.trans("SearchBarPlaceHolder")}
                    TODO onChangeText={doSearch}
                />
            </View>
            <ScrollView>
                <View style={{alignItems: "center"}}>
                {
                    search === "" ?
                        posts.map((post) => {
                            return(<PostCard
                            key={post.id}
                            title={post.name}
                            creator={post.adress_vendeur}
                            category=""
                            description={post.description}
                            reward={post.reward}
                            />)
                        }) : posts.map((post) => {
                            let res = <View></View>;
                            const title = post.name.toLowerCase();
                            title.includes(search.toLowerCase()) ? res = (<PostCard
                            key={post.id}
                            title={post.name}
                            creator={post.adress_vendeur}
                            category=""
                            description={post.description}
                            reward={post.reward}
                            />) : res = <View></View>;
                            return res;
                        })
                }
                </View>
            </ScrollView>
        </View>
    );
}

export default Home;
