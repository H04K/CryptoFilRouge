import react from "react";
import { NativeModules, View, Text, ImageBackground } from "react-native";
import Poststyle from "../assets/style/Poststyle";
const s_post = Poststyle;
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

const Category = (props) => {
    return(
        <View>
            <ImageBackground style={s_post.categorypost}
            imageStyle={{
                borderRadius: 10,
                opacity: 0.7,
            }}
            source={props.bg_image}
            blurRadius={20}
            >
                <View style={s_post.categ_titleview}>
                    <Text style={s_post.categ_title}>{lang.trans(props.title)}</Text>
                </View>
                <View  style={s_post.categ_nb_post}>
                    <Text style={s_post.categ_nb_posttxt}>{props.num_posts}</Text>
                </View>
            </ImageBackground>
        </View>
    )
}

export default Category;