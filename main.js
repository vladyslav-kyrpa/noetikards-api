import server from "./src/server.js";

server.run().catch((error) => {
    console.error(error);
});
