import { ScrollView, Pressable, Text, TextInput, View, Dimensions } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import LockPersonOutlinedIcon from "@mui/icons-material/LockPersonOutlined";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import blueLogo from "../assets/blue_small.png";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import UserReaderWriter from "../services/UserReaderWriter";
import { ToastContainer, toast } from "react-toastify";
import ChangeNotification from "../components/ChangeNotification";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { dropdownLanguages } from "../constants/ProjectConstants";
import "react-datepicker/dist/react-datepicker.css";
import LyraquistHeader from "../components/LyraquistHeader";
import signupStyles from "../styles/SignupStyles";
import dropdownStyles from "../styles/DropdownStyles";
import { clearLocalSession } from "../services/spotifyAuth";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;
const windowHeight = Dimensions.get("window").height;

export default function SignUpScreen() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openTarget, setOpenTarget] = useState(false);

  const handleSetOpen = (value: boolean | ((prev: boolean) => boolean)) => {
    setOpen((prev) => {
      const next = typeof value === "function" ? value(prev) : value;
      if (next) setOpenTarget(false);
      return next;
    });
  };

  const handleSetOpenTarget = (
    value: boolean | ((prev: boolean) => boolean),
  ) => {
    setOpenTarget((prev) => {
      const next = typeof value === "function" ? value(prev) : value;
      if (next) setOpen(false);
      return next;
    });
  };
  const [name, setName] = useState<string | undefined>("");
  const [email, setEmail] = useState<string>("");
  const [confirmEmail, setConfirmEmail] = useState<string | undefined>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string | undefined>(
    "",
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [preferredLanguage, setPreferredLanguage] = useState<any>();
  const [targetLanguage, setTargetLanguage] = useState<any>();

  const [isTermsChecked, setIsTermsChecked] = useState<boolean>(false);

  const isEmailInvalid = email.length > 0 && !EMAIL_REGEX.test(email);
  const isConfirmEmailMismatch =
    !!confirmEmail && confirmEmail.length > 0 && confirmEmail !== email;
  const isPasswordTooShort =
    password.length > 0 && password.length < MIN_PASSWORD_LENGTH;
  const isConfirmPasswordMismatch =
    !!confirmPassword &&
    confirmPassword.length > 0 &&
    confirmPassword !== password;

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  function missingFieldsNotification() {
    return (
      <ChangeNotification
        text={
          "Error: Name, email, password, preferred language, and target language fields are required. Please check these fields and try again"
        }
      />
    );
  }

  function termsNotAgreedNotification() {
    return (
      <ChangeNotification
        text={"Error: Please agree to Terms and Conditions."}
      />
    );
  }

  function emailMismatchNotification() {
    return (
      <ChangeNotification
        text={
          "Couldn't create account. Email and confirm email field don't match. Please try again."
        }
      />
    );
  }

  function passwordMismatchNotification() {
    return (
      <ChangeNotification
        text={
          "Couldn't create account. Passwords don't match. Please try again."
        }
      />
    );
  }

  function sameLanguageNotification() {
    return (
      <ChangeNotification
        text={
          "Preferred and target language cannot be the same. Please try again."
        }
      />
    );
  }

  function accountCreatedNotification() {
    return (
      <ChangeNotification
        text={
          "Account successfully created! Login and continue to connct your Spotify account."
        }
      />
    );
  }

  function invalidEmailNotification() {
    return (
      <ChangeNotification
        text={
          "Could not make account. Please re-check your email address and try again."
        }
      />
    );
  }

  function weakPasswordNotification() {
    return (
      <ChangeNotification
        text={
          "Invalid Password. Make sure your password is 6+ characters long."
        }
      />
    );
  }

  function emailAlreadyInUseNotification() {
    return (
      <ChangeNotification
        text={
          "User profile already exists. Please log-in with your existing account."
        }
      />
    );
  }

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
      toast(missingFieldsNotification, {
        autoClose: 5000,
      });
    } else if (isTermsChecked != true) {
      toast(termsNotAgreedNotification, {
        autoClose: 5000,
      });
    } else if (email != confirmEmail) {
      toast(emailMismatchNotification, {
        autoClose: 5000,
      });
    } else if (password != confirmPassword) {
      toast(passwordMismatchNotification, {
        autoClose: 5000,
      });
    } else if (targetLanguage === preferredLanguage) {
      toast(sameLanguageNotification, {
        autoClose: 5000,
      });
    } else createProfile();
  }

  const createProfile = () => {
    try {
      // Clear any state left behind by a previously signed-in account in
      // this browser tab before creating the new one, so the new account
      // doesn't inherit the old account's cached Spotify session.
      clearLocalSession();

      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          if (user) {
            await UserReaderWriter.createProfile(
              auth.currentUser!.uid,
              name!.trim(),
              email!.trim(),
              preferredLanguage!,
              targetLanguage!,
            );

            toast(accountCreatedNotification, {
              autoClose: 5000,
            });
            navigate("/Login", {});
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          if (errorMessage.toString().includes("invalid-email")) {
            toast(invalidEmailNotification, {
              autoClose: 5000,
            });
          }

          if (errorMessage.toString().includes("weak-password")) {
            console.log("pswd too short");
            toast(weakPasswordNotification, {
              autoClose: 5000,
            });
          }

          if (errorMessage.toString().includes("email-already-in-use")) {
            toast(emailAlreadyInUseNotification, {
              autoClose: 5000,
            });
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView style={[signupStyles.container, { minHeight: windowHeight }]}>
      <LyraquistHeader title="Sign Up" logo={blueLogo} />

      <Text style={signupStyles.sectionTitle}>Set up your profile</Text>
      <Text style={signupStyles.sectionTxt}>
        Create an account so you can start your language learning journey
        through music
      </Text>

      <View style={signupStyles.sectionHeader}>
        <Text style={signupStyles.sectionLabel}>Profile Details</Text>
        <View style={signupStyles.sectionLabelLine} />
      </View>
      <View style={signupStyles.card}>
        <View style={signupStyles.cardInputRow}>
          <FontAwesomeIcon icon={faUserCircle} style={signupStyles.rowIcon} />
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="gray"
            value={name}
            onChangeText={setName}
            autoCapitalize="none"
            inputMode="text"
            style={signupStyles.rowInput}
            accessibilityLabel="nameInput"
            accessible={true}
          />
        </View>
        <View style={signupStyles.cardDivider} />
        <View style={signupStyles.cardInputRow}>
          <EmailOutlinedIcon style={signupStyles.rowIcon} />
          <View style={signupStyles.fieldColumn}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="gray"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              inputMode="email"
              style={signupStyles.fieldInput}
              accessibilityLabel="emailInput"
              accessible={true}
            />
            {isEmailInvalid && (
              <Text
                style={signupStyles.fieldError}
                accessibilityLabel="emailError"
              >
                Please enter a valid email address
              </Text>
            )}
          </View>
        </View>
        <View style={signupStyles.cardDivider} />
        <View style={signupStyles.cardInputRow}>
          <MarkEmailReadOutlinedIcon style={signupStyles.rowIcon} />
          <View style={signupStyles.fieldColumn}>
            <TextInput
              placeholder="Confirm Email"
              placeholderTextColor="gray"
              value={confirmEmail}
              onChangeText={setConfirmEmail}
              autoCapitalize="none"
              inputMode="email"
              style={signupStyles.fieldInput}
              accessibilityLabel="confirmEmailInput"
              accessible={true}
            />
            {isConfirmEmailMismatch && (
              <Text
                style={signupStyles.fieldError}
                accessibilityLabel="confirmEmailError"
              >
                Emails do not match
              </Text>
            )}
          </View>
        </View>
      </View>

      <View style={signupStyles.sectionHeader}>
        <Text style={signupStyles.sectionLabel}>Password</Text>
        <View style={signupStyles.sectionLabelLine} />
      </View>
      <Text style={signupStyles.alertTxt}>
        *Password must be 6 characters long
      </Text>
      <View style={signupStyles.card}>
        <View style={signupStyles.cardInputRow}>
          <LockOutlinedIcon style={signupStyles.rowIcon} />
          <View style={signupStyles.fieldColumn}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="gray"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              style={signupStyles.fieldInput}
              accessibilityLabel="passInput"
              accessible={true}
            />
            {isPasswordTooShort && (
              <Text
                style={signupStyles.fieldError}
                accessibilityLabel="passwordError"
              >
                Password must be at least {MIN_PASSWORD_LENGTH} characters
              </Text>
            )}
          </View>
          <Pressable onPress={toggleShowPassword}>
            {showPassword ? (
              <VisibilityOffOutlinedIcon />
            ) : (
              <VisibilityOutlinedIcon />
            )}
          </Pressable>
        </View>
        <View style={signupStyles.cardDivider} />
        <View style={signupStyles.cardInputRow}>
          <LockPersonOutlinedIcon style={signupStyles.rowIcon} />
          <View style={signupStyles.fieldColumn}>
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="gray"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              style={signupStyles.fieldInput}
              accessibilityLabel="confirmPassInput"
              accessible={true}
            />
            {isConfirmPasswordMismatch && (
              <Text
                style={signupStyles.fieldError}
                accessibilityLabel="confirmPasswordError"
              >
                Passwords do not match
              </Text>
            )}
          </View>
          <Pressable onPress={toggleShowConfirmPassword}>
            {showConfirmPassword ? (
              <VisibilityOffOutlinedIcon />
            ) : (
              <VisibilityOutlinedIcon />
            )}
          </Pressable>
        </View>
      </View>

      <View style={signupStyles.sectionHeader}>
        <Text style={signupStyles.sectionLabel}>Preferred Language</Text>
        <View style={signupStyles.sectionLabelLine} />
      </View>
      <Text style={signupStyles.noteText}>
        This is the language you are most familiar with. Songs will be
        translated into this language and word definitions pulled for this
        language
      </Text>
      <View
        style={[dropdownStyles.dropdownWrapper, { zIndex: open ? 2000 : 1000 }]}
      >
        <DropDownPicker
          style={dropdownStyles.dropdownContainer}
          textStyle={dropdownStyles.dropdownText}
          dropDownContainerStyle={dropdownStyles.dropdownContainer}
          open={open}
          value={preferredLanguage}
          items={dropdownLanguages}
          setOpen={handleSetOpen}
          setValue={setPreferredLanguage}
          placeholder="Select a language"
          zIndex={1000}
          zIndexInverse={1000}
        />
      </View>

      <View style={signupStyles.sectionHeader}>
        <Text style={signupStyles.sectionLabel}>Target Language</Text>
        <View style={signupStyles.sectionLabelLine} />
      </View>
      <Text style={signupStyles.noteText}>
        This is the language you are trying to learn at the moment. When you
        listen to music in your preferred language, lyrics and definitions will
        be provided in your target language.
      </Text>
      <View
        style={[
          dropdownStyles.dropdownWrapper,
          { zIndex: openTarget ? 2000 : 1000 },
        ]}
      >
        <DropDownPicker
          style={dropdownStyles.dropdownContainer}
          textStyle={dropdownStyles.dropdownText}
          dropDownContainerStyle={dropdownStyles.dropdownContainer}
          open={openTarget}
          value={targetLanguage}
          items={dropdownLanguages}
          setOpen={handleSetOpenTarget}
          setValue={setTargetLanguage}
          placeholder="Select a language"
          zIndex={1000}
          zIndexInverse={1000}
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

      <Pressable
        style={signupStyles.signupBtn}
        onPress={signUp}
        accessibilityLabel="signUpButton"
        accessible={true}
      >
        <Text style={signupStyles.signupBtnText}>Sign Up</Text>
      </Pressable>

      <ToastContainer />
    </ScrollView>
  );
}