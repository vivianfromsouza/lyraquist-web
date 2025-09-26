import { Text, View, Image, Pressable } from "react-native";
import { useNavigate } from "react-router-dom";

const PlaylistCard = ({ item }) => {
  const navigate = useNavigate();
  return (
    <View style={{ marginLeft: 4 }}>
      <Pressable
        onPress={() => navigate("/playlist/", { state: item })}
        style={{ margin: 10 }}
      >
        <View
          style={{ backgroundColor: "white", elevation: 8, borderRadius: 5 }}
        >
          <Image
            testID="playlist-image"
            style={{ width: 130, height: 130, borderRadius: 5 }}
            source={{ uri: item.image_url }}
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
        </View>
      </Pressable>
    </View>
  );
};

export default PlaylistCard;
