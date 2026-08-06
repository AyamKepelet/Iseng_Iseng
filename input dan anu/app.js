const Database = require("better-sqlite3");
const readline = require("readline");
const fs = require("fs");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

if (!fs.existsSync("config.json")) {
  rl.question(
    `Enter database file_name 
`,
    (name) => {
      const db = new Database(name);
      fs.writeFileSync(
        "config.json",
        JSON.stringify({ database: `${name}` }, null, 0),
      );
      rl.close();
    },
  );
} else {
  const config = JSON.parse(fs.readFileSync("config.json", "utf8"));
  const db = new Database(config.database);
  db.exec(`CREATE TABLE Task (
        TaskId INTEGER PRIMARY KEY,
        TaskName TEXT NOT NULL
    );`)
  console.log("Database already initialized");
  rl.question("input your task! ", (task) => {
    const db = Database()
  })
}


