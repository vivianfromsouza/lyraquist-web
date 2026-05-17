import { useNavigate } from "react-router-dom";
import {
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { ArrowBackOutline, SearchOutline } from "react-ionicons";
import langStyles from "../styles/LanguageStyles";

const SearchBar = ({ searchTerm, handleSearch }) => {
  const navigate = useNavigate();

  return (
    <View style={langStyles.blueSection}>
      <TouchableOpacity
        onPress={() => navigate(-1)}
        style={langStyles.backButton}
      >
        <ArrowBackOutline color={"#00000"} height="25px" width="25px" />
      </TouchableOpacity>
      <View style={langStyles.searchBar}>
        <TextInput
          style={langStyles.searchInput}
          placeholder={"Search"}
          value={searchTerm}
          onChangeText={handleSearch}
        />
        <SearchOutline color={"#00000"} height="30px" width="30px" />
      </View>
    </View>
  );
};

export default SearchBar;
