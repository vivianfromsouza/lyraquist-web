// Worked on by: Siri Avula
import {
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Linking,
} from "react-native";
import blueLogo from "../assets/blue_small.png";
import LyraquistHeader from "../components/LyraquistHeader";

const windowWidth = Dimensions.get("window").width;

export default function AboutThirdPartyScreen() {
  return (
    <>
      <ScrollView style={styles.container}>
        <LyraquistHeader title="Third Party" logo={blueLogo} />
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
    height: "80vh",
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
