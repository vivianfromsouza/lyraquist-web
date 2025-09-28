import { Text, View, Image, Pressable } from "react-native";
import { usePlayer } from "../context/PlayerContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RecordReaderWriter from "../services/RecordReaderWriter";
import FeatherIcon from "feather-icons-react";
import { toast } from "react-toastify";

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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 30,
            marginVertical: 7,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              testID="playlist-item-image"
              style={{ width: 50, height: 50, borderRadius: 5 }}
              source={{ uri: item.imageURL }}
            />
            <View style={{ paddingLeft: 5 }}>
              <Text
                testID="playlist-item-name"
                numberOfLines={1}
                style={{
                  fontWeight: "bold",
                  fontSize: 14,
                  maxWidth: 190,
                }}
              >
                {item["name"]}
              </Text>
              <Text
                testID="playlist-item-artist"
                numberOfLines={1}
                style={{
                  maxWidth: 190,
                  color: "grey",
                }}
              >
                {item["artist"]}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "30%",
              alignItems: "center",
            }}
          >
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
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 5,
              }}
            >
              <FeatherIcon icon="x-circle" />
            </Pressable>
          </View>
        </View>
        <View
          style={{
            borderBottomColor: "gray",
            borderBottomWidth: 0.5,
            marginHorizontal: 30,
          }}
        />
      </Pressable>
    </>
  );
};

export default PlaylistItem;
