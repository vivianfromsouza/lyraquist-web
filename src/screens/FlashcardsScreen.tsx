/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Flashcard from "../components/Flashcard";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowBackOutline } from "react-ionicons";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import WordReaderWriter from "../services/WordReaderWriter";
import LocalSupabaseClient from "../services/LocalSupabaseClient";
import flashcardStyles from "../styles/FlashcardStyles";
import "../styles/Flashcard.css";

function FlashcardScreen() {
  const responsive = {
    desktop: {
      breakpoint: { max: 2000, min: 1024 },
      items: 1,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const navigate = useNavigate();
  const location = useLocation();
  const bookItem = location.state;
  const [flashcardList, setFlashcardList] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const bookUID = bookItem.book_id;
  const bookName = bookItem.name;
  const startWordUID = bookItem.word_id;
  const carouselRef = useRef<Carousel>(null);
  const hasJumpedToStartWord = useRef(false);

  useEffect(() => {
    if (hasJumpedToStartWord.current || !startWordUID || flashcardList.length === 0) {
      return;
    }
    const startIndex = flashcardList.findIndex(
      (word) => word.word_id === startWordUID
    );
    // Wait a tick so the carousel has mounted and measured its item width
    const timeout = setTimeout(() => {
      hasJumpedToStartWord.current = true;
      if (startIndex > 0) {
        carouselRef.current?.goToSlide(startIndex, true);
        setCurrentIndex(startIndex);
      }
    });
    return () => clearTimeout(timeout);
  }, [flashcardList, startWordUID]);

  useEffect(() => {
    const handleWorkbookInserts = () => {
      getAllWordsFromWorkbook(bookUID);
    };

    getAllWordsFromWorkbook(bookUID);

    LocalSupabaseClient.channel("words")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "words" },
        handleWorkbookInserts
      )
      .subscribe();
  }, [bookUID]);

  async function getAllWordsFromWorkbook(bookUID) {
    await WordReaderWriter.getAllWordsFromWorkbook(bookUID).then((myWords) => {
      setFlashcardList(myWords);
    });
  }

  return (
    <View style={flashcardStyles.container}>
      <View style={flashcardStyles.header}>
        <View style={flashcardStyles.headerRow}>
          <TouchableOpacity onPress={() => navigate(-1)}>
            <ArrowBackOutline color={"#e8e1db"} height="25px" width="25px" />
          </TouchableOpacity>
          <Text style={flashcardStyles.headerTitle}>{bookName}</Text>
          {flashcardList.length > 0 && (
            <Text style={flashcardStyles.headerCount}>
              {currentIndex + 1} / {flashcardList.length}
            </Text>
          )}
        </View>
      </View>

      {flashcardList.length > 0 && (
        <div className="flashcard-progress">
          <div
            className="flashcard-progress-fill"
            style={{ width: `${((currentIndex + 1) / flashcardList.length) * 100}%` }}
          />
        </div>
      )}

      {/* Only mount once words load, otherwise the carousel resets to slide 0 when its children change */}
      {flashcardList.length > 0 && (
        <Carousel
          ref={carouselRef}
          swipeable={false}
          draggable={false}
          responsive={responsive}
          ssr={true}
          infinite={false}
          keyBoardControl={true}
          afterChange={(_, state) => setCurrentIndex(state.currentSlide)}
        >
          {flashcardList.map((flashcard) => {
            return <Flashcard key={flashcard.word_id} wordItem={flashcard} />;
          })}
        </Carousel>
      )}
    </View>
  );
}

export default FlashcardScreen;