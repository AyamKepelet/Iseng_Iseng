import express from "express"
const app = express()
import path from "path"
import { fileURLToPath } from "url"

const __fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__fileName)

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "./index.html"))
})


app.listen(3000,() => {
    console.log("http://localhost:3000");
})