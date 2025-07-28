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

// Define the type for the navigation object
// type RootStackParamList = {
//   Play: { item: any };
//   SearchLanguage: undefined;
//   Trending: undefined;
// };

// type SearchScreenNavigationProp = NavigationProp<RootStackParamList, "Play">;

export default function SearchScreen() {
  // State variables
  const [searchTerm, setSearchTerm] = useState(""); // State variable to store search term
  const [searchResults, setSearchResults] = useState([]); // State variable to store search results
  const [isLoading, setIsLoading] = useState(false); // State variable to manage loading state
  const navigate = useNavigate();

  // const navigation = useNavigation<SearchScreenNavigationProp>(); // Explicitly typing navigation

  // Function to handle search
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

        // spotify_url: item.id,
        // title: item.name,
        // duration: item.duration_ms,

        const filteredData = formattedData.filter(
          (item) => item.explicit == false
        ); // Filter out items with null imageURL

        setSearchResults(filteredData); // Set formatted search results
      } else {
        setSearchResults([]); // If no results, clear search results
      }
    } catch (error) {
      console.error("Error fetching search results:", error); // Log error if fetching search results fails
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  useEffect(() => {
    handleSearch(); // Trigger search when search term changes
  }, [searchTerm]);

  // Function to navigate to trending screen
  // const goToTrending = () => {
  //   navigate("/Trending");
  // };

  // Function to render each search result item
  const renderSearchResultItem = ({ item }) => (
    <SongCard item={item} />

    // <TouchableOpacity
    //   onPress={() => navigate("Play", { state: item })}
    //   style={styles.searchResultItem}
    // >
    //   <View style={styles.albumContainer}>
    //     <Image source={{ uri: item.imageURL }} style={styles.coverImage} />
    //     <Text style={styles.title}>{item.name}</Text>
    //     <Text style={styles.artist}>Artist: {item.artist}</Text>
    //   </View>
    // </TouchableOpacity>
  );

  return (
    <>
      <SafeAreaView style={styles.container}>
        {/* Blue section */}
        <View style={styles.blueSection}>
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => navigate(-1)}
            style={styles.backButton}
          >
            <ArrowBackOutline color={"#00000"} height="25px" width="25px" />
          </TouchableOpacity>
          {/* Search Bar */}
          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search Spotify"
              value={searchTerm}
              onChangeText={(text) => setSearchTerm(text)}
              accessibilityLabel="searchInput" // Add accessibility label for search input
              accessible={true}
            />
            <SearchOutline color={"#00000"} height="250px" width="250px" />
          </View>
        </View>
        <View style={styles.space} />
        {/* Note and button container */}
        <View style={styles.noteAndButtonContainer}>
          {/* Note text */}
          <Text style={styles.noteText}>
            *NOTE Language translation functionality is not guaranteed for songs
            in unsupported languages. See supported Languages below
          </Text>
          {/* Button to navigate to search by language screen */}
          <TouchableOpacity
            onPress={() => navigate("/SearchLanguages")}
            style={styles.languageButton}
          >
            <Text style={styles.buttonText}>Search by Language</Text>
          </TouchableOpacity>
          {/* Button to navigate to trending screen */}
          {/* <TouchableOpacity
            onPress={goToTrending}
            style={styles.languageButton}
            accessibilityLabel="trending"
            accessible={true}
          >
            <Text style={styles.buttonText}>Globally Trending</Text>
          </TouchableOpacity> */}
        </View>
        {isLoading && <Text style={{ paddingLeft: 10 }}>Searching...</Text>}
        {/* Render search results */}
        {searchTerm.trim() !== "" && (
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.spotifyURL}
            renderItem={renderSearchResultItem}
            numColumns={2}
            contentContainerStyle={styles.flatListContainer}
            accessibilityLabel="searchResultItem"
            accessible={true}
          />
        )}
      </SafeAreaView>
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
