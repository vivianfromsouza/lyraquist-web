import { Pressable } from "react-native-web";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import RecordReaderWriter from "../services/RecordReaderWriter";

const LikeButton = ({spotifyURL, songDetails}) => {
  const [liked, setLiked] = useState(false);

  console.log("song details in like button", songDetails);

  async function checkLike() {
    if (await RecordReaderWriter.getLike(spotifyURL)) {
      setLiked(true);
    }
  }

  const handleLike = async () => {
    if (!liked) {
        RecordReaderWriter.likeSongByURL(spotifyURL, songDetails);
        setLiked((isLiked) => !isLiked);
    } else {
      RecordReaderWriter.unlikeSongByURL(spotifyURL);
      setLiked((isLiked) => !isLiked);
    }
  };

  useEffect(() => {
    checkLike();
  }, []);

  return (
    <Pressable
      onPress={handleLike}
      style={{
        fontSize: 20,
        color: "#b32071",
      }}
    >
      {liked ? (
        <HeartFilled size={30} color={"#b32071"} />
      ) : (
        <HeartOutlined size={30} />
      )}
    </Pressable>
  );
};

export default LikeButton;