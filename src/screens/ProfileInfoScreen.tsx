// Worked on by: Vivian D'Souza
import { useState, useEffect } from "react";
import { View, Text, ScrollView, Pressable, TextInput } from "react-native";
import UserReaderWriter from "../services/UserReaderWriter";
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
  const { handleSignOut } = useFirebase();

  async function changeUsername() {
    if (newName !== undefined && newName.trim() !== "") {
      await UserReaderWriter.writeUserName(newName.trim()).then(() => {
        setName(newName.trim());
        setNewName("");
        toast("Username changed successfully!");
      });
    }
  }

  async function changeEmail() {
    if (newEmail.includes("@")) {
      await UserReaderWriter.writeUserEmail(newEmail.trim())
        .then(() => {
          toast(
            "Email changed successfully! A verification link will be sent to your email before changes can take effect. Please verify and sign-in again."
          );
          setTimeout(() => {
            handleSignOut();
            navigate("/login");
          }, 4000);
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
    <ScrollView style={profileStyles.full}>
      <LyraquistHeader title="Profile Information" logo={redLogo} />

      <View style={profileStyles.sectionHeader}>
        <Text style={profileStyles.sectionLabel}>Username</Text>
        <View style={profileStyles.sectionLabelLine} />
      </View>
      <View style={profileStyles.card}>
        <View style={profileStyles.cardRow}>
          <Text style={profileStyles.cardLabel}>Current Name</Text>
          <Text
            style={profileStyles.cardValue}
            accessibilityLabel="currentName"
            accessible={true}
            numberOfLines={1}
          >
            {name}
          </Text>
        </View>
        <View style={profileStyles.cardDivider} />
        <View style={profileStyles.cardRow}>
          <Text style={profileStyles.cardLabel}>New Name</Text>
          <TextInput
            placeholder="Type here"
            value={newName}
            onChangeText={setNewName}
            autoCapitalize="none"
            inputMode="text"
            style={profileStyles.cardInput}
            accessibilityLabel="nameInput"
            accessible={true}
          />
        </View>
      </View>
      <Pressable
        style={profileStyles.actionBtn}
        onPress={changeUsername}
        accessibilityLabel="changeName"
        accessible={true}
      >
        <Text style={profileStyles.actionBtnText}>Change Name</Text>
      </Pressable>

      <View style={profileStyles.sectionHeader}>
        <Text style={profileStyles.sectionLabel}>Email</Text>
        <View style={profileStyles.sectionLabelLine} />
      </View>
      <View style={profileStyles.card}>
        <View style={profileStyles.cardRow}>
          <Text style={profileStyles.cardLabel}>Current Email</Text>
          <Text
            numberOfLines={1}
            style={profileStyles.cardValue}
            accessibilityLabel="currentEmail"
            accessible={true}
          >
            {email}
          </Text>
        </View>
        <View style={profileStyles.cardDivider} />
        <View style={profileStyles.cardRow}>
          <Text style={profileStyles.cardLabel}>New Email</Text>
          <TextInput
            placeholder="Type here"
            value={newEmail}
            onChangeText={setNewEmail}
            autoCapitalize="none"
            inputMode="email"
            style={profileStyles.cardInput}
          />
        </View>
      </View>
      <Pressable style={profileStyles.actionBtn} onPress={changeEmail}>
        <Text style={profileStyles.actionBtnText}>Change Email</Text>
      </Pressable>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}
