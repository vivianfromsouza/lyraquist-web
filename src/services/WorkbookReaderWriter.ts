// Worked on by: Vivian D'Souza
/* eslint-disable @typescript-eslint/no-unused-vars */
import LocalSupabaseClient from "../services/LocalSupabaseClient";
import { v4 as uuidv4 } from "uuid";

const currentUser = localStorage.getItem("current_user");

// WorkbookReaderWriter: Service that reads and writes workbook data from Firebase
const WorkbookReaderWriter = {
  async getWorkbooks() {
    const { data } = await LocalSupabaseClient
      .from("workbooks")
      .select("book_id, description, name")
      .eq("user_id", currentUser)
      .throwOnError();
    return data;
  },

  async createWorkbook(newWorkbookName : string, description = "") {
    const newBookUID = uuidv4();
    const { error } = await LocalSupabaseClient.from("workbooks").insert({
      book_id: newBookUID,
      description: description,
      name: newWorkbookName,
      user_id: currentUser,
    });
    console.log(error)
    return newBookUID;
  },

  async deleteWorkbook(bookUID: string) {
    const response = await LocalSupabaseClient.from("workbooks").delete().eq("book_id", bookUID);
    const wordsResponse = await LocalSupabaseClient.from("words").delete().eq("book_id", bookUID);
    console.log(wordsResponse)
    return response;
  },
};

export default WorkbookReaderWriter;
