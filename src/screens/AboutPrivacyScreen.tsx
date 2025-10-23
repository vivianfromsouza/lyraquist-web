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
import { ArrowBackOutline } from "react-ionicons";
import { useNavigate } from "react-router-dom";
import { ImageSourcePropType } from "react-native";
import blueLogo from "../assets/blue_small.png";
import privacyStyles from "../styles/PrivacyStyles";
const windowWidth = Dimensions.get("window").width; //screen flexibility on devices
export default function AboutPrivacyScreen() {
  const navigate = useNavigate();

  return (
    <>
      <ScrollView style={privacyStyles.container}>
        <View style={privacyStyles.introSect}>
          <View
            style={privacyStyles.banner}
          >
            <Pressable
              style={privacyStyles.backArrow}
              onPress={() => navigate(-1)}
            >
              <ArrowBackOutline color={"#00000"} height="25px" width="25px" />
            </Pressable>
            <Image
              source={blueLogo as ImageSourcePropType}
              style={privacyStyles.logo}
            />
            <View style={{ flex: 1 }}></View>
          </View>
          <Text style={privacyStyles.title}>Privacy Policy</Text>
        </View>
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
