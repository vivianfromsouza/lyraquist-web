// Worked on by: Vivian D'Souza
import { useState, useEffect } from "react";
import { View, Text, ScrollView, Pressable, TextInput } from "react-native";
import UserReaderWriter from "../services/UserReaderWriter";
import { getAuth, updateEmail } from "firebase/auth";
import LocalFirebaseClient from "../services/firebase/LocalFirebaseClient";
import redLogo from "../assets/red_small.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFirebase } from "../services/firebase/FirebaseContext";
import LyraquistHeader from "../components/LyraquistHeader";
import profileStyles from "../styles/ProfileStyles";

export default function ProfileInfoScreen() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [newName, setNewName] = useState<string>("");
  const [email, setEmail] = useState<string>();
  const [newEmail, setNewEmail] = useState<string>("");

  const auth = getAuth(LocalFirebaseClient);
  const { handleSignOut } = useFirebase();

  async function changeUsername() {
    if (newName !== undefined && newName.trim() !== "") {
      await UserReaderWriter.writeUserName(newName.trim()).then(() => {
        setName(newName.trim());
        toast("Username changed successfully!");
      });
    }
  }

  async function changeEmail() {
    if (newEmail.includes("@")) {
      updateEmail(auth.currentUser!, newEmail.trim())
        .then(() => {
          toast(
            "Email changed successfully! A verification link will be sent to your email before changes can take effect. Please verify and sign-in again."
          );
          navigate("/login");
          handleSignOut();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      toast(
        "Invalid email address. Please check the email field and try again."
      );
    }
  }

  useEffect(() => {
    try {
      getUserName();
      getEmail();

      // LocalSupabaseClient
      //   .channel("users")
      //   .on(
      //     "postgres_changes",
      //     { event: "*", schema: "public", table: "users" },
      //     handleUserInserts
      //   )
      //   .subscribe();
    } catch (err) {
      console.log(err);
    }
  }, []);
  function getUserName() {
    UserReaderWriter.getUserName().then((userName) => {
      setName(userName);
    });
  }

  function getEmail() {
    UserReaderWriter.getUserEmail().then((email) => {
      setEmail(email);
    });
  }

  return (
    <>
      <ScrollView style={profileStyles.full}>
        <LyraquistHeader title="Profile Information" logo={redLogo} />
        <View style={profileStyles.spacer}></View>
        <Text style={profileStyles.settingTitle}>User Name</Text>
        <View style={profileStyles.border}>
          <View style={profileStyles.rows}>
            <Text style={profileStyles.settingTxt}>Current Name:</Text>
            <Text
              style={profileStyles.currValue}
              accessibilityLabel="currentName"
              accessible={true}
            >
              {name}
            </Text>
          </View>
          <View style={profileStyles.divider} />
          <View style={profileStyles.rows}>
            <Text style={profileStyles.settingTxt}>New Name:</Text>
            <TextInput
              placeholder="Type Here"
              value={newName}
              onChangeText={setNewName}
              autoCapitalize="none"
              inputMode="text"
              style={profileStyles.settingTxt}
              accessibilityLabel="nameInput"
              accessible={true}
            />
          </View>
        </View>
        <Pressable
          style={profileStyles.button}
          onPress={changeUsername}
          accessibilityLabel="changeName"
          accessible={true}
        >
          <Text style={profileStyles.buttonTxt}>Change Name</Text>
        </Pressable>

        <Text style={profileStyles.settingTitle}>Email</Text>
        <View style={profileStyles.border}>
          <View style={profileStyles.rows}>
            <Text style={profileStyles.settingTxt}>Current Email:</Text>
            <Text
              numberOfLines={1}
              style={profileStyles.currValue}
              accessibilityLabel="currentEmail"
              accessible={true}
            >
              {email}
            </Text>
          </View>
          <View style={profileStyles.divider} />
          <View style={profileStyles.rows}>
            <Text style={profileStyles.settingTxt}>New Email:</Text>
            <TextInput
              numberOfLines={1}
              placeholder="Type Here"
              value={newEmail}
              onChangeText={setNewEmail}
              autoCapitalize="none"
              inputMode="email"
              style={profileStyles.settingTxt}
            />
          </View>
        </View>
        <Pressable style={profileStyles.button} onPress={changeEmail}>
          <Text style={profileStyles.buttonTxt}>Change Email</Text>
        </Pressable>
        <Text>{"\n\n\n\n\n"}</Text>
      </ScrollView>
    </>
  );
}
