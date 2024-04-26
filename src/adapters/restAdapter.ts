import {IncomingMessage, ServerResponse} from "http";
import {createThread, runThread} from "../domain/thread";
import {createMessage} from "../domain/message";

export const restAdapter = async (req: IncomingMessage, res: ServerResponse) => {
    if(req.url?.includes('/conversation')) {
        let threadId
        if(!req.headers.session) {
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
            console.log(message)
            res.writeHead(200)
            res.end(JSON.stringify(message))
        })
    }
    else {
        res.writeHead(404)
        res.end()
    }
}