// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect, useState } from "react";
// import { View, StyleSheet, Pressable, Dimensions } from "react-native";
// import { ArrowUndo } from "react-ionicons";
// import Flashcard from "../components/Flashcard";
// // import Carousel from "react-native-reanimated-carousel";
// import WordReaderWriter from "../services/WordReaderWriter";
// import LocalSupabaseClient from "../services/LocalSupabaseClient";
// import { useLocation, useNavigate } from "react-router-dom";

// // const windowWidth = Dimensions.get("window").width;
// const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// function FlashcardScreen() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const bookItem = location.state;
//   const [renWordList, setRenWordList] = useState<any[] | null>([]);
//   const bookUID = bookItem.book_id;
//   const [loadingScreen, isLoadingScreen] = useState(true);

//   useEffect(() => {
//     const handleWorkbookInserts = (payload) => {
//       getAllWordsFromWorkbook(bookUID); //get workbooks associated with the user
//     };

//     getAllWordsFromWorkbook(bookUID); //get workbooks associated with the user

//     LocalSupabaseClient.channel("words")
//       .on(
//         "postgres_changes",
//         { event: "*", schema: "public", table: "words" },
//         handleWorkbookInserts
//       )
//       .subscribe();
//     isLoadingScreen(false);
//   }, [bookUID]);

//   async function getAllWordsFromWorkbook(bookUID) {
//     await WordReaderWriter.getAllWordsFromWorkbook(bookUID).then((myWords) => {
//       setRenWordList(myWords);
//     });
//   }

//   return (
//     <View style={styles.container}>
//       <Pressable
//         style={{
//           marginLeft: -340,
//           marginTop: 70,
//         }}
//         onPress={() => {
//           navigate(-1);
//         }}
//       >
//         {/* <Ionicons style={{}} name="arrow-undo" size={40} color="#303248" /> */}
//         <ArrowUndo />
//       </Pressable>
//       {/* <Carousel
//         loop={false}
//         width={500}
//         height={1000}
//         autoPlay={false}
//         data={renWordList}
//         scrollAnimationDuration={1000}
//         onSnapToItem={(index) => console.log("current index:", index)}
//         renderItem={({ index }) => (
//           <>
//             <Flashcard word={renWordList![index]}></Flashcard>
//           </>
//         )}
//       ></Carousel> */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     backgroundColor: "#e8e1db",
//     height: SCREEN_HEIGHT,
//   },
// });

// export default FlashcardScreen;
