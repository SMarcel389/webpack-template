export class NoteCard { //card title, description, due, priority
  constructor(note) {
    this.card = this.init(note)
  }

  init(note) {
    let card = document.createElement("div");
    Object.assign(card, {
      className: "note-card"
    });

    const header = document.createElement("div");
    Object.assign(header, {
      className: "card-header"
    });

    const title = document.createElement("h1");
    Object.assign(title, {
      className: "title",
      textContent: note.name
    });

    header.appendChild(title);
    card.appendChild(header);

    const subtext = document.createElement("p");
    Object.assign(subtext, {
      className: "subtext",
      textContent: note.dueDate
    });
    card.appendChild(subtext);

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
    this.card = this.init(folder)
  }
  
  init(folder) {
    let card = document.createElement("div");
    card.className = "folder-card";
    card.style.borderLeft = `10px solid ${folder.color}`;

    const header = document.createElement("div");
    header.className = "card-header"
    card.appendChild(header);

    const title = document.createElement("h1");
    Object.assign(title, {
      className: "title",
      textContent: folder.name
    });
    header.appendChild(title);


    const subtext = document.createElement("p");
    Object.assign(subtext, {
      className: "subtext",
      textContent: folder.dueDate
    });
    card.appendChild(subtext);

    return card
  }

  render(parent) {
    parent.appendChild(this.card);
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