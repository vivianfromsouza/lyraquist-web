/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  Pressable,
  Dimensions,
  TextInput,
  ActivityIndicator,
} from "react-native";
import WorkbookReaderWriter from "../services/WorkbookReaderWriter";
import WordItem from "../components/WordItem";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { PlusCircleOutlined } from "@ant-design/icons";
import { InfoCircleOutlined } from "@ant-design/icons";
import FeatherIcon from "feather-icons-react";

import WordReaderWriter from "../services/WordReaderWriter";
import LocalSupabaseClient from "../services/LocalSupabaseClient";
import { SearchOutline, ArrowBackOutline } from "react-ionicons";
import { useLocation, useNavigate } from "react-router-dom";

const windowWidth = Dimensions.get("window").width;

function WorkbookInfoScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const wordItemParam = location.state;
  const [renWordList, setRenWordList] = useState<any[] | null>([]);
  const name = wordItemParam.name;
  const bookUID = wordItemParam.book_id;
  const description = wordItemParam.description;

  const [searchTerm, setSearchTerm] = useState("");
  const [loadingScreen, isLoadingScreen] = useState(true);

  useEffect(() => {
    try {
      const handleWordInserts = (payload) => {
        console.log("Change received!", payload);
        getAllWordsFromWorkbook(bookUID); //get workbooks associated with the user
      };

      getAllWordsFromWorkbook(bookUID); //get workbooks associated with the user

      LocalSupabaseClient.channel("words")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "words" },
          handleWordInserts
        )
        .subscribe();

      isLoadingScreen(false);
    } catch (err) {
      console.log(err);
    }
  }, [bookUID]);

  async function getAllWordsFromWorkbook(bookUID) {
    await WordReaderWriter.getAllWordsFromWorkbook(bookUID).then((myWords) => {
      setRenWordList(myWords);
    });
  }

  function starredToNot(wordUID) {
    WordReaderWriter.unstarWord(wordUID);
  }

  function notToStarred(wordUID) {
    WordReaderWriter.starWord(wordUID);
  }

  const deleteWorkbookAlert = () =>
    Alert.alert(
      "Are you Sure?",
      "Deleting this workbook will remove its data. It will not be retrievable once deleted.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deleteWorkbook(),
        },
      ]
    );

  const deleteWordAlert = (word) =>
    Alert.alert(
      "Are you Sure?",
      "This word will be removed from this workbook if deleted.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deleteWord(word["word_id"]),
        },
      ]
    );

  function deleteWorkbook() {
    WorkbookReaderWriter.deleteWorkbook(bookUID);
    Alert.alert("Workbook deleted!");
    navigate(-1);
  }

  function deleteWord(wordUID) {
    WordReaderWriter.deleteWord(wordUID);
  }

  // Filter the word list based on the search term
  const filteredWordList = renWordList
    ? renWordList.filter((word) =>
        word["word"].toLowerCase().includes(searchTerm.toLowerCase()) || word["translation"].toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  if (!loadingScreen) {
    return (
      <>
        <View style={{ backgroundColor: "#e8e1db", flex: 1, height:'91vh' }}>
          <View
            style={{
              paddingTop: 50,
              backgroundColor: "#5bc8a6",
              paddingBottom: 15,
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
              flexDirection: "column",
              flex: 0.5,
              justifyContent: "space-between",
              //marginBottom:-20
              
            }}
          >
            
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginRight: 20,
                flex: 0,
                //marginBottom:20
              }}
            >
              <View style={{flexDirection:'row', alignItems:'center', }}>
              <Pressable onPress={() => navigate(-1)} style={{ marginLeft: 20 }}>
              {/* <Ionicons
                style={{ marginTop: 60 }}
                name="arrow-back"
                size={35}
                color="white"
              /> */}
              <ArrowBackOutline color={"#00000"} height="30px" width="30px" style={{marginTop:25}}/>
            </Pressable>
              <Text
                style={styles.title}
                accessibilityLabel="workbookTitle"
                accessible={true}
              >
                {name}
              </Text>
              </View>
              <Pressable onPress={deleteWorkbookAlert} style={{color:"#ff4a2a"}}>
                {/* <Feather
                  name="x-circle"
                  size={30}
                  color="#ff4a2a"
                  style={{ paddingTop: 20 }}
                /> */}
                <FeatherIcon icon="x-circle" size={35}/>
              </Pressable>
            </View>
          </View>
          {/* Search bar */}

          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search Words"
              value={searchTerm}
              onChangeText={setSearchTerm}
              accessibilityLabel="wordSearch"
              accessible={true}
            />
            {/* <Ionicons name="search" size={24} color="#989898" /> */}
            <SearchOutline color={"#00000"} height="40px" width="40px" />
          </View>

          <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
            <Text style={{ fontSize: 18, paddingBottom: 3, color: "gray" }}>
              Description
            </Text>
            <View
              style={{
                backgroundColor: "#e8e1db",
                borderRadius: 10,
                elevation: 5,
              }}
            >
              <View
                style={{
                  borderRadius: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingRight: 15,
                }}
              >
                {/* <AntDesign
                  name="infocirlceo"
                  size={24}
                  color="gray"
                  style={{ marginHorizontal: 10 }}
                /> */}
                <InfoCircleOutlined />
                <Text
                  style={{
                    marginVertical: 10,
                    fontSize: 18,
                    marginRight: 20,
                    marginLeft:8,
                    
                  }}
                  accessibilityLabel="description"
                  accessible={true}
                >
                  {description}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 30,
              paddingTop: 15,
              marginRight: 40,
            }}
          >
            <Text style={{ color: "gray", marginLeft: 5 }}>Word</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "30%",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "gray", marginRight: 30 }}>Starred</Text>
              <Text style={{ color: "gray" }}>Delete</Text>
            </View>
          </View>

          <FlatList
            scrollEnabled={true}
            showsVerticalScrollIndicator={true}
            style={{
              flex: 1,
            }}
            data={filteredWordList}
            accessibilityLabel="words"
            accessible={true}
            numColumns={1}
            renderItem={({ item }) => {
              return (
                <>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginHorizontal: 30,
                      marginVertical: 5,
                      //flex:1
                    }}
                  >
                    <WordItem item={item} />
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "30%",
                        alignItems: "center",
                      }}
                    >
                      {item.is_starred ? (
                        <Pressable onPress={() => starredToNot(item.word_id)} style={{fontSize:30, color:"#edc526"}}>
                          <StarFilled />
                          {/* <AntDesign name="star" size={32} color="#edc526" /> */}
                        </Pressable>
                      ) : (
                        <Pressable onPress={() => notToStarred(item.word_id)} style={{fontSize:30,}}>
                          <StarOutlined />
                          {/* <AntDesign name="staro" size={32} color="#303248" /> */}
                        </Pressable>
                      )}

                      {/* {item !== null && (
                        <>
                          {item.isStarred && (
                            <StarredButton
                              word={item.wordUID}
                              accessibilityLabel="starWord"
                              accessible={true}
                            />
                          )}
                          {!item.isStarred && (
                            <NotStarredButton
                              word={item}

                              accessibilityLabel="starWord"
                              accessible={true}
                            />
                          )}
                        </>
                      )}
                      {starredWords === null && (
                        <>
                          <NotStarredButton word={item} />
                        </>
                      )} */}
                      <Pressable
                        onPress={() => deleteWordAlert(item)}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginRight: 5,
                        }}
                      >
                        {/* <Feather name="x-circle" size={25} color="#ff4a2a" /> */}
                        <FeatherIcon icon="x-circle" />
                      </Pressable>
                    </View>
                  </View>
                  <View
                    style={{
                      borderBottomColor: "gray",
                      borderBottomWidth: 0.5,
                      marginHorizontal: 30,
                    }}
                  />
                </>
              )
            }}
          />

          {renWordList === null && (
            <Text
              style={{
                textAlign: "left",
                paddingTop: 40,
                color: "gray",
                fontSize: 15,
                fontWeight: "bold",
                paddingLeft: 20,
                paddingRight: 20,
              }}
            >
              Add words manually or start listening to songs and click a word in
              the original lyrics to save it!
            </Text>
          )}

          {/* //</>Button to add a new word, navigates to newWord screen  */}
          <View
            style={{
              //flex: 1,
              // justifyContent: "flex-end",
            }}
          >
            <Pressable
              onPress={() =>
                navigate("/workbook/newWord", {
                  state: { name: name, book_id: bookUID },
                })
              }
              style={{
                flexDirection: "row",
                marginLeft: 35,
                alignItems: "center",
                marginTop: 20,
                marginBottom:20

              }}
              accessibilityLabel="addWord"
              accessible={true}
            >
              <PlusCircleOutlined style={{marginRight:9}}/>
              {/* <AntDesign
                name="pluscircleo"
                size={25}
                color="gray"
                style={{ marginRight: 10 }}
              /> */}
              <Text style={{ fontSize: 20, color: "gray" }}>Add New Word</Text>
            </Pressable>

            {/* <Text>{"\n\n\n\n"}</Text> */}

            <Pressable
              onPress={() =>
                navigate("/workbook/flashcards", {
                  state: { name: name, book_id: bookUID },
                })
              }
              style={styles.button}
              accessibilityLabel="addconfirm"
              accessible={true}
            >
              <Text style={styles.buttonText}>Open Flashcards</Text>
            </Pressable>
          </View>
        </View>
      </>
    )
  } else {
    return (
      <View>
        <View
          style={{
            paddingTop: 50,
            backgroundColor: "#5bc8a6",
            paddingBottom: 15,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
          }}
        >
          <Pressable
            onPress={() => navigate(-1)}
            style={{ marginLeft: 20 }}
          >
            {/* <Ionicons style={{}} name="arrow-back" size={35} color="white" /> */}
            <ArrowBackOutline color={"#00000"} height="25px" width="25px" />
          </Pressable>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginRight: 20,
            }}
          >
            <Text style={styles.title}>{name}</Text>
            <Pressable onPress={deleteWorkbookAlert}>
              {/* <Feather
                name="x-circle"
                size={30}
                color="#ff4a2a"
                style={{ paddingTop: 20 }}
              /> */}
              <FeatherIcon icon="x-circle" />
            </Pressable>
          </View>
        </View>

        {/* Search bar */}
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Words"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          {/* <Ionicons name="search" size={24} color="#989898" /> */}
          <SearchOutline color={"#00000"} height="250px" width="250px" />
        </View>

        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#303248" />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    textAlign: "left",
    fontSize: 35,
    fontWeight: "800",
    marginLeft: 20,
    paddingTop: 15,
    color: "white",
  },
  introSect: {
    flex: 1,
    width: windowWidth,
    backgroundColor: "#303248",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderRadius: 15,
    paddingBottom: 30,
  },
  searchBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    marginTop: 30,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    color: "#000",
    paddingHorizontal: 10,
  },
  loading: {
    marginTop: 50,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e8e1db",
  },
  button: {
    backgroundColor: "#303248",
    paddingHorizontal: 20,
    paddingVertical: 10,
    // marginTop: 60,
    marginTop: 20,
    borderRadius: 10,
    marginLeft: "auto",
    marginRight: "auto",
    width: "80%",
    marginBottom:20,
  },
  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
    color: "#edc525",
  },
});

export default WorkbookInfoScreen;
