import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = "https://okddyoqjandpcpvvfuhe.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rZGR5b3FqYW5kcGNwdnZmdWhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkyNTUxNjEsImV4cCI6MjAwNDgzMTE2MX0.nPvAFljFpI-LYURi7BksjLIJUcC17EfwnDHUjI2cSuU";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});
