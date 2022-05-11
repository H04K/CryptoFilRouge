import React, { useEffect } from "react";
import { NativeModules, Text, View, ScrollView, TouchableOpacity, TextInput } from "react-native";
import ChatStyle from "../assets/style/ChatStyle";
import { getHeaderStyle, HeaderBackButton } from "@react-navigation/elements"

// Get the lang
import Lang from "../lang/Lang";
import { Ionicons } from "@expo/vector-icons";
const sysOs = Platform.OS; // ('android', 'ios')
let locale = ""
if(sysOs == "android") {
    locale = NativeModules.I18nManager.localeIdentifier; // "fr_FR"
} else if (sysOs == "ios") {
    locale = NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0]; // "fr_FR"
}
const lang = new Lang(locale);


const tmp_rooms_tchat = [
    {
        key: 1,
        title: "Chalie Chaplin - Les temps modernes",
        msgUnread: 3,
        LastMsg50: [
            {
                from: "You",
                to: "Charlie Chaplin",
                when: "2021-06-01T07:38:55Z",
                msg: "Bonjour, je suis interressé par votre offre.",
            },
            {
                from: "Charlie Chaplin",
                to: "You",
                when: "2021-06-01T11:01:49Z",
                msg: "Bonjour, oui très bien, avez-vous une maquette ?",
            },
            {
                from: "You",
                to: "Charlie Chaplin",
                when: "2021-06-01T11:27:03Z",
                msg: "Non pas encore mais vous pourrez retrouver des exemples de mon travaille sur youtube",
            },
            {
                from: "Charlie Chaplin",
                to: "You",
                when: "2021-06-01T16:08:21Z",
                msg: "Très bien je vais regarder ça",
            },
            {
                from: "Charlie Chaplin",
                to: "You",
                when: "2021-06-01T18:37:16Z",
                msg: "En effet, j'aime votre travail, pouvez-vous me parler de votre idée sur mon offre ?",
            },
            {
                from: "Charlie Chaplin",
                to: "You",
                when: "2021-06-01T16:08:21Z",
                msg: "Très bien je vais regarder ça",
            },
            {
                from: "Charlie Chaplin",
                to: "You",
                when: "2021-06-01T18:37:16Z",
                msg: "En effet, j'aime votre travail, pouvez-vous me parler de votre idée sur mon offre ?",
            },
        ],
    },
    {
        key: 2,
        title: "John Cena - DevWeb pour site vitrine",
        msgUnread: 0,
        LastMsg50: [
            {
                from: "You",
                to: "Charlie Chaplin",
                when: "2021-06-01T18:37:16Z",
                msg: "Bonjour, je suis interressé par votre offre.",
            },
        ],
    }
]

