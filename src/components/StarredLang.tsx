import { Text, View, Pressable } from "react-native-web";
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
      <Pressable testID="go-to-lang" onPress={() => navigate("/language/"+ value.toLowerCase())}>
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
              fontSize: 20,
              color: "#2D3047",
              marginTop: 10,
              marginBottom: 7,
            }}
          >
            {value}
          </Text>
          <Pressable onPress={deleteLang}>
            <StarFilled data-testid="star-icon" style={{fontSize:23, color:"#edc526", }}/>
          </Pressable>
        </View>
        <View style={{ borderBottomColor: "gray", borderBottomWidth: 0.2 }} />
      </Pressable>
    </View>
  );
};

export default StarredLang;
