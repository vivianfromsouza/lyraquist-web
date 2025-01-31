import { Text, View, Image, Pressable } from "react-native";
import React from "react";

// need to make a JSON

const PlaylistCard = ({ item }) => {
  // TODO: FIX NAVIGATION HERE
  // const navigation = useNavigation<any>(); //allow for the playlist to be clickable
  return (
    <View style={{ marginLeft: 4 }}>
      <Pressable
        // onPress={() => navigation.navigate("PlaylistInfoScreen", { item: item })}   //navigate to PlaylistInfoScreen
        //TODO FIX NAVIGATION HERE
        style={{ margin: 10 }}
        
      >
        <View
          style={{ backgroundColor: "white", elevation: 8, borderRadius: 5 }}
        >
          <Image
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

export default PlaylistCard;
