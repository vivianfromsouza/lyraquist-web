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
import { StarFilled, StarOutlined, PlusCircleOutlined } from "@ant-design/icons";
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

          {/* Header */}
          <View style={workbookStyles.header}>
            <View style={workbookStyles.close}>
              <View style={workbookStyles.closeLocation}>
                <Pressable onPress={() => navigate(-1)}>
                  <ArrowBackOutline
                    color={"#e8e1db"}
                    height="25px"
                    width="25px"
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
                <FeatherIcon icon="x-circle" size={22} color="rgba(232,225,219,0.6)" />
              </Pressable>
            </View>
          </View>

          {/* Search */}
          <View style={workbookStyles.searchBar}>
            <TextInput
              style={workbookStyles.searchInput}
              placeholder="Search Words"
              placeholderTextColor="rgba(48,50,72,0.4)"
              value={searchTerm}
              onChangeText={setSearchTerm}
              accessibilityLabel="wordSearch"
              accessible={true}
            />
            <SearchOutline color={"rgba(48,50,72,0.4)"} height="20px" width="20px" />
          </View>

          {/* Description */}
          {description ? (
            <View style={workbookStyles.descLocation}>
              <View style={workbookStyles.sectionHeader}>
                <Text style={workbookStyles.sectionLabel}>Description</Text>
                <View style={workbookStyles.sectionLabelLine} />
              </View>
              <Text
                accessibilityLabel="description"
                accessible={true}
                style={workbookStyles.descText}
              >
                {description}
              </Text>
            </View>
          ) : null}

          {/* Words section */}
          <View style={workbookStyles.sectionHeader}>
            <Text style={workbookStyles.sectionLabel}>Words</Text>
            <View style={workbookStyles.sectionLabelLine} />
          </View>
          <View style={workbookStyles.wordCol}>
            <View style={workbookStyles.starredCol}>
              <Text style={workbookStyles.starredColTxt}>Starred</Text>
              <Text style={workbookStyles.deleteColTxt}>Delete</Text>
            </View>
          </View>

          <FlatList
            scrollEnabled={true}
            showsVerticalScrollIndicator={true}
            style={{ flex: 1 }}
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
                        <Pressable onPress={() => starredToNot(item.word_id)}>
                          <StarFilled style={{ fontSize: 18, color: "#5bc8a6" }} />
                        </Pressable>
                      ) : (
                        <Pressable onPress={() => notToStarred(item.word_id)}>
                          <StarOutlined style={{ fontSize: 18, color: "rgba(48,50,72,0.35)" }} />
                        </Pressable>
                      )}
                      <Pressable
                        onPress={() => deleteWord(item)}
                        style={workbookStyles.deleteIcon}
                      >
                        <FeatherIcon icon="x-circle" size={18} color="rgba(48,50,72,0.35)" />
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
              <PlusCircleOutlined style={{ color: "#5bc8a6", fontSize: 16 }} />
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
      <View style={workbookStyles.background}>
        <View style={workbookStyles.header}>
          <View style={workbookStyles.close}>
            <View style={workbookStyles.closeLocation}>
              <Pressable onPress={() => navigate(-1)}>
                <ArrowBackOutline color={"#e8e1db"} height="25px" width="25px" style={workbookStyles.arrowBtn} />
              </Pressable>
              <Text style={workbookStyles.title}>{name}</Text>
            </View>
            <Pressable onPress={deleteWorkbookAlert} style={workbookStyles.closeBtn}>
              <FeatherIcon icon="x-circle" size={22} color="rgba(232,225,219,0.6)" />
            </Pressable>
          </View>
        </View>

        <View style={workbookStyles.searchBar}>
          <TextInput
            style={workbookStyles.searchInput}
            placeholder="Search Words"
            placeholderTextColor="rgba(48,50,72,0.4)"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          <SearchOutline color={"rgba(48,50,72,0.4)"} height="20px" width="20px" />
        </View>

        <View style={workbookStyles.loading}>
          <ActivityIndicator size="large" color="#303248" />
        </View>
      </View>
    );
  }
}

export default WorkbookInfoScreen;
