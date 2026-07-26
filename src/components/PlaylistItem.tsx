import { Text, View, Image, Pressable } from "react-native";
import { usePlayer } from "../context/PlayerContext";
import RecordReaderWriter from "../services/RecordReaderWriter";
import FeatherIcon from "feather-icons-react";
import playlistStyles from "../styles/PlaylistStyles";
import LikeButton from "./LikeButton";

const PlaylistItem = ({ item, playlistURL }) => {
  const { playPlaylist } = usePlayer();

  function deleteSongFromPlaylist(recordID) {
    console.log("Deleting song with record ID:", recordID);
    RecordReaderWriter.deleteSongFromPlaylist(recordID);
  }

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

          <View style={playlistStyles.playlistLikeIcon}>
            <LikeButton
              spotifyURL={item.spotifyURL}
              songDetails={item}
              initialLiked={item.isLiked ?? false}
            />

            <Pressable
              testID="delete-icon"
              onPress={() => deleteSongFromPlaylist(item.recordID)}
              style={playlistStyles.playlistDeleteIcon}
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