import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ArrowBackOutline } from "react-ionicons";
import { ImageSourcePropType } from "react-native";
import redLogo from "../assets/red_small.png";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import reauthStyles from "../styles/ReauthStyles";

export default function ReauthCredentialsScreen() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  async function authenticate() {
    if (email && password) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("/settings/change-password");
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
          if (error.message.toString().includes("invalid")) {
            toast(
              "Could not authenticate. Incorrect credentials. Please re-check your email address and/or password and try again.",
              {
                className: "toast-custom",
              },
            );
          }
        });
    }
  }

  return (
    <>
      <ScrollView style={reauthStyles.full}>
        <View style={reauthStyles.introSect}>
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
          <Text style={reauthStyles.title}>Reauthenticate</Text>
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
            Sign in again to change your password
          </Text>
          <View style={reauthStyles.border}>
            <View style={reauthStyles.rows}>
              <Text
                style={{
                  fontSize: 20,
                  color: "gray",
                }}
              >
                Username:
              </Text>
              <TextInput
                placeholder="Username"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                style={{ fontSize: 20, color: "gray" }}
              />
            </View>
            <View style={reauthStyles.divider} />

            <View style={reauthStyles.rows}>
              <Text
                style={{
                  fontSize: 20,
                  color: "gray",
                }}
              >
                Password:
              </Text>
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
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
              onPress={authenticate}
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
                Authenticate
              </Text>
            </Pressable>
          </View>
        </View>
        <Text>{"\n\n\n\n\n"}</Text>
      </ScrollView>
    </>
  );
}