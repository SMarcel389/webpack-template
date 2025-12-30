export class NoteCard { //card title, description, due, priority
  constructor(note, onDelete) {
    this.note = note;
    this.onDelete = onDelete;
    this.card = this.init(this.note)
    this.active = true;
    this.deleteHandler = null;
  }

  init(note) {
    let card = document.createElement("div");
    card.className = "note-card";
    card.dataset.uuid = note.uuid;

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

    // Add delete button
    const deleteBtn = document.createElement("button");
    Object.assign(deleteBtn, {
      className: "delete-btn",
      textContent: "×"
    });
    this.deleteHandler = (e) => {
      e.stopPropagation();
      if (this.onDelete) {
        this.onDelete(note.uuid);
      }
    };
    deleteBtn.addEventListener("click", this.deleteHandler);
    header.appendChild(deleteBtn);

    card.appendChild(header);

    const subtext = document.createElement("p");
    Object.assign(subtext, {
      className: "subtext",
      textContent: note.dueDate
    });
    card.appendChild(subtext);

    return card
  }

  render(parent) {
    if (this.active) {

    } else {
      this.card.classList.remove("active")
    }
    parent.prepend(this.card);
  }

  destroy() {
    const deleteBtn = this.card.querySelector(".delete-btn");
    if (deleteBtn && this.deleteHandler) {
      deleteBtn.removeEventListener("click", this.deleteHandler);
    }
    this.card.remove();
  }

}

export class FolderCard {
  constructor(folder, onDelete) {
    this.folder = folder;
    this.onDelete = onDelete;
    this.card = this.init(this.folder)
    this.active = folder.active || false;
    this.deleteHandler = null;
  }

  init(folder) {
    let card = document.createElement("div");
    card.className = `folder-card`;
    card.dataset.uuid = folder.uuid;
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

    // Add delete button
    const deleteBtn = document.createElement("button");
    Object.assign(deleteBtn, {
      className: "delete-btn",
      textContent: "×"
    });
    this.deleteHandler = (e) => {
      e.stopPropagation();
      if (this.onDelete) {
        this.onDelete(folder.uuid);
      }
    };
    deleteBtn.addEventListener("click", this.deleteHandler);
    header.appendChild(deleteBtn);

    const subtext = document.createElement("p");
    Object.assign(subtext, {
      className: "subtext",
      textContent: folder.dueDate
    });
    card.appendChild(subtext);


    return card
  }

  render(parent) {
    if (this.active) {
      this.card.classList.add("active")

    } else {
      this.card.classList.remove("active")

    }
    parent.prepend(this.card);
  }

  destroy() {
    const deleteBtn = this.card.querySelector(".delete-btn");
    if (deleteBtn && this.deleteHandler) {
      deleteBtn.removeEventListener("click", this.deleteHandler);
    }
    this.card.remove();
  }

}