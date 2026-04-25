/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Flashcard from "../components/Flashcard";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowBackOutline } from "react-ionicons";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import WordReaderWriter from "../services/WordReaderWriter";
import LocalSupabaseClient from "../services/LocalSupabaseClient";
import flashcardStyles from "../styles/FlashcardStyles";

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
      {/* Header */}
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

      <Carousel
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true}
        infinite={false}
        keyBoardControl={true}
        afterChange={(_, state) => setCurrentIndex(state.currentSlide)}
      >
        {flashcardList!.map((flashcard) => {
          return <Flashcard key={flashcard.word_id} wordItem={flashcard} />;
        })}
      </Carousel>
    </View>
  );
}

export default FlashcardScreen;
