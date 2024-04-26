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

/**
 * Step 4: Create a thread
 * You can also attach files as Message attachments on your thread. Doing so will create another vector_store associated with the thread, or, if there is already a vector store attached to this thread, attach the new files to the existing thread vector store. When you create a Run on this thread, the file search tool will query both the vector_store from your assistant and the vector_store on the thread.
 *
 * In this example, the user attached a copy of Apple’s latest 10-K filing.
 *
 * node.js
 *
 * node.js
 * // A user wants to attach a file to a specific message, let's upload it.
 * const aapl10k = await client.files.create({
 *   file: fs.createReadStream("edgar/aapl-10k.pdf"),
 *   purpose: "assistants",
 * });
 *
 * const thread = await client.beta.threads.create({
 *   messages: [
 *     {
 *       role: "user",
 *       content:
 *         "How many shares of AAPL were outstanding at the end of of October 2023?",
 *       // Attach the new file to the message.
 *       attachments: [{ file_id: aapl10k.id, tools: [{ type: "file_search" }] }],
 *     },
 *   ],
 * });
 *
 * // The thread now has a vector store in its tool resources.
 * console.log(thread.tool_resources?.file_search);
 * Vector stores created using message attachements have a default expiration policy of 7 days after they were last active (defined as the last time the vector store was part of a run). This default exists to help you manage your vector storage costs. You can override these expiration policies at any time. Learn more here.
 */