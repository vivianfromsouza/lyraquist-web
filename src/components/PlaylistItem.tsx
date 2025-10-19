import { Text, View, Image, Pressable } from "react-native";
import { usePlayer } from "../context/PlayerContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RecordReaderWriter from "../services/RecordReaderWriter";
import FeatherIcon from "feather-icons-react";
import { toast } from "react-toastify";
import playlistStyles from "../styles/PlaylistStyles";

const PlaylistItem = ({ item, playlistURL }) => {
  const { playPlaylist } = usePlayer();

  function likedToNot(spotifyURL) {
    RecordReaderWriter.unlikeSongByURL(spotifyURL);
  }

  function notToLiked(spotifyURL, track) {
    RecordReaderWriter.likeSongByURL(spotifyURL, track);
  }

  function deleteSongFromPlaylist(recordID) {
    console.log("Deleting song with record ID:", recordID);
    RecordReaderWriter.deleteSongFromPlaylist(recordID);
  }

  const deleteSongAlert = (recordID: string | undefined) => {
    toast(
      "Are you Sure? This song will be removed from this playlist if deleted.",
      { closeButton: deleteSongAlertButton(recordID) }
    );
  };

  const deleteSongAlertButton = (recordID: string | undefined) => {
    return (
      <>
        <button
          onClick={() => console.log("Cancel Pressed")}
          className="border border-red-500 rounded-md px-2 py-2 text-red-500 ml-auto"
        >
          Cancel
        </button>
        <button
          data-testid="delete-button"
          onClick={() => deleteSongFromPlaylist(recordID)}
          className="border border-red-500 rounded-md px-2 py-2 text-red-500 ml-auto"
        >
          Delete
        </button>
      </>
    );
  };

  return (
    <>
      <Pressable
        onPress={() =>
          playPlaylist(playlistURL, "spotify:track:" + item.spotifyURL)
        }
      >
        <View style={playlistStyles.playlistItemEntry}>
          <View style={playlistStyles.playlistImageContainer}>
            <Image
              testID="playlist-item-image"
              style={playlistStyles.playlistItemImage}
              source={{ uri: item.imageURL }}
            />
            <View style={{ paddingLeft: 5 }}>
              <Text
                testID="playlist-item-name"
                numberOfLines={1}
                style={playlistStyles.playlistItemName}
              >
                {item["name"]}
              </Text>
              <Text
                testID="playlist-item-artist"
                numberOfLines={1}
                style={playlistStyles.playlistItemArtist}
              >
                {item["artist"]}
              </Text>
            </View>
          </View>

          <View style={playlistStyles.playlistItemLike}>
            {item.isLiked ? (
              <Pressable
                testID="liked-icon"
                onPress={() => likedToNot(item.spotifyURL)}
              >
                <FavoriteIcon />
              </Pressable>
            ) : (
              <Pressable
                testID="unliked-icon"
                onPress={() => notToLiked(item.spotifyURL, item)}
              >
                <FavoriteBorderIcon />
              </Pressable>
            )}

            <Pressable
              testID="delete-icon"
              onPress={() => deleteSongAlert(item.recordID)}
              style={playlistStyles.playlistLikeIcon}
            >
              <FeatherIcon icon="x-circle" />
            </Pressable>
          </View>
        </View>
        <View style={playlistStyles.playlistItemBorder} />
      </Pressable>
    </>
  );
};

export default PlaylistItem;
