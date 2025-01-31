import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";

const Workbook = ({ item }) => {
  const colors = ["#5bc8a6", "#edc526", "#ff4a2a", "#303248"];
  const [colorNum, setColorNum] = useState(0);
  const [workbookColor, setWorkbookColor] = useState("");

  // TODO: TRY TO VARY COLOR??
  function genNextColor(): string {
    if (colorNum > 3) {
      setColorNum(0);
    } else {
      setWorkbookColor(colors[colorNum]);
      setColorNum(colorNum + 1);
    }
    return colors[colorNum];
  }

  // TODO: FIX NAVIGATION
  // const navigation = useNavigation<any>(); //allows workbook in homescreen to be clickable
  return (
    <Pressable
      // onPress={() =>
      //   navigation.navigate("WorkbookInfo", {
      //     //navigate to WorkbookInfoScreen
      //     item: item,
      //   })
      // }
      style={{ margin: 10 }}
    >
      <View style={{ elevation: 8 }}>
        {/* <FontAwesome5 name="book" size={80} color={colors[colorNum]} /> */}
        <FontAwesomeIcon icon={faBook} />
      </View>
      <View style={{ width: 80 }}>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 13,
            fontWeight: "500",
            color: "black",
            marginTop: 10,
          }}
        >
          {" "}
          {item?.name}{" "}
        </Text>
      </View>
    </Pressable>
  );
};

export default Workbook;
