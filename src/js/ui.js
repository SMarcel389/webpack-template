import Button from "./components/button";
import {noteApp} from "./logic"
import {NoteCard} from "./components/cards";


import addProject from "./components/addProject"
import addNote from "./components/addNote"
import Pad from "./components/pad"



export default function renderApp() {

  const app = new noteApp();


  let notes = app.noteList;
  let folders = app.folderList;

   let activeFolder = folders[0];
  let activeNote = undefined;

  let sidebarButton =document.querySelector(".sidebar-button");
  let projectsContainer = document.querySelector(".project-container");
  let projects = document.querySelector(".sidebar-body");




  //create project
  const addProjectBtn = new Button("+ Add Project", async () => {
    activeFolder = await addProject(app, projects);
    },
  {
    parent: sidebarButton
  })

  projectsContainer.addEventListener("click", (e) => {
    for (let child of projects.children) {
      child.classList.remove("active")
    }

    //clear whitepad
    const whitepad = document.querySelector(".whitepad");
    whitepad.replaceChildren()

    const clicked = e.target.closest("div.folder-card")
    if (clicked) {
      clicked.classList.add("active")
      //find active folder
      const clickedUUID = clicked.dataset.uuid;
      folders.forEach(folder => {
        folder.active = (folder.uuid === clickedUUID)
      });
      activeFolder = folders.find(folder => (folder.active))

      //create add note button
      createAddNoteBtn(activeFolder);
      //render notes of the active folder
      let notesOfActive = notes.filter(note => note.parentId === activeFolder.uuid)
      notebar.replaceChildren()
      notesOfActive.forEach(note => {
        let noteCard = new NoteCard(note)
        noteCard.render(notebar)



      })
    }
  })

  //CREATE NOTES
  let notebar = document.querySelector(".notebar");
  let noteSection = document.querySelector(".note-section");

  //Change note card
  noteSection.addEventListener("click", (e) => {
    for (let child of notebar.children) {
      child.classList.remove("active")
    }

    const clicked = e.target.closest("div.note-card")
    if (clicked) {
      clicked.classList.add("active")

      const clickedUUID = clicked.dataset.uuid;
      notes.forEach(note => {
        note.active = (note.uuid === clickedUUID)
      });
      activeNote = notes.find(note => (note.active))


      const pad = new Pad(activeNote);


    }
  })

  function createAddNoteBtn(activeFolder) {
    const existingBtn = document.querySelector(".add-note-btn");
    if (existingBtn) {
      existingBtn.remove()
    }

    const addNoteBtn = document.createElement("button");
    addNoteBtn.textContent = "+ Add Note";
    addNoteBtn.className = "add-note-btn";
    noteSection.prepend(addNoteBtn);

    addNoteBtn.addEventListener("click", async () => {
      activeNote = await addNote(app, notebar, activeFolder);
    })}
}



