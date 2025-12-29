import {noteApp} from "./logic"
import Button from "./components/button";
import addProject from "./components/addProject"


export default function renderApp() {

  const app = new noteApp();
  let notes = app.noteList;
  let folders = app.folderList;
  let activeFolder = folders[0];
  console.log(folders," active: ", activeFolder);


  let projects = document.querySelector(".sidebar-body");

  projects.addEventListener("click", (e) => {
    for (let child of projects.children) {
      child.classList.remove("active")
    }

    const clicked = e.target.closest("div.folder-card")
    if (clicked) {
      clicked.classList.add("active")

      const clickedUUID = clicked.dataset.uuid;
      folders.forEach(folder => {
        folder.active = (folder.uuid === clickedUUID)
      });
      activeFolder = folders.find(folder => (folder.active))

      //todo renderNoteCards();

    }
  })


  const addProjectBtn = new Button("+ Add Project", async () => {

    activeFolder = await addProject(app, projects);
    console.log("active: ", activeFolder)
    },
  {
    parent: projects
  })

}

