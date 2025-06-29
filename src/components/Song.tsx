import { Text, View, Image, Pressable } from "react-native";
import { usePlayer } from "../context/PlayerContext";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const SongCard = ({ item }) => {
  const { playSong } = usePlayer();
  const navigate = useNavigate();

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

      <Pressable
        onPress={() =>
          navigate("/playlist/addSong", {
            state: { song_id: item.spotifyURL },
          })
        }
        style={{
          flexDirection: "row",
          marginLeft: 20,
          alignItems: "center",
          paddingTop: 15,
        }}
      >
        <PlusCircleOutlined />
      </Pressable>
    </View>
  );
};

export default SongCard;
