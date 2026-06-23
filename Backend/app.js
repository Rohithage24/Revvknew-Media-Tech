import express from 'express'
import cors from 'cors'
import http from 'http'
import prisma from './lib/prisma.js'


import client from "./client/client.route.js"

const app = express()
const server = http.createServer(app)
app.use(express.json())
app.use(cors())


app.get("/get", (req,res)=>{
    res.send("Server is start")
})

app.use("/api",client);


export default server
