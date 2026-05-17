import { useNavigate } from "react-router-dom";
import {
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { ArrowBackOutline, SearchOutline } from "react-ionicons";
import langStyles from "../styles/LanguageStyles";
import searchStyles from "../styles/SearchStyles";

const SearchBar = ({ searchTerm, handleSearch }) => {
  const navigate = useNavigate();

  return (
    <View style={searchStyles.blueSection}>
      <TouchableOpacity
        onPress={() => navigate(-1)}
        style={searchStyles.backButton}
      >
        <ArrowBackOutline color={"#edc526"} height="25px" width="25px" />
      </TouchableOpacity>
      <View style={searchStyles.searchBar}>
        <TextInput
          style={searchStyles.searchInput}
          placeholder={"Search"}
          value={searchTerm}
          onChangeText={handleSearch}
        />
        <SearchOutline color={"#edc526"} height="25px" width="25px" />
      </View>
    </View>
  );
};

export default SearchBar;
