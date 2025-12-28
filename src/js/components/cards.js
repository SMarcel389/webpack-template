import Button from "./button";

export class NoteCard { //card title, description, due, priority
  constructor(note) {
    this.card = this.init(note)
  }

  init(note) {
    let card = document.createElement("div")
    card.className = "note-card"
    card.innerHTML = `
			<div class="card-header">
				<h1 class="title"> ${note.name} </h1>
			</div>
			<p class="subtext">${note.dueDate}</p>
		`
    card.style.cssText = `
		  background-color: yellow;
		  border: 1px solid green;
		`
    return card
  }

  render(parent) {
    parent.appendChild(this.card);
  }
}

export class FolderCard {
  constructor(folder) {
    this.card = this.init()
  }
  
  init(folder) {
    let card = document.createElement("div");
    card.className = "folder-card";
    card.innerHTML = `
      <div class="card-header">
      <h1 class="title"> ${folder.name} </h1>
      </div>
      <p class="subtext">${folder.dueDate}</p>
    `
    return card
  }
}


/* note methods:
	this.name = name;
  this.id = "id-" + Date.now();
  this.content = content;
  this.dueDate = dueDate;
  this.priority = priority;

  this.author = "defaultUser";
  this.created = new Date();
  this.lastEdit = this.created;
  this.folder = folder;


        Folder {
    constructor(name, dueDate, color = "yellow")*/