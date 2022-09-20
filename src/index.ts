import jsonServer from "json-server";

import { db } from "./seed";

const server = jsonServer.create();
const router = jsonServer.router(db);
const port = 3010;

// @ts-ignore
server.db = router.db;
server.use(jsonServer.bodyParser);
server.use(router);

server.listen(port, () => console.log(`Server is running on port ${port}`));
