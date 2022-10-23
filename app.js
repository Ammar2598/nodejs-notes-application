const chalk = require("chalk");
const notes = require("./notes.js");
const yargs = require("yargs");

yargs.version("1.1.0");

//add command
yargs.command({
  command: "add",
  describtion: "add new note",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "note body",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  },
});
yargs.command({
  command: "remove",
  describtion: "remove a note !",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.deleteNote(argv.title);
  },
});

yargs.command({
  command: "list",
  describtion: "this is list command",
  handler() {
    notes.listNotes();
  },
});
yargs.command({
  command: "read",
  describtion: "this is read command",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.readNote(argv.title);
  },
});

// console.log(yargs.argv);
yargs.parse();
