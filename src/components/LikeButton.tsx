import { Pressable } from "react-native-web";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import LikesReaderWriter from "../services/LikesReaderWriter";

const LikeButton = ({spotifyURL, songDetails, initialLiked = false}) => {
  const [liked, setLiked] = useState(initialLiked);
  console.log("spotify url in like button", songDetails);

  async function checkLike() {
    if (await LikesReaderWriter.isLiked(spotifyURL.split(":")[2])) {
      console.log("liked")
      setLiked(true);
    } else {
      console.log("not liked")
    }
  }

  const handleLike = async () => {
    if (!liked) {
      await LikesReaderWriter.likeSong(spotifyURL.split(":")[2], songDetails);
      setLiked((isLiked) => !isLiked);
    } else {
      await LikesReaderWriter.unlikeSong(spotifyURL.split(":")[2]);
      setLiked((isLiked) => !isLiked);
    }
  };

  useEffect(() => {
    checkLike();
  }, []);

  return (
    <Pressable
      onPress={handleLike}
      testID={liked ? "liked-icon" : "unliked-icon"}
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