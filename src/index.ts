import {createServer, IncomingMessage, ServerResponse} from "http";
import {restAdapter} from "./adapters/restAdapter";
import {createVectorStoreFromFile} from "./domain/vectorStore";
import {getAssistant} from "./domain/assistant";
require('dotenv').config()

const port = 8080

try {
    const server = createServer(
        async (req: IncomingMessage, res: ServerResponse) => {
            if (req.url?.startsWith('/rest')) {
                await restAdapter(req, res)
            } else {
                res.writeHead(404, {'Content-Type': 'application/json'})
                res.end('OK')
            }
        },
    )
    server.listen(port)
    //Uncomment to add file to assistant
    getAssistant().then(assistant => {
        if(!assistant) throw new Error('Assistant has not been created')
        createVectorStoreFromFile(assistant.id).then(() => {
            console.log('Vector Store created with files')
        })
    })



    // Uncomment to run training
    /*uploadTrainingData().then((id) => {
        fineTuneTrainingData(id).then(() => {
            console.log('fine tuning done for:' + id)
        })
    })

    setInterval(() => {
        openai.fineTuning.jobs.list({ limit: 1 }).then((page) => {
            console.log('Running fine tune jobs: ' + JSON.stringify(page.data))
        })
    }, 5000)*/




} catch (e) {
    console.error(e)
}