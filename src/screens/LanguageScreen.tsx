/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import DisplayPlaylistService from "../services/DisplayPlaylist";
import SongCard from "../components/Song";
import LikeButton from "../components/LikeButton";
import langStyles from "../styles/LanguageStyles";
import SearchBar from "../components/SearchBar";

const CARD_WIDTH = 166; // 130px content + 16px margin + 20px padding
const CONTAINER_HORIZONTAL_MARGIN = 60; // marginLeft: 30 + marginRight: 30

export default function LanguageScreen({ albumId, language }) {
  const { width } = useWindowDimensions();
  const numColumns = Math.max(
    1,
    Math.floor((width - CONTAINER_HORIZONTAL_MARGIN) / CARD_WIDTH),
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[] | null>([]);
  const [isLoading, setIsLoading] = useState(true);

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
              .includes(text.toLowerCase()),
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
        <View style={langStyles.container}>
          <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />

          <View style={langStyles.langTitleView}>
            <Text style={langStyles.langTitle}>{language}</Text>
            <LikeButton language={language} />
          </View>

          {searchResults!.length == 0 && (
            <View>
              <Text style={langStyles.noResultsText}>
                Sorry! No results for this search.
              </Text>
            </View>
          )}

            <FlatList
              key={numColumns}
              data={searchResults}
              keyExtractor={(item) => item.spotifyURL}
              renderItem={renderSearchResultItem}
              numColumns={numColumns}
              style={langStyles.resultsGrid}
              contentContainerStyle={langStyles.resultsGridContainer}
              columnWrapperStyle={numColumns > 1 ? { justifyContent: "center" } : undefined}
            />
        </View>
      </>
    );
  } else {
    return (
      <ScrollView style={langStyles.container}>
        <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
        <View style={langStyles.loading}>
          <ActivityIndicator size="large" color="#8A2BE2" />
        </View>
      </ScrollView>
    );
  }
}
