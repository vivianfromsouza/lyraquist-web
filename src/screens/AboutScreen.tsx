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
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { ArrowBackOutline } from "react-ionicons";
import { ImageSourcePropType } from "react-native";
import blueLogo from "../assets/blue_small.png";
import { useNavigate } from "react-router-dom";
const windowWidth = Dimensions.get("window").width;
export default function AboutScreen() {
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
          <Text style={styles.title}>About Lyraquist</Text>
        </View>

        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 25,
          }}
          onPress={() => navigate("/about/welcome")}
        >
          <Text
            style={{
              paddingLeft: 40,
              fontSize: 20,
              fontWeight: "bold",
              color: "#303248",
            }}
          >
            About Us{" "}
          </Text>
          <KeyboardArrowRightIcon />
        </Pressable>

        <View
          style={{
            borderBottomColor: "gray",
            borderBottomWidth: 0.5,
            marginTop: 25,
            width: "90%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 25,
          }}
          onPress={() => navigate("/about/privacy")}
        >
          <Text
            style={{
              paddingLeft: 40,
              fontSize: 20,
              fontWeight: "bold",
              color: "#303248",
            }}
          >
            Privacy Policy{" "}
          </Text>
          <KeyboardArrowRightIcon />
        </Pressable>
        <View
          style={{
            borderBottomColor: "gray",
            borderBottomWidth: 0.5,
            marginTop: 25,
            width: "90%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />

        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 25,
          }}
          onPress={() => navigate("/about/terms")}
        >
          <Text
            style={{
              paddingLeft: 40,
              fontSize: 20,
              fontWeight: "bold",
              color: "#303248",
            }}
          >
            Terms & Conditions{" "}
          </Text>
          <KeyboardArrowRightIcon />
        </Pressable>

        <View
          style={{
            borderBottomColor: "gray",
            borderBottomWidth: 0.5,
            marginTop: 25,
            width: "90%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 25,
          }}
          onPress={() => navigate("/about/third-party")}
        >
          <Text
            style={{
              paddingLeft: 40,
              fontSize: 20,
              fontWeight: "bold",
              color: "#303248",
            }}
          >
            Third-Party Software
          </Text>
          <KeyboardArrowRightIcon />
        </Pressable>
        <View
          style={{
            borderBottomColor: "gray",
            borderBottomWidth: 0.5,
            marginTop: 25,
            width: "90%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />

        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 25,
            justifyContent: "space-between",
          }}
          onPress={() => navigate("/about/feedback")}
        >
          <Text
            style={{
              paddingLeft: 40,
              fontSize: 20,
              fontWeight: "bold",
              color: "#303248",
            }}
          >
            Send us Feedback
          </Text>
          <KeyboardArrowRightIcon />
        </Pressable>
        <View
          style={{
            borderBottomColor: "gray",
            borderBottomWidth: 0.5,
            marginTop: 25,
            width: "90%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />

        <Text>{"\n\n\n"}</Text>
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
