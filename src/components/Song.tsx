import { Text, View, Image, Pressable } from "react-native-web";
import { usePlayer } from "../context/PlayerContext";
import PlusCircleOutlined from "@ant-design/icons/lib/icons/PlusCircleOutlined";
import { useNavigate } from "react-router-dom";
import songStyles from "../styles/SongStyles";

const SongCard = ({ item }) => {
  const { playSong } = usePlayer();
  const navigate = useNavigate();

  return (
    <View style={songStyles.card}>
      <Pressable
        testID="play-song"
        onPress={() => playSong(item.spotifyURL)}
        style={{ }}
      >
        <View>
          <Image
            testID="song-image"
            style={songStyles.art}
            source={{ uri: item.imageURL }}
          />
        </View>
        <View style={{ width: 130 }}>
          <Text numberOfLines={1} style={songStyles.name}>
            {item?.name}
          </Text>
          <Text numberOfLines={1} style={songStyles.artist}>
            {item?.artist}
          </Text>
        </View>
        <Pressable
          onPress={() =>
            navigate("/playlist/addSong", {
              state: { item },
            })
          }
          style={songStyles.addButton}
        >
          <PlusCircleOutlined />
        </Pressable>
      </Pressable>
    </View>
  );
};

export default SongCard;
