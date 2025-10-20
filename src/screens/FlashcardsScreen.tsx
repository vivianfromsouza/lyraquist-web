/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
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
  const bookUID = bookItem.book_id;

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
      <TouchableOpacity
        onPress={() => navigate(-1)}
        style={{ marginLeft: 20, marginTop: 20 }}
      >
        <ArrowBackOutline color={"#00000"} height="25px" width="25px" />
      </TouchableOpacity>

      <Carousel
        swipeable={false}
        draggable={false}
        showDots={false}
        responsive={responsive}
        ssr={true}
        infinite={false}
        keyBoardControl={true}
      >
        {flashcardList!.map((flashcard) => {
          return <Flashcard wordItem={flashcard}></Flashcard>;
        })}
      </Carousel>
    </View>
  );
}

export default FlashcardScreen;
