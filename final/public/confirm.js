const formDelete = document.querySelector("#form-delete");

formDelete.addEventListener("submit", (e) => {
  let confirmation = confirm("Deseja realmente deletar ?");
  if (!confirmation) e.preventDefault();
});
