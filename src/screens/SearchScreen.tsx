// Worked on by: Tanvi Singh
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { ArrowBackOutline, SearchOutline } from "react-ionicons";
import SearchSpotify from "../services/SearchSpotify";
import { useNavigate } from "react-router-dom";
import SongCard from "../components/Song";
import searchStyles from "../styles/SearchStyles";

export default function SearchScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      if (searchTerm.trim() === "") {
        setSearchResults([]);
      }
      const searchResultsData = await SearchSpotify.searchForSong(searchTerm);
      if (searchResultsData && searchResultsData.length > 0) {
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
    const timer = setTimeout(() => {
      if (searchTerm.trim() === "") {
        setSearchResults([]);
        return;
      }

      handleSearch();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const renderSearchResultItem = ({ item }) => <SongCard item={item} />;

  return (
    <>
      <SafeAreaView style={searchStyles.container}>
        <View style={searchStyles.blueSection}>
          <TouchableOpacity
            onPress={() => navigate(-1)}
            style={searchStyles.backButton}
          >
            <ArrowBackOutline color={"#e8e1db"} height="25px" width="25px" />
          </TouchableOpacity>
          <View style={searchStyles.searchBar}>
            <TextInput
              style={searchStyles.searchInput}
              placeholder="Search Spotify"
              placeholderTextColor="rgba(232, 225, 219, 0.4)"
              value={searchTerm}
              onChangeText={(text) => setSearchTerm(text)}
              accessibilityLabel="searchInput"
              accessible={true}
            />
            <SearchOutline color={"rgba(232,225,219,0.6)"} height="22px" width="22px" />
          </View>
        </View>

        <View style={searchStyles.noteAndButtonContainer}>
          <TouchableOpacity
            onPress={() => navigate("/SearchLanguages")}
            style={searchStyles.languageButton}
          >
            <Text style={searchStyles.buttonText}>Search by Language</Text>
          </TouchableOpacity>
        </View>

        {isLoading && (
          <Text style={searchStyles.placeholderTxt}>Searching...</Text>
        )}

        {searchTerm.trim() !== "" && !isLoading && (
          <>
            <View style={searchStyles.sectionHeader}>
              <Text style={searchStyles.sectionLabel}>Results</Text>
              <View style={searchStyles.sectionLabelLine} />
            </View>
            <FlatList
              data={searchResults}
              keyExtractor={(item) => item.spotifyURL}
              renderItem={renderSearchResultItem}
              numColumns={7}
              contentContainerStyle={searchStyles.flatListContainer}
              accessibilityLabel="searchResultItem"
              accessible={true}
            />
          </>
        )}

        {searchTerm.trim() === "" && (
          <View style={searchStyles.emptyState}>
            <SearchOutline color={"rgba(48,50,72,0.2)"} height="48px" width="48px" />
            <Text style={searchStyles.emptyStateText}>
              Search for a song or artist to get started
            </Text>
          </View>
        )}
      </SafeAreaView>
    </>
  );
}
