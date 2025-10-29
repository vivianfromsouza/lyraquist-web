// Worked on by: Siri Avula
import { Text, ScrollView } from "react-native";
import blueLogo from "../assets/blue_small.png";
import LyraquistHeader from "../components/LyraquistHeader";
import aboutStyles from "../styles/AboutStyles";

export default function AboutTermsConditionsScreen() {
  return (
    <>
      <ScrollView style={aboutStyles.container}>
        <LyraquistHeader title="Terms & Conditions" logo={blueLogo} />
        <Text style={aboutStyles.paragraph}>
          You will need access to a Spotify Premium account to be able to access
          music on this application. The developers of Lyraquist do not own any
          music or content from Spotify. We developed this application for
          educational purposes only.
        </Text>
        <Text style={aboutStyles.paragraph}>
          You may create an account with Lyraquist. The information you provide,
          username and password, will be kept securely within our database. Your
          password should not be shared with anyone, and you should keep it
          confidential.
        </Text>
      </ScrollView>
    </>
  );
}