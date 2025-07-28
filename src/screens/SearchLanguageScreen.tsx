import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { ArrowBackOutline, SearchOutline } from "react-ionicons";
import { useNavigate } from "react-router-dom";

// Defining type for route names
type RouteName = "Spanish" | "German" | "French";

// Functional component for language selection screen
export default function SearchLanguage() {
  // State variables
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  // use this link for country flags: https://flags.fmcdn.net/
  const [languages] = useState([
    // State for list of languages
    {
      id: 1,
      name: "Spanish",
      imageUrl: "https://flagcdn.com/w550/es.png",
    },
    {
      id: 2,
      name: "German",
      imageUrl: "https://flagcdn.com/w550/de.png",
    },
    {
      id: 3,
      name: "French",
      imageUrl: "https://flagcdn.com/w550/fr.png",
    },
  ]);

  const navigate = useNavigate();

  const handleLanguageClick = (languageName: RouteName) => {
    navigate(("/language/" + languageName.toLowerCase()) as never);
  };

  const renderLanguageItem = (language: {
    id: number;
    name: string;
    imageUrl: string;
  }) => {
    return (
      <TouchableOpacity
        key={language.id}
        onPress={() => handleLanguageClick(language.name as RouteName)}
        style={styles.languageItem}
      >
        <Image
          source={{ uri: language.imageUrl }}
          style={styles.playlistImage}
        />
        <Text style={styles.languageText}>{language.name}</Text>
      </TouchableOpacity>
    );
  };

  const filteredLanguages = languages.filter((language) =>
    language.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.blueSection}>
          <TouchableOpacity
            onPress={() => navigate(-1)}
            style={styles.backButton}
          >
            <ArrowBackOutline color={"#00000"} height="25px" width="25px" />
          </TouchableOpacity>

          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search Languages"
              value={searchTerm}
              onChangeText={(text) => setSearchTerm(text)}
            />
            <SearchOutline color={"#00000"} height="250px" width="250px" />
          </View>
        </View>

        <Text style={styles.languagesTitle}>Languages</Text>
        <View style={styles.languagesContainer}>
          {filteredLanguages.map((language) => renderLanguageItem(language))}
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
  blueSection: {
    backgroundColor: "#303248",
    paddingVertical: 20,
    paddingHorizontal: 10,
    paddingTop: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    backgroundColor: "#e8e1db",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  searchInput: {
    flex: 1,
    color: "#000",
    paddingHorizontal: 10,
  },
  languagesTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  languagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  languageItem: {
    alignItems: "center",
    marginBottom: 20,
  },
  playlistImage: {
    width: 150,
    height: 150,
    borderRadius: 20,
    marginBottom: 5,
  },
  languageText: {
    fontWeight: "bold",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e8e1db",
  },
});
