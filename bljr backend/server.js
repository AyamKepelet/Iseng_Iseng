import express from "express"
import Database from "better-sqlite3"
const app = express()
import path from "path"
import { fileURLToPath } from "url"
import cors from "cors"

const __fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__fileName)

    app.use(cors())
    app.use(express.static("public"))
    app.use(express.urlencoded({extended: true}))
    app.use(express.json())

const db = new Database("simpan.db")
db.pragma("journal_mode = WAL")
db.exec(`
    CREATE TABLE IF NOT EXISTS Karyawan (
        id INTEGER PRIMARY KEY,
        Name TEXT NOT NULL,
        Pekerjaan TEXT NOT NULL 
    )
    `)


app.post("/forms", (req,res) => {
    console.log("POST /forms terpanggil")
    console.log(req.body);
    
    const result = db.prepare(`
        INSERT INTO Karyawan(Name,Pekerjaan) VALUES(?,?)
        `).run(req.body.username,req.body.pekerjaan)
        
    res.json({
        id: result.lastInsertRowid,
        username: req.body.username,
        pekerjaan: req.body.pekerjaan
    })
})

app.delete("/forms/delete", (req,res) => {
    const {id} = req.body
    console.log(id);
    
    const result = db.prepare(`
    DELETE FROM Karyawan
    WHERE id = ?`).run(id)
    
    res.json({
        success: true
    })
})

app.patch("/changes", (req,res) => {
    console.log("berhasil");
    
})

app.listen(3000,() => {
    console.log("http://localhost:3000");
})