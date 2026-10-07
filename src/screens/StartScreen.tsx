import { Pressable, Text, View, Image } from "react-native";
import { ImageSourcePropType } from "react-native";
import fullLogo from "../assets/Full_Logo.png";
import fullLogoStart from "../assets/Full_Logo_Start.png";
import { useNavigate } from "react-router-dom";
import startStyles from "../styles/StartStyles";

export default function StartScreen() {
  const navigate = useNavigate();
  
  return (
      <View style={startStyles.container}>
        <View>
          <View style={startStyles.info}>
            <Image
              style={startStyles.circle}
              source={fullLogo as ImageSourcePropType}
            />
            <Text
              accessible={true}
              accessibilityLabel="title"
              style={startStyles.title}
            >
              LYRAQUIST
            </Text>
            <Pressable
              onPress={() => navigate("/signUp")}
              style={startStyles.signUp}
            >
              <Text
                accessible={true}
                accessibilityLabel="signup"
                style={startStyles.signUpTxt}
              >
                Sign Up
              </Text>
            </Pressable>
            <Pressable
              style={startStyles.logIn}
              accessibilityLabel="loginClick"
              onPress={() => navigate("/login")}
            >
              <Text
                accessible={true}
                accessibilityLabel="login"
                style={startStyles.loginTxt}
              >
                Log In
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
  );
}