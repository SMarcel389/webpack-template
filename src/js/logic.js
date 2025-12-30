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
    this.load()
  }

  createNote(name, content, dueDate, priority, parentId) {
    let note = new Note(name, content, dueDate, priority, parentId);
    this.noteList.push(note);
    this.save();
    return note;
  }
  createFolder(name, dueDate, color) {
    let folder = new Folder(name, dueDate, color);
    this.folderList.push(folder);
    this.save();
    return folder;
  }
  deleteNote(id) {
    this.noteList = this.noteList.filter(note => note.uuid !== id);
    this.save();
  }

  deleteFolder(id) {
    // Delete all notes in the folder
    this.noteList = this.noteList.filter(note => note.parentId !== id);
    // Delete the folder
    this.folderList = this.folderList.filter(folder => folder.uuid !== id);
    this.save();
  }

  save() {
    localStorage.setItem("noteApp", JSON.stringify({
      noteList: this.noteList,
      folderList: this.folderList
    }))
  }
  load() {
    const data = localStorage.getItem("noteApp")
    if (data) {
      const loaded = JSON.parse(data)
      this.noteList = loaded.noteList.map(n => Object.assign(new Note(), n));
      this.folderList = loaded.folderList.map(f => Object.assign(new Folder(), f))
    } else {
      this.createFolder("0");
    }
  }

  getNotesByFolder(folderID = "0") {
    return this.noteList.filter(note => note.parentId === folderID);
  }
}

