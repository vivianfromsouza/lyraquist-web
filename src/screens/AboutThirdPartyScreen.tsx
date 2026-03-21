// Worked on by: Siri Avula
import { Text, ScrollView, Linking } from "react-native";
import blueLogo from "../assets/blue_small.png";
import LyraquistHeader from "../components/LyraquistHeader";
import aboutStyles from "../styles/AboutStyles";

export default function AboutThirdPartyScreen() {
  return (
    <>
      <ScrollView style={aboutStyles.container}>
        <LyraquistHeader title="Third Party" logo={blueLogo} />
        <Text style={aboutStyles.paragraph}>
          We used the following application programming interfaces (APIs):
          Spotify Web Player SDK, Spotify Web API, LRCLIB, Azure Translator, and
          Oxford Dictionaries API. We do not own any of these services and are
          using them for educational purposes only.
        </Text>

        <Text style={aboutStyles.paragraph}>
          You can view information regarding the different APIs here:
        </Text>

        <Text
          style={aboutStyles.link}
          onPress={() => Linking.openURL("https://developer.spotify.com/terms")}
        >
          Spotify for Developers
        </Text>
        <Text
          style={aboutStyles.link}
          onPress={() =>
            Linking.openURL("https://github.com/tranxuanthang/lrclib")
          }
        >
          LRCLIB
        </Text>
        <Text
          style={aboutStyles.link}
          onPress={() =>
            Linking.openURL(
              "https://azure.microsoft.com/en-us/products/ai-services/ai-translator"
            )
          }
        >
          Azure Translator
        </Text>
        <Text
          style={aboutStyles.link}
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