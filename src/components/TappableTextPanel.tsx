import { useState } from "react";
import { View } from "react-native";
import WordModal from "./WordModal";
import WordToken from "./WordToken";
import lyricsStyles from "../styles/LyricsStyles";

const stripPunctuation = (word: string) =>
  word.replace(/^[^a-zA-ZÀ-ſ]+|[^a-zA-ZÀ-ſ]+$/g, "");

export default function TappableTextPanel({
  text,
  fromLang,
  toLang,
  songName,
}) {
  const [openModal, setOpenModal] = useState(false);
  const [clickedWord, setClickedWord] = useState("");
  const [selectedKey, setSelectedKey] = useState("");

  const handleWordPress = (word: string, wordKey: string) => {
    setClickedWord(stripPunctuation(word));
    setSelectedKey(wordKey);
    setOpenModal(true);
  };

  return (
    <>
      <View style={lyricsStyles.panelEndSpacing}>
        {text.split("\n").map((line, lineIdx) => (
          <View key={lineIdx} style={lyricsStyles.lineFormat}>
            {line.split(" ").map((word, wordIdx) => {
              const wordKey = `${lineIdx}-${wordIdx}`;
              return (
                <WordToken
                  key={wordIdx}
                  word={word}
                  isSelected={wordKey === selectedKey}
                  onPress={() => handleWordPress(word, wordKey)}
                />
              );
            })}
          </View>
        ))}
      </View>
      <View style={lyricsStyles.saveWordModal}>
        {openModal && (
          <WordModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            word={clickedWord}
            fromLang={fromLang}
            toLang={toLang}
            songName={songName}
          />
        )}
      </View>
    </>
  );
}
