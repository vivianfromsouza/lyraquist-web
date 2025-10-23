// Worked on by: Siri Avula
import { Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import blueLogo from "../assets/blue_small.png";
import LyraquistHeader from "../components/LyraquistHeader";

const windowWidth = Dimensions.get("window").width;
export default function AboutTermsConditionsScreen() {
  return (
    <>
      <ScrollView style={styles.container}>
        <LyraquistHeader title="Terms & Conditions" logo={blueLogo} />
        <Text style={{ fontSize: 15, margin: 13, marginTop: 20 }}>
          You will need access to a Spotify Premium account to be able to access
          music on this application. The developers of Lyraquist do not own any
          music or content from Spotify. We developed this application for
          educational purposes only.
        </Text>
        <Text style={{ fontSize: 15, margin: 13 }}>
          You may create an account with Lyraquist. The information you provide,
          username and password, will be kept securely within our database. Your
          password should not be shared with anyone, and you should keep it
          confidential.
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
