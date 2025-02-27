import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mtrwwqrxkjaklmglivex.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10cnd3cXJ4a2pha2xtZ2xpdmV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc2NjI3MzksImV4cCI6MjA1MzIzODczOX0.cc5o_yyREDs6ufFIV0sfT-RJ2qt0SpcstrFqT-podog";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
