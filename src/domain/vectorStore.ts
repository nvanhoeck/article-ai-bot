import {openai} from "../utils/openai";
import fs from 'fs';
import path from 'path';
import {Assistant} from "./assistant";

const pathToTestFile = path.join(__dirname, '../../assets/Training_Data.json');

export const createVectorStoreFromFile = async (aiAssistantId: Assistant['id']) => {
    let file = fs.createReadStream(pathToTestFile);


    let vectorStore = await openai.beta.vectorStores.create({
        name: "Financial Statement",
    });

    await openai.beta.vectorStores.fileBatches.uploadAndPoll(vectorStore.id, {files: [file]});

    await openai.beta.assistants.update(aiAssistantId, {
        tool_resources: { file_search: { vector_store_ids: [vectorStore.id] } },
    })
}

// Alternative see thread