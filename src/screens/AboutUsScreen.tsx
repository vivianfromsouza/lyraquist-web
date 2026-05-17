// Worked on by: Siri Avula
import { View, Text, ScrollView, Image } from "react-native";
import { ImageSourcePropType } from "react-native";
import blueLogo from "../assets/blue_small.png";
import largeLogo from "../assets/Full_Logo.png";
import LyraquistHeader from "../components/LyraquistHeader";
import aboutStyles from "../styles/AboutStyles";

const QA_ITEMS = [
  {
    question: "What is Lyraquist?",
    answer:
      "Lyraquist is a language learning app that uses music to help users learn new languages in a fun and engaging way. You can study flashcards and write sentences over and over, but sometimes all it takes is one earworm to get something stuck in your head! Music not only allows us to learn a variety of vocabulary used in many different contexts, but it also exposes you to the culture the language comes from.",
  },
  {
    question: "What was the inspiration behind Lyraquist?",
    answer:
      "All of us have tried learning other languages at some point, and part of our interest and motivation for doing so was music or media in that language. Many of us also did a study abroad semester during college, where we often used music to connect with newfound friends from different countries. These experiences helped us realize a potential connection between music and language learning.",
  },
  {
    question: "Why was Lyraquist created?",
    answer:
      "The original Lyraquist project was created to satisfy our senior capstone project at the University of South Carolina. Since then, the project has been reworked to be used as a learning tool in a local elementary school.",
  },
  {
    question: "How was Lyraquist created?",
    answer:
      "Our project started off as an Android app built using React Native and various API services for translation, music, lyrics, and storage. The app has since been reworked into a website built using ReactJS.",
  },
];

export default function AboutUsScreen() {
  return (
    <ScrollView style={aboutStyles.container}>
      <LyraquistHeader title="About Lyraquist" logo={blueLogo} />

      <View style={aboutStyles.heroCard}>
        <Image
          style={aboutStyles.heroLogo}
          source={largeLogo as ImageSourcePropType}
        />
        <Text style={aboutStyles.heroTitle}>Welcome to Lyraquist!</Text>
        <Text style={aboutStyles.heroSubtitle}>
          Learn languages through the music you love.
        </Text>
      </View>

      {QA_ITEMS.map(({ question, answer }) => (
        <View style={aboutStyles.qaCard} key={question}>
          <Text style={aboutStyles.qaQuestion}>{question}</Text>
          <View style={aboutStyles.qaAccent} />
          <Text style={aboutStyles.qaAnswer}>{answer}</Text>
        </View>
      ))}

      <View style={aboutStyles.contributorsCard}>
        <Text style={aboutStyles.contributorsTitle}>The Contributors</Text>
        <Text style={aboutStyles.contributorsLabel}>
          Lyraquist 2.0 — Website
        </Text>
        <Text style={aboutStyles.contributorsText}>
          Vivian D'Souza · Mahi Patel
        </Text>
        <Text style={aboutStyles.contributorsLabel}>
          Lyraquist 1.0 — Original App
        </Text>
        <Text style={aboutStyles.contributorsText}>
          Siri Avula · Vivian D'Souza · Ashley Bickham · Mahi Patel · Tanvi
          Singh
        </Text>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}
