import { listenAndServe } from "https://deno.land/std@0.112.0/http/server.ts";

console.log("Listening on http://localhost:8000");

await listenAndServe(":8000", (_request, _connInfo) => {
    return new Response("Mi Pagina Web");
});
