// Worked on by: Vivian D'Souza
import LocalSupabaseClient from "../services/LocalSupabaseClient";
import { v4 as uuidv4 } from "uuid";

// WordReaderWriter: Service that reads and writes word data from Firebase
const WordReaderWriter = {
  async addWord(
    newWord: string,
    translation = "",
    bookUID: string,
    language = "",
    partOfSpeech = "",
    fromSong: string,
    isStarred = false
  ) {
    const { error } = await LocalSupabaseClient.from("words").insert({
      word_id: uuidv4(),
      book_id: bookUID,
      word: newWord,
      translation: translation,
      part_of_speech: partOfSpeech,
      language: language,
      is_starred: isStarred,
      from_song: fromSong,
    });
    return error;
  },

  async deleteWord(wordUID: string) {
    const response = await LocalSupabaseClient
      .from("words")
      .delete()
      .eq("word_id", wordUID);
    return response;
  },

  async getAllWordsFromWorkbook(bookUID: string) {
    const { data } = await LocalSupabaseClient
      .from("words")
      .select()
      .eq("book_id", bookUID)
      .order("word_id", { ascending: false })
      .throwOnError();
    return data;
  },

  async starWord(wordUID: string) {
    const { error } = await LocalSupabaseClient
      .from("words")
      .update({ is_starred: true })
      .eq("word_id", wordUID);
    return error;
  },

  async unstarWord(wordUID: string) {
    const { error } = await LocalSupabaseClient
      .from("words")
      .update({ is_starred: false })
      .eq("word_id", wordUID);
    return error;
  },
};

export default WordReaderWriter;
