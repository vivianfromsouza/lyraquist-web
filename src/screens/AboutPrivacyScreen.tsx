import { View, Text, ScrollView } from "react-native";
import blueLogo from "../assets/blue_small.png";
import LyraquistHeader from "../components/LyraquistHeader";
import aboutStyles from "../styles/AboutStyles";

const SPOTIFY_DATA = [
  "User ID",
  "User Email",
  "Playlists",
  "Currently Playing",
  "Recently Played",
];

export default function AboutPrivacyScreen() {
  return (
    <ScrollView style={aboutStyles.container}>
      <LyraquistHeader title="Privacy Policy" logo={blueLogo} />

      <View style={aboutStyles.qaCard}>
        <Text style={aboutStyles.qaQuestion}>Data Collected from Spotify</Text>
        <View style={aboutStyles.qaAccent} />
        <Text style={aboutStyles.qaAnswer}>
          Upon using this application, users are requested to sign into their
          Spotify account. We will have access to the following user data:
        </Text>
        {SPOTIFY_DATA.map((item) => (
          <Text key={item} style={[aboutStyles.qaAnswer, { marginTop: 4 }]}>
            {"  •  "}
            {item}
          </Text>
        ))}
        <Text style={[aboutStyles.qaAnswer, { marginTop: 12 }]}>
          This information will be used only to provide your personal experience
          of using this application. Email, ID, and playlist data will be stored
          securely in our database to build a functioning user profile in
          Lyraquist. Account passwords are encrypted and stored securely.
        </Text>
      </View>

      <View style={aboutStyles.qaCard}>
        <Text style={aboutStyles.qaQuestion}>Spotify Policy Compliance</Text>
        <View style={aboutStyles.qaAccent} />

        <Text style={aboutStyles.qaAnswer}>
          Our app upholds Spotify's established policies, ensuring that user
          data is handled in strict accordance with Spotify Web API guidelines.
          When you log in with your Spotify account, you grant consent for our
          app to access the necessary data for its functionality. This approach
          not only aligns with their existing agreements but also prioritizes
          the safeguarding of your privacy.
        </Text>
      </View>

      <View style={aboutStyles.qaCard}>
        <Text style={aboutStyles.qaQuestion}>User Interactions</Text>
        <View style={aboutStyles.qaAccent} />

        <Text style={aboutStyles.qaAnswer}>
          Within our app, users will be unable to access other users' accounts
          or engage in direct communication, eliminating the potential for harm.
        </Text>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}