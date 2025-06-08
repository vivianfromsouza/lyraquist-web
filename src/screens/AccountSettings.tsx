// Worked on by: Vivian D'Souza
import { useEffect, useState } from "react";
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
import UserReaderWriter from "../services/UserReaderWriter";
// import auth from "@react-native-firebase/auth";
import { getAuth, updatePassword } from "firebase/auth";
import { ArrowBackOutline } from "react-ionicons";
import { ImageSourcePropType } from "react-native";
import redLogo from "../assets/red_small.png";
import LocalFirebaseClient from "../services/firebase/LocalFirebaseClient";
import { useLocation, useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { toast, ToastContainer } from "react-toastify";
import { useFirebase } from "../services/firebase/FirebaseContext";

const windowWidth = Dimensions.get("window").width; //screen flexibility on devices
export default function AccountSettings() {
  const location = useLocation();
  const { setIsLoggedIn } = location.state;
  const [name, setName] = useState<string>();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [preferredLanguage, setPreferredLanguage] = useState<string>();
  const [currentLanguage, setCurrentLanguage] = useState<string>();
  const auth = getAuth(LocalFirebaseClient);
  const navigate = useNavigate();
  const { handleSignOut } = useFirebase();

  const languages = ["English", "Spanish", "French", "German"];

  useEffect(() => {
    try {
      // const handleUserInserts = (payload) => {
      //   console.log("Change received!", payload);
      //   getPrefLang();
      // };

      getPrefLang();

      // LocalSupabaseClient.channel("users")
      //   .on(
      //     "postgres_changes",
      //     { event: "*", schema: "public", table: "users" },
      //     handleUserInserts
      //   )
      //   .subscribe();

      // db()
      //   .ref("/users/" + auth().currentUser.uid + "/preferredLanguage/")
      //   .on("value", () => {
      //     getPrefLang();
      //   });
    } catch (err) {
      console.log(err);
    }
  }, []);

  // signs user out
  // function handleSignOut() {
  //   signOut(auth)
  //     .then(() => {
  //       navigate("/login");
  //       console.log("SIGNED OUT");
  //       localStorage.setItem("isLoggedIn", "false");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  function getPrefLang() {
    UserReaderWriter.getPreferredLanguage().then((lang) => {
      setCurrentLanguage(lang);
    });
  }

  function setCurrUserValues() {
    UserReaderWriter.getUserName().then((name) => setName(name));
  }

  // calls UserReaderWriter to write password change to DB
  async function changePassword() {
    // if password is too short
    if (password!.trim().length < 6) {
      toast(
        "Password is too short. Password must be at least 6 characters long."
      );
    } else if (password == confirmPassword) {
      updatePassword(auth.currentUser!, password)
        .then(() => {
          // Update successful.
          toast(
            "Password changed successfully! You will now need to sign-in again with your new password."
          );
          navigate("/login");

          handleSignOut();
        })
        .catch((error) => {
          // An error ocurred
          // ...
          toast(
            "Could not change password. Need recent login. Please log out, sign in, and try again."
          );
          console.log("Error changing password: ", error);
        });

      // await UserReaderWriter.writeUserPassword(password!.trim()).then(
      //   (result) => {
      //     if (result) {
      //       toast(
      //         "Password changed successfully! You will now need to sign-in again with your new password."
      //       );
      //     }
      //   }
      // );
    } else {
      toast("Passwords don't match. Please try again.");
    }
  }

  // changes user's preferred language
  async function changePreferredLanguage() {
    if (preferredLanguage != undefined && preferredLanguage != currentLanguage) {
      await UserReaderWriter.setPreferredLanguage(preferredLanguage);
      setCurrentLanguage(preferredLanguage);
      toast(
        "Success! Preferred Language successfully changed to: " +
          preferredLanguage
      );
    }
  }

  // deletes the current user's account
  async function deleteAccount() {
    await UserReaderWriter.deleteAccount().then(() => {
      // signOut();
      setIsLoggedIn(false);
    });
  }

  // modal prompting user to confirm delete
  const deleteAlert = () => {
    toast(
      name +
        ", Are you Sure? Deleting your account will remove all your data from the app. This data will not be retrievable once deleted.",
      { closeButton: deleteAlertButton }
    );
    // Alert.alert(
    //   name + ", Are you Sure?",
    //   "Deleting your account will remove all your data from the app. This data will not be retrievable once deleted.",
    //   [
    //     {
    //       text: "Cancel",
    //       onPress: () => console.log("Cancel Pressed"),
    //       style: "cancel",
    //     },
    //     {
    //       text: "Delete my Account",
    //       onPress: () => deleteAccount(),
    //     },
    //   ]
  };

  const deleteAlertButton = () => {
    return (
      <>
        <button
          onClick={() => console.log("Cancel Pressed")}
          className="border border-red-500 rounded-md px-2 py-2 text-red-500 ml-auto"
        >
          Cancel
        </button>
        <button
          onClick={deleteAccount}
          className="border border-red-500 rounded-md px-2 py-2 text-red-500 ml-auto"
        >
          Delete
        </button>
      </>
    );
  };

  setCurrUserValues();

  return (
    <>
      <ScrollView style={styles.full}>
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
              {/* <Ionicons
                style={{}}
                name="arrow-back"
                size={40}
                color="#e8e1db"
              /> */}

              <ArrowBackOutline />
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
          <Text style={styles.title}>Account Settings</Text>
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
            Account Info
          </Text>
          <View style={styles.border}>
            <View style={styles.rows}>
              <Text
                style={{
                  fontSize: 20,
                  color: "gray",
                }}
              >
                Account Type:{" "}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  color: "#303248",
                  fontWeight: "bold",
                }}
              >
                Full Access
              </Text>
            </View>
          </View>
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
          <Pressable
            style={{
              marginRight: 10,
              backgroundColor: "#ff4a2a",
              marginStart: 200,
              borderRadius: 10,
              marginTop: 5,
              marginBottom: 30,
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
            Preferred Language
          </Text>
          <View style={styles.border}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "gray",
                }}
              >
                Current Language:
              </Text>
              <Text
                style={{ fontSize: 20, color: "#303248", fontWeight: "bold" }}
                accessibilityLabel="preferredLanguage"
                accessible={true}
              >
                {currentLanguage}
              </Text>
            </View>
            <View style={styles.rows}>
              <View style={styles.divider} />
            </View>

            <Dropdown
              value={preferredLanguage}
              onChange={(e) => setPreferredLanguage(e.value)}
              options={languages}
              optionLabel="name"
              placeholder="Select a language"
              className="w-full md:w-14rem"
            />
          </View>
          <Pressable
            style={{
              marginRight: 10,
              backgroundColor: "#ff4a2a",
              marginStart: 200,
              borderRadius: 10,
              marginTop: 5,
              marginBottom: 30,
            }}
            onPress={() => {
              changePreferredLanguage();
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                color: "#e8e1db",
                marginVertical: 3,
              }}
            >
              Change Langauge
            </Text>
          </Pressable>
        </View>

        <View>
          <View style={styles.divider} />
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              marginHorizontal: 20,
              marginTop: 20,
              color: "#ff4a2a",
            }}
          >
            Account Deletion
          </Text>
          <Text
            style={{
              marginHorizontal: 20,
              color: "#ff4a2a",
              marginBottom: 10,
            }}
          >
            Deleting your Account will remove all data from the app. Your data
            will NOT be retrievable.
          </Text>
          <Pressable
            style={{
              marginHorizontal: 50,
              borderRadius: 20,
              backgroundColor: "#ff4a2a",
              marginTop: 20,
            }}
            onPress={deleteAlert}
          >
            {/* <ToastContainer closeButton={deleteAlertButton} /> */}

            <Text style={styles.deleteAccount}>Delete My Account</Text>
          </Pressable>
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
    textAlign: "center",
    paddingLeft: 10,
    height: 35,
    borderColor: "rgba(183, 193, 189, 0.9)",
    borderWidth: 0.5,
    borderRadius: 8,
    marginBottom: 20,
    marginHorizontal: 10,
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
