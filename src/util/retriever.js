import { OpenAIEmbeddings } from "@langchain/openai";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { createClient } from "@supabase/supabase-js";

const openAIApiKey = import.meta.env.VITE_OPENAI_API_KEY;
const sbUrl = import.meta.env.VITE_SUPABASE_URL;
const sbApiKey = import.meta.env.VITE_SUPABASE_API_KEY;

const embeddings = new OpenAIEmbeddings({
    openAIApiKey,
    modelName: "text-embedding-ada-002",
});

const superbaseClient = createClient(sbUrl, sbApiKey);
const vectorStore = new SupabaseVectorStore(embeddings, {
    client: superbaseClient,
    tableName: "documents",
    queryName: "match_documents",
});

export const retriever = vectorStore.asRetriever();
