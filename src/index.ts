import {createServer, IncomingMessage, ServerResponse} from "http";
import {restAdapter} from "./adapters/restAdapter";
import {fineTuneTrainingData, uploadTrainingData} from "./adapters/trainingDataAdapter";
import {openai} from "./utils/openai";
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