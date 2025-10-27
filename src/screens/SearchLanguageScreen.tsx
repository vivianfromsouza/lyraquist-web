import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { ArrowBackOutline, SearchOutline } from "react-ionicons";
import { useNavigate } from "react-router-dom";
import searchStyles from "../styles/SearchStyles";

type RouteName = "Spanish" | "German" | "French";

export default function SearchLanguage() {
  const [searchTerm, setSearchTerm] = useState("");
  // use this link for country flags: https://flags.fmcdn.net/
  const [languages] = useState([
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
        style={searchStyles.languageItem}
      >
        <Image
          source={{ uri: language.imageUrl }}
          style={searchStyles.playlistImage}
        />
        <Text style={searchStyles.languageText}>{language.name}</Text>
      </TouchableOpacity>
    );
  };

  const filteredLanguages = languages.filter((language) =>
    language.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <ScrollView style={searchStyles.container}>
        <View style={searchStyles.blueSection}>
          <TouchableOpacity
            onPress={() => navigate(-1)}
            style={searchStyles.backButton}
          >
            <ArrowBackOutline color={"#00000"} height="25px" width="25px" />
          </TouchableOpacity>

          <View style={searchStyles.searchBar}>
            <TextInput
              style={searchStyles.searchInput}
              placeholder="Search Languages"
              value={searchTerm}
              onChangeText={(text) => setSearchTerm(text)}
            />
            <SearchOutline color={"#00000"} height="30px" width="30px" />
          </View>
        </View>

        <Text style={searchStyles.languagesTitle}>Languages</Text>
        <View style={searchStyles.languagesContainer}>
          {filteredLanguages.map((language) => renderLanguageItem(language))}
        </View>
      </ScrollView>
    </>
  );
}
