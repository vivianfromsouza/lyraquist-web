import LocalSupabaseClient from "./LocalSupabaseClient";
import SongReaderWriter from "./SongReaderWriter";

const currentUser = localStorage.getItem("current_user");
console.log("current user in likes reader writer", currentUser);

const LikesReaderWriter = {
  async isLiked(spotifyURL: string): Promise<boolean> {
    console.log("checking if liked for spotify url", spotifyURL);
    const { count } = await LocalSupabaseClient.from("likes")
      .select("*", { count: "exact", head: true })
      .eq("user_id", currentUser)
      .eq("spotify_url", spotifyURL);
    console.log("count in isLiked", count);
    return (count ?? 0) > 0;
  },

  async likeSong(spotifyURL: string, songDetails: any): Promise<void> {
    if (!(await SongReaderWriter.isSongInDB(spotifyURL))) {
      await SongReaderWriter.addSongToDBFromSongCard(songDetails);
    }

    await LocalSupabaseClient.from("likes").upsert({
      user_id: currentUser,
      spotify_url: spotifyURL,
    });
  },

  async unlikeSong(spotifyURL: string): Promise<void> {
    await LocalSupabaseClient.from("likes")
      .delete()
      .eq("user_id", currentUser)
      .eq("spotify_url", spotifyURL);
  },

  async getMySongs() {
    const { data } = await LocalSupabaseClient.from("likes")
      .select(
        `
        spotify_url,
        songs (spotify_url, name, artist, album, image_url, duration)
        `,
      )
      .eq("user_id", currentUser)
      .throwOnError();
    return data;
  },
};

export default LikesReaderWriter;
