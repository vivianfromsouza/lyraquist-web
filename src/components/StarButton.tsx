import { Pressable } from "react-native-web";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import LanguageReaderWriter from "../services/LanguageReaderWriter";

const StarButton = ({language}) => {
  const [starred, setStarred] = useState(false);

  async function checkStar() {
    if (await LanguageReaderWriter.isLanguageStarred(language)) {
      setStarred(true);
    }
  }

  const handleLike = async () => {
    if (!starred) {
        LanguageReaderWriter.addLanguages(language);
        console.log("language is already starred");
      setStarred((isStarred) => !isStarred);
    } else {
      LanguageReaderWriter.deleteLangauge(language);
      setStarred((isStarred) => !isStarred);
    }
  };

  useEffect(() => {
    checkStar();
  }, []);

  return (
    <Pressable
      onPress={handleLike}
      style={{
        fontSize: 30,
        color: "#edc526",
        marginBottom: 7,
        marginLeft: 25,
      }}
    >
      {starred ? (
        <StarFilled size={30} color={"#edc526"} />
      ) : (
        <StarOutlined size={30} />
      )}
    </Pressable>
  );
};

export default StarButton;