import {openai} from "../utils/openai";
import {getAssistant} from "./assistant";

const threads: Record<string, Awaited<ReturnType<typeof openai.beta.threads.create>>> = {}

export const createThread = async () => {
    let thread = await openai.beta.threads.create();
    threads[thread.id] = thread
    return thread.id
}

export const runThread = async ({threadId}: {threadId: string}): Promise<string> => {
    const run = openai.beta.threads.runs.stream(threadId, {
        assistant_id: (await getAssistant()).id
    })
    let message = ''

    return new Promise((resolve) => {
            run.on('textCreated', (text) => message = message + '\nassistant > ')
            .on('textDelta', (textDelta, snapshot) => message = message + textDelta.value!)
                .on('textDone', () => resolve(message))
            });
}