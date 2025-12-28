import {noteApp} from "./logic"
import Button from "./components/button";
import {NoteCard, FolderCard} from "./components/cards";
import projectModal from "./components/modal";

export default function renderApp() {

  const app = new noteApp();
  let notes = app.noteList;
  let folders = app.folderList;

  let note = app.createNote("name", "name", "name", "name", "folder")
  console.log(notes)
  let note2 = app.createNote("name", "name", "name", "name", "different")
  console.log(notes)
  console.log(app.getNotesByFolder("folder"))
  console.log(notes)

  let projects = document.querySelector(".sidebar-body");

  const addProjectBtn = new Button("+ Add Project", () => {
    projectModal();
  },
  {
    parent: projects
  })







}

