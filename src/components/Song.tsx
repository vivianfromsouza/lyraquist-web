import { Text, View, Image, Pressable } from "react-native-web";
import { usePlayer } from "../context/PlayerContext";
// import { useNavigate } from "react-router-dom";

const SongCard = ({ item }) => {
  const { playSong } = usePlayer();
  // const navigate = useNavigate();

  return (
    <View style={{ marginLeft: 4 }}>
      <Pressable
        testID="play-song"
        onPress={() => playSong(item.spotifyURL)}
        style={{ margin: 10 }}
      >
        <View
          style={{ backgroundColor: "white", elevation: 8, borderRadius: 5 }}
        >
          <Image
            testID="song-image"
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
