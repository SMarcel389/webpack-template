export default function projectModal(){
  const modal = document.createElement("dialog")
  modal.classList.add("project-modal");
  modal.innerText = "Modal";
  document.body.appendChild(modal)


  modal.innerHTML=`
  <form method="dialog">
  
  <input type="text" name="name" placeholder="Project Name" autofocus minlength="1" maxlength="24"></input>
  <input type="text" name
`




  modal.showModal();
}