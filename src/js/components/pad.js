export default class Pad {
  constructor(note, app) {
    this.note = note;
    this.app = app;
    this.whitepad = document.querySelector(".whitepad");
    this.textarea = document.createElement("textarea");
    this.textarea.className = "content-editor";
    this.textarea.placeholder = "Note content...";
    this.timeout = null;

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

      clearTimeout(this.timeout);

      this.timeout = setTimeout(() => {
        this.app.save();
      }, 500);
    });
  }
}