// Worked on by: Tanvi Singh
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { ArrowBackOutline, SearchOutline } from "react-ionicons";
import SearchSpotify from "../services/SearchSpotify";
import { useNavigate } from "react-router-dom";
import SongCard from "../components/Song";

export default function SearchScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      setIsLoading(true); // Set loading state to true
      if (searchTerm.trim() === "") {
        setSearchResults([]); // If search term is empty, clear search results
        return;
      }
      // Fetch search results from Spotify
      const searchResultsData = await SearchSpotify.searchForSong(searchTerm);
      if (searchResultsData && searchResultsData.length > 0) {
        // Format search results data
        const formattedData = searchResultsData.map((item) => ({
          artist:
            item.artists.length > 0 ? item.artists[0].name : "Unknown Artist",
          spotifyURL: "spotify:track:" + item.id,
          imageURL:
            item.album.images.length > 0 ? item.album.images[0].url : null,
          name: item.name,
          album: item.album.name,
          duration: item.duration_ms,
          explicit: item.explicit,
        }));

        const filteredData = formattedData.filter(
          (item) => item.explicit == false
        );

        setSearchResults(filteredData);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  const renderSearchResultItem = ({ item }) => <SongCard item={item} />;

  return (
    <>
      <View style={{ height: "91vh" }}>
        <SafeAreaView style={styles.container}>
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
                placeholder="Search Spotify"
                value={searchTerm}
                onChangeText={(text) => setSearchTerm(text)}
                accessibilityLabel="searchInput"
                accessible={true}
              />
              <SearchOutline color={"#00000"} height="30px" width="30px" />
            </View>
          </View>
          <View style={styles.space} />
          <View style={styles.noteAndButtonContainer}>
            <TouchableOpacity
              onPress={() => navigate("/SearchLanguages")}
              style={styles.languageButton}
            >
              <Text style={styles.buttonText}>Search by Language</Text>
            </TouchableOpacity>
          </View>
          {isLoading && <Text style={{ paddingLeft: 10 }}>Searching...</Text>}
          {searchTerm.trim() !== "" && (
            <FlatList
              data={searchResults}
              keyExtractor={(item) => item.spotifyURL}
              renderItem={renderSearchResultItem}
              numColumns={7}
              contentContainerStyle={styles.flatListContainer}
              accessibilityLabel="searchResultItem"
              accessible={true}
              style={{ marginBottom: 20 }}
            />
          )}
          {searchTerm.trim() == "" && (
            <View
              style={{ flex: 1, height: 100, backgroundColor: "#e8e1db" }}
            />
          )}
        </SafeAreaView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8e1db",
    height: "80vh",
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
  searchResultItem: {
    flex: 1,
    margin: 5,
    alignItems: "center",
  },
  albumContainer: {
    alignItems: "center",
  },
  coverImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    color: "black",
    textAlign: "center",
    marginTop: 5,
  },
  artist: {
    color: "#989898",
    textAlign: "center",
  },
  flatListContainer: {
    paddingHorizontal: 5,
  },
  languageButton: {
    marginHorizontal: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    paddingVertical: 10,
  },
  buttonText: {
    fontWeight: "bold",
  },
  space: {
    height: 20,
  },
  noteAndButtonContainer: {
    marginHorizontal: 10,
    marginBottom: 10,
  },
  noteText: {
    marginBottom: 10,
    marginLeft: 10,
  },
});
