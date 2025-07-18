import {
  Dimensions,
  Text,
  View,
  Pressable,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { useState } from "react";
import FeedbackReaderWriter from "../services/FeedbackReaderWriter";
import { ImageSourcePropType } from "react-native";
import blueLogo from "../assets/blue_small.png";
import { ArrowBackOutline } from "react-ionicons";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const windowWidth = Dimensions.get("window").width; //screen flexibility on devices
export default function FeedbackScreen() {
  const navigate = useNavigate();

  const [feedback, setFeedback] = useState<string>("");

  async function submitFeedback() {
    await FeedbackReaderWriter.writeUserFeedback(feedback.trim()).then(() =>
      toast(
        "Feedback successfully submitted! Thank for helping to make Lyraquist better!"
      )
    );
    setFeedback("");
  }

  // const submitAlert = () => {
  //   if (feedback === undefined || feedback.trim() == "") {
  //     /*DO NOTHING*/
  //   } else {
  //     Alert.alert(
  //       "Have you completed your feedback?",
  //       "Submitting feedback stores account information for further communication.",
  //       [
  //         {
  //           text: "Cancel",
  //           onPress: () => console.log("Cancel Pressed"),
  //           style: "cancel",
  //         },
  //         {
  //           text: "Submit Feedback",
  //           onPress: () => submitFeedback(feedback),
  //         },
  //       ]
  //     );
  //   }
  // };

  return (
    <>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#e8e1db",
        }}
      >
        <View
          style={{
            width: windowWidth,
            backgroundColor: "#edc526",
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
          }}
        >
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
              <ArrowBackOutline />
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
          <Text
            style={{
              textAlign: "center",
              fontSize: 30,
              fontWeight: "bold",
              marginTop: 13,
              marginBottom: 15,
              color: "#303248",
            }}
          >
            Feedback
          </Text>
        </View>

        <View
          style={{
            paddingTop: 30,
            justifyContent: "center",
            marginHorizontal: 30,
            flex: 1,
            paddingBottom: 100,
          }}
        >
          {/*Introduction*/}
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 17,
              color: "#303248",
            }}
          >
            We are so thankful that you have decided to use our app for your
            language learning needs!
          </Text>
          <Text
            style={{
              paddingTop: 9,
              textAlign: "center",
            }}
          >
            To keep us informed on how to improve the app to best fit your needs
            please gives us some feedback. Our team will review the request and
            see what we can do.
          </Text>
          {/*Text Input*/}
          <View style={{ paddingTop: 20, flex: 1 }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 15,
                color: "#303248",
              }}
            >
              Enter Feedback Here:
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 10,
                flex: 1,
                marginTop: 10,
                paddingLeft: 10,
              }}
            >
              <TextInput
                editable
                multiline
                numberOfLines={15}
                onChangeText={(text) => setFeedback(text)}
                value={feedback}
                style={{
                  fontSize: 15,
                  color: "gray",
                  marginBottom: 10,
                  paddingTop: 5,
                  paddingRight: 5,
                }}
                textAlignVertical="top"
                placeholder="Type here"
              />
            </View>
            <Pressable
              onPress={submitFeedback}
              style={{
                backgroundColor: "#303248",
                padding: 10,
                marginTop: 12,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 20,
                  color: "#e8e1db",
                }}
              >
                Submit Feedback
              </Text>
              <ToastContainer />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
