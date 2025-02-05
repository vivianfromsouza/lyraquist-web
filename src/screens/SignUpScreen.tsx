// Worked on by: Vivian D'Souza
// import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  PixelRatio,
  TouchableOpacity,
} from "react-native";
// import { firebase } from "@react-native-firebase/auth";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import LockPersonOutlinedIcon from "@mui/icons-material/LockPersonOutlined";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import UnfoldLessOutlinedIcon from "@mui/icons-material/UnfoldLessOutlined";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
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
import { Dropdown } from "primereact/dropdown";
//setting up pixelRatio, font scale is based off device size
const fontScale = PixelRatio.getFontScale();
const getFontSize = (size) => size / fontScale;
const windowWidth = Dimensions.get("window").width; //screen flexibility on devices

export default function SignUpScreen() {
  const navigate = useNavigate();
  const auth = getAuth();

  const [name, setName] = useState<string | undefined>("");
  const [email, setEmail] = useState<string>("");
  const [confirmEmail, setConfirmEmail] = useState<string | undefined>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string | undefined>(
    ""
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const languages = ["English", "Spanish", "French", "German"];

  const [preferredLanguage, setPreferredLanguage] = useState<string>();
  const [birthDate, setBirthDate] = useState<Date>(new Date());

  const [isTermsChecked, setIsTermsChecked] = useState<boolean>(false);

  const handleDateChange = ({ target }) => {
    console.log(target.value);
    setBirthDate(new Date(target.value));

    // const newDate = moment(target.value.timeStamp).format('YYYY-MM-DD');
    // setValue(newDate);
    //console.log(newDate); //always log "1970-01-01"
  };

  const currDate = new Date(Date.now());
  const legalDate = new Date(
    currDate.getFullYear() - 13,
    currDate.getMonth(),
    currDate.getDate()
  );

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  async function signUp() {
    // resets birthDate time stamp to midnight to avoid day of birthday rejections

    birthDate!.setHours(0);
    birthDate!.setMinutes(0);
    birthDate!.setSeconds(0);

    // birthdate is older than legaldate, true
    if (
      name == null ||
      name.trim() == "" ||
      email == null ||
      email.trim() == "" ||
      password == null ||
      password.trim() == "" ||
      preferredLanguage == null ||
      preferredLanguage.trim() == ""
    ) {
      toast(
        "Error: Name, email, password, and preferred language fields are required. Please check these fields and try again"
      );
      // return false;
    } else if (isTermsChecked != true) {
      // checks to see if terms and conditions were agreed to
      toast("Error: Please agree to Terms and Conditions.");
      // return false;
    } else if (birthDate! > legalDate) {
      toast(
        "Couldn't create account. You must be 13 years or older to use Lyraquist."
      );
    } else if (email != confirmEmail) {
      toast(
        "Couldn't create account. Email and confirm email field don't match. Please try again."
      );
    } else if (password != confirmPassword) {
      toast(
        "Couldn't create account. Passwords don't match. Please try again."
      );
    } else createProfile();
  }

  const createProfile = () => {
    try {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          // Signed up
          const user = userCredential.user;
          if (user) {
            await UserReaderWriter.createProfile(
              auth.currentUser!.uid,
              name!.trim(),
              email!.trim(),
              password!.trim(),
              preferredLanguage!
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
          // if the user supplied an invalid email
          if (errorMessage.toString().includes("invalid-email")) {
            toast(
              "Could not make account. Please re-check your email address and try again."
            );
          }

          // if the user supplied an invalid password
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
      <ScrollView style={styles.container}>
        <View
          style={{
            backgroundColor: "#edc526",
            width: windowWidth,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
          }}
        >
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
            >
              {/* <Ionicons style={{}} name="arrow-back" size={40} color="#303248" /> */}
              <ArrowBackOutline />
            </Pressable>
            <Image
              source={blueLogo as ImageSourcePropType}
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
          <Text
            style={{
              textAlign: "center",
              fontSize: getFontSize(30),
              fontWeight: "bold",
              color: "#303248",
              marginBottom: 10,
            }}
          >
            Sign Up
          </Text>
        </View>
        <Text
          style={{
            marginHorizontal: 20,
            fontSize: getFontSize(25),
            fontWeight: "bold",
            marginTop: 10,
            marginBottom: 5,
          }}
        >
          Set up your profile
        </Text>
        <Text
          style={{
            marginHorizontal: 20,
            fontSize: getFontSize(15),
            marginBottom: 30,
          }}
        >
          Create an account so you can start your language learning journey
          through music
        </Text>
        {/* FULL NAME */}
        <View
          style={{
            marginTop: 5,
            marginVertical: 3,
            borderWidth: 0.5,
            alignItems: "center",
            borderColor: "#AAAAAA",
            borderRadius: 10,
            alignSelf: "center",
            marginRight: "auto",
            marginLeft: "auto",
            width: "90%",
            flexDirection: "row",
            paddingEnd: 60,
            bottom: 15,
            gap: 10,
            paddingVertical: 3,
          }}
        >
          {/* <FontAwesome
      style={{ marginLeft: 5 }}
      name="user-circle-o"
      size={24}
      color="gray"
    /> */}
          <FontAwesomeIcon icon={faUserCircle} />

          <Image
            source={divider as ImageSourcePropType}
            style={{ height: 25 }}
          />
          <TouchableOpacity onPress={() => setName(name)} style={{ flex: 1 }}>
            <TextInput
              placeholder="Full Name"
              placeholderTextColor="gray"
              value={name}
              onChangeText={setName}
              autoCapitalize="none"
              inputMode="text"
              style={{ fontSize: getFontSize(17) }}
              accessibilityLabel="nameInput"
              accessible={true}
            />
          </TouchableOpacity>
        </View>

        {/* EMAIL */}
        <View
          style={{
            marginTop: 5,
            marginVertical: 3,
            borderWidth: 0.5,
            alignItems: "center",
            borderColor: "#AAAAAA",
            borderRadius: 10,
            alignSelf: "center",
            marginRight: "auto",
            marginLeft: "auto",
            width: "90%",
            flexDirection: "row",
            paddingEnd: 60,
            gap: 10,
            paddingVertical: 3,
          }}
        >
          {/* <MaterialCommunityIcons
      style={{ marginLeft: 5 }}
      name="email-outline"
      size={25}
      color="gray"
    /> */}
          <EmailOutlinedIcon />
          <Image
            source={divider as ImageSourcePropType}
            style={{ height: 25 }}
          />
          <TouchableOpacity onPress={() => setEmail(email)} style={{ flex: 1 }}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="gray"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              inputMode="email"
              style={{ fontSize: getFontSize(17) }}
              accessibilityLabel="emailInput"
              accessible={true}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginBottom: 20,
            marginTop: 5,
            marginVertical: 3,
            borderWidth: 0.5,
            alignItems: "center",
            borderColor: "#AAAAAA",
            borderRadius: 10,
            alignSelf: "center",
            marginRight: "auto",
            marginLeft: "auto",
            width: "90%",
            flexDirection: "row",
            paddingEnd: 60,
            gap: 10,
            paddingVertical: 3,
          }}
        >
          {/* <MaterialCommunityIcons
      style={{ marginLeft: 7 }}
      name="email-check-outline"
      size={25}
      color="gray"
    /> */}
          <MarkEmailReadOutlinedIcon />
          <Image
            source={divider as ImageSourcePropType}
            style={{ height: 25 }}
          />
          <TouchableOpacity
            onPress={() => setConfirmEmail(confirmEmail)}
            style={{ flex: 1 }}
          >
            <TextInput
              placeholder="Confirm Email"
              placeholderTextColor="gray"
              value={confirmEmail}
              onChangeText={setConfirmEmail}
              autoCapitalize="none"
              inputMode="email"
              style={{ fontSize: getFontSize(17) }}
              accessibilityLabel="confirmEmailInput"
              accessible={true}
            />
          </TouchableOpacity>
        </View>

        {/* PASSWORD */}
        <Text
          style={{
            marginHorizontal: 20,
            fontSize: getFontSize(12),
            color: "#ff4a2a",
          }}
        >
          *Password must be 6 characters long
        </Text>
        <View
          style={{
            marginTop: 5,
            marginVertical: 3,
            borderWidth: 0.5,
            alignItems: "center",
            borderColor: "#AAAAAA",
            borderRadius: 10,
            alignSelf: "center",
            marginRight: "auto",
            marginLeft: "auto",
            width: "90%",
            flexDirection: "row",
            paddingEnd: 60,
            gap: 10,
            paddingVertical: 3,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", gap: 10 }}>
            {/* <MaterialIcons
      style={{ marginLeft: 7 }}
      name="lock-outline"
      size={24}
      color="gray"
    /> */}
            <LockOutlinedIcon />
            <Image
              source={divider as ImageSourcePropType}
              style={{ height: 25 }}
            />
            <TouchableOpacity
              onPress={() => setPassword(password)}
              style={{ flex: 1 }}
            >
              <TextInput
                placeholder="Password"
                placeholderTextColor="gray"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                style={{
                  fontSize: getFontSize(17),
                  width: "90%",
                  paddingRight: 13,
                }}
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
        <View
          style={{
            marginBottom: 20,
            marginTop: 5,
            marginVertical: 3,
            borderWidth: 0.5,
            alignItems: "center",
            borderColor: "#AAAAAA",
            borderRadius: 10,
            alignSelf: "center",
            marginRight: "auto",
            marginLeft: "auto",
            width: "90%",
            flexDirection: "row",
            paddingEnd: 60,
            gap: 10,
            paddingVertical: 3,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", gap: 10 }}>
            {/* <MaterialCommunityIcons
      style={{ marginLeft: 7 }}
      name="lock-check-outline"
      size={24}
      color="gray"
    /> */}
            <LockPersonOutlinedIcon />
            <Image
              source={divider as ImageSourcePropType}
              style={{ height: 25 }}
            />
            <TouchableOpacity onPress={() => setName(name)} style={{ flex: 1 }}>
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="gray"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                style={{
                  fontSize: getFontSize(17),
                  width: "90%",
                  paddingRight: 13,
                }}
                accessibilityLabel="confirmPassInput"
                accessible={true}
              />
            </TouchableOpacity>
          </View>
          <View>
            {/* <MaterialCommunityIcons
      name={showConfirmPassword ? "eye-off" : "eye"}
      size={24}
      color="gray"
      style={{}}
      onPress={toggleShowConfirmPassword}
    /> */}

            <Pressable onPress={toggleShowConfirmPassword}>
              {showPassword ? (
                <VisibilityOffOutlinedIcon />
              ) : (
                <VisibilityOutlinedIcon />
              )}
            </Pressable>
          </View>
        </View>

        {/* PREFERRED LANGUAGE */}
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: getFontSize(17), color: "gray" }}>
            Language for App Features
          </Text>
          <Text style={styles.noteText}>
            Songs will be translated into this language and word definitions
            pulled for this language
          </Text>
          {/* <Dropdown
      // style={[styles.dropdown, isFocus && { borderColor: "green" }]}
      containerStyle={{ zIndex: 60, top: -100 }}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={languageItems}
      maxHeight={1000}
      labelField="label"
      valueField="language"
      placeholder="Select Preferred Langauge"
      onChange={(preferredLanguage) => {
        setPreferredLanguage(preferredLanguage.language);
      }}
      accessibilityLabel="langInput"
    /> */}
          <Dropdown
            value={preferredLanguage}
            onChange={(e) => setPreferredLanguage(e.value)}
            options={languages}
            optionLabel="name"
            placeholder="Select a language"
            className="w-full md:w-14rem"
          />
        </View>
        {/* BIRTHDAY */}
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: getFontSize(17), color: "gray" }}>
            Birth Date
          </Text>
          <Text
            style={{
              fontSize: getFontSize(12),
              color: "#ff4a2a",
              marginBottom: 7,
            }}
          >
            *Users must be at least 13 years old
          </Text>
          <View
            style={{
              borderWidth: 0.5,
              borderRadius: 10,
              borderColor: "gray",
              marginBottom: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginVertical: 5,
                marginHorizontal: 10,
                alignItems: "center",
              }}
            >
              {/* <MaterialCommunityIcons
      style={{ marginRight: 10 }}
      name="cake-variant-outline"
      size={24}
      color="gray"
    /> */}
              <CakeOutlinedIcon />
              <View
                style={{
                  height: "90%",
                  width: 0.5,
                  backgroundColor: "#AAAAAA",
                  marginRight: 10,
                }}
              />
              {/* <TextInput
      placeholder={birthDate!.toLocaleDateString()}
      onPressIn={() => setOpen(true)}
      accessibilityLabel="date"
      accessible={true}
    /> */}
              {/* <DatePicker
      modal
      theme="auto"
      open={open}
      mode={"date"}
      date={birthDate}
      onConfirm={(date) => {
        setOpen(false);
        setBirthDate(date);
      }}
      onCancel={() => {
        setOpen(false);
      }}
    /> */}
              {/* <DatePicker onChange={setBirthDate(birthDate)} value={birthDate} /> */}
              <input
                aria-label="Date"
                type="date"
                value={birthDate}
                onChange={handleDateChange}
              />
              <View style={{ marginLeft: 220 }}>
                {/* <Entypo style={{}} name="select-arrows" size={24} color="gray" /> */}
                <UnfoldLessOutlinedIcon />
              </View>
            </View>
          </View>
        </View>
        {/* ACCEPT TERMS & POLICIES */}
        <View
          style={{
            marginHorizontal: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <BouncyCheckbox
      id="terms"
      onPress={(isChecked: boolean) => {
        setIsTermsChecked(true);
      }}
      fillColor="#5bc8a6"
      accessibilityLabel="conditions"
      accessible={true}
    /> */}
          <Checkbox
            value="checkedA"
            inputProps={{
              "aria-label": "Checkbox A",
            }}
            onChange={() => {
              setIsTermsChecked(true);
            }}
          />

          <Text style={{ fontSize: getFontSize(12), color: "gray" }}>
            I have read and agree to the terms and conditions.{" "}
          </Text>
        </View>
        {/* SIGN UP BUTTON *. THIS BUTTON DOESNT WORK WITH TOAST + SIGNUP ACTION, why?/}
        {/* <Pressable
          onClick={signUp}
          style={{
            marginHorizontal: 20,
            backgroundColor: "#edc526",
            borderRadius: 10,
            marginTop: 20,
          }}
          accessibilityLabel="signupButton"
          accessible={true}
        >
          <Text
            style={{
              textAlign: "center",
              marginVertical: 8,
              fontWeight: "bold",
              fontSize: getFontSize(20),
              color: "#303248",
            }}
          >
            Sign Up
          </Text>
        </Pressable> */}
        {/* <StatusBar style="auto" /> */}
      </ScrollView>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={signUp}
      >
        <ToastContainer />
        Sign Up
      </button>
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
    marginBottom: 1,
  },
  dropdown: {
    textAlign: "center",
    paddingLeft: 10,
    height: 35,
    borderColor: "rgba(183, 193, 189, 0.9)",
    borderWidth: 0.5,
    borderRadius: 8,
    marginBottom: 20,
  },
  placeholderStyle: {
    fontSize: getFontSize(16),
    color: "gray",
  },
  selectedTextStyle: {
    fontSize: getFontSize(16),
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: getFontSize(16),
  },
  noteText: {
    paddingLeft: 5,
    fontSize: getFontSize(12),
    color: "gray",
    textAlign: "left",
    marginBottom: 7,
  },
});
