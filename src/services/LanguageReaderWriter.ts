// Worked on by: Vivian D'Souza
import LocalSupabaseClient from "../services/LocalSupabaseClient";
import { v4 as uuidv4 } from "uuid";
const currentUser = localStorage.getItem("current_user");

const LanguageReaderWriter = {
  async getLanguages() {
    const { data, error } = await LocalSupabaseClient.from("languages")
      .select()
      .eq("user_id", currentUser);

    console.log(error);

    return data;
  },

  async addLanguages(language: string) {
    const { error } = await LocalSupabaseClient.from("languages").insert({
      language_id: uuidv4(),
      name: language,
      user_id: currentUser,
    });
    return error;
  },

  async deleteLangauge(language: string) {
    const response = await LocalSupabaseClient.from("languages")
      .delete()
      .eq("user_id", currentUser)
      .eq("name", language);
    return response;
  },

  async isLanguageStarred(language: string) {
    const { count, status, error } = await LocalSupabaseClient.from("languages")
      .select("*", { count: "exact", head: true })
      .eq("name", language)
      .eq("user_id", currentUser);

    console.log(status);
    console.log(error);
    if (count! > 0) {
      return true;
    }
    return false;
  },
};
export default LanguageReaderWriter;
