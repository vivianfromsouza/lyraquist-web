/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { View, Pressable, Dimensions, StyleSheet } from "react-native";
import Flashcard from "../components/Flashcard";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowUndo,  } from "react-ionicons";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import WordReaderWriter from "../services/WordReaderWriter";
import LocalSupabaseClient from "../services/LocalSupabaseClient";

// // const windowWidth = Dimensions.get("window").width;
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

function FlashcardScreen() {
  // these are for the carousel's dimensions
  const responsive = {
    desktop: {
      breakpoint: { max: 2000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  // const SAMPLE_CARDS = [
  //   {
  //     word: "hola",
  //     definition: "hello",
  //     partOfSpeech: "greeting",
  //     language: "spanish",
  //   },
  //   {
  //     word: "bonjour",
  //     definition: "hello",
  //     partOfSpeech: "greeting",
  //     language: "french",
  //   },
  //   {
  //     word: "Hallo",
  //     definition: "hello",
  //     partOfSpeech: "greeting",
  //     language: "german",
  //   },
  //   {
  //     word: "hello",
  //     definition: "hello",
  //     partOfSpeech: "greeting",
  //     language: "english",
  //   },
  // ];

    const navigate = useNavigate();
    const location = useLocation();
    const bookItem = location.state;
    const [flashcardList, setFlashcardList] = useState<any[]>([]);
    const bookUID = bookItem.book_id;

    useEffect(() => {
      const handleWorkbookInserts = () => {
        getAllWordsFromWorkbook(bookUID); //get workbooks associated with the user
      };

      getAllWordsFromWorkbook(bookUID); //get workbooks associated with the user

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
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          navigate(-1);
        }}
      >
        {/* <Ionicons style={{}} name="arrow-undo" size={40} color="#303248" /> */}
        <ArrowUndo color={"#00000"} height="25px" width="25px" />
      </Pressable>

      <Carousel
        swipeable={false}
        draggable={false}
        showDots={false}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    backgroundColor: "#e8e1db",
    height: SCREEN_HEIGHT,
  },
});

export default FlashcardScreen;
