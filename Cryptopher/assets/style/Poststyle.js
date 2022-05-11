import React from "react";
import { StyleSheet } from "react-native";

const Poststyle = StyleSheet.create({
    // colors: 
    // #82A9F9
    // #A4FCF5
    // #CDAEFB
    // #CFC3FB
    // #F6CCBF
    
    homepost: {
        backgroundColor: "#CFC3FB",
        width: 200,
        height: 200,
        margin: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    categorypost: {
        width: 150,
        height: 150,
        justifyContent: "space-around",
        padding: 5,
        margin: 10,
        backgroundColor: "#000000",
        borderRadius: 10,
    },
    categ_nb_posttxt: {
        color: "#FFFFFF",
        fontSize: 20,
    },
    categ_nb_post: {
        justifyContent: "flex-start",
    },
    categ_titleview: {
        alignItems: "flex-end",
    },
    categ_title: {
        color: "#FFFFFF",
        fontSize: 20,
        alignItems: "center",
    },
    categories: {
        flexDirection: "row",
        flexWrap: "wrap",
        margin: 5,
        // backgroundColor: "#b9faff",
    },
    post_card: {
        backgroundColor: "#FFFFFF",
        color: "#000000",
        width: "95%",
        height: 200,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 20,
    },
    post_card_light: {
        backgroundColor: "#FFFFFF",
        color: "#000000",
        width: "95%",
        height: 100,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 20,
        justifyContent: "space-around"
    },
    button: {
        backgroundColor: "#CFC3FB",
        margin: 20,
        color: "#FFFFFF",
        width: 100,
        height: 35,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
    },
    BigButton: {
        backgroundColor: "#CFC3FB",
        margin: 20,
        color: "#FFFFFF",
        width: 200,
        height: 55,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
    },
    contactButton: {
        backgroundColor: "#CFC3FB",
        width: 110,
        height: 30,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        alignSelf: "flex-end",
        borderRadius: 50,
    },
})

export default Poststyle;