import { useEffect, useState } from "react";
import { View, Text, Pressable, ScrollView, Image } from "react-native";
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
          <Pressable
            onPress={() =>
              navigate("/settings/profile", { state: "isLoggedIn" })
            }
            style={settingStyles.viewProfile}
          >
            <View
              style={settingStyles.viewProfileTitle}
              accessibilityLabel="profileInfo"
              accessible={true}
            >
              <Text
                style={settingStyles.usernameText}
                accessibilityLabel="name"
                accessible={true}
              >
                {name}
              </Text>
              <Text
                style={settingStyles.usernameText}
                accessibilityLabel="email"
                accessible={true}
              >
                {email}
              </Text>
              <Text style={settingStyles.profileSubtitle}>
                View Profile Information
              </Text>
            </View>
            <KeyboardArrowRightIcon />
          </Pressable>
          <View style={settingStyles.menuDivider} />

          <Pressable
            onPress={() => navigate("/account", { state: "isLoggedIn" })}
            style={settingStyles.menuOptions}
          >
            <Text
              style={settingStyles.menuOptionsTxt}
              accessibilityLabel="accountSettings"
              accessible={true}
            >
              Account Settings
            </Text>

            <KeyboardArrowRightIcon />
          </Pressable>
          <View style={settingStyles.menuDivider} />

          <Pressable
            style={settingStyles.menuOptions}
            onPress={() => navigate("/about")}
          >
            <Text style={settingStyles.menuOptionsTxt}>
              About Us & Feedback
            </Text>

            <KeyboardArrowRightIcon />
          </Pressable>
          <View style={settingStyles.menuDivider} />
          <Pressable onPress={logout} style={{ padding: 20 }}>
            <Text
              style={settingStyles.logOut}
              accessibilityLabel="logOut"
              accessible={true}
            >
              Log out
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
}
