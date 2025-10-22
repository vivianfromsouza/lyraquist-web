import { Text, View, Pressable } from "react-native-web";
import LanguageReaderWriter from "../services/LanguageReaderWriter";
import { StarFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import starredLangStyles from "../styles/StarredLangStyles";

const StarredLang = ({ value }) => {
  const navigate = useNavigate();

  function deleteLang() {
    LanguageReaderWriter.deleteLangauge(value);
  }

  return (
    <View>
      <Pressable
        testID="go-to-lang"
        onPress={() => navigate("/language/" + value.toLowerCase())}
      >
        <View
          style={starredLangStyles.langEntry}
        >
          <Text style={starredLangStyles.langText}>{value}</Text>
          <Pressable onPress={deleteLang}>
            <StarFilled
              data-testid="star-icon"
              style={starredLangStyles.starIcon}
            />
          </Pressable>
        </View>
        <View style={starredLangStyles.bottomBorder} />
      </Pressable>
    </View>
  );
};

export default StarredLang;
