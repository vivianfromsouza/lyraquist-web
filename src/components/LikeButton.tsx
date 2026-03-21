import { Pressable } from "react-native-web";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import LanguageReaderWriter from "../services/LanguageReaderWriter";

const LikeButton = ({language}) => {
  const [starred, setStarred] = useState(false);
  const [saved, setSaved] = useState(false);

  async function checkStar() {
    if (await LanguageReaderWriter.isLanguageStarred(language)) {
      setStarred(true);
      setSaved(true);
    }
  }

  const handleLike = async () => {
    if (!starred) {
      if (!saved) {
        LanguageReaderWriter.addLanguages(language);
      } else {
        console.log("language is already starred");
      }
      setStarred((isStarred) => !isStarred);
    } else {
      LanguageReaderWriter.deleteLangauge(language);
      setSaved(false);
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

export default LikeButton;
