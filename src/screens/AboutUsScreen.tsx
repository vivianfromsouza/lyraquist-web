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
import { ImageSourcePropType } from "react-native";
import blueLogo from "../assets/blue_small.png";
import largeLogo from "../assets/Full_Logo.png";
import { useNavigate } from "react-router-dom";

const windowWidth = Dimensions.get("window").width;

export default function AboutUsScreen() {
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
          <Text style={styles.title}>About Us</Text>
        </View>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            style={styles.circle}
            source={largeLogo as ImageSourcePropType}
          />
          <Text style={{ marginTop: 18, fontSize: 20, fontWeight: "bold" }}>
            Welcome to Lyraquist!
          </Text>
        </View>
        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
          {/* <Text style={{ fontSize: 15 }}>
            We are so happy you have decided to start your language learning
            journey with Lyraquist! Here, you have the opportunity to learn
            lanaguages a more natural way: through music.
          </Text> */}
          <Text style={{ fontSize: 20, marginTop: 10, fontWeight: "bold" }}>
            What is Lyraquist?
          </Text>
          <Text style={{ fontSize: 15 }}>
            Lyraquist is a language learning app that uses music to help users
            learn new languages in a fun and engaging way. You can study
            flashcards and write sentences over and over, but sometimes all it
            takes is one earworm to get something stuck in your head! Music not
            only allows us to learn a variety of vocabulary used in many
            different contexts, but it also exposes you to the culture the
            language comes from.
          </Text>
          <Text style={{ fontSize: 20, marginTop: 10, fontWeight: "bold" }}>
            What was the inspiration behind Lyraquist?
          </Text>
          <Text style={{ fontSize: 15 }}>
            All of us have tried learning other langauges at some point, and
            part of our interest/motivation for doing so was music or media in
            that language. Many of us also did a study abroad semester during
            college, where we often used music to connect with newfound friends
            from different countries. These experiences helped us realize a
            potential connection between music and language learning.
          </Text>

          <Text style={{ fontSize: 20, marginTop: 10, fontWeight: "bold" }}>
            Why was Lyraquist created?
          </Text>
          <Text style={{ fontSize: 15 }}>
            The original Lyraquist project was created to satisfy our senior
            capstone project at the University of South Carolina. Since then,
            the project has been reworked to be used as a learning tool in a
            local elementary school.
          </Text>

          <Text style={{ fontSize: 20, marginTop: 10, fontWeight: "bold" }}>
            How was Lyraquist created?
          </Text>
          <Text style={{ fontSize: 15 }}>
            Our project started off as an Android app built using React Native
            and various API servies for translation, music, lyrics, and storage.
            The app has since been reworked into a website built using ReactJS.
          </Text>
          <Text style={{ fontSize: 20, marginTop: 10, fontWeight: "bold" }}>
            The Contributors
          </Text>
          <Text style={{ fontSize: 15, marginTop: 10 }}>
            Lyraquist 2.0 (the website): Vivian D'Souza and Mahi Patel <br />
            Lyraquist 1.0 (the original app): Siri Avula, Vivian D'Souza, Ashley
            Bickham, Mahi Patel, Tanvi Singh
          </Text>

          <Text style={{ fontSize: 15 }} />
        </View>

        <Text>{"\n\n\n"}</Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
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
    height: 190,
    width: 190,
    marginBottom: -30,
  },
});
