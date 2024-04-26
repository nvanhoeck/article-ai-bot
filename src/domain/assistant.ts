import {openai} from "../utils/openai";

let assistant: Awaited<ReturnType<typeof openai.beta.assistants.create>>
 const createAssistant = async() => {
    assistant = await openai.beta.assistants.create({
        name: "Math Tutor",
        instructions: "You are a personal math tutor. Write and run code to answer math questions.",
        tools: [{ type: "code_interpreter" }],
        model: "gpt-4-turbo"
    });
}

export const getAssistant = async() => {
    if(!assistant) {
        await createAssistant()
    }
    return assistant
}