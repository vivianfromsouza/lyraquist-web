// Worked on by: Siri Avula
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { ArrowBackOutline } from "react-ionicons";
import { ImageSourcePropType } from "react-native";
import blueLogo from "../assets/blue_small.png";
import { useNavigate } from "react-router-dom";
import aboutStyles from "../styles/AboutStyles";
import LyraquistHeader from "../components/LyraquistHeader";

export default function AboutScreen() {
  const navigate = useNavigate();

  return (
    <>
      <ScrollView style={aboutStyles.container}>
        <LyraquistHeader title="About Lyraquist" logo={blueLogo}/>
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 25,
            marginHorizontal:20, marginRight:50
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
            marginHorizontal:20, marginRight:50
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
            marginHorizontal:20, marginRight:50
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
            marginHorizontal:20, marginRight:50
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
            marginHorizontal:20, marginRight:50
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

