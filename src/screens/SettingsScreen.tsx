import { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import UserReaderWriter from "../services/UserReaderWriter";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SimpleLineIcon from "react-simple-line-icons";
import { getAuth } from "firebase/auth";
import LocalFirebaseClient from "../services/firebase/LocalFirebaseClient";
import { useNavigate } from "react-router-dom";
import { ImageSourcePropType } from "react-native";
import redLogo from "../assets/red_small.png";
import axios from "axios";
import TokenReaderWriter from "../services/firebase/TokenReaderWriter";
import { useLocalStorage } from "usehooks-ts";
import { useFirebase } from "../services/firebase/FirebaseContext";
import { ArrowBackOutline } from "react-ionicons";

const windowWidth = Dimensions.get("window").width; //screen flexibility on devices
export default function SettingsScreen() {
  const navigate = useNavigate();
  // const location = useLocation();
  // const { setIsLoggedIn } = location.state;
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const auth = getAuth(LocalFirebaseClient);
  // const currentUser = auth.currentUser?.uid;
  const { handleSignOut } = useFirebase();

  // signs user out
  function logout() {
    handleSignOut();
    // signOut(auth)
    //   .then(() => {
    //     setValue("false");

    //     console.log("SIGNED OUT");
    //     navigate("/login");
    //     localStorage.setItem("isLoggedIn", "false");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    TokenReaderWriter.getAccessToken().then((accessCode) => {
      // Makes request to Spotify API for song search
      axios({
        url: "https://api.spotify.com/v1/me/player/pause", // Remove "&limit=1"
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

  // gets current values for user name
  function setCurrUserName() {
    UserReaderWriter.getUserName().then((name) => setName(name));
  }

  // gets current values for user's email
  function setCurrUserEmail() {
    UserReaderWriter.getUserEmail().then((email) => setEmail(email));
  }

  useEffect(() => {
    // reflects changes to user name

    // const handleUserInserts = () => {
    //   setCurrUserName(); // get current user values, use to reflect changes
    //   setCurrUserEmail(); // get current user values, use to reflect changes
    // };

    setCurrUserName(); // get current user values, use to reflect changes
    setCurrUserEmail(); // get current user values, use to reflect changes

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
      <ScrollView style={styles.container}>
        <View>
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
            </View>
            <Text style={styles.title}>Settings</Text>
          </View>
          {/* THE PROFILE INFORMATION SECTION */}

          <Pressable
            onPress={() =>
              navigate("/settings/profile", { state: "isLoggedIn" })
            }
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: "auto",
              marginLeft: "auto",
              marginTop: 30,
            }}
          >
            <View style={{}}>
              <View style={styles.circle} />
              {/* <SimpleLineIcons
                style={{ marginLeft: 30 }}
                name="user"
                size={40}
                color="#303248"
              /> */}
              <SimpleLineIcon name="icon-user" />
            </View>
            <View
              style={{ marginLeft: 30 }}
              accessibilityLabel="profileInfo"
              accessible={true}
            >
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "#303248" }}
                accessibilityLabel="name"
                accessible={true}
              >
                {name}
                {email}
              </Text>
              <Text style={{ color: "gray" }}>View Profile Information</Text>
            </View>
            {/* <MaterialIcons
              style={{ alignSelf: "flex-end", marginLeft: 80 }}
              name="keyboard-arrow-right"
              size={40}
              color="#303248"
            /> */}
            <KeyboardArrowRightIcon />
          </Pressable>
          <View
            style={{
              borderBottomColor: "gray",
              borderBottomWidth: 0.5,
              marginTop: 30,
              width: "90%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
          {/* THE ACCOUNT SETTINGS SECTION */}
          <Pressable
            onPress={() => navigate("/account", { state: "isLoggedIn" })}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: "auto",
              marginLeft: "auto",
              marginTop: 25,
            }}
          >
            <Text
              style={{
                marginLeft: 25,
                fontSize: 20,
                fontWeight: "bold",
                color: "#303248",
              }}
              accessibilityLabel="accountSettings"
              accessible={true}
            >
              Account Settings
            </Text>
            {/* <MaterialIcons
              style={{ alignSelf: "flex-end", marginLeft: 150 }}
              name="keyboard-arrow-right"
              size={40}
              color="#303248"
            /> */}
            <KeyboardArrowRightIcon />
          </Pressable>
          <View
            style={{
              borderBottomColor: "gray",
              borderBottomWidth: 0.5,
              marginTop: 25,
              width: "90%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
          {/* THE PRIVACY & SOCIAL SECTION */}
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: "auto",
              marginLeft: "auto",
              marginTop: 25,
            }}
            onPress={() => navigate("/privacy")}
          >
            <Text
              style={{
                marginLeft: 25,
                fontSize: 20,
                fontWeight: "bold",
                color: "#303248",
              }}
            >
              Privacy and Socials
            </Text>
            {/* <MaterialIcons
              style={{ alignSelf: "flex-end", marginLeft: 127 }}
              name="keyboard-arrow-right"
              size={40}
              color="#303248"
            /> */}
            <KeyboardArrowRightIcon />
          </Pressable>
          <View
            style={{
              borderBottomColor: "gray",
              borderBottomWidth: 0.5,
              marginTop: 25,
              width: "90%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
          {/* THE ABOUT & FEEDBACK SECTION */}
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: "auto",
              marginLeft: "auto",
              marginTop: 25,
            }}
            onPress={() => navigate("/about")}
          >
            <Text
              style={{
                marginLeft: 25,
                fontSize: 20,
                fontWeight: "bold",
                color: "#303248",
              }}
            >
              About Us & Feedback
            </Text>
            {/* <MaterialIcons
              style={{ alignSelf: "flex-end", marginLeft: 109 }}
              name="keyboard-arrow-right"
              size={40}
              color="#303248"
            /> */}
            <KeyboardArrowRightIcon />
          </Pressable>
          <View
            style={{
              borderBottomColor: "gray",
              borderBottomWidth: 0.5,
              marginTop: 25,
              width: "90%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
          {/* LOG OUT BUTTON */}
          <Pressable onPress={logout} style={{ padding: 20 }}>
            <Text
              style={styles.logOut}
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

const styles = StyleSheet.create({
  container: {
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
  signOut: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 50,
  },
  delete: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 50,
    marginBottom: 100,
  },
  circle: {
    height: 60,
    width: 60,
    borderRadius: 50,
    borderColor: "#303248",
    borderWidth: 2,
    position: "absolute",
    marginLeft: 20,
    marginTop: -6,
  },
  logOut: {
    borderRadius: 15,
    overflow: "hidden",
    marginTop: 20,
    textAlign: "center",
    backgroundColor: "#ff4a2a",
    fontSize: 25,
    fontWeight: "bold",
    color: "#e8e1db",
    marginHorizontal: 100,
  },
});
