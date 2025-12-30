import Button from "./components/button";
import {noteApp} from "./logic"
import {NoteCard, FolderCard} from "./components/cards";


import addProject from "./components/addProject"
import addNote from "./components/addNote"
import Pad from "./components/pad"



export default function renderApp() {

  const app = new noteApp();

  let activeFolder = app.folderList[0];
  let activeNote = undefined;

  let sidebarButton =document.querySelector(".sidebar-button");
  let projectsContainer = document.querySelector(".project-container");
  let projects = document.querySelector(".sidebar-body");
  let notebar = document.querySelector(".notebar");
  let noteSection = document.querySelector(".note-section");

  // Helper function to render notes for a folder
  function renderNotesForFolder(folder) {
    notebar.replaceChildren();
    let notesOfActive = app.getNotesByFolder(folder.uuid);
    notesOfActive.forEach(note => {
      let noteCard = new NoteCard(note, handleDeleteNote);
      noteCard.render(notebar);
    });
  }

  // Reset all folders to inactive, then set first as active
  app.folderList.forEach(folder => folder.active = false);
  if (app.folderList.length > 0) {
    app.folderList[0].active = true;
    activeFolder = app.folderList[0];
  }

  // Delete handler for folders
  function handleDeleteFolder(folderId) {
    app.deleteFolder(folderId);

    // Remove card from DOM
    const cardToRemove = projects.querySelector(`[data-uuid="${folderId}"]`);
    if (cardToRemove) {
      cardToRemove.remove();
    }

    // Clear note section and whitepad
    notebar.replaceChildren();
    document.querySelector(".whitepad").replaceChildren();

    // Set new active folder if needed
    if (activeFolder?.uuid === folderId && app.folderList.length > 0) {
      app.folderList[0].active = true;
      activeFolder = app.folderList[0];
      const firstCard = projects.querySelector(`[data-uuid="${activeFolder.uuid}"]`);
      if (firstCard) {
        firstCard.classList.add("active");
      }
      createAddNoteBtn(activeFolder);
      renderNotesForFolder(activeFolder);
    }
  }

  // Delete handler for notes
  function handleDeleteNote(noteId) {
    app.deleteNote(noteId);

    // Remove card from DOM
    const cardToRemove = notebar.querySelector(`[data-uuid="${noteId}"]`);
    if (cardToRemove) {
      cardToRemove.remove();
    }

    // Clear whitepad if deleted note was active
    if (activeNote?.uuid === noteId) {
      document.querySelector(".whitepad").replaceChildren();
      activeNote = undefined;
    }
  }

  // Render loaded folders on startup
  app.folderList.forEach(folder => {
    let folderCard = new FolderCard(folder, handleDeleteFolder);
    folderCard.render(projects);
  });

  // Render notes for active folder
  if (app.folderList.length > 0) {
    createAddNoteBtn(activeFolder);
    renderNotesForFolder(activeFolder);
  }




  //create project
  const addProjectBtn = new Button("+ Add Project", async () => {
    activeFolder = await addProject(app, projects, handleDeleteFolder);
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
      app.folderList.forEach(folder => {
        folder.active = (folder.uuid === clickedUUID)
      });
      activeFolder = app.folderList.find(folder => (folder.active))

      //create add note button
      createAddNoteBtn(activeFolder);
      //render notes of the active folder
      renderNotesForFolder(activeFolder);
    }
  })


  //Change note card
  noteSection.addEventListener("click", (e) => {
    for (let child of notebar.children) {
      child.classList.remove("active")
    }

    const clicked = e.target.closest("div.note-card")
    if (clicked) {
      clicked.classList.add("active")

      const clickedUUID = clicked.dataset.uuid;
      app.noteList.forEach(note => {
        note.active = (note.uuid === clickedUUID)
      });
      activeNote = app.noteList.find(note => (note.active))

      const pad = new Pad(activeNote, app);
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
      activeNote = await addNote(app, notebar, activeFolder, handleDeleteNote);
    })}
}



