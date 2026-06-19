import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import { getAuth, updatePassword } from "firebase/auth";
import { ArrowBackOutline } from "react-ionicons";
import { ImageSourcePropType } from "react-native";
import redLogo from "../assets/red_small.png";
import LocalFirebaseClient from "../services/firebase/LocalFirebaseClient";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useFirebase } from "../services/firebase/FirebaseContext";
import passwordStyles from "../styles/ChangePassword";

export default function ChangePasswordScreen() {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>();

  const auth = getAuth(LocalFirebaseClient);
  const navigate = useNavigate();
  const { handleSignOut } = useFirebase();

  async function changePassword() {
    if (password!.trim().length < 6) {
      toast(
        "Password is too short. Password must be at least 6 characters long.",
        {
          className: "toast-custom",
        },
      );
    } else if (password == confirmPassword) {
      updatePassword(auth.currentUser!, password)
        .then(() => {
          toast(
            "Password changed successfully! You will now need to sign-in again with your new password.",
            {
              className: "toast-custom",
            },
          );
          setTimeout(() => {
            handleSignOut();
            navigate("/login");
          }, 4000);
        })
        .catch((error) => {
          toast(
            "Could not change password. Need recent login. Please log out, sign in, and try again.",
            {
              className: "toast-custom",
            },
          );
          console.log("Error changing password: ", error);
        });
    } else {
      toast("Passwords don't match. Please try again.", {
        className: "toast-custom",
      });
    }
  }

  return (
    <>
      <ScrollView style={passwordStyles.full}>
        <View style={passwordStyles.introSect}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 30,
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
              source={redLogo as ImageSourcePropType}
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
          <Text style={passwordStyles.title}>Change Password</Text>
        </View>

        <View>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              marginHorizontal: 20,
              marginTop: 20,
              color: "#ff4a2a",
            }}
          >
            Password
          </Text>
          <View style={passwordStyles.border}>
            <View style={passwordStyles.rows}>
              <Text
                style={{
                  fontSize: 20,
                  color: "gray",
                }}
              >
                New Password:
              </Text>
              <TextInput
                placeholder="Type Here"
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                secureTextEntry
                style={{ fontSize: 20, color: "gray" }}
              />
            </View>
            <View style={passwordStyles.divider} />

            <View style={passwordStyles.rows}>
              <Text
                style={{
                  fontSize: 20,
                  color: "gray",
                }}
              >
                Confirm new Password:
              </Text>
              <TextInput
                placeholder="Type Here"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                autoCapitalize="none"
                secureTextEntry
                style={{ fontSize: 20, color: "gray" }}
              />
            </View>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Pressable
              style={{
                backgroundColor: "#ff4a2a",
                borderRadius: 10,
                marginTop: 5,
                marginBottom: 30,
                width: "80%",
              }}
              onPress={changePassword}
            >
              <ToastContainer />

              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "#e8e1db",
                  marginVertical: 3,
                }}
              >
                Change Password
              </Text>
            </Pressable>
          </View>
        </View>
        <Text>{"\n\n\n\n\n"}</Text>
      </ScrollView>
    </>
  );
}