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
  Image,
  ActivityIndicator,
} from "react-native";
import { PlusCircleOutlined } from "@ant-design/icons";
import { InfoCircleOutlined } from "@ant-design/icons";
import { SearchOutline, ArrowBackOutline } from "react-ionicons";
import FeatherIcon from "feather-icons-react";
import PlaylistReaderWriter from "../services/PlaylistReaderWriter";
import RecordReaderWriter from "../services/RecordReaderWriter";
import { PlayItem } from "../models/Types";
import { useLocation, useNavigate } from "react-router-dom";
import { PlayCircleFilled } from "@ant-design/icons";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { usePlayer } from "../context/PlayerContext";

const windowWidth = Dimensions.get("window").width;

function PlaylistInfoScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const playlistItem = location.state;
  // change to song list
  const [renSongList, setRenSongList] = useState<PlayItem[]>([]);
  const name = playlistItem.name;
  const playUID = playlistItem.playlist_id;
  const spotifyURL = "spotify:playlist:" + playlistItem.spotify_url;
  const description = playlistItem.description;
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingScreen, isLoadingScreen] = useState(true);
  const { playPlaylist } = usePlayer();

  useEffect(() => {
    try {
      // whenever a playlist is added or deleted, the home screen will update with new set of playlist
      // const handleRecordInserts = (payload) => {
      //   getAllSongsFromPlaylist(playUID);
      // };

      // downloadSongsFromSpotify(spotifyURL);
      getAllSongsFromPlaylist(playUID);

      // LocalSupabaseClient.channel("records")
      //   .on(
      //     "postgres_changes",
      //     { event: "*", schema: "public", table: "records" },
      //     handleRecordInserts
      //   )
      //   .subscribe();
      isLoadingScreen(false);
    } catch (err) {
      console.log(err);
    }
  }, [playUID]);

  async function getAllSongsFromPlaylist(playUID) {
    await RecordReaderWriter.getAllPlaylistSongs(playUID).then((mySongs) => {
      const playItems: PlayItem[] = mySongs!.map((song) => ({
        artist: song.songs["artist"],
        spotifyURL: "spotify:track:" + song.songs["spotify_url"],
        imageURL: song.songs["image_url"],
        name: song.songs["name"],
        album: song.songs["album"],
        duration: song.songs["duration"],
        songID: song.songs["song_id"],
        recordID: song["record_id"],
        isLiked: song["is_liked"],
      }));
      setRenSongList(playItems);
    });
  }

  function likedToNot(songID) {
    RecordReaderWriter.unlikeSong(songID);
  }

  function notToLiked(songID) {
    RecordReaderWriter.likeSong(songID);
  }

  const deletePlaylistAlert = () =>
    Alert.alert(
      "Are you Sure?",
      "Deleting this playlist will remove its data. It will not be retrievable once deleted.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deletePlaylist(),
        },
      ]
    );

  const deleteSongAlert = (recordID: string | undefined) =>
    Alert.alert(
      "Are you Sure?",
      "This song will be removed from this playlist if deleted.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deleteSongFromPlaylist(recordID),
        },
      ]
    );

  function deletePlaylist() {
    PlaylistReaderWriter.deletePlaylist(playUID);
    Alert.alert("Playlist deleted!");
    navigate("/home");
  }

  function deleteSongFromPlaylist(recordID) {
    RecordReaderWriter.deleteSongFromPlaylist(recordID);
  }

  // Filter the word list based on the search term
  const filteredWordList = renSongList
    ? renSongList.filter((song) =>
        song.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  if (!loadingScreen) {
    return (
      <>
        <View style={{ backgroundColor: "#e8e1db", flex: 1 }}>
          <View
            style={{
              paddingTop: 50,
              backgroundColor: "#ECC516",
              paddingBottom: 15,
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
            }}
          >
            <Pressable onPress={() => navigate(-1)} style={{ marginLeft: 20 }}>
              {/* <Ionicons style={{}} name="arrow-back" size={35} color="white" /> */}
              <ArrowBackOutline />
            </Pressable>
            <Pressable onPress={deletePlaylistAlert}>
              <FeatherIcon icon="x-circle" />;
              {/* <FeatherIcon
                name="x-circle"
                size={30}
                color="#ff4a2a"
                style={{ paddingTop: 20, paddingLeft: 350, paddingBottom: 40 }}
              /> */}
            </Pressable>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginRight: 20,
              }}
            >
              <Text
                style={styles.title}
                accessibilityLabel="workbookTitle"
                accessible={true}
              >
                {name}
              </Text>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Pressable onPress={() => playPlaylist(spotifyURL)}>
                  <PlayCircleFilled />
                </Pressable>

                <Pressable onPress={deletePlaylistAlert}>
                  {/* <Feather
                    name="x-circle"
                    size={30}
                    color="#ff4a2a"
                    accessibilityLabel="delete"
                    accessible={true}
                    style={{ paddingLeft: 20, paddingTop: 20 }}
                  /> */}
                  <FeatherIcon icon="x-circle" />;
                </Pressable>
              </View>
              {/* </Pressable> */}
            </View>
          </View>
          {/* Search bar */}

          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search playlist"
              value={searchTerm}
              onChangeText={setSearchTerm}
              accessibilityLabel="playlistSearch"
              accessible={true}
            />
            {/* <Ionicons name="search" size={24} color="#989898" /> */}
            <SearchOutline />
          </View>

          <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
            <Text style={{ fontSize: 18, paddingBottom: 5, color: "gray" }}>
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
            <Text style={{ color: "gray", marginLeft: 5 }}>Song</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "30%",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "gray", marginRight: 30 }}>Liked</Text>

              <Text style={{ color: "gray" }}>Delete</Text>
            </View>
          </View>

          <FlatList
            scrollEnabled={true}
            showsVerticalScrollIndicator={true}
            style={{ flex: 1 }}
            data={filteredWordList}
            accessibilityLabel="songs"
            accessible={true}
            numColumns={1}
            renderItem={({ item }) => {
              return (
                <>
                  <Pressable
                    onPress={() =>
                      navigate("Play", {
                        state: item,
                      })
                    }
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginHorizontal: 30,
                        marginVertical: 7,
                      }}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Image
                          style={{ width: 50, height: 50, borderRadius: 5 }}
                          source={{ uri: item.imageURL }}
                        />
                        <View style={{ paddingLeft: 5 }}>
                          <Text
                            numberOfLines={1}
                            style={{
                              fontWeight: "bold",
                              fontSize: 14,
                              maxWidth: 190,
                            }}
                          >
                            {item["name"]}
                          </Text>
                          <Text
                            numberOfLines={1}
                            style={{
                              maxWidth: 190,
                              color: "grey",
                            }}
                          >
                            {item["artist"]}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          width: "30%",
                          alignItems: "center",
                        }}
                      >
                        {item.isLiked ? (
                          <Pressable onPress={() => likedToNot(item.songID)}>
                            {/* <MaterialCommunityIcons
                              name="heart"
                              size={32}
                              color="#ff4a2a"
                              onPress={() => likedToNot(item.songID)}
                            /> */}
                            <FavoriteIcon />
                          </Pressable>
                        ) : (
                          <Pressable onPress={() => notToLiked(item.songID)}>
                            {/* <MaterialCommunityIcons
                              name="heart-outline"
                              size={32}
                              color="#ff4a2a"
                              onPress={() => notToLiked(item.songID)}
                            /> */}
                            <FavoriteBorderIcon />
                          </Pressable>
                        )}

                        <Pressable
                          onPress={() => deleteSongAlert(item.recordID)}
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginRight: 5,
                          }}
                        >
                          {/* <Feather name="x-circle" size={25} color="#ff4a2a" /> */}
                          <FeatherIcon icon="x-circle" />;
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
                  </Pressable>
                </>
              );
            }}
          />

          {renSongList === null && (
            <Text
              style={{
                textAlign: "left",
                // paddingTop: 20,
                paddingBottom: 240,
                color: "gray",
                fontSize: 15,
                fontWeight: "bold",
                paddingLeft: 30,
                paddingRight: 30,
              }}
            >
              Add songs to this playlist!
            </Text>
          )}

          {/*EDIT TO ADD NEW SONG? */}
          <Pressable
            onPress={() => navigate("/Search")}
            style={{
              flexDirection: "row",
              marginLeft: 35,
              alignItems: "center",
              paddingTop: 15,
            }}
            accessibilityLabel="addWord"
            accessible={true}
          >
            {/* <AntDesign
              name="pluscircleo"
              size={25}
              color="gray"
              style={{ marginRight: 10 }}
            /> */}
            <PlusCircleOutlined />
            <Text style={{ fontSize: 20, color: "gray" }}>Add New Song</Text>
          </Pressable>

          <Text>{"\n\n\n\n"}</Text>
          {/*Needs styling*/}
        </View>
      </>
    );
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
          <Pressable onPress={() => navigate(-1)} style={{ marginLeft: 20 }}>
            {/* <Ionicons style={{}} name="arrow-back" size={35} color="white" /> */}
            <ArrowBackOutline />
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
            <Pressable onPress={deletePlaylistAlert}>
              {/* <Feather
                name="x-circle"
                size={30}
                color="#ff4a2a"
                style={{ paddingTop: 20 }}
              /> */}
              <FeatherIcon icon="x-circle" />;
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
          <SearchOutline />
        </View>

        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#303248" />
        </View>
      </View>
    );
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
    marginTop: 20,
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
});

export default PlaylistInfoScreen;
