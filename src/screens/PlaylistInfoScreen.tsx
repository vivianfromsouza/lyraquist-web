import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Alert,
  Pressable,
  TextInput,
} from "react-native";
import { PlusCircleOutlined } from "@ant-design/icons";
import { SearchOutline, ArrowBackOutline } from "react-ionicons";
import FeatherIcon from "feather-icons-react";
import PlaylistReaderWriter from "../services/PlaylistReaderWriter";
import RecordReaderWriter from "../services/RecordReaderWriter";
import { PlayItem } from "../models/Types";
import { useLocation, useNavigate } from "react-router-dom";
import { PlayCircleFilled } from "@ant-design/icons";
import { usePlayer } from "../context/PlayerContext";
import { toast, ToastContainer } from "react-toastify";
import LocalSupabaseClient from "../services/LocalSupabaseClient";
import PlaylistItem from "../components/PlaylistItem";
import playlistStyles from "../styles/PlaylistStyles";

function PlaylistInfoScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const playlistItem = location.state;
  const [renSongList, setRenSongList] = useState<PlayItem[]>([]);
  const name = playlistItem.name;
  const playUID = playlistItem.playlist_id;
  const playlistURL = "spotify:playlist:" + playlistItem.spotify_url;
  const description = playlistItem.description;
  const [searchTerm, setSearchTerm] = useState("");
  const { playPlaylist } = usePlayer();

  useEffect(() => {
    try {
      getAllSongsFromPlaylist(playUID);

      const handleRecordInserts = (payload) => {
        console.log(payload);
        getAllSongsFromPlaylist(playUID);
      };

      LocalSupabaseClient.channel("records")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "records" },
          handleRecordInserts
        )
        .subscribe();
    } catch (err) {
      console.log(err);
    }
  }, [playUID]);

  async function getAllSongsFromPlaylist(playUID) {
    await RecordReaderWriter.getAllPlaylistSongs(playUID).then((mySongs) => {
      const playItems: PlayItem[] = mySongs!.map((song) => ({
        artist: song.songs["artist"],
        spotifyURL: song.songs["spotify_url"],
        imageURL: song.songs["image_url"],
        name: song.songs["name"],
        album: song.songs["album"],
        duration: song.songs["duration"],
        recordID: song["record_id"],
        isLiked: song["is_liked"],
      }));
      setRenSongList(playItems);
    });
  }

  const deletePlaylistAlert = () => {
    toast(
      "Are you Sure? Deleting this playlist will remove its data. It will not be retrievable once deleted.",
      { closeButton: deleteAlertButton }
    );
  };

  const deleteAlertButton = () => {
    return (
      <>
        <button
          onClick={() => console.log("Cancel Pressed")}
          className="border border-red-500 rounded-md px-2 py-2 text-red-500 ml-auto"
          style={{
            width: 200,
            marginRight: 5,
            marginLeft: 10,
            borderRadius: 5,
          }}
        >
          Cancel
        </button>
        <button
          onClick={deletePlaylist}
          className="border border-red-500 rounded-md px-2 py-2 text-red-500 ml-auto"
          style={{ width: 190, marginLeft: 10, borderRadius: 5 }}
        >
          Delete
        </button>
      </>
    );
  };

  function deletePlaylist() {
    PlaylistReaderWriter.deletePlaylist(playUID);
    Alert.alert("Playlist deleted!");
    navigate("/home");
  }

  const filteredWordList = renSongList
    ? renSongList.filter(
        (song) =>
          song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          song.artist.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <>
      <View style={playlistStyles.background}>
        <ToastContainer />

        {/* Header */}
        <View style={playlistStyles.header}>
          <Pressable
            onPress={() => navigate(-1)}
            style={playlistStyles.arrowLocation}
          >
            <ArrowBackOutline color={"#e8e1db"} height="25px" width="25px" />
          </Pressable>
          <View style={playlistStyles.controlsLocation}>
            <Text
              style={playlistStyles.title}
              accessibilityLabel="workbookTitle"
              accessible={true}
            >
              {name}
            </Text>
            <View style={playlistStyles.playLocation}>
              <Pressable
                onPress={() => playPlaylist(playlistURL)}
                style={playlistStyles.playBtn}
              >
                <PlayCircleFilled style={{ fontSize: 28, color: "#edc526" }} />
              </Pressable>
              <Pressable onPress={deletePlaylistAlert}>
                <FeatherIcon icon="x-circle" size={22} color="rgba(232,225,219,0.6)" />
              </Pressable>
            </View>
          </View>
        </View>

        {/* Search */}
        <View style={playlistStyles.searchBar}>
          <TextInput
            style={playlistStyles.searchInput}
            placeholder="Search playlist"
            placeholderTextColor="rgba(48,50,72,0.4)"
            value={searchTerm}
            onChangeText={setSearchTerm}
            accessibilityLabel="playlistSearch"
            accessible={true}
          />
          <SearchOutline color={"rgba(48,50,72,0.4)"} height="20px" width="20px" />
        </View>

        {/* Description */}
        {description ? (
          <View style={playlistStyles.descLocation}>
            <View style={playlistStyles.sectionHeader}>
              <Text style={playlistStyles.sectionLabel}>Description</Text>
              <View style={playlistStyles.sectionLabelLine} />
            </View>
            <Text
              accessibilityLabel="description"
              accessible={true}
              style={playlistStyles.descText}
            >
              {description}
            </Text>
          </View>
        ) : null}

        {/* Songs section */}
        <View style={playlistStyles.sectionHeader}>
          <Text style={playlistStyles.sectionLabel}>Songs</Text>
          <View style={playlistStyles.sectionLabelLine} />
        </View>
        <View style={playlistStyles.colTitles}>
          <View style={playlistStyles.colLocation}>
            <Text style={playlistStyles.colText}>Liked</Text>
            <Text style={playlistStyles.colText}>Delete</Text>
          </View>
        </View>

        <FlatList
          scrollEnabled={true}
          showsVerticalScrollIndicator={true}
          data={filteredWordList}
          accessibilityLabel="songs"
          accessible={true}
          numColumns={1}
          renderItem={({ item }) => {
            return (
              <PlaylistItem
                item={item}
                playlistURL={playlistURL}
                key={item.spotifyURL}
              />
            );
          }}
        />

        {renSongList === null && (
          <Text style={playlistStyles.noResults}>
            Add songs to this playlist!
          </Text>
        )}

        {/* Add Song */}
        <Pressable
          onPress={() => navigate("/Search")}
          style={playlistStyles.addSongBtn}
          accessibilityLabel="addSong"
          accessible={true}
        >
          <PlusCircleOutlined style={{ color: "#edc526", fontSize: 16 }} />
          <Text style={playlistStyles.addSongTxt}>Add New Song</Text>
        </Pressable>
      </View>
    </>
  );
}

export default PlaylistInfoScreen;
