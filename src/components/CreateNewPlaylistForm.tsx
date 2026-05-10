import { Text, View, Pressable } from "react-native-web";
import { TextInput } from "react-native";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PlaylistReaderWriter from "../services/PlaylistReaderWriter";
import RecordReaderWriter from "../services/RecordReaderWriter";
import SongReaderWriter from "../services/SongReaderWriter";
import playlistStyles from "../styles/PlaylistStyles";
import createPlaylistStyles from "../styles/PlaylistCreateFormStyles";

const CreateNewPlaylistForm = ({ songItem }) => {
  const navigate = useNavigate();
  const [newPlaylistName, setNewPlaylistName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const songURL = songItem["spotifyURL"]?.split(":")[2] || "";
  const [imageURL, setImageURL] = useState<string>();

  async function createPlaylist(
    description = "",
    imageURL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj8ZaSSfYdj9o0Q-S0XPOkSOpTdbQPPpKC2g&s"
  ) {
    const newPlaylistId = await PlaylistReaderWriter.createPlaylist(
      newPlaylistName,
      description,
      imageURL
    );

    if (songURL !== "") {
      if (!(await SongReaderWriter.isSongInDB(songURL))) {
        await SongReaderWriter.addSongToDBFromSongCard(songItem);
      }
      await RecordReaderWriter.addSongToRecords(songURL, newPlaylistId);
    }
    navigate(-1);
  }

  return (
    <View style={createPlaylistStyles.formContainer}>
      {/* Section: New Playlist */}
      <View style={createPlaylistStyles.sectionHeader}>
        <Text style={createPlaylistStyles.sectionLabel}>New Playlist</Text>
        <View style={createPlaylistStyles.sectionLabelLine} />
      </View>

      <View style={createPlaylistStyles.inputRow}>
        <TextInput
          testID="playlist-name-input"
          placeholder="Playlist Name"
          placeholderTextColor="rgba(48,50,72,0.35)"
          value={newPlaylistName}
          onChangeText={(text) => setNewPlaylistName(text)}
          style={createPlaylistStyles.input}
        />
      </View>

      <View style={createPlaylistStyles.inputRow}>
        <TextInput
          testID="description-input"
          placeholder="Description"
          placeholderTextColor="rgba(48,50,72,0.35)"
          value={description}
          onChangeText={(text) => setDescription(text)}
          style={createPlaylistStyles.input}
        />
      </View>

      <View style={createPlaylistStyles.imageInputRow}>
        <Text style={createPlaylistStyles.imageLabel}>Cover Image</Text>
        <input
          test-id="image-input"
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImageURL(URL.createObjectURL(e.target.files![0]))
          }
        />
      </View>

      <Pressable
        onPress={() => createPlaylist(description, imageURL)}
        testID="add-song"
        style={playlistStyles.addToPlaylistBtn}
        accessibilityLabel="addconfirm"
      >
        <Text style={playlistStyles.addToPlaylistBtnText}>Create Playlist</Text>
      </Pressable>
    </View>
  );
};

export default CreateNewPlaylistForm;
