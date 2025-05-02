import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { answerPromptTemplate, standAlonePromptTemplate } from "./promptTemplates";
import { retriever } from "./util/retriever";
import combineDocuments from "./util/combineDocuments";
import { RunnablePassthrough, RunnableSequence } from "@langchain/core/runnables";

const openAIApiKey = import.meta.env.VITE_OPENAI_API_KEY;
const sbUrl = import.meta.env.VITE_SUPABASE_URL;
const sbApiKey = import.meta.env.VITE_SUPABASE_API_KEY;

const llm = new ChatOpenAI({
    openAIApiKey,
    temperature: 0.5,
    modelName: "gpt-3.5-turbo",
});

const embeddings = new OpenAIEmbeddings({
    openAIApiKey,
    modelName: "text-embedding-ada-002",
});

const standAlonePrompt = PromptTemplate.fromTemplate(standAlonePromptTemplate);
const answerPrompt = PromptTemplate.fromTemplate(answerPromptTemplate);

// const standAloneQuestionChain = standAlonePrompt
//     .pipe(llm)
//     .pipe(new StringOutputParser())

const standAloneQuestionChain = RunnableSequence.from([
    standAlonePrompt,
    llm,
    new StringOutputParser(),
]); // outputs: standalone question

const retrieverChain = RunnableSequence.from([
    prevResult => prevResult.standalone_question,
    retriever,
    combineDocuments,
]); // outputs: context

const answerChain = RunnableSequence.from([answerPrompt, llm, new StringOutputParser()]); // outputs: answer

const chain = RunnableSequence.from([
    {
        standalone_question: standAloneQuestionChain,
        original_input: new RunnablePassthrough(),
    },
    {
        context: retrieverChain,
        conv_history: ({ original_input }) => original_input.conv_history,
        question: ({ original_input }) => original_input.question,
    },
    answerChain,
]);

export async function askChatbot(question, conversation_history) {
    console.log(conversation_history);

    const response = await chain.invoke({
        question: question,
        conv_history: conversation_history,
    });
    return response;
}
