import { StyleSheet } from "react-native";

const HomeStyle = StyleSheet.create({
    plus_button: {
        width: 60,
        height: 60,
        borderRadius: 100,
        backgroundColor: "#CDAEFB",
        justifyContent: "center",
        // position: "absolute",
        top: -10,
        left: "80%",
        bottom: 0,
        right: 0,
    },
    plus_button_text: {
        // textAlign: "center",
        alignSelf: "center",
        fontSize: 50,
        color: "#FFFFFF",
    }
})

export default HomeStyle;