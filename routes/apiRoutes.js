const db = require("../db/db.json");
const fs = require("fs");
const {v4: uuid} = require("uuid")

module.exports = (app) => {
    let noteDb = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

    app.get("/api/notes", (req, res) => res.json(noteDb));

    app.post("/api/notes", (req, res) => {
        let id = uuid();
        let newNote = req.body;
        newNote.id = id;

        noteDb.push(newNote);
        fs.writeFile("./db/db.json", JSON.stringify(noteDb), () => {

        });
        console.log(noteDb);

        res.json(noteDb.slice(-1));
    });

    app.delete("/api/notes/:id", (req, res) => {
        console.log(req.params.id);
        noteDb = noteDb.filter( (note) => {
            return note.id != req.params.id;
        });
        fs.writeFile("./db/db.json", JSON.stringify(noteDb), () => {
            res.json(noteDb);
        });
    });
};