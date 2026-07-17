import {
  onRequestGet,
  onRequestPost
} from "../edge-functions/api/match.js";

function createContext(request) {
  return {
    request: {
      async json() {
        if (request.body && typeof request.body === "object") {
          return request.body;
        }

        if (typeof request.body === "string") {
          return JSON.parse(request.body);
        }

        const chunks = [];
        for await (const chunk of request) {
          chunks.push(chunk);
        }

        return JSON.parse(Buffer.concat(chunks).toString("utf8"));
      }
    },
    env: process.env
  };
}

async function sendWebResponse(webResponse, response) {
  webResponse.headers.forEach((value, name) => {
    response.setHeader(name, value);
  });

  response.status(webResponse.status).send(await webResponse.text());
}

export default async function handler(request, response) {
  if (request.method === "GET") {
    return sendWebResponse(onRequestGet(createContext(request)), response);
  }

  if (request.method === "POST") {
    return sendWebResponse(await onRequestPost(createContext(request)), response);
  }

  response.setHeader("Allow", "GET, POST");
  return response.status(405).json({ error: "Method not allowed" });
}
