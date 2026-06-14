import { useState } from "react";
import { Text, TouchableHighlight, View } from "react-native";
import WordModal from "./WordModal";
import lyricsStyles from "../styles/LyricsStyles";

export default function TranslationPanel({
  translation,
  prefLang,
  songLang,
  currentTrack,
}) {
  const [openModal, setOpenModal] = useState(false);
  const [clickedWord, setClickedWord] = useState("");

  return (
    <>
      <View>
        {translation.split("\n").map((line, lineIdx) => (
          <View key={lineIdx} style={lyricsStyles.lineFormat}>
            {line.split(" ").map((word, wordIdx) => (
              <TouchableHighlight
                key={wordIdx}
                onPress={() => {
                  setClickedWord(
                    word.replace(
                      /^[^a-zA-Z\u00C0-\u017F]+|[^a-zA-Z\u00C0-\u017F]+$/g,
                      "",
                    ),
                  );
                  setOpenModal(true);
                }}
                style={lyricsStyles.highlight}
                underlayColor="rgba(237, 197, 38, 0.25)"
              >
                <Text style={lyricsStyles.lyricsText}>{word}</Text>
              </TouchableHighlight>
            ))}
          </View>
        ))}
      </View>
      <View style={lyricsStyles.saveWordModal}>
        {openModal && (
          <WordModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            word={clickedWord}
            fromLang={prefLang}
            toLang={songLang}
            songName={currentTrack.name}
          ></WordModal>
        )}
      </View>
    </>
  );
}
