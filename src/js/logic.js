export class Note {
    constructor(name, content, dueDate, priority, folder = "root") {
        this.name = name;
        this.id = "id-" + Date.now();
        this.content = content;
        this.dueDate = dueDate;
        this.priority = priority;

        this.author = "defaultUser";
        this.created = new Date();
        this.lastEdit = this.created;
        this.folder = folder;
    }

    rename(newName) {
        this.name = newName;
        this._newLastEdit()
    }
    edit(newContent) {
        this.content = newContent;
        this._newLastEdit()
    }
    moveTo(newFolder) {
        this.folder = newFolder
    }

    _newLastEdit() {
        this.lastEdit = new Date()
    }

}

export class Folder {
    constructor(name, dueDate, color = "yellow") {
        this.name = name;
        this.uuid = "id-" + Date.now();
        this.dueDate = dueDate;
        this.color = color;

        this.author = "defaultUser";
        this.created = new Date();
        this.lastEdit = this.created;
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
    getNotesByFolder(folder = "root") {
        return this.noteList.filter(note => note.folder === folder);
    }
    deleteNote(id) {
        this.noteList = this.noteList.filter(note => note.id !== id);
    }
}

