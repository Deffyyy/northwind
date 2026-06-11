import  "dotenv/config";
import express from "express";
import cors from "cors";


import { getEnv } from "./middleware/lib/env";
import { clerkMiddleware } from "@clerk/express";
import { clerkWebhookHandler } from "./webhooks/clerck";

const env = getEnv();
const app = express();

const rawJson = express.json({type: "application/json", limit: "lmb"})

app.post("/webhooks/clerk", rawJson,(req, res) => {
   void clerkWebhookHandler(req, res);

});

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());



app.listen(env.PORT, () => console.log("Listening on port:", env.PORT));