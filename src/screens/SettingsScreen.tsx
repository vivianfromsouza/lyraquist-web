import { useEffect, useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import UserReaderWriter from "../services/UserReaderWriter";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useNavigate } from "react-router-dom";
import redLogo from "../assets/red_small.png";
import axios from "axios";
import TokenReaderWriter from "../services/firebase/TokenReaderWriter";
import { useFirebase } from "../services/firebase/FirebaseContext";
import settingStyles from "../styles/SettingStyles";
import LyraquistHeader from "../components/LyraquistHeader";

export default function SettingsScreen() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const { handleSignOut } = useFirebase();

  function logout() {
    handleSignOut();

    TokenReaderWriter.getAccessToken().then((accessCode) => {
      axios({
        url: "https://api.spotify.com/v1/me/player/pause",
        method: "PUT",
        headers: {
          authorization: "Bearer " + accessCode,
        },
      })
        .then(async (res) => {
          console.log(res);
        })
        .catch((err) => {
          return err;
        });
    });
  }

  function setCurrUserName() {
    UserReaderWriter.getUserName().then((name) => setName(name));
  }

  function setCurrUserEmail() {
    UserReaderWriter.getUserEmail().then((email) => setEmail(email));
  }

  useEffect(() => {
    setCurrUserName();
    setCurrUserEmail();

    // LocalSupabaseClient
    //   .channel("users")
    //   .on(
    //     "postgres_changes",
    //     { event: "*", schema: "public", table: "users" },
    //     handleUserInserts
    //   )
    //   .subscribe();
  });

  return (
    <>
      <ScrollView style={settingStyles.container}>
        <View>
          <LyraquistHeader title="Settings" logo={redLogo} />

          {/* Profile Card */}
          <Pressable
            onPress={() =>
              navigate("/settings/profile", { state: "isLoggedIn" })
            }
            style={settingStyles.profileCard}
            accessibilityLabel="profileInfo"
            accessible={true}
          >
            <View style={settingStyles.profileAvatar}>
              <Text style={settingStyles.profileAvatarText}>
                {name?.charAt(0)?.toUpperCase() ?? "?"}
              </Text>
            </View>
            <View style={settingStyles.profileInfo}>
              <Text
                style={settingStyles.profileName}
                accessibilityLabel="name"
                accessible={true}
              >
                {name}
              </Text>
              <Text
                style={settingStyles.profileEmail}
                accessibilityLabel="email"
                accessible={true}
              >
                {email}
              </Text>
              <Text style={settingStyles.profileLink}>View Profile</Text>
            </View>
            <KeyboardArrowRightIcon />
          </Pressable>

          {/* Menu Card */}
          <View style={settingStyles.menuCard}>
            <Pressable
              onPress={() => navigate("/account", { state: "isLoggedIn" })}
              style={settingStyles.menuRow}
              accessibilityLabel="accountSettings"
              accessible={true}
            >
              <Text style={settingStyles.menuRowText}>Account Settings</Text>
              <KeyboardArrowRightIcon />
            </Pressable>
            <View style={settingStyles.menuInternalDivider} />
            <Pressable
              style={settingStyles.menuRow}
              onPress={() => navigate("/about")}
            >
              <Text style={settingStyles.menuRowText}>About Us & Feedback</Text>
              <KeyboardArrowRightIcon />
            </Pressable>
          </View>

          {/* Log Out */}
          <View style={settingStyles.logOutContainer}>
            <Pressable onPress={logout}>
              <Text
                style={settingStyles.logOut}
                accessibilityLabel="logOut"
                accessible={true}
              >
                Log Out
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
