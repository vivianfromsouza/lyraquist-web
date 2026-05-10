// Worked on by: Vivian D'Souza
import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import UserReaderWriter from "../services/UserReaderWriter";
import { useNavigate } from "react-router-dom";
import DropDownPicker from "react-native-dropdown-picker";
import { toast, ToastContainer } from "react-toastify";
import { useFirebase } from "../services/firebase/FirebaseContext";
import { dropdownLanguages, languages } from "../constants/ProjectConstants";
import settingStyles from "../styles/SettingStyles";
import { ArrowBackOutline } from "react-ionicons";

export default function AccountSettings() {
  const [openPref, setOpenPref] = useState(false);
  const [openTarget, setOpenTarget] = useState(false);
  const [name, setName] = useState<string>();
  const [prefLang, setPrefLang] = useState<string>();
  const [targetLang, setTargetLang] = useState<string>();
  const [newPrefLang, setNewPrefLang] = useState<any>();
  const [newTargetLang, setNewTargetLang] = useState<any>();
  const [password, setPassword] = useState<any>();
  const [confirmPassword, setConfirmPassword] = useState<any>();

  const navigate = useNavigate();
  const { handleSignOut } = useFirebase();

  useEffect(() => {
    try {
      getPrefLang();
      getTargetLang();
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
    navigate("/settings/reauth");
  }

  async function changePreferredLanguage() {
    if (newPrefLang != undefined && newPrefLang != prefLang) {
      const langName = languages.find((l) => l.code === newPrefLang)?.language;
      await UserReaderWriter.setPreferredLanguage(newPrefLang);
      setPrefLang(langName);
      toast("Success! Preferred Language changed to: " + newPrefLang);
    }
  }

  async function changeTargetLanguage() {
    if (newTargetLang != undefined && newTargetLang != targetLang) {
      const langName = languages.find(
        (l) => l.code === newTargetLang
      )?.language;
      await UserReaderWriter.setTargetLanguage(newTargetLang);
      setPrefLang(langName);
      toast("Success! Target Language changed to: " + newTargetLang);
    }
  }

  async function deleteAccount() {
    await UserReaderWriter.deleteAccount().then(() => {
      handleSignOut();
    });
  }

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

  const deleteAlert = () => {
    toast(
      name +
        ", Are you Sure? Deleting your account will remove all your data from the app. This data will not be retrievable once deleted.",
      { closeButton: deleteAlertButton }
    );
  };

  setCurrUserValues();

  return (
    <>
      <ToastContainer />
      <ScrollView style={settingStyles.container}>

        {/* Header */}
        <View style={settingStyles.accountHeader}>
          <View style={settingStyles.accountHeaderRow}>
            <TouchableOpacity onPress={() => navigate(-1)}>
              <ArrowBackOutline color={"#e8e1db"} height="25px" width="25px" />
            </TouchableOpacity>
            <Text style={settingStyles.accountHeaderTitle}>
              Account Settings
            </Text>
          </View>
        </View>

        {/* Password */}
        <View style={settingStyles.sectionHeader}>
          <Text style={settingStyles.sectionLabel}>Password</Text>
          <View style={settingStyles.sectionLabelLine} />
        </View>
        <View style={settingStyles.card}>
          <View style={settingStyles.cardRow}>
            <Text style={settingStyles.cardLabel}>New Password</Text>
            <TextInput
              placeholder="Enter password"
              placeholderTextColor="rgba(48,50,72,0.3)"
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              secureTextEntry
              style={settingStyles.cardInput}
            />
          </View>
          <View style={settingStyles.cardDivider} />
          <View style={settingStyles.cardRow}>
            <Text style={settingStyles.cardLabel}>Confirm Password</Text>
            <TextInput
              placeholder="Confirm password"
              placeholderTextColor="rgba(48,50,72,0.3)"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              autoCapitalize="none"
              secureTextEntry
              style={settingStyles.cardInput}
            />
          </View>
        </View>
        <Pressable style={settingStyles.actionBtn} onPress={changePassword}>
          <Text style={settingStyles.actionBtnText}>Change Password</Text>
        </Pressable>

        {/* Preferred Language */}
        <View style={[settingStyles.sectionHeader, { zIndex: 11000 }]}>
          <Text style={settingStyles.sectionLabel}>Preferred Language</Text>
          <View style={settingStyles.sectionLabelLine} />
        </View>
        <View style={settingStyles.card}>
          <View style={settingStyles.cardRow}>
            <Text style={settingStyles.cardLabel}>Current</Text>
            <Text
              style={settingStyles.cardValue}
              accessibilityLabel="preferredLanguage"
              accessible={true}
            >
              {prefLang ?? "—"}
            </Text>
          </View>
        </View>
        <View style={[settingStyles.dropdownWrapper, { zIndex: 11000 }]}>
          <DropDownPicker
            open={openPref}
            value={newPrefLang}
            items={dropdownLanguages}
            setOpen={setOpenPref}
            setValue={setNewPrefLang}
            placeholder="Select new language..."
            zIndex={11000}
            zIndexInverse={1000}
          />
        </View>
        <Pressable
          style={settingStyles.actionBtn}
          onPress={changePreferredLanguage}
        >
          <Text style={settingStyles.actionBtnText}>Change Language</Text>
        </Pressable>

        {/* Target Language */}
        <View style={[settingStyles.sectionHeader, { zIndex: 10000 }]}>
          <Text style={settingStyles.sectionLabel}>Target Language</Text>
          <View style={settingStyles.sectionLabelLine} />
        </View>
        <View style={settingStyles.card}>
          <View style={settingStyles.cardRow}>
            <Text style={settingStyles.cardLabel}>Current</Text>
            <Text
              style={settingStyles.cardValue}
              accessibilityLabel="targetLanguage"
              accessible={true}
            >
              {targetLang ?? "—"}
            </Text>
          </View>
        </View>
        <View style={[settingStyles.dropdownWrapper, { zIndex: 10000 }]}>
          <DropDownPicker
            open={openTarget}
            value={newTargetLang}
            items={dropdownLanguages}
            setOpen={setOpenTarget}
            setValue={setNewTargetLang}
            placeholder="Select new language..."
            zIndex={10000}
            zIndexInverse={2000}
          />
        </View>
        <Pressable
          style={settingStyles.actionBtn}
          onPress={changeTargetLanguage}
        >
          <Text style={settingStyles.actionBtnText}>Change Language</Text>
        </Pressable>

        {/* Danger Zone */}
        <View style={settingStyles.sectionHeader}>
          <Text style={settingStyles.dangerSectionLabel}>Danger Zone</Text>
          <View style={settingStyles.sectionLabelLine} />
        </View>
        <View style={settingStyles.dangerCard}>
          <Text style={settingStyles.dangerText}>
            Deleting your account will permanently remove all your data from the
            app. This cannot be undone.
          </Text>
          <Pressable style={settingStyles.deleteBtn} onPress={deleteAlert}>
            <Text style={settingStyles.deleteBtnText}>Delete My Account</Text>
          </Pressable>
        </View>

        <View style={settingStyles.spacer} />
      </ScrollView>
    </>
  );
}
