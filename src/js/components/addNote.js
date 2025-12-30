import {NoteCard} from "./cards";


export default async function addNote(app, notebar, activeFolder, onDelete) {
  try {

    const noteInput = await noteModal()
    const [noteName, noteDate, notePriority] = noteInput;
    let note = app.createNote(noteName, "", noteDate, notePriority, activeFolder.uuid)
    let noteCard = new NoteCard(note, onDelete)
    noteCard.render(notebar)

    const CardID = noteCard.card.dataset.uuid;
    const CardElement = document.querySelector("[data-uuid='" + CardID + "']")
    CardElement.click()
    return note
  }
  catch (error) {
    console.log(error)
  }
}

function noteModal(){
  return new Promise((resolve, reject)=> {

    let now = new Date();
    let nowFormatted = now.toISOString().slice(0, 16);

    const modal = document.createElement("dialog")
    modal.className = "note-modal";
    document.body.appendChild(modal);

    const form = document.createElement("form");
    Object.assign(form, {
      method: "dialog",
      className: "form"
    });

    const nameInput = document.createElement("input");
    Object.assign(nameInput, {
      name: "name",
      type: "text",
      placeholder: "Note Title",
      maxLength: 24,
      autofocus: true,
      required: true
    });

    const dateInput = document.createElement("input");
    Object.assign(dateInput, {
      name: "dueDate",
      type: "datetime-local",
      value: nowFormatted,
      min: nowFormatted,
      max: "2050-11-11T00:00"
    });

    const priorityInput = document.createElement("select");
    priorityInput.name = "priority";
    const options = [
      new Option("Low", "1"),
      new Option("Normal", "2", true, true),
      new Option("High", "3")
    ]
    for (const option of options) {
      priorityInput.appendChild(option);
    }




    const submitBtn = document.createElement("button");
    Object.assign(submitBtn, {
      type: "submit",
      id: "submit",
      textContent: "Submit"
    });

    form.append(nameInput, dateInput, priorityInput, submitBtn);
    modal.appendChild(form);

    modal.showModal();

    modal.addEventListener('close', () => {
      modal.remove();
      reject("User closed the modal")
    });

    const formElement = modal.querySelector("form");
    formElement.addEventListener("submit", () => {
      modal.remove();
      let formData = new FormData(formElement);
      let dataArray = Array.from(formData.values())
      resolve(dataArray);

    })
  })
}

//end of form//