// Worked on by: Siri Avula
import { View, Text, ScrollView, Pressable } from "react-native";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import blueLogo from "../assets/blue_small.png";
import { useNavigate } from "react-router-dom";
import aboutStyles from "../styles/AboutStyles";
import LyraquistHeader from "../components/LyraquistHeader";

export default function AboutScreen() {
  const navigate = useNavigate();

  return (
    <>
      <ScrollView style={aboutStyles.container}>
        <LyraquistHeader title="About Lyraquist" logo={blueLogo} />
        <Pressable
          style={aboutStyles.menuEntry}
          onPress={() => navigate("/about/welcome")}
        >
          <Text style={aboutStyles.menuText}>About Us </Text>
          <KeyboardArrowRightIcon />
        </Pressable>

        <View style={aboutStyles.menuBorder} />
        <Pressable
          style={aboutStyles.menuEntry}
          onPress={() => navigate("/about/privacy")}
        >
          <Text style={aboutStyles.menuText}>Privacy Policy </Text>
          <KeyboardArrowRightIcon />
        </Pressable>
        <View style={aboutStyles.menuBorder} />

        <Pressable
          style={aboutStyles.menuEntry}
          onPress={() => navigate("/about/terms")}
        >
          <Text style={aboutStyles.menuText}>Terms & Conditions </Text>
          <KeyboardArrowRightIcon />
        </Pressable>

        <View style={aboutStyles.menuBorder} />
        <Pressable
          style={aboutStyles.menuEntry}
          onPress={() => navigate("/about/third-party")}
        >
          <Text style={aboutStyles.menuText}>Third-Party Software</Text>
          <KeyboardArrowRightIcon />
        </Pressable>
        <View style={aboutStyles.menuBorder} />

        <Pressable
          style={aboutStyles.menuEntry}
          onPress={() => navigate("/about/feedback")}
        >
          <Text style={aboutStyles.menuText}>Send us Feedback</Text>
          <KeyboardArrowRightIcon />
        </Pressable>
        <View style={aboutStyles.menuBorder} />

        <Text>{"\n\n\n"}</Text>
      </ScrollView>
    </>
  );
}