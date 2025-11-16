// Worked on by: Vivian D'Souza
import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
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

const windowWidth = Dimensions.get("window").width; //screen flexibility on devices
export default function ChangePasswordScreen() {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>();

  const auth = getAuth(LocalFirebaseClient);
  const navigate = useNavigate();
  const { handleSignOut } = useFirebase();

  async function changePassword() {
    if (password!.trim().length < 6) {
      toast(
        "Password is too short. Password must be at least 6 characters long."
      );
    } else if (password == confirmPassword) {
      updatePassword(auth.currentUser!, password)
        .then(() => {
          toast(
            "Password changed successfully! You will now need to sign-in again with your new password."
          );
          setTimeout(() => {
            handleSignOut();
            navigate("/login");
          }, 4000);
        })
        .catch((error) => {
          toast(
            "Could not change password. Need recent login. Please log out, sign in, and try again."
          );
          console.log("Error changing password: ", error);
        });
    } else {
      toast("Passwords don't match. Please try again.");
    }
  }

  return (
    <>
      <ScrollView style={styles.full}>
        <View style={styles.introSect}>
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
          <Text style={styles.title}>Change Password</Text>
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
          <View style={styles.border}>
            <View style={styles.rows}>
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
            <View style={styles.divider} />

            <View style={styles.rows}>
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
const styles = StyleSheet.create({
  full: {
    flex: 1,
    backgroundColor: "#e8e1db",
    height: "91vh",
  },
  introSect: {
    flex: 1,
    width: windowWidth,
    backgroundColor: "#303248",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "#e8e1db",
    marginBottom: 20,
  },
  circle: {
    height: 150,
    width: 150,
    borderRadius: 100,
    borderColor: "#303248",
    borderWidth: 2,
    marginTop: -15,
  },
  rows: {
    flexDirection: "row",
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  border: {
    borderRadius: 10,
    borderWidth: 2,
    marginHorizontal: 10,
    borderColor: "gray",
    paddingVertical: 10,
  },
  divider: {
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    paddingTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  deleteAccount: {
    marginVertical: 10,
    textAlign: "center",
    backgroundColor: "#ff4a2a",
    fontSize: 25,
    fontWeight: "bold",
    color: "#e8e1db",
    marginHorizontal: 30,
    borderRadius: 20,
  },
  dropdown: {
    marginRight: 4,
  },

  placeholderStyle: {
    fontSize: 16,
    color: "gray",
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
