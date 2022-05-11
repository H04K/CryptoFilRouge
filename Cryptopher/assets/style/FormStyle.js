import React from "react";
import { StyleSheet } from "react-native";

const FormStyle = StyleSheet.create({
    input: {
        backgroundColor: "#FFFFFF",
        width: 200,
        fontSize: 20,
        padding: 10,
        borderRadius: 5,
    },
    input_amount: {
        width: "auto",
        fontSize: 20,
        textAlign: "center",
        color: "#000000",
        borderRadius: 5,
        backgroundColor: "#FFFFFF",
        padding: 10,
        marginVertical: 10,
    },
    input_long_text: {
        backgroundColor: "#FFFFFF",
        width: 200,
        height: 200,
        fontSize: 20,
        padding: 10,
        borderRadius: 5,
        textAlignVertical: "top"
    },
    globalForm: {
        // backgroundColor: "#00FF",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    form: {
        // backgroundColor: "#00FF00",
        alignItems: "center",
        justifyContent: "space-around",
        height: "50%"
    },
    formButtonsView: {
        flexDirection: "row",
    },
    form_create_post: {
        marginTop: "25%",
        alignItems: "center",
    },
    searchbar_view: {
        alignItems: "center",
        width: "100%"
    },
    searchbar: {
        backgroundColor: "#FFFFFF",
        borderRadius: 50,
        marginLeft: 20,
        marginRight: 20,
        marginVertical: 10,
        width: 300,
        fontSize: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
    }
});


const FormStyleDark = StyleSheet.create({
    input: {
        width: 200,
        fontSize: 20,
        color: "#FFFFFF",
        borderBottomWidth: 2,
        borderBottomColor: "#FFFFFF",
        margin: 10,
    },
    input_amount: {
        width: "auto",
        fontSize: 20,
        textAlign: "center",
        color: "#FFFFFF",
        borderBottomWidth: 2,
        borderBottomColor: "#FFFFFF",
        marginTop: 10,
        marginBottom: 10,
    },
    //backgroundColor: "#FF0000",
    input_long_text: {
        width: 300,
        height: 200,
        color: "#FFFFFF",
        textAlignVertical: "top",
        fontSize: 20,
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: "#FFFFFF",
        borderLeftWidth: 2,
        borderLeftColor: "#FFFFFF",
        borderRightWidth: 2,
        borderRightColor: "#FFFFFF",

    },
    formButtonsView: {
        // backgroundColor: "#00FF00",
        justifyContent: "space-between",
        height: 200,
    },
    form_create_post: {
        alignItems: "center",
    },
    searchbar_view: {
        alignItems: "center",
        width: "100%",
    },
    searchbar: {
        backgroundColor: "#FFFFFF",
        borderRadius: 50,
        marginLeft: 20,
        marginRight: 20,
        marginVertical: 10,
        width: 300,
        fontSize: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
    }
});
export { FormStyle, FormStyleDark };