// Worked on by: Siri Avula

import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Pressable,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { StatusBar } from "expo-status-bar";
const windowWidth = Dimensions.get("window").width; //screen flexibility on devices
export default function AboutScreen({ route, navigation }) {
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
              onPress={() => navigation.goBack()}
            >
              <Ionicons
                style={{}}
                name="arrow-back"
                size={40}
                color="#303248"
              />
            </Pressable>
            <Image
              source={require("../assets/blue_small.png")}
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
          <Text style={styles.title}>Privacy Policy</Text>
        </View>
        <Text style={{ fontSize: 15, margin: 13, marginTop: 20 }}>
          We will have access to users' data, but we will be securing this
          information. This information will be used only to provide users their
          own personal experience of using this application. We will be
          collecting personal information, like birthday, to ensure all users
          are of legal age to be using this application. Upon using this
          application, users are requested to sign into their Spotify account.
        </Text>

        <Text style={{ fontSize: 15, margin: 13 }}>
          Our app will uphold Spotify's established policies, ensuring that user
          data is handled in strict accordance with Spotify Web API guidelines.
          When users log in with their Spotify accounts, they implicitly grant
          consent for our app to access the necessary data for its
          functionality. This approach not only aligns with their existing
          agreements but also prioritizes the safeguarding of their privacy.
        </Text>

        <Text style={{ fontSize: 15, margin: 13 }}>
          Within our app, users will be unable to access each other's accounts
          or engage in direct communication, mitigating the potential for harm.
          This design ensures a secure environment where interactions are
          limited to the scope of language learning, prioritizing user safety
          and comfort.
        </Text>

        <Text style={{ fontSize: 15, margin: 13 }}>
          To maintain security in our application, we will be allowing limited
          access to accounts and our database. Users are only allowed to log in
          to accounts they have a username and password to. Information
          regarding their password will not be displayed in plain text.
          Information inside the database will be secured as the Database will
          be encrypted. Access (and decryption) will only be allowed with the
          correct username and password (admin view) or authorization key (app
          system access). When sending and receiving calls to the database, each
          message to/from the app/database should be encrypted. Within each
          message contains some type of signature to ensure the call is coming
          from our app (a legitimate user)/database, a Hash to ensure integrity
          of the message (had not been tampered in transit), and the call
          itself.
        </Text>

        <Text></Text>

        <StatusBar style="auto" />
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
