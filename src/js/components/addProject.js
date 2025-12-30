import ColorPicker from "../../vendor/colorpicker/colorpicker.min"

import {FolderCard} from "./cards";

export default async function addProject(app, projects) {
  try {

    const cardInput = await projectModal()



    let folder = app.createFolder(...cardInput)
    let folderCard = new FolderCard(folder);
    folderCard.render(projects)

    const CardID = folderCard.card.dataset.uuid;
    const folderCardElement = document.querySelector("[data-uuid='" + CardID + "']")
    folderCardElement.click()
    return folder
  }
  catch (error) {
    console.log(error)
  }
}

function projectModal(){
  return new Promise((resolve, reject)=>{

  let now = new Date();
  let nowFormatted = now.toISOString().slice(0, 16);

  const modal = document.createElement("dialog")
  modal.className = "project-modal";
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
    placeholder: "Project Name",
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

  const colorInput = document.createElement("input");
  Object.assign(colorInput, {
    name: "color",
    id: "colorPicker"
  });

  const submitBtn = document.createElement("button");
  Object.assign(submitBtn, {
    type: "submit",
    id: "submit",
    textContent: "Submit"
  });

  form.append(nameInput, dateInput, colorInput, submitBtn);
  modal.appendChild(form);

  //end of form//

  new ColorPicker("#colorPicker", {
    container: modal,
    toggleStyle: "button",
    submitMode: 'confirm',
    color: '#C7A',
    swatchesOnly: true,
    swatches: [
      '#E55', // Red-ish
      '#F90', // Orange
      '#FD3', // Yellow
      '#AD4', // Green
      '#9CF', // Light Blue
      '#69A', // Teal
      '#C7A'  // Pink/Purple
    ],

  })
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