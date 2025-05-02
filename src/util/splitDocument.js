import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { createClient } from "@supabase/supabase-js";
import { OpenAIEmbeddings } from "@langchain/openai";

async function splitDocument() {
    try {
        const result = await fetch("/data/faqs.txt");
        const text = await result.text();

        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 500,
            chunkOverlap: 50,
            separators: ["\n\n", "\n", " ", ""], // default setting
        });

        const output = await splitter.createDocuments([text]);

        const sbApiKey = import.meta.env.VITE_SUPABASE_API_KEY;
        const sbUrl = import.meta.env.VITE_SUPABASE_URL;
        const openAIApiKey = import.meta.env.VITE_OPENAI_API_KEY;

        //supabase client
        const supabaseClient = createClient(sbUrl, sbApiKey);

        // saving embeddings to supabase vector store
        await SupabaseVectorStore.fromDocuments(
            output,
            new OpenAIEmbeddings({ openAIApiKey }),
            {
                client: supabaseClient,
                tableName: "documents",
                // queryName: "match_documents",
            }
        );
    } catch (err) {
        console.log(err);
    }
}

export default splitDocument;
