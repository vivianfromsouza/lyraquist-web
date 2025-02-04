import { Text, View, Pressable } from "react-native";
import LanguageReaderWriter from "../services/LanguageReaderWriter";
import { StarFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const StarredLang = ({ value }) => {
  const navigate = useNavigate();

  function deleteLang() {
    LanguageReaderWriter.deleteLangauge(value);
  }

  return (
    <View>
      <Pressable onPress={() => navigate("/language/"+ value.name.toLowerCase())}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginRight: 5,
            marginLeft: 5,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontFamily: "Karla",
              fontSize: 21,
              color: "#2D3047",
              marginTop: 10,
              marginBottom: 7,
            }}
          >
            {value.name}
          </Text>
          <Pressable onPress={deleteLang}>
            {/* <AntDesign name="star" size={27} color="#edc526" /> */}
            <StarFilled />
          </Pressable>
        </View>
        <View style={{ borderBottomColor: "gray", borderBottomWidth: 0.2 }} />
      </Pressable>
    </View>
  );
};

export default StarredLang;
