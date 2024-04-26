import {openai} from "../utils/openai";

export type Assistant = Awaited<ReturnType<typeof openai.beta.assistants.create>>

let assistant: Assistant
 const createAssistant = async() => {
    assistant = await openai.beta.assistants.create({
        name: "Stock audit analist",
        instructions: "You are a inventory audit analyst. you'll have a database of products and check with item number the client is looking for.",
        tools: [{ type: "file_search" }],
        model: "gpt-4-turbo"
    });
}

export const getAssistant = async() => {
    if(!assistant) {
        await createAssistant()
    }
    return assistant
}