const Chats = ({ navigation, route }) => {
    const [chats, setChats] = React.useState([]);
    // TODO /messages/

    // GET /chatRooms
    let defaultSelectedRoom = {
        key: 0,
        title: "",
        msgUnread: 0,
        LastMsg50: [
            {
                from: "You",
                to: route.params.chatTo,
                when: "2021-06-01T18:37:16Z",
                msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in sodales dolor. Sed dictum, ligula sed malesuada varius.",
            },
        ],
    }
    const [message, setMessage] = React.useState("");
    const [selectedRoom, setSelectedRoom] = React.useState(defaultSelectedRoom);

    const backToAll = () => {
        navigation.navigate(lang.trans("TitleChats"), {roomKey: ""});
    }

    useEffect(() => {
        setupSelectedRoom()
        console.log(chats);
    }, []);
    
    const setupSelectedRoom = () => {
        // show the chat room
        let check = tmp_rooms_tchat.find(c => c.key == route.params.roomKey);
        if(check == undefined){
            // create one
            let chatRoomObj = {
                key: route.params.roomKey,
                title: `${(route.params.chatTo).slice(0, 5)}... - ${route.params.roomTitle}`,
                msgUnread: 0,
                LastMsg50: [
                    {
                        from: "You",
                        to: route.params.chatTo,
                        when: "2021-06-01T18:37:16Z",
                        msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in sodales dolor. Sed dictum, ligula sed malesuada varius.",
                    },
                ],
            }
            setChats(chatRoomObj);
            setSelectedRoom(chatRoomObj);
            return chatRoomObj
        } else {
            setSelectedRoom(check);
            return(check)
        }
    }

    if(route.params.roomKey == ""){
        return (
            <ScrollView style={ChatStyle.chatRooms}>
                {tmp_rooms_tchat.map((room) => {
                    room.LastMsg50.sort((a,b) => Date.parse(a.when) - Date.parse(b.when));
                    let lastMsg = room.LastMsg50[room.LastMsg50.length - 1].msg;
                    return (
                        <TouchableOpacity
                         onPress={() => navigation.navigate(lang.trans("TitleChats"), {roomKey: room.key})}
                         style={ChatStyle.chatRoomLight}>
                            <View style={ChatStyle.titleChatRoom}>
                                <Text style={(room.numMsgUnr > 0) ? {fontWeight: "bold"} : {}}>{room.title}</Text>
                                {(room.numMsgUnr > 0) ? (<Text style={(room.numMsgUnr > 0) ? {fontWeight: "bold"} : {}}>{room.numMsgUnr}</Text>) : (<View></View>)}
                            </View>
                            <Text style={(room.numMsgUnr > 0) ? {color: "#000000"} : {color: "#999999"}}>{ (lastMsg.length > 50) ? lastMsg.slice(0, 50)+"..." : lastMsg}</Text>
                        </TouchableOpacity>
                    )
                })
                }
                {chats.map((room) => {
                    room.LastMsg50.sort((a,b) => Date.parse(a.when) - Date.parse(b.when));
                    let lastMsg = room.LastMsg50[room.LastMsg50.length - 1].msg;
                    return (
                         <TouchableOpacity
                         onPress={() => navigation.navigate(lang.trans("TitleChats"), {roomKey: room.key})}
                         style={ChatStyle.chatRoomLight}>
                            <View style={ChatStyle.titleChatRoom}>
                                <Text style={(room.numMsgUnr > 0) ? {fontWeight: "bold"} : {}}>{room.title}</Text>
                                {(room.numMsgUnr > 0) ? (<Text style={(room.numMsgUnr > 0) ? {fontWeight: "bold"} : {}}>{room.numMsgUnr}</Text>) : (<View></View>)}
                            </View>
                            <Text style={(room.numMsgUnr > 0) ? {color: "#000000"} : {color: "#999999"}}>{ (lastMsg.length > 50) ? lastMsg.slice(0, 50)+"..." : lastMsg}</Text>
                        </TouchableOpacity>
                    )
                })
                }
            </ScrollView>
        )
    } else {
        return (
            <View>
                <View style={ChatStyle.headerRoom}>
                    <HeaderBackButton 
                        label="backToAll"
                        onPress={backToAll}
                    />
                    <Text>{selectedRoom.title}</Text>
                    <TouchableOpacity style={{backgroundColor: "#a4f9a4", padding: 10, borderRadius:50}}>
                        <Text>{lang.trans("Validate")}</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={ChatStyle.inRoom}>
                    {selectedRoom.LastMsg50.map(message => {
                        return(<Bubble content={message.msg} sentAt={message.when} to={message.to} from={message.from} />)
                    })}
                </ScrollView>

                <View style={ChatStyle.newMessage}>
                    <TextInput 
                        style={ChatStyle.input} 
                        placeholder={lang.trans("NewMessage")}
                        value={message}
                        onChangeText={setMessage}
                        autoCorrect={true}
                        keyboardType="default"
                        autoCapitalize="sentences"
                        multiline={true}
                    />
                    <TouchableOpacity>
                        {/* TODO /messages/dic-1 */}
                        <Ionicons name="send" style={{fontSize: 20}} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const Bubble = (props) => {
    const setupDate = (datestring) => {
        let d = new Date(datestring);
        let day = d.getDate();
        let month = d.getMonth();
        let hours = d.getHours();
        let minutes = d.getMinutes();

        res = `${ day < 10 ? "0"+day : d.getDate() }/${ month < 10 ? "0"+month : month }/${String(d.getFullYear()).slice(2, 4)} ${hours < 10 ? "0"+hours : hours}:${minutes < 10 ? "0"+minutes : minutes}`
        return res;
    }
    let res = <View></View>
    props.from == 'You' ? res = (
        <View style={ChatStyle.bubbleUser}>
            <Text>{props.content}</Text>
            <Text style={{fontSize:10, alignSelf:"flex-start"}}>{setupDate(props.sentAt)}</Text>
        </View>
    ) : res = (
        <View style={ChatStyle.bubbleOther}>
            <Text>{props.content}</Text>
            <Text style={{fontSize:10, alignSelf:"flex-end"}}>{setupDate(props.sentAt)}</Text>
        </View>
    )
    return res;
}

export default Chats;