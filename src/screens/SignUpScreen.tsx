// Worked on by: Vivian D'Souza
import {
  ScrollView,
  Pressable,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import LockPersonOutlinedIcon from "@mui/icons-material/LockPersonOutlined";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import { ArrowBackOutline } from "react-ionicons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ImageSourcePropType } from "react-native";
import blueLogo from "../assets/blue_small.png";
import divider from "../assets/divider.png";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import UserReaderWriter from "../services/UserReaderWriter";
import { ToastContainer, toast } from "react-toastify";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { dropdownLanguages } from "../constants/ProjectConstants";
import "react-datepicker/dist/react-datepicker.css";
import signupStyles from "../styles/SignupStyles";

export default function SignUpScreen() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openTarget, setOpenTarget] = useState(false);
  const [name, setName] = useState<string | undefined>("");
  const [email, setEmail] = useState<string>("");
  const [confirmEmail, setConfirmEmail] = useState<string | undefined>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string | undefined>(
    ""
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [preferredLanguage, setPreferredLanguage] = useState<any>();
  const [targetLanguage, setTargetLanguage] = useState<any>();

  const [isTermsChecked, setIsTermsChecked] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  async function signUp() {
    if (
      name == null ||
      name.trim() == "" ||
      email == null ||
      email.trim() == "" ||
      password == null ||
      password.trim() == "" ||
      preferredLanguage == null ||
      preferredLanguage.trim() == "" ||
      targetLanguage == null ||
      targetLanguage.trim() == ""
    ) {
      toast(
        "Error: Name, email, password,preferred language, and target language fields are required. Please check these fields and try again"
      );
    } else if (isTermsChecked != true) {
      toast("Error: Please agree to Terms and Conditions.");
    } else if (email != confirmEmail) {
      toast(
        "Couldn't create account. Email and confirm email field don't match. Please try again."
      );
    } else if (password != confirmPassword) {
      toast(
        "Couldn't create account. Passwords don't match. Please try again."
      );
    } else if (targetLanguage === preferredLanguage) {
      toast(
        "Preferred and target language cannot be the same. Please try again."
      );
    } else createProfile();
  }

  const createProfile = () => {
    try {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          if (user) {
            await UserReaderWriter.createProfile(
              auth.currentUser!.uid,
              name!.trim(),
              email!.trim(),
              password!.trim(),
              preferredLanguage!,
              targetLanguage!
            );

            toast(
              "Account successfully created! Login and continue to connct your Spotify account."
            );
            navigate("/Login", {});
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          if (errorMessage.toString().includes("invalid-email")) {
            toast(
              "Could not make account. Please re-check your email address and try again."
            );
          }

          if (errorMessage.toString().includes("weak-password")) {
            console.log("pswd too short");
            toast(
              "Invalid Password. Make sure your password is 6+ characters long."
            );
          }

          if (errorMessage.toString().includes("email-already-in-use")) {
            toast(
              "User profile already exists. Please log-in with your existing account."
            );
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <ScrollView style={signupStyles.container}>
        <View style={signupStyles.header}>
          <View style={signupStyles.logo}>
            <Pressable
              style={signupStyles.arrowLocation}
              onPress={() => navigate(-1)}
            >
              <ArrowBackOutline color={"#00000"} height="25px" width="25px" />
            </Pressable>
            <Image
              source={blueLogo as ImageSourcePropType}
              style={signupStyles.logoImage}
            />
            <View style={signupStyles.flexView}></View>
          </View>
          <Text style={signupStyles.title}>Sign Up</Text>
        </View>
        <Text style={signupStyles.sectionTitle}>Set up your profile</Text>
        <Text style={signupStyles.sectionTxt}>
          Create an account so you can start your language learning journey
          through music
        </Text>
        <View style={signupStyles.userLocation}>
          <FontAwesomeIcon icon={faUserCircle} style={signupStyles.userIcon} />

          <Image source={divider as ImageSourcePropType} />
          <TouchableOpacity
            onPress={() => setName(name)}
            style={signupStyles.inputFlex}
          >
            <TextInput
              placeholder="Full Name"
              placeholderTextColor="gray"
              value={name}
              onChangeText={setName}
              autoCapitalize="none"
              inputMode="text"
              style={signupStyles.inputText}
              accessibilityLabel="nameInput"
              accessible={true}
            />
          </TouchableOpacity>
        </View>

        {/* EMAIL */}
        <View style={signupStyles.userLocation}>
          <EmailOutlinedIcon style={signupStyles.userIcon} />
          <Image source={divider as ImageSourcePropType} />
          <TouchableOpacity
            onPress={() => setEmail(email)}
            style={signupStyles.inputFlex}
          >
            <TextInput
              placeholder="Email"
              placeholderTextColor="gray"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              inputMode="email"
              style={signupStyles.inputText}
              accessibilityLabel="emailInput"
              accessible={true}
            />
          </TouchableOpacity>
        </View>
        <View style={signupStyles.userLocation}>
          <MarkEmailReadOutlinedIcon style={signupStyles.userIcon} />
          <Image source={divider as ImageSourcePropType} />
          <TouchableOpacity
            onPress={() => setConfirmEmail(confirmEmail)}
            style={signupStyles.inputFlex}
          >
            <TextInput
              placeholder="Confirm Email"
              placeholderTextColor="gray"
              value={confirmEmail}
              onChangeText={setConfirmEmail}
              autoCapitalize="none"
              inputMode="email"
              style={signupStyles.inputText}
              accessibilityLabel="confirmEmailInput"
              accessible={true}
            />
          </TouchableOpacity>
        </View>

        <Text style={signupStyles.alertTxt}>
          *Password must be 6 characters long
        </Text>
        <View style={signupStyles.passwordLocation}>
          <View style={signupStyles.passwordIcon}>
            <LockOutlinedIcon />
            <Image source={divider as ImageSourcePropType} />
            <TouchableOpacity
              onPress={() => setPassword(password)}
              style={signupStyles.inputFlex}
            >
              <TextInput
                placeholder="Password"
                placeholderTextColor="gray"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                style={signupStyles.passwordTxt}
                accessibilityLabel="passInput"
                accessible={true}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Pressable onPress={toggleShowPassword}>
              {showPassword ? (
                <VisibilityOffOutlinedIcon />
              ) : (
                <VisibilityOutlinedIcon />
              )}
            </Pressable>
          </View>
        </View>
        <View style={signupStyles.passwordLocation}>
          <View style={signupStyles.passwordIcon}>
            <LockPersonOutlinedIcon />
            <Image source={divider as ImageSourcePropType} />
            <TouchableOpacity
              onPress={() => setName(name)}
              style={signupStyles.inputFlex}
            >
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="gray"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                style={signupStyles.passwordTxt}
                accessibilityLabel="confirmPassInput"
                accessible={true}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Pressable onPress={toggleShowConfirmPassword}>
              {showPassword ? (
                <VisibilityOffOutlinedIcon />
              ) : (
                <VisibilityOutlinedIcon />
              )}
            </Pressable>
          </View>
        </View>

        <View style={signupStyles.prefLangVisibility}>
          <Text style={signupStyles.langHeader}>Preferred Language</Text>
          <Text style={signupStyles.noteText}>
            This is the language you are most familiar with. Songs will be
            translated into this language and word definitions pulled for this
            language
          </Text>

          <DropDownPicker
            open={open}
            value={preferredLanguage}
            items={dropdownLanguages}
            setOpen={setOpen}
            setValue={setPreferredLanguage}
            placeholder="Select a language"
          />
        </View>

        <View style={signupStyles.targetLangVisibility}>
          <Text style={signupStyles.langHeader}>Target Language</Text>
          <Text style={signupStyles.noteText}>
            This is the language you are trying to learn at the moment. When you
            listen to music in your preferred language, lyrics and definitions
            will be provided in your target language.
          </Text>

          <DropDownPicker
            open={openTarget}
            value={targetLanguage}
            items={dropdownLanguages}
            setOpen={setOpenTarget}
            setValue={setTargetLanguage}
            placeholder="Select a language"
          />
        </View>

        <View style={signupStyles.checkboxLocation}>
          <Checkbox
            value="checkedA"
            inputProps={{
              "aria-label": "Checkbox A",
            }}
            onChange={() => {
              setIsTermsChecked(true);
            }}
          />

          <Text style={signupStyles.checkboxTxt}>
            I have read and agree to the terms and conditions.{" "}
          </Text>
        </View>

        <View style={{ marginHorizontal: 450, marginBottom: 30 }}>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={signUp}
            style={signupStyles.signupBtn}
          >
            <ToastContainer />
            Sign Up
          </button>
        </View>
      </ScrollView>
    </>
  );
}
