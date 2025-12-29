import {noteApp} from "./logic"
import Button from "./components/button";
import addProject from "./components/addProject"


export default function renderApp() {

  const app = new noteApp();
  let notes = app.noteList;
  let folders = app.folderList;

  console.log(folders)

  let projects = document.querySelector(".sidebar-body");

  const addProjectBtn = new Button("+ Add Project", () => addProject(app, projects),
  {
    parent: projects
  })

console.log(folders)
}
