import { Text, TouchableHighlight } from "react-native";
import lyricsStyles from "../styles/LyricsStyles";

export default function WordToken({ word, isSelected, onPress }) {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={[
        lyricsStyles.highlight,
        isSelected && lyricsStyles.selectedHighlight,
      ]}
      underlayColor="rgba(237, 197, 38, 0.25)"
    >
      <Text
        style={[
          lyricsStyles.lyricsText,
          isSelected && lyricsStyles.selectedLyricsText,
        ]}
      >
        {word}
      </Text>
    </TouchableHighlight>
  );
}
