export class Note {
  constructor(name, content, dueDate, priority, parentId = "0") {
    this.name = name;
    this.uuid = "id-" + Date.now();
    this.content = content;
    this.dueDate = dueDate;
    this.priority = priority;

    this.author = "defaultUser";
    this.created = new Date();
    this.lastEdit = this.created;
    this.parentId = parentId;
    this.active = true;
  }

  rename(newName) {
    this.name = newName;
    this._newLastEdit()
  }
  edit(newContent) {
    this.content = newContent;
    this._newLastEdit()
  }
  moveTo(newFolderId) {
    this.parentId = newFolderId
  }

  _newLastEdit() {
    this.lastEdit = new Date()
  }
}

export class Folder {
  constructor(name, dueDate, color = "yellow") {
    this.name = name;
    this.uuid = "fid-" + Date.now();
    this.dueDate = dueDate;
    this.color = color;

    this.author = "defaultUser";
    this.created = new Date();
    this.lastEdit = this.created;
    this.active = true;
  }

  rename(newName) {
    this.name = newName;
    this._newLastEdit()
  }
  changeColor(newColor) {
    this.color = newColor;
  }

  _newLastEdit() {
    this.lastEdit = new Date()
  }
}

export class noteApp {
  constructor() {
    this.noteList = [];
    this.folderList = [];
    this.createFolder("0")
  }

  createNote(name, content, dueDate, priority, parentId) {
    let note = new Note(name, content, dueDate, priority, parentId);
    this.noteList.push(note);
    return note;
  }
  createFolder(name, dueDate, color) {
    let folder = new Folder(name, dueDate, color);
    this.folderList.push(folder);
    return folder;
  }
  getNotesByFolder(folderID = "0") {
    return this.noteList.filter(note => note.parentId === folderID);
  }
  deleteNote(id) {
    this.noteList = this.noteList.filter(note => note.uuid !== id);
  }
}

