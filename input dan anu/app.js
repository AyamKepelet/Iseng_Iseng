const Database = require("better-sqlite3");
const readline = require("readline");
const fs = require("fs");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

if (!fs.existsSync("config.json")) {
  rl.question(`masukkan nama database (file_name.db)`, (name) => {
    const db = new Database(name);
    fs.writeFileSync(
      "config.json",
      JSON.stringify({ database: `${name}` }, null, 0),
    );
    console.log("ketik node app.js lagi... ");
    rl.close();
  });
} else {
  const config = JSON.parse(fs.readFileSync("config.json", "utf8"));
  const db = new Database(config.database);
  db.exec(`CREATE TABLE IF NOT EXISTS Task (
        TaskId INTEGER PRIMARY KEY,
        TaskName TEXT NOT NULL,
        DueAt TEXT
    );`);
  console.log("database sudah berhasil di inisialisasi");
  rl.question("masukkan tugas mu ", (tasks) => {
    rl.question("deadline! (today/tomorrow,jam)", (jam) => {
      const masukkanTeks =
        db.prepare(`INSERT INTO Task (TaskName,DueAt) VALUES(?,?)
      `);
      masukkanTeks.run(tasks, jam);
      rl.question(`tampilkan the tasks? y/n `, (content) => {
        const resultsTable = db.prepare(`SELECT * FROM Task`);
        const getTasks = resultsTable.all();
        if (content === "y") {
          console.log(getTasks);
        }
        rl.close();
        db.close();
      });
    });
  });
}
