// Worked on by: Vivian D'Souza
import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import UserReaderWriter from "../services/UserReaderWriter";
import { getAuth, updatePassword } from "firebase/auth";
import redLogo from "../assets/red_small.png";
import LocalFirebaseClient from "../services/firebase/LocalFirebaseClient";
import { useNavigate } from "react-router-dom";
import DropDownPicker from "react-native-dropdown-picker";
import { toast, ToastContainer } from "react-toastify";
import { useFirebase } from "../services/firebase/FirebaseContext";
import { dropdownLanguages, languages } from "../constants/ProjectConstants";
import LyraquistHeader from "../components/LyraquistHeader";
import settingStyles from "../styles/SettingStyles";

export default function AccountSettings() {
  const [openPref, setOpenPref] = useState(false);
  const [openTarget, setOpenTarget] = useState(false);
  const [name, setName] = useState<string>();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [prefLang, setPrefLang] = useState<string>();
  const [targetLang, setTargetLang] = useState<string>();
  const [newPrefLang, setNewPrefLang] = useState<any>();
  const [newTargetLang, setNewTargetLang] = useState<any>();
  const auth = getAuth(LocalFirebaseClient);
  const navigate = useNavigate();
  const { handleSignOut } = useFirebase();

  useEffect(() => {
    try {
      // const handleUserInserts = (payload) => {
      //   console.log("Change received!", payload);
      //   getPrefLang();
      // };
      getPrefLang();
      getTargetLang();
      // LocalSupabaseClient.channel("users")
      //   .on(
      //     "postgres_changes",
      //     { event: "*", schema: "public", table: "users" },
      //     handleUserInserts
      //   )
      //   .subscribe();
    } catch (err) {
      console.log(err);
    }
  }, [prefLang, targetLang]);

  function getPrefLang() {
    UserReaderWriter.getPreferredLanguage().then((lang) => {
      setPrefLang(languages.find((l) => l.code === lang)?.language);
    });
  }

  function getTargetLang() {
    UserReaderWriter.getTargetLanguage().then((lang) => {
      setTargetLang(languages.find((l) => l.code === lang)?.language);
    });
  }

  function setCurrUserValues() {
    UserReaderWriter.getUserName().then((name) => setName(name));
  }

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
          navigate("/login");

          handleSignOut();
        })
        .catch((error) => {
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

  async function changePreferredLanguage() {
    if (newPrefLang != undefined && newPrefLang != prefLang) {
      const langName = languages.find((l) => l.code === newPrefLang)?.language;
      console.log("newLang", langName);

      await UserReaderWriter.setPreferredLanguage(newPrefLang);
      setPrefLang(langName);

      toast(
        "Success! Preferred Language successfully changed to: " + newPrefLang
      );
    }
  }

  async function changeTargetLanguage() {
    if (newTargetLang != undefined && newTargetLang != targetLang) {
      const langName = languages.find(
        (l) => l.code === newTargetLang
      )?.language;
      await UserReaderWriter.setTargetLanguage(newTargetLang);
      setPrefLang(langName);

      toast(
        "Success! Target Language successfully changed to: " + newTargetLang
      );
    }
  }

  async function deleteAccount() {
    await UserReaderWriter.deleteAccount().then(() => {
      handleSignOut();
    });
  }

  const deleteAlert = () => {
    toast(
      name +
        ", Are you Sure? Deleting your account will remove all your data from the app. This data will not be retrievable once deleted.",
      { closeButton: deleteAlertButton }
    );
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
      <ScrollView style={settingStyles.container}>
        <LyraquistHeader title="Account Settings" logo={redLogo} />
        <View>
          <Text style={settingStyles.settingTitle}>Account Info</Text>
          <View style={settingStyles.border}>
            <View style={settingStyles.settingRow}>
              <Text style={settingStyles.settingText}>Account Type: </Text>
            </View>
          </View>
        </View>

        <View>
          <Text style={settingStyles.settingTitle}>Password</Text>
          <View style={settingStyles.border}>
            <View style={settingStyles.settingRow}>
              <Text style={settingStyles.settingText}>New Password:</Text>
              <TextInput
                placeholder="Type Here"
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                secureTextEntry
                style={settingStyles.settingText}
              />
            </View>
            <View style={settingStyles.divider} />

            <View style={settingStyles.settingRow}>
              <Text style={settingStyles.settingText}>
                Confirm new Password:
              </Text>
              <TextInput
                placeholder="Type Here"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                autoCapitalize="none"
                secureTextEntry
                style={settingStyles.settingText}
              />
            </View>
          </View>
          <View style={settingStyles.btnContainer}>
            <Pressable
              style={settingStyles.settingsButton}
              onPress={changePassword}
            >
              <ToastContainer />

              <Text style={settingStyles.settingsBtnText}>Change Password</Text>
            </Pressable>
          </View>
        </View>

        <View style={settingStyles.zIndexValue}>
          <Text style={settingStyles.settingTitle}>Preferred Language</Text>
          <View style={settingStyles.border}>
            <View style={settingStyles.settingCol}>
              <Text style={settingStyles.settingText}>Current Language:</Text>
              <Text
                style={settingStyles.currentTxt}
                accessibilityLabel="preferredLanguage"
                accessible={true}
              >
                {prefLang}
              </Text>
            </View>
            <View style={settingStyles.settingRow} />
            <View style={settingStyles.divider} />

            <View style={settingStyles.settingRow}>
              <Text style={settingStyles.settingText}>New Language:</Text>
              <View>
                <DropDownPicker
                  open={openPref}
                  value={newPrefLang}
                  items={dropdownLanguages}
                  setOpen={setOpenPref}
                  setValue={setNewPrefLang}
                />
              </View>
            </View>
          </View>
          <View style={settingStyles.btnContainer}>
            <Pressable
              style={settingStyles.settingsButton}
              onPress={() => {
                changePreferredLanguage();
              }}
            >
              <Text style={settingStyles.settingsBtnText}>Change Langauge</Text>
            </Pressable>
          </View>
        </View>

        <View style={settingStyles.zIndexValue}>
          <Text style={settingStyles.settingTitle}>Target Language</Text>
          <View style={settingStyles.border}>
            <View style={settingStyles.settingCol}>
              <Text style={settingStyles.settingText}>Current Language:</Text>
              <Text
                style={settingStyles.currentTxt}
                accessibilityLabel="targetLanguage"
                accessible={true}
              >
                {targetLang}
              </Text>
            </View>
            <View style={settingStyles.settingRow} />
            <View style={settingStyles.divider} />

            <View style={settingStyles.settingRow}>
              <Text style={settingStyles.settingText}>New Language:</Text>
              <View>
                <DropDownPicker
                  open={openTarget}
                  value={newTargetLang}
                  items={dropdownLanguages}
                  setOpen={setOpenTarget}
                  setValue={setNewTargetLang}
                />
              </View>
            </View>
          </View>
          <View style={settingStyles.btnContainer}>
            <Pressable
              style={settingStyles.settingsButton}
              onPress={() => {
                changeTargetLanguage();
              }}
            >
              <Text style={settingStyles.settingsBtnText}>Change Langauge</Text>
            </Pressable>
          </View>
        </View>

        <View>
          <Text style={settingStyles.settingTitle}>Account Deletion</Text>
          <Text style={settingStyles.alertText}>
            Deleting your Account will remove all data from the app. Your data
            will NOT be retrievable.
          </Text>
          <Pressable style={settingStyles.deleteButton} onPress={deleteAlert}>
            {/* <ToastContainer closeButton={deleteAlertButton} /> */}

            <Text style={settingStyles.deleteButtonText}>
              Delete My Account
            </Text>
          </Pressable>
        </View>
        <Text>{"\n\n\n\n\n"}</Text>
      </ScrollView>
    </>
  );
}