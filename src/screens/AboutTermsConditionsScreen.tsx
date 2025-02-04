// Worked on by: Siri Avula
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Pressable,
  Image,
} from "react-native";
import { ImageSourcePropType } from "react-native";
import blueLogo from "../assets/blue_small.png";
import { ArrowBackOutline } from "react-ionicons";
import { useNavigate } from "react-router-dom";
// TODO: StatusBar doesn't exist in ReactJS, finder alternative
// import { StatusBar } from "expo-status-bar";

const windowWidth = Dimensions.get("window").width; //screen flexibility on devices
export default function AboutTermsConditionsScreen() {
  const navigate = useNavigate();

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.introSect}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 60,
              marginLeft: 20,
              marginRight: 20,
            }}
          >
            <Pressable
              style={{ alignSelf: "center", flex: 1 }}
              onPress={() => navigate(-1)}
            >
              {/* <Ionicons
                style={{}}
                name="arrow-back"
                size={40}
                color="#303248"
              /> */}
              <ArrowBackOutline />
            </Pressable>
            <Image
              source={blueLogo as ImageSourcePropType}
              style={{
                height: 60,
                alignSelf: "center",
                flex: 1,
                resizeMode: "contain",
                marginBottom: 7,
              }}
            />
            <View style={{ flex: 1 }}></View>
          </View>
          <Text style={styles.title}>Terms & Conditions</Text>
        </View>
        <Text style={{ fontSize: 15, margin: 13, marginTop: 20 }}>
          Please read these terms of use as they will help you understand how to
          ethically use this application. You will need access to a Spotify
          Premium account to be able to access music on this application. The
          developers of Lyraquist do not own any music or content from Spotify,
          and we developed this application for educational purposes only.
        </Text>

        <Text style={{ fontSize: 15, margin: 13 }}>
          You may create an account with Lyraquist. The information you provide,
          username and password, will be kept securely within our database. Your
          password should not be shared with anyone, and you should keep it
          confidential.
        </Text>

        <Text>{"\n\n\n"}</Text>

        {/* <StatusBar style="auto" /> */}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8e1db",
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 0,
    marginBottom: 15,
    color: "#303248",
  },
  introSect: {
    flex: 1,
    width: windowWidth,
    backgroundColor: "#edc526",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  circle: {
    height: 150,
    width: 150,
    borderRadius: 100,
    marginTop: 20,
    backgroundColor: "#303248",
  },
});
