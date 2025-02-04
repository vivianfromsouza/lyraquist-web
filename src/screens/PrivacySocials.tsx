// Worked on by: Siri Avula
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Pressable,
  Image,
  ImageSourcePropType,
} from "react-native";
import { ArrowBackOutline } from "react-ionicons";
import blueLogo from "../assets/blue_small.png";
import { useNavigate } from "react-router-dom";

// TODO: FIX STATUS BAR
// import { StatusBar } from "expo-status-bar";
const windowWidth = Dimensions.get("window").width; //screen flexibility on devices
export default function PrivacyScreen() {
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
          <Text style={styles.title}>Privacy and Socials</Text>
        </View>

        <Text style={{ fontSize: 20, margin: 13 }}>
          Within our app, users will be unable to access each other's accounts
          or engage in direct communication, reducing the potential for harm.
          The design and goals of our application ensure a secure environment
          where interactions are limited to the scope of language learning,
          prioritizing user safety and comfort.
        </Text>
        <Text style={{ fontSize: 20, margin: 13 }}>
          To view more specific information about Privacy, you can visit the
          Privacy Policy page in the About Us & Feedback section in Settings
          page.
        </Text>
        <Text>{"\n\n\n\n"}</Text>

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
    marginTop: 15,
    marginBottom: 20,
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
