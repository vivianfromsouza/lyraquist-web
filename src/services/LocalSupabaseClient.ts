// Creates local Supabase client
import { createClient } from "@supabase/supabase-js";

const LocalSupabaseClient = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);

export default LocalSupabaseClient;
