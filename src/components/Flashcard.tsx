// Built based on this link: https://nabendu82.medium.com/build-a-flashcard-quiz-with-react-c1cb96e3a1e8
import { useState } from "react";
import { Text } from "react-native";
import flashcardStyles from "../styles/FlashcardStyles";
import "../styles/Flashcard.css";

const Flashcard = ({ wordItem }) => {
  const [flip, setFlip] = useState(false);
  return (
    <div className="flashcard-scene" onClick={() => setFlip(!flip)}>
      <div className={`flashcard-card${flip ? " is-flipped" : ""}`}>
        <div className="flashcard-face flashcard-face--front">
          <Text style={flashcardStyles.word}>{wordItem.word}</Text>
          {(wordItem.language || wordItem.part_of_speech) && (
            <div className="flashcard-badges">
              {wordItem.language && (
                <span className="flashcard-badge">{wordItem.language}</span>
              )}
              {wordItem.part_of_speech && (
                <span className="flashcard-badge">{wordItem.part_of_speech}</span>
              )}
            </div>
          )}
          <span className="flashcard-hint">tap to reveal</span>
        </div>
        <div className="flashcard-face flashcard-face--back">
          <Text style={flashcardStyles.word}>{wordItem.translation}</Text>
          <span className="flashcard-hint">tap to flip back</span>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;