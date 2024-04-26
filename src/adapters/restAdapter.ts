import {IncomingMessage, ServerResponse} from "http";
import {createThread, runThread} from "../domain/thread";
import {createMessage} from "../domain/message";
import {whatIsTheTuningStatus} from "../domain/tuning";

const getTuningStatus = async (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    let rawData = ''
    req.on('data', (chunk) => {
        if (chunk !== undefined && chunk !== null) {
            rawData += chunk
        }
    })

    req.on('end', async () => {
        const requestBody = JSON.parse(rawData);
        const tuningStatus = await whatIsTheTuningStatus({sessionId: requestBody.sessionId})
        res.writeHead(200)
        res.end(JSON.stringify(tuningStatus))
    })
}
const sendMessage = async (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    let threadId
    if (!req.headers.session) {
        threadId = await createThread();
        res.setHeader('session', threadId)
    } else {
        threadId = req.headers.session as string
    }

    let rawData = ''
    req.on('data', (chunk) => {
        if (chunk !== undefined && chunk !== null) {
            rawData += chunk
        }
    })

    req.on('end', async () => {
        const requestBody = JSON.parse(rawData);
        await createMessage({req: requestBody.message, threadId})
        let message = await runThread({threadId});
        res.writeHead(200)
        res.end(JSON.stringify(message))
    })
};

export const restAdapter = async (req: IncomingMessage, res: ServerResponse) => {
    //TODO improve
    const mapUrl = req.url?.includes('/conversation') ? 'conversation' : req.url?.includes('/tuning/status')? 'tuning-status' : undefined
    switch (mapUrl) {
        case 'conversation':
            await sendMessage(req, res);break
        case 'tuning-status':
            await getTuningStatus(req, res); break
        default:
        res.writeHead(404)
        res.end()
    }
}