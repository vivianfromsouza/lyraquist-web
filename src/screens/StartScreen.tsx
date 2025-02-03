import { StatusBar } from "expo-status-bar";
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
  PixelRatio,
  Image,
} from "react-native";

//setting up pixelRatio, font scale is based off device size
const fontScale = PixelRatio.getFontScale();
const getFontSize = (size) => size / fontScale;

// This is the first screen we see when we run our application.

export default function StartScreen({ navigation }) {
  // // to persist user login across app restarts
  const spinValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 360,
      duration: 300000,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.info}>
          <Image
            style={styles.circle}
            source={require("../assets/Full_Logo.png")}
          />
          <Text
            accessible={true}
            accessibilityLabel="title"
            style={styles.title}
          >
            LYRAQUIST
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.warning}>
              Spotify Premium is needed to create an account
            </Text>
          </View>
          <Pressable
            onPress={() => navigation.navigate("Signup", {})}
            style={styles.signUp}
          >
            <Text
              accessible={true}
              accessibilityLabel="signup"
              style={{
                margin: 10,
                fontSize: 18,
                fontWeight: "400",
                marginHorizontal: 70,
                color: "#e8e1db",
              }}
            >
              Sign Up
            </Text>
          </Pressable>
          <Pressable
            style={styles.logIn}
            accessibilityLabel="loginClick"
            onPress={() => navigation.navigate("Login", {})}
          >
            <Text
              accessible={true}
              accessibilityLabel="login"
              style={{
                margin: 10,
                fontSize: 18,
                fontWeight: "400",
                marginHorizontal: 77,
                color: "#e8e1db",
              }}
            >
              Log In
            </Text>
          </Pressable>
        </View>
        <Image
          style={styles.bigCircle}
          source={require("../assets/world_logo.png")}
        />
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edc526",
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    height: 190,
    width: 190,
    marginBottom: -30,
  },
  bigCircle: {
    height: 500,
    width: 500,
    position: "absolute",
    top: 430,
    right: 0,
    left: 0,
    marginHorizontal: -90,
  },
  info: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
  },
  title: {
    marginTop: 20,
    fontSize: getFontSize(30),
    fontWeight: "900",
    color: "#303248",
  },
  warning: {
    marginTop: 10,
    fontSize: getFontSize(15),
    color: "#ff4a2a",
    justifyContent: "center",
  },
  signUp: {
    backgroundColor: "#ff4a2a",
    borderRadius: 10,
    marginTop: 20,
  },
  logIn: {
    backgroundColor: "#303248",
    borderRadius: 10,
    marginTop: 15,
  },
});
