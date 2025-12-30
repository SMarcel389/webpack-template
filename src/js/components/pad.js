export default class Pad {
  constructor(note) {
    this.note = note;
    this.whitepad = document.querySelector(".whitepad");
    this.textarea = document.createElement("textarea");
    this.textarea.className = "content-editor";
    this.textarea.placeholder = "Note content...";

    this.create();
    this.setupAutoSave();
  }

  create() {
    const existing = this.whitepad.querySelector("textarea");
    if (existing) {
      existing.remove();
    }

    this.textarea.value = this.note.content || "";
    this.whitepad.appendChild(this.textarea);
  }

  setupAutoSave() {
    this.textarea.addEventListener("input", () => {
      this.note.edit(this.textarea.value);
    });
  }
}