import express from "express"
const app = express()

app.get("/", (req,res) => {
    console.log(res.send("halo"));
    res.send("test")
})

app.listen(5500,() => {
    console.log(`http://localhost:5500`);
})