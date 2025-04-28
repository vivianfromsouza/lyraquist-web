import { Text, View, Image, Pressable } from "react-native";
import { useNavigate } from "react-router-dom";
import Player from "./Player";
import { usePlayer } from "../context/PlayerContext";


const SongCard = ({ item }) => {
  const { playSong, pausePlayback, toggleShuffle, isPaused, currentTrack } = usePlayer();

  return (
    <View style={{ marginLeft: 4 }}>
      <Pressable
        onPress={() => playSong(item.spotifyURL)}
        // onPress={() => navigate("/play", { state: item })}
        style={{ margin: 10 }}
      >
        <View
          style={{ backgroundColor: "white", elevation: 8, borderRadius: 5 }}
        >
          <Image
            style={{ width: 130, height: 130, borderRadius: 5 }}
            source={{ uri: item.imageURL }}
          />
        </View>
        <View style={{ width: 130 }}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 13,
              fontWeight: "500",
              color: "black",
              marginTop: 10,
            }}
          >
            {item?.name}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 13,
              fontWeight: "500",
              color: "black",
              marginTop: 1,
            }}
          >
            {item?.artist}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default SongCard;
