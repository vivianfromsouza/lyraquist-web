import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { TextInput } from "react-native";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PlaylistReaderWriter from "../services/PlaylistReaderWriter";
import RecordReaderWriter from "../services/RecordReaderWriter";
import SongReaderWriter from "../services/SongReaderWriter";
import playlistStyles from "../styles/PlaylistStyles";
import createPlaylistStyles from "../styles/PlaylistCreateFormStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import DescriptionIcon from "@mui/icons-material/Description";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ArrowBackOutline from "react-ionicons/lib/ArrowBackOutline";

const CreateNewPlaylistScreen = ({ songItem }) => {
  const navigate = useNavigate();
  const [newPlaylistName, setNewPlaylistName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const songURL = songItem["spotifyURL"]?.split(":")[2] || "";
  const [imageURL, setImageURL] = useState<string>();

  async function createPlaylist(
    description = "",
    imageURL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj8ZaSSfYdj9o0Q-S0XPOkSOpTdbQPPpKC2g&s",
  ) {
    const newPlaylistId = await PlaylistReaderWriter.createPlaylist(
      newPlaylistName,
      description,
      imageURL,
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
    <SafeAreaView style={createPlaylistStyles.container}>
      <View style={createPlaylistStyles.header}>
        <View style={createPlaylistStyles.titleLocation}>
          <TouchableOpacity
            onPress={() => navigate(-1)}
            style={createPlaylistStyles.arrowLocation}
          >
            <ArrowBackOutline color={"#e8e1db"} height="25px" width="25px" />
          </TouchableOpacity>
          <Text style={createPlaylistStyles.title}>
            {newPlaylistName !== "" ? newPlaylistName : "New Playlist"}
          </Text>
        </View>
      </View>

      <View style={createPlaylistStyles.sectionHeader}>
        <Text style={createPlaylistStyles.sectionLabel}>Playlist Details</Text>
        <View style={createPlaylistStyles.sectionLabelLine} />
      </View>

      <View style={createPlaylistStyles.inputContainer}>
        <View style={createPlaylistStyles.inputRow}>
          <FontAwesomeIcon
            icon={faPencil}
            style={createPlaylistStyles.pencilIcon}
          />
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
          <DescriptionIcon style={createPlaylistStyles.paperIcon} />
          <TextInput
            testID="description-input"
            placeholder="Description"
            placeholderTextColor="rgba(48,50,72,0.35)"
            value={description}
            onChangeText={(text) => setDescription(text)}
            style={createPlaylistStyles.input}
          />
        </View>
      </View>

      <View style={createPlaylistStyles.imageInputRow}>
        <AddPhotoAlternateIcon style={createPlaylistStyles.imageIcon} />
        <View>
          <Text style={createPlaylistStyles.imageLabel}>Cover Image</Text>
          <input
            data-testid="image-input"
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImageURL(URL.createObjectURL(e.target.files![0]))
            }
          />
        </View>
      </View>

      <Pressable
        onPress={() => createPlaylist(description, imageURL)}
        testID="add-song"
        style={playlistStyles.addToPlaylistBtn}
        accessibilityLabel="addconfirm"
      >
        <Text style={playlistStyles.addToPlaylistBtnText}>Create Playlist</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default CreateNewPlaylistScreen;