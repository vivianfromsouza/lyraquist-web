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
export default function AboutUsScreen({ navigation }) {
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
          <Text style={styles.title}>About Us</Text>
        </View>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            style={styles.circle}
            source={require("../assets/Full_Logo.png")}
          />
          <Text style={{ marginTop: 18, fontSize: 20, fontWeight: "bold" }}>
            Welcome to Lyraquist!
          </Text>
        </View>
        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
          <Text style={{ fontSize: 15 }}>
            We are so happy you have decided to start your language learning
            journey with Lyraquist! Here, you have the opportunity to learn
            lanaguages a more natural way: through music.
          </Text>
          <Text style={{ fontSize: 20, marginTop: 10, fontWeight: "bold" }}>
            Why did we create the app?
          </Text>
          <Text style={{ fontSize: 15 }}>
            Because we think it is needed. Other language learning apps
            trivialize learning language. We wanted to put the fun back into
            language learning and music felt like the perfect way to do that.
            Music not only allows us to learn a variety of vocabulary used in
            many different contexts, but also exposes you to the culture and
            ambience the language comes from.
          </Text>
          <Text style={{ fontSize: 20, marginTop: 10, fontWeight: "bold" }}>
            The Creators
          </Text>
          <Text style={{ fontSize: 15, marginTop: 10 }}>
            Siri Avula, Vivian D'Souza, Ashley Bickham, Mahi Patel, Tanvi Singh
          </Text>

          <Text style={{ fontSize: 15 }} />
        </View>

        <Text>{"\n\n\n"}</Text>

        <StatusBar style="auto" />
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
