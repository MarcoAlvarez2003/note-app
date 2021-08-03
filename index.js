const { Server, Router } = require("@hapi/hapi");
const { join } = require("path");
const pug = require("pug");

(async () => {
    const server = new Server({
        port: process.env.PORT || 8000,
        host: "'0.0.0.0'",
    });

    await server.register([require("@hapi/inert"), require("@hapi/vision")]);

    server.views({
        engines: {
            html: pug,
        },
        relativeTo: __dirname,
        path: "source",
    });

    server.route([
        {
            path: "/",
            method: "GET",
            handler(req, res) {
                const path = join(__dirname, "source/index.pug");
                return pug.compileFile(path)();
            },
        },
        {
            path: "/{dirname}/{filename}",
            method: "GET",
            handler(req, res) {
                const { dirname, filename } = req.params;
                const path = join(__dirname, "source", dirname, filename);
                return res.file(path);
            },
        },
    ]);

    console.log(server.info.uri);
    server.start();
})();
