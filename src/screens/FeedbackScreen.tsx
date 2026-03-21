import {
  Text,
  View,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import { useState } from "react";
import FeedbackReaderWriter from "../services/FeedbackReaderWriter";
import blueLogo from "../assets/blue_small.png";
import { toast, ToastContainer } from "react-toastify";
import LyraquistHeader from "../components/LyraquistHeader";
import aboutStyles from "../styles/AboutStyles";

export default function FeedbackScreen() {
  const [feedback, setFeedback] = useState<string>("");

  async function submitFeedback() {
    await FeedbackReaderWriter.writeUserFeedback(feedback.trim()).then(() =>
      toast(
        "Feedback successfully submitted! Thank for helping to make Lyraquist better!"
      )
    );
    setFeedback("");
  }

  return (
    <>
      <ScrollView style={aboutStyles.container}>
        <LyraquistHeader title="Feedback" logo={blueLogo} />

        <View>
          <Text style={aboutStyles.feedbackHeading}>
            We are so thankful that you have decided to use our app for your
            language learning needs!
          </Text>
          <Text style={aboutStyles.paragraph}>
            To keep us informed on how to improve the app, please gives us any
            feedback you may have. Our team will review the request and see what
            we can do.
          </Text>
          <View>
            <Text style={aboutStyles.feedbackLabel}>Enter Feedback Here:</Text>
            <View style={aboutStyles.feedbackContainer}>
              <TextInput
                editable
                multiline
                numberOfLines={15}
                onChangeText={(text) => setFeedback(text)}
                value={feedback}
                style={aboutStyles.feedbackInput}
                textAlignVertical="top"
                placeholder="Type here"
              />
            </View>
            <Pressable
              onPress={submitFeedback}
              style={aboutStyles.feedbackButton}
            >
              <Text style={aboutStyles.feedbackBtnText}>Submit Feedback</Text>
              <ToastContainer />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </>
  );
}