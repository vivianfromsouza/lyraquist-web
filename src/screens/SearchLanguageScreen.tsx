import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useNavigate } from "react-router-dom";
import searchStyles from "../styles/SearchStyles";
import SearchBar from "../components/SearchBar";

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
    language.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <ScrollView style={searchStyles.container}>
        <SearchBar
          searchTerm={searchTerm}
          handleSearch={(text) => setSearchTerm(text)}
        />
        <Text style={searchStyles.languagesTitle}>Languages</Text>
        <View style={searchStyles.languagesContainer}>
          {filteredLanguages.map((language) => renderLanguageItem(language))}
        </View>
      </ScrollView>
    </>
  );
}