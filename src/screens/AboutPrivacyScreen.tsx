// Worked on by: Siri Avula
import { Text, ScrollView } from "react-native";
import blueLogo from "../assets/blue_small.png";
import privacyStyles from "../styles/PrivacyStyles";
import LyraquistHeader from "../components/LyraquistHeader";

export default function AboutPrivacyScreen() {
  return (
    <>
      <ScrollView style={privacyStyles.container}>
        <LyraquistHeader title="Privacy Policy" logo={blueLogo} />
        <Text style={privacyStyles.firstPara}>
          Upon using this application, users are requested to sign into their
          Spotify account. We will have access to the following user data from
          Spotify:
          <ul>
            <li>User ID</li>
            <li>User Email</li>
            <li>Playlists</li>
            <li>Currently Playing</li>
            <li>Recently Played</li>
          </ul>
          This information will be used only to provide users their own personal
          experience of using this application. Email, ID, and playlist data
          will be stored securely in our database to build a functioning user
          profile in Lyraquist. Lyraquist Account passwords will be encrypted
          and stored securely in our database.
        </Text>

        <Text style={privacyStyles.para}>
          Our app will uphold Spotify's established policies, ensuring that user
          data is handled in strict accordance with Spotify Web API guidelines.
          When users log in with their Spotify accounts, they grant consent for
          our app to access the necessary data for its functionality. This
          approach not only aligns with their existing agreements but also
          prioritizes the safeguarding of a user's privacy.
        </Text>

        <Text style={privacyStyles.para}>
          Within our app, users will be unable to access other user's accounts
          or engage in direct communication, eliminating the potential for harm.
        </Text>
      </ScrollView>
    </>
  );
}