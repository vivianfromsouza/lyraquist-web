/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
// Worked on by: Vivian D'Souza, Ashley Bickham
import { View, Text, Pressable } from "react-native";
import { ArrowBackOutline } from "react-ionicons";
import { useLocation, useNavigate } from "react-router-dom";
import PlaylistReaderWriter from "../services/PlaylistReaderWriter";
import { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import RecordReaderWriter from "../services/RecordReaderWriter";
import SongReaderWriter from "../services/SongReaderWriter";
import CreateNewPlaylistForm from "../components/CreateNewPlaylistForm";
import { ScrollView } from "react-native-web";
import playlistStyles from "../styles/PlaylistStyles";

function AddSongToPlaylistScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const songItem = location?.state?.item || "";
  const songURL = songItem["spotifyURL"]?.split(":")[2] || "";
  const [open, setOpen] = useState(false);

  const [selectedPlaylist, setSelectedPlaylist] = useState<any>("");
  const [playlistItems, setPlaylistItems] = useState<any[]>([]);

  async function addSong() {
    if (!(await SongReaderWriter.isSongInDB(songURL))) {
      await SongReaderWriter.addSongToDBFromSongCard(songItem);
    }
    await RecordReaderWriter.addSongToRecords(songURL, selectedPlaylist);
    navigate(-1);
  }

  async function fetchPlaylists() {
    await PlaylistReaderWriter.getMyPlaylists().then((playlists) => {
      const playlistsToDropdown = [{}];
      playlists.map((playlist) => {
        playlistsToDropdown.push({
          label: playlist.name,
          value: playlist.playlist_id,
        });
      });
      playlistsToDropdown.push({ label: "Create a Playlist", value: "0" });
      setPlaylistItems(playlistsToDropdown);
    });
  }

  useEffect(() => {
    fetchPlaylists();
  }, [selectedPlaylist]);

  return (
    <ScrollView style={playlistStyles.container}>
      <View style={playlistStyles.addToPlaylistHeader}>
        <Pressable onPress={() => navigate(-1)} style={{}}>
          <ArrowBackOutline color={"#00000"} height="25px" width="25px" />
        </Pressable>
        <Text testID="add-song-title" style={playlistStyles.addToPlaylistTitle}>
          Add Song to Playlist
        </Text>
      </View>
      <View
        testID="playlist-dropdown"
        style={playlistStyles.addToPlaylistDropdown}
      >
        <DropDownPicker
          open={open}
          value={selectedPlaylist}
          setValue={setSelectedPlaylist}
          setItems={setPlaylistItems}
          items={playlistItems}
          setOpen={setOpen}
          placeholder="Select a language"
          zIndex={6000}
          zIndexInverse={100000}
        />
      </View>

      {selectedPlaylist === "0" ? (
        <CreateNewPlaylistForm songItem={songItem} />
      ) : (
        <Pressable
          onPress={addSong}
          testID="add-song"
          style={playlistStyles.button}
          accessibilityLabel="addconfirm"
          accessible={true}
        >
          <Text style={playlistStyles.buttonText}>Add Song</Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

export default AddSongToPlaylistScreen;