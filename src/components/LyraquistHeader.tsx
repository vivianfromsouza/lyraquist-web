import { Text, View, Image, Pressable } from "react-native-web";
import { useNavigate } from "react-router-dom";
import aboutStyles from "../styles/AboutStyles";
import settingStyles from "../styles/SettingStyles";
import { ArrowBackOutline } from "react-ionicons";

const LyraquistHeader = ({ title, logo }) => {
  const navigate = useNavigate();

  return (
    <View style={logo.includes("red_small.png") ? settingStyles.introSect: aboutStyles.introSect}>
      <View style={aboutStyles.centerDisplay}>
        <Pressable style={aboutStyles.backArrow} onPress={() => navigate(-1)}>
          <ArrowBackOutline color={"#00000"} height="25px" width="25px" />
        </Pressable>
        <Image source={logo} style={aboutStyles.logo} />
        <View style={{ flex: 1 }}></View>
      </View>
      <Text style={logo.includes("red_small.png") ? settingStyles.title: aboutStyles.title}>{title}</Text>
    </View>
  );
};

export default LyraquistHeader;
