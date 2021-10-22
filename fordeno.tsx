/** @jsx h */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { listenAndServe } from "https://deno.land/std@0.111.0/http/server.ts";
import { h, renderSSR } from "https://deno.land/x/nano_jsx@v0.0.20/mod.ts";

function App() {
  return (
    <html>
      <head>
        <title>Hello from JSX</title>
      </head>
      <body>
        <h1>Hello world</h1>
      </body>
    </html>
  );
}

function handler(req) {
  const html = renderSSR(<App />);
  return new Response(html, {
    headers: {
      "content-type": "text/html",
    },
  });
}

console.log("Listening on http://localhost:8080");
await listenAndServe(":8080", handler);
  // of the request so we reflect that back to the client.
  return new Response(null, {
    status: 415,
    statusText: "Unsupported Media Type",
  });
}

console.log("Listening on http://localhost:8080");
await listenAndServe(":8080", handleRequest);
