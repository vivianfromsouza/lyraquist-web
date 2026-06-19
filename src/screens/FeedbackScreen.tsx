import { Text, View, Pressable, TextInput, ScrollView, Dimensions } from "react-native";
import { useState } from "react";
import FeedbackReaderWriter from "../services/FeedbackReaderWriter";
import blueLogo from "../assets/blue_small.png";
import { toast, ToastContainer } from "react-toastify";
import LyraquistHeader from "../components/LyraquistHeader";
import aboutStyles from "../styles/AboutStyles";

export default function FeedbackScreen() {
  const [feedback, setFeedback] = useState<string>("");
  const windowHeight = Dimensions.get("window").height;
  
  async function submitFeedback() {
    await FeedbackReaderWriter.writeUserFeedback(feedback.trim()).then(() =>
      toast(
        "Feedback successfully submitted! Thank you for helping to make Lyraquist better!",
        {
          className: "toast-custom",
        },
      ),
    );
    setFeedback("");
  }

  return (
    <ScrollView
      style={[aboutStyles.container, { minHeight: windowHeight * 0.85 }]}
    >
      <LyraquistHeader title="Feedback" logo={blueLogo} />

      <View style={aboutStyles.qaCard}>
        <Text style={aboutStyles.feedbackHeading}>
          We're so glad you're using Lyraquist!
        </Text>
        <View style={aboutStyles.qaAccent} />
        <Text style={aboutStyles.qaAnswer}>
          To help us improve the app, share any feedback you have below. Our
          team will review your suggestions and see what we can do.
        </Text>
      </View>

      <View style={aboutStyles.feedbackCard}>
        <Text style={aboutStyles.feedbackLabel}>Your Feedback</Text>
        <TextInput
          editable
          multiline
          numberOfLines={10}
          onChangeText={(text) => setFeedback(text)}
          value={feedback}
          style={aboutStyles.feedbackInput}
          textAlignVertical="top"
          placeholder="Type here…"
          placeholderTextColor="rgba(48, 50, 72, 0.35)"
        />
      </View>

      <Pressable onPress={submitFeedback} style={aboutStyles.feedbackButton}>
        <Text style={aboutStyles.feedbackBtnText}>Submit Feedback</Text>
      </Pressable>

      <ToastContainer />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}