// Worked on by: Siri Avula
import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
const windowWidth = Dimensions.get("window").width; //screen flexibility on devices
export default function AboutScreen() {
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
            <Pressable><Text>Press me!</Text></Pressable>
          </View>
        </View>
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
    marginBottom: 20,
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
