import {openai} from "../utils/openai";

export const createMessage = async ({threadId, req}: {threadId: string, req: string}) => {
    const response = await openai.beta.threads.messages.create(
        threadId,
        {
            role: "user",
            content: req
        }
    );
    return response
}