import express from "express"
const app = express()
import path from "path"
import { fileURLToPath } from "url"

const __fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__fileName)

app.use(express.static("public"))

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})
app.get("/users", (req,res) => {
    res.send("dwadwa")
})

app.listen(3000,() => {
    console.log("http://localhost:3000");
})