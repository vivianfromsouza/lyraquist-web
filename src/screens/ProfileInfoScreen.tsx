// Worked on by: Vivian D'Souza
import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Pressable,
  Alert,
  TextInput,
  Image,
} from "react-native";
import { ArrowBackOutline } from "react-ionicons";

import SimpleLineIcon from "react-simple-line-icons";
import UserReaderWriter from "../services/UserReaderWriter";
import { getAuth, signOut, updateEmail } from "firebase/auth";
import LocalFirebaseClient from "../services/firebase/LocalFirebaseClient";
import { ImageSourcePropType } from "react-native";
import yellowLogo from "../assets/yellow_small.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFirebase } from "../services/firebase/FirebaseContext";

const windowWidth = Dimensions.get("window").width; //screen flexibility on devices
export default function ProfileInfoScreen() {
  const navigate = useNavigate();
  // const location = useLocation();
  // const { setIsLoggedIn } = location.state;
  const [name, setName] = useState<string>("");
  const [newName, setNewName] = useState<string>("");
  const [email, setEmail] = useState<string>();
  const [newEmail, setNewEmail] = useState<string>("");

  const auth = getAuth(LocalFirebaseClient);
  const { handleSignOut } = useFirebase();

  // function handleSignOut() {
  //   signOut(auth)
  //     .then(() => {
  //       navigate("/login");
  //       console.log("SIGNED OUT");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  // calls UserReaderWriter to write username change to DB
  async function changeUsername() {
    if (newName === undefined || newName.trim() == "") {
      /*DO NOTHING*/
    } else {
      await UserReaderWriter.writeUserName(newName.trim()).then(() => {
        setName(newName.trim());
        Alert.alert("Username changed successfully!");
      });
    }
  }

  // calls UserReaderWriter to write email change to DB
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
          // An error occurred
          // ...
          toast(
        "Invalid email address. Please check the email field and try again."
      );
        });

    //   await UserReaderWriter.writeUserEmail(newEmail.trim()).then((result) => {
    //     if (result) {
         
    //       console.log("email changed!");
    //     }
    //   });
    // } else {
      
    // }
  }

  useEffect(() => {
    try {
      // const handleUserInserts = (payload) => {
      //   getUserName();
      //   getEmail();
      // };

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
              accessibilityLabel="backToSettings"
              accessible={true}
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
              source={yellowLogo as ImageSourcePropType}
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
          <Text style={styles.title}>Profile Information</Text>
        </View>

        <View style={{ alignItems: "center", marginTop: 40 }}>
          <View style={styles.circle} />
          {/* <SimpleLineIcons
            style={{ position: "absolute", marginTop: 12 }}
            name="user"
            size={80}
            color="#303248"
          /> */}
          <SimpleLineIcon name="minus" />
        </View>

        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            marginHorizontal: 20,
            marginTop: 20,
            color: "#ff4a2a",
          }}
        >
          User Name
        </Text>
        <View style={styles.border}>
          <View style={styles.rows}>
            <Text
              style={{
                fontSize: 20,
                color: "gray",
              }}
            >
              Current Name:
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: "#303248",
                fontWeight: "bold",
              }}
              accessibilityLabel="currentName"
              accessible={true}
            >
              {name}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.rows}>
            <Text
              style={{
                fontSize: 20,
                color: "gray",
              }}
            >
              New Name:
            </Text>
            <TextInput
              placeholder="Type Here"
              value={newName}
              onChangeText={setNewName}
              autoCapitalize="none"
              inputMode="text"
              style={{ fontSize: 20, color: "gray", marginBottom: 10 }}
              accessibilityLabel="nameInput"
              accessible={true}
            />
          </View>
        </View>
        <Pressable
          style={{
            marginRight: 10,
            backgroundColor: "#ff4a2a",
            marginStart: 250,
            borderRadius: 10,
            marginTop: 5,
          }}
          onPress={changeUsername}
          accessibilityLabel="changeName"
          accessible={true}
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
            Change name
          </Text>
        </Pressable>

        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            marginHorizontal: 20,
            marginTop: 20,
            color: "#ff4a2a",
          }}
        >
          Email
        </Text>
        <View style={styles.border}>
          <View
            style={[
              styles.rows,
              { paddingRight: 10, gap: 10, marginRight: 112 },
            ]}
          >
            <Text
              style={{
                fontSize: 20,
                color: "gray",
              }}
            >
              Current Email:
            </Text>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 20,
                color: "#303248",
                fontWeight: "bold",
              }}
              accessibilityLabel="currentEmail"
              accessible={true}
            >
              {email}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.rows}>
            <Text
              style={{
                fontSize: 20,
                color: "gray",
              }}
            >
              New Email:
            </Text>
            <TextInput
              numberOfLines={1}
              placeholder="Type Here"
              value={newEmail}
              onChangeText={setNewEmail}
              autoCapitalize="none"
              inputMode="email"
              style={{ fontSize: 20, color: "gray", marginBottom: 10 }}
            />
          </View>
        </View>
        <Pressable
          style={{
            marginRight: 10,
            backgroundColor: "#ff4a2a",
            marginStart: 250,
            borderRadius: 10,
            marginTop: 5,
          }}
          onPress={changeEmail}
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
            Change Email
          </Text>
        </Pressable>
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
    marginTop: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  border: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "gray",
    width: "90%",
    marginRight: "auto",
    marginLeft: "auto",
  },
  divider: {
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
  },
});
