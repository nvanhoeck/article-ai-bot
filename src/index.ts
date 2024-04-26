import {createServer, IncomingMessage, ServerResponse} from "http";
import {restAdapter} from "./adapters/restAdapter";
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


} catch (e) {
    console.error(e)
}