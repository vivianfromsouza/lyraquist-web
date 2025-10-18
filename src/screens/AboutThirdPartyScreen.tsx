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

const windowWidth = Dimensions.get("window").width;

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
              <ArrowBackOutline color={"#00000"} height="25px" width="25px" />
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
          We used the following application programming interfaces (APIs):
          Spotify Web Player SDK, Spotify Web API, LRCLIB, Azure Translator, and
          Oxford Dictionaries API. We do not own any of these services and are
          using them for educational purposes only.
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
          onPress={() =>
            Linking.openURL("https://github.com/tranxuanthang/lrclib")
          }
        >
          LRCLIB
        </Text>
        <Text
          style={{
            color: "blue",
            fontSize: 15,
            marginLeft: 13,
            marginBottom: 5,
          }}
          onPress={() =>
            Linking.openURL(
              "https://azure.microsoft.com/en-us/products/ai-services/ai-translator"
            )
          }
        >
          Azure Translator
        </Text>
        <Text
          style={{
            color: "blue",
            fontSize: 15,
            marginLeft: 13,
            marginBottom: 5,
          }}
          onPress={() =>
            Linking.openURL("https://developer.oxforddictionaries.com/")
          }
        >
          Oxford Dictionaries API
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
