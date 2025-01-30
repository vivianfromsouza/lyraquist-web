import LocalSupabaseClient from "../services/LocalSupabaseClient";
import { v4 as uuidv4 } from "uuid";

const currentUser = localStorage.getItem("current_user");

const FeedbackReaderWriter = {
  async writeUserFeedback(text: string) {
    const { error } = await LocalSupabaseClient.from("feedback").insert({
      feedback_id: uuidv4(),
      comment: text,
      user_id: currentUser,
    });
    return error;
  },
};
export default FeedbackReaderWriter;
