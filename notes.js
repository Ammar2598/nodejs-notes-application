const fs = require("fs");
const chalk = require("chalk");

//add note function
const addNote = (title, body) => {
  const notes = loadNotes();
  // const dublicateNotes = notes.filter((note) => note.title === title);
  const dublicateNote = notes.find((note) => note.title === title);

  if (!dublicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.bgGreen("New Note Added!"));
  } else {
    console.log(chalk.bgRed("Note title already exist!"));
  }
};

//save note
const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};
// load note
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};
//delete note
const deleteNote = (title) => {
  const notes = loadNotes();
  const notesKeep = notes.filter((note) => note.title !== title);

  saveNotes(notesKeep);

  if (notes.length > notesKeep.length) {
    const msg = chalk.bgGreen("this note is deleted! ");
    console.log(msg);
  } else {
    const msg = chalk.bgRed("No note found! ");
    console.log(msg);
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.green.inverse("your notes"));
  return notes.forEach((note) => {
    console.log(note.title);
  });
};

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);
  if (note) {
    console.log(chalk.bgGreen(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.bgRed("Not Found!!"));
  }
};

module.exports = {
  addNote: addNote,
  deleteNote: deleteNote,
  listNotes: listNotes,
  readNote: readNote,
};
