import React from "react";
import { StyleSheet } from "react-native";

const ChatStyle = StyleSheet.create({
    headerRoom: {
        backgroundColor:"#FFFFFF",
        height:50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: 15
    },
    inRoom: {
        margin: 10,
        flexDirection: "column",
        height: "75%",
    },
    titleChatRoom: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5
    },
    chatRoomLight: {
        backgroundColor: "#FFFFFF",
        color: "#000000",
        width: "95%",
        height: 50,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 4,
        borderRadius: 20,
        alignSelf: "center",
    },
    bubbleUser: {
        alignSelf: "flex-end",
        flexDirection: "column",
        justifyContent: "space-between",
        alignContent: "space-between",
        backgroundColor: "#d6fffb",
        marginVertical: 10,
        padding: 10,
        borderRadius: 15,
        height: 80,
        width: "75%",
    },
    bubbleOther: {
        alignSelf: "flex-start",
        flexDirection: "column",
        justifyContent: "space-between",
        alignContent: "space-between",
        backgroundColor:"#EAEAEA",
        marginVertical: 10,
        padding: 10,
        borderRadius: 15,
        height: 80,
        width: "75%",
    },
    newMessage: {
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        height: "14%",
    },
    input: {
        backgroundColor: "#d6fffb",
        width: "90%",
        height: "90%",
        paddingVertical: 10,
        paddingHorizontal: 15,
        textAlignVertical: "top",
    }
})

export default ChatStyle;