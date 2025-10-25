/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { ArrowBackOutline, SearchOutline } from "react-ionicons";
import LanguageReaderWriter from "../services/LanguageReaderWriter";
import { useNavigate } from "react-router-dom";
import DisplayPlaylistService from "../services/DisplayPlaylist";
import SongCard from "../components/Song";
import LikeButton from "../components/LikeButton";

// Destructuring to get SCREEN_HEIGHT from Dimensions
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function LanguageScreen({ albumId, language }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[] | null>([]);
  const [isLoading, setIsLoading] = useState(true);

  //   const albumId = "1aUgRQqdbCliLVgktVY1yG";
  const navigate = useNavigate();

  // Function to handle search
  const handleSearch = async (text) => {
    try {
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

      setSearchResults(formattedData);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleSearch("");
  }, []);

  const renderSearchResultItem = ({ item }) => <SongCard item={item} />;

  if (!isLoading) {
    return (
      <>
        <View style={styles.container}>
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
                placeholder={"Search " + language}
                value={searchTerm}
                onChangeText={handleSearch}
              />
              <SearchOutline color={"#00000"} height="30px" width="30px" />
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

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 10,
              marginRight: 30,
              marginTop: 15,
            }}
          >
            <Text
              style={{ fontSize: 30, fontWeight: "bold", marginBottom: 10 }}
            >
              {language}
            </Text>
            <LikeButton language={language} />
          </View>

          {searchResults!.length == 0 && (
            <View
              style={{
                marginTop: 50,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 30,
                marginLeft: 30,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  marginRight: 30,
                  marginLeft: 30,
                }}
              >
                Sorry! No results for this search.
              </Text>
            </View>
          )}

          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.spotifyURL}
            renderItem={renderSearchResultItem}
            numColumns={7}
            style={{ marginRight: 30, marginLeft: 30, marginBottom: 10 }}
          />
        </View>
      </>
    );
  } else {
    return (
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
              placeholder={"Search " + langsuage}
              value={searchTerm}
              onChangeText={handleSearch}
            />
            <SearchOutline color={"#00000"} height="250px" width="250px" />
          </View>
        </View>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#8A2BE2" />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "91vh",
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
