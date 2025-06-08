/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { ArrowBackOutline, SearchOutline } from "react-ionicons";
// TODO: REIMPLEMENT
// import DisplayPlaylistService from "../services/DisplayPlaylist";
import { StarFilled, StarOutlined } from "@ant-design/icons";

import LanguageReaderWriter from "../services/LanguageReaderWriter";
import { useNavigate } from "react-router-dom";
import DisplayPlaylistService from "../services/DisplayPlaylist";
import SongCard from "../components/Song";

// Destructuring to get SCREEN_HEIGHT from Dimensions
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// Functional component for SpanishScreen
export default function SpanishScreen() {
  // State variables
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [searchResults, setSearchResults] = useState<any[] | null>([]); // Search results state
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [starred, setStarred] = useState(false); // State for starred language
  const [saved, setSaved] = useState(false); // State for saved language
  const [loadingScreen, isLoadingScreen] = useState(true); // State for loading screen

  const albumId = "1aUgRQqdbCliLVgktVY1yG";
  const navigate = useNavigate();

  // Function to handle search
  const handleSearch = async (text) => {
    try {
      setIsLoading(!isLoading);
      setSearchTerm(text);
      const playlistData = await DisplayPlaylistService.getPlaylist(albumId);
      const formattedData = playlistData
        .filter(
          (item: any) =>
            item.track.name.toLowerCase().includes(text.toLowerCase()) ||
            item.track.artists[0].name
              .toLowerCase()
              .includes(text.toLowerCase())
        )
        .map((item: any) => ({
          artist: item.track.artists[0].name,
          spotifyURL: "spotify:track:" + item.track.id,
          imageURL:
            item.track.album.images.length > 0
              ? item.track.album.images[0].url
              : null,
          name: item.track.name,
          album: item.track.album.name,
          duration: item.track.duration_ms,
        }));
      console.log(formattedData[0]);

      setSearchResults(formattedData);
      isLoadingScreen(false); // Done loading screen
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Effect hook to run once on component mount
  useEffect(() => {
    checkStar(); // Check if Spanish language is starred
    handleSearch(""); // Initial search with empty string
  }, []);

  // Function to render each search result item
  const renderSearchResultItem = ({ item }) => (
    <SongCard item={item} />

    // <TouchableOpacity
    //   onPress={() => navigate("Play", { state: item })}
    //   style={{
    //     flex: 1,
    //     flexDirection: "row",
    //     alignItems: "center",
    //     justifyContent: "space-between",
    //     padding: 10,
    //   }}
    // >
    //   <View style={{ flex: 1 }}>
    //     <Image
    //       source={{ uri: item.imageURL }}
    //       style={{ width: "100%", aspectRatio: 1 }}
    //     />
    //     <Text
    //       numberOfLines={1}
    //       style={{ fontWeight: "bold", fontSize: 14, color: "black" }}
    //     >
    //       {item.name}
    //     </Text>
    //     <Text style={{ color: "#989898" }}>Artist: {item.artist}</Text>
    //   </View>
    // </TouchableOpacity>
  );

  async function checkStar() {
    if (await LanguageReaderWriter.isLanguageStarred("Spanish")) {
      setStarred(true);
      setSaved(true);
    }
  }

  const handleLike = async () => {
    if (!starred) {
      if (!saved) {
        LanguageReaderWriter.addLanguages("Spanish"); // Add Spanish language to starred
      } else {
        console.log("language is already starred");
      }
      setStarred((isStarred) => !isStarred);
    } else {
      LanguageReaderWriter.deleteLangauge("Spanish"); // Remove Spanish language from starred
      setSaved(false);
      setStarred((isStarred) => !isStarred);
    }
  };

  // Component for like button
  const LikeButton = () => {
    return (
      <Pressable onPress={handleLike}>
        {starred ? <StarFilled /> : <StarOutlined />}

        {/* <AntDesign
          name={starred ? "star" : "staro"}
          size={32}
          color={starred ? "#edc526" : "black"}
        /> */}
      </Pressable>
    );
  };

  // Function to handle navigation to trending Spanish
  // const handleTrendingSpanish = () => {
  //   navigate("TrendingSpanish");
  // };

  // Rendering the screen based on loading state
  if (!loadingScreen) {
    return (
      <>
        <View style={styles.container}>
          {/* Blue section */}
          <View style={styles.blueSection}>
            {/* Back Button */}
            <TouchableOpacity
              onPress={() => navigate(-1)}
              style={styles.backButton}
            >
              <ArrowBackOutline color={"#00000"} height="250px" width="250px" />
            </TouchableOpacity>

            {/* Search Bar */}
            <View style={styles.searchBar}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search Spanish"
                value={searchTerm}
                onChangeText={handleSearch}
              />
              <SearchOutline color={"#00000"} height="250px" width="250px" />
              {/* <Ionicons name="search" size={24} color="#989898" /> */}
            </View>
          </View>

          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 10,
              marginRight: 10,
            }}
          >
            These are Lyraquist's recommended Spanish songs. If you are looking
            for a song not on this page, use the general search tab.
          </Text>

          {/* Trending Spanish Button */}
          {/* <TouchableOpacity
            onPress={handleTrendingSpanish}
            style={styles.languageButton}
          >
            <Text style={styles.buttonText}>Trending in Spanish</Text>
          </TouchableOpacity> */}

          {/* Display Spanish */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginLeft: 30,
              marginRight: 30,
              marginTop: 15,
            }}
          >
            <Text
              style={{ fontSize: 30, fontWeight: "bold", marginBottom: 10 }}
            >
              Spanish
            </Text>
            <LikeButton />
          </View>

          {searchResults!.length == 0 && (
            <View
              style={{
                marginTop: 50,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                Sorry! No results for this search.
              </Text>
            </View>
          )}

          {/* FlatList to display search results */}
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.spotifyURL}
            renderItem={renderSearchResultItem}
            numColumns={2} // Displaying two columns
          />
        </View>
      </>
    );
  } else {
    // Loading screen
    return (
      <ScrollView style={styles.container}>
        <View style={styles.blueSection}>
          <TouchableOpacity
            onPress={() => navigate(-1)}
            style={styles.backButton}
          >
            <ArrowBackOutline color={"#00000"} height="250px" width="250px" />
          </TouchableOpacity>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search Spanish"
              value={searchTerm}
              onChangeText={handleSearch}
            />
            <SearchOutline color={"#00000"} height="250px" width="250px" />
            {/* <Ionicons name="search" size={24} color="#989898" /> */}
          </View>
        </View>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#8A2BE2" />
        </View>
      </ScrollView>
    );
  }
}

// Styles for the components
const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT,
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
  SpanishText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  buttonText: {
    fontWeight: "bold",
  },
  languageButton: {
    marginTop: 10,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    paddingVertical: 10,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e8e1db",
    marginTop: SCREEN_HEIGHT / 2.5,
  },
});
