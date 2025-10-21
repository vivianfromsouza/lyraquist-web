import { Text, View, Image, Pressable } from "react-native";
import { useNavigate } from "react-router-dom";
import playlistStyles from "../styles/PlaylistStyles";

const PlaylistCard = ({ item }) => {
  const navigate = useNavigate();
  return (
    <View style={{ marginLeft: 4 }}>
      <Pressable
        onPress={() => navigate("/playlist", { state: item })}
        style={{ margin: 10 }}
      >
        <View>
          <Image
            testID="playlist-image"
            style={playlistStyles.playlistCardImage}
            source={{ uri: item.image_url }}
          />
        </View>
        <View style={{ width: 130 }}>
          <Text numberOfLines={1} style={playlistStyles.playlistCardName}>
            {item?.name}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default PlaylistCard;
