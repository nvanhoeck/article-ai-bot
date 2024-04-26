import {openai} from "../utils/openai";

export const whatIsTheTuningStatus = async ({sessionId}: { sessionId: string }) => {
    return new Promise(resolve => {
        openai.fineTuning.jobs.retrieve(sessionId).then((value) => resolve(value.status + '\n' + value.error))
    })
}