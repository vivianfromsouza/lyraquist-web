// Worked on by: Siri Avula
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Pressable,
  Linking,
  Image,
} from "react-native";
import { ImageSourcePropType } from "react-native";
import blueLogo from "../assets/blue_small.png";
import { ArrowBackOutline } from "react-ionicons";
import { useNavigate } from "react-router-dom";

const windowWidth = Dimensions.get("window").width; //screen flexibility on devices

export default function AboutThirdPartyScreen() {
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
          <Text style={styles.title}>Third Party</Text>
        </View>
        <Text style={{ fontSize: 15, margin: 13, marginTop: 20 }}>
          We will be using several application programming interfaces from the
          following: Spotify, MusixMatch, Lexicala, and Google Cloud
          Translation.
        </Text>

        <Text style={{ fontSize: 15, margin: 13 }}>
          You can view information regarding the different APIs here:
        </Text>

        <Text
          style={{
            color: "blue",
            fontSize: 15,
            marginLeft: 13,
            marginBottom: 5,
          }}
          onPress={() => Linking.openURL("https://developer.spotify.com/terms")}
        >
          Spotify for Developers
        </Text>
        <Text
          style={{
            color: "blue",
            fontSize: 15,
            marginLeft: 13,
            marginBottom: 5,
          }}
          onPress={() => Linking.openURL("https://developer.musixmatch.com/")}
        >
          Musixmatch
        </Text>
        <Text
          style={{
            color: "blue",
            fontSize: 15,
            marginLeft: 13,
            marginBottom: 5,
          }}
          onPress={() => Linking.openURL("https://lexicala.com/")}
        >
          Lexicala
        </Text>
        <Text
          style={{
            color: "blue",
            fontSize: 15,
            marginLeft: 13,
            marginBottom: 5,
          }}
          onPress={() =>
            Linking.openURL("https://cloud.google.com/translate/docs")
          }
        >
          Google Translation
        </Text>

        <Text style={{ fontSize: 15, margin: 13 }}>
          We do not own any of these services and are using them for educational
          purposes only. We expect all users of our application to follow the
          rules and regulations of these providers and to only take advantage of
          our application with intentions of learning.
        </Text>

        <Text>{"\n\n\n"}</Text>

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
