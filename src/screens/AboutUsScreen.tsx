// Worked on by: Siri Avula
import {
  View,
  Text,
  ScrollView,
  Image,
} from "react-native";
import { ImageSourcePropType } from "react-native";
import blueLogo from "../assets/blue_small.png";
import largeLogo from "../assets/Full_Logo.png";
import LyraquistHeader from "../components/LyraquistHeader";
import aboutStyles from "../styles/AboutStyles";

export default function AboutUsScreen() {
  return (
    <>
      <ScrollView style={aboutStyles.container}>
        <LyraquistHeader title="About Lyraquist" logo={blueLogo} />

        <View style={aboutStyles.imageHader}>
          <Image
            style={aboutStyles.circle}
            source={largeLogo as ImageSourcePropType}
          />
          <Text style={aboutStyles.welcomeHeading}>Welcome to Lyraquist!</Text>
        </View>
        <View style={aboutStyles.margin}>
          <Text style={aboutStyles.questionHeading}>What is Lyraquist?</Text>
          <Text style={aboutStyles.paragraph}>
            Lyraquist is a language learning app that uses music to help users
            learn new languages in a fun and engaging way. You can study
            flashcards and write sentences over and over, but sometimes all it
            takes is one earworm to get something stuck in your head! Music not
            only allows us to learn a variety of vocabulary used in many
            different contexts, but it also exposes you to the culture the
            language comes from.
          </Text>
          <Text style={aboutStyles.questionHeading}>
            What was the inspiration behind Lyraquist?
          </Text>
          <Text style={aboutStyles.paragraph}>
            All of us have tried learning other langauges at some point, and
            part of our interest/motivation for doing so was music or media in
            that language. Many of us also did a study abroad semester during
            college, where we often used music to connect with newfound friends
            from different countries. These experiences helped us realize a
            potential connection between music and language learning.
          </Text>

          <Text style={aboutStyles.questionHeading}>
            Why was Lyraquist created?
          </Text>
          <Text style={aboutStyles.paragraph}>
            The original Lyraquist project was created to satisfy our senior
            capstone project at the University of South Carolina. Since then,
            the project has been reworked to be used as a learning tool in a
            local elementary school.
          </Text>

          <Text style={aboutStyles.questionHeading}>
            How was Lyraquist created?
          </Text>
          <Text style={aboutStyles.paragraph}>
            Our project started off as an Android app built using React Native
            and various API servies for translation, music, lyrics, and storage.
            The app has since been reworked into a website built using ReactJS.
          </Text>
          <Text style={aboutStyles.questionHeading}>The Contributors</Text>
          <Text style={aboutStyles.paragraph}>
            Lyraquist 2.0 (the website): Vivian D'Souza and Mahi Patel <br />
            Lyraquist 1.0 (the original app): Siri Avula, Vivian D'Souza, Ashley
            Bickham, Mahi Patel, Tanvi Singh
          </Text>
        </View>

        <Text>{"\n\n\n"}</Text>
      </ScrollView>
    </>
  );
}
