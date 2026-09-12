import express from "express";
import cors from "cors";

import "dotenv/config";

import fs from"fs";      //file system
import path from "path";

import { clerkMiddleware } from "@clerk/express";

import User from "./models/user.model.js";
import { connectDB } from "./lib/db.js";

import job from "./lib/cron.js";

const app = express();

const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;

const publicDir = path.join(process.cwd(), "public");

app.use(express.json());
app.use(cors({origin: FRONTEND_URL, credentials: true }));
app.use(clerkMiddleware());

app.get("/health", (req,res)=>{
    res.status(200).json({ ok:true });
});

if(fs.existsSync(publicDir)){          // means-> does public folder exists
    app.use(express.static(publicDir))  //by middleware serve the built react files

    app.get("/{*any}",(req,res,next) => {   // any other URL send back index.html
        res.sendFile(path.join(publicDir,"index.html") , err => next(err));
    });      
}

app.listen(PORT, () => {
    connectDB();
    console.log("Server is up and running on PORT :",PORT);

    if (process.env.NODE_ENV === "production"){
        job.start();
    }
});