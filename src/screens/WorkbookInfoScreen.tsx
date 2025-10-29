/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Alert,
  Pressable,
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
import workbookStyles from "../styles/WorkbookStyles";

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
        console.log(payload);
        getAllWordsFromWorkbook(bookUID);
      };

      getAllWordsFromWorkbook(bookUID);

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

  // const deleteWordAlert = (word) =>
  //   Alert.alert(
  //     "Are you Sure?",
  //     "This word will be removed from this workbook if deleted.",
  //     [
  //       {
  //         text: "Cancel",
  //         onPress: () => console.log("Cancel Pressed"),
  //         style: "cancel",
  //       },
  //       {
  //         text: "Delete",
  //         onPress: () => deleteWord(word["word_id"]),
  //       },
  //     ]
  //   );

  function deleteWorkbook() {
    WorkbookReaderWriter.deleteWorkbook(bookUID);
    Alert.alert("Workbook deleted!");
    navigate(-1);
  }

  async function deleteWord(word) {
    console.log("deleting word")
    await WordReaderWriter.deleteWord(word["word_id"]);
  }

  const filteredWordList = renWordList
    ? renWordList.filter(
        (word) =>
          word["word"].toLowerCase().includes(searchTerm.toLowerCase()) ||
          word["translation"].toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  if (!loadingScreen) {
    return (
      <>
        <View style={workbookStyles.background}>
          <View style={workbookStyles.header}>
            <View style={workbookStyles.close}>
              <View style={workbookStyles.closeLocation}>
                <Pressable onPress={() => navigate(-1)}>
                  <ArrowBackOutline
                    color={"#00000"}
                    height="30px"
                    width="30px"
                    style={workbookStyles.arrowBtn}
                  />
                </Pressable>
                <Text
                  style={workbookStyles.title}
                  accessibilityLabel="workbookTitle"
                  accessible={true}
                >
                  {name}
                </Text>
              </View>
              <Pressable
                onPress={deleteWorkbookAlert}
                style={workbookStyles.closeBtn}
              >
                <FeatherIcon icon="x-circle" size={35} />
              </Pressable>
            </View>
          </View>

          <View style={workbookStyles.searchBar}>
            <TextInput
              style={workbookStyles.searchInput}
              placeholder="Search Words"
              value={searchTerm}
              onChangeText={setSearchTerm}
              accessibilityLabel="wordSearch"
              accessible={true}
            />
            <SearchOutline color={"#00000"} height="40px" width="40px" />
          </View>

          <View style={workbookStyles.descLocation}>
            <Text style={workbookStyles.descTitle}>Description</Text>
            <View>
              <View style={workbookStyles.descIcon}>
                <InfoCircleOutlined />
                <Text
                  style={workbookStyles.descTxt}
                  accessibilityLabel="description"
                  accessible={true}
                >
                  {description}
                </Text>
              </View>
            </View>
          </View>
          <View style={workbookStyles.wordCol}>
            <Text style={workbookStyles.wordColTxt}>Word</Text>
            <View style={workbookStyles.starredCol}>
              <Text style={workbookStyles.starredColTxt}>Starred</Text>
              <Text style={workbookStyles.deleteColTxt}>Delete</Text>
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
                  <View style={workbookStyles.wordList}>
                    <WordItem item={item} />
                    <View style={workbookStyles.iconCols}>
                      {item.is_starred ? (
                        <Pressable
                          onPress={() => starredToNot(item.word_id)}
                          style={workbookStyles.starIconFilled}
                        >
                          <StarFilled />
                        </Pressable>
                      ) : (
                        <Pressable
                          onPress={() => notToStarred(item.word_id)}
                          style={workbookStyles.starIconOutline}
                        >
                          <StarOutlined />
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
                        onPress={() => deleteWord(item)}
                        style={workbookStyles.deleteIcon}
                      >
                        <FeatherIcon icon="x-circle" />
                      </Pressable>
                    </View>
                  </View>
                  <View style={workbookStyles.divider} />
                </>
              );
            }}
          />

          {renWordList === null && (
            <Text style={workbookStyles.noWordsTxt}>
              Add words manually or start listening to songs and click a word in
              the original lyrics to save it!
            </Text>
          )}

          <View>
            <Pressable
              onPress={() =>
                navigate("/workbook/newWord", {
                  state: { name: name, book_id: bookUID },
                })
              }
              style={workbookStyles.addNewWordBtn}
              accessibilityLabel="addWord"
              accessible={true}
            >
              <PlusCircleOutlined style={workbookStyles.addBtnIcon} />

              <Text style={workbookStyles.addNewWordTxt}>Add New Word</Text>
            </Pressable>

            <Pressable
              onPress={() =>
                navigate("/workbook/flashcards", {
                  state: { name: name, book_id: bookUID },
                })
              }
              style={workbookStyles.button}
              accessibilityLabel="addconfirm"
              accessible={true}
            >
              <Text style={workbookStyles.buttonText}>Open Flashcards</Text>
            </Pressable>
          </View>
        </View>
      </>
    );
  } else {
    return (
      <View>
        <View style={workbookStyles.header}>
          <Pressable onPress={() => navigate(-1)} style={{ marginLeft: 20 }}>
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
            <Text style={workbookStyles.title}>{name}</Text>
            <Pressable onPress={deleteWorkbookAlert}>
              <FeatherIcon icon="x-circle" />
            </Pressable>
          </View>
        </View>

        <View style={workbookStyles.searchBar}>
          <TextInput
            style={workbookStyles.searchInput}
            placeholder="Search Words"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          <SearchOutline color={"#00000"} height="250px" width="250px" />
        </View>

        <View style={workbookStyles.loading}>
          <ActivityIndicator size="large" color="#303248" />
        </View>
      </View>
    );
  }
}

export default WorkbookInfoScreen;
