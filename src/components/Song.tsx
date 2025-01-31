import { Text, View, Image, Pressable } from "react-native";

// need to make a JSON

const SongCard = ({ item }) => {
  // TODO: FIX NAVIGATION
  // const navigation = useNavigation<any>(); //allow for the song to be clickable
  return (
    <View style={{ marginLeft: 4 }}>
      <Pressable
        // onPress={() => navigation.navigate("Play", { item: item })}
        onPress={() => console.log("Go to Play")}
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
