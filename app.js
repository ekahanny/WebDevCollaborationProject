const names = document.getElementById("inputName");
const univ = document.getElementById("inputUniv");
const form = document.querySelector("form");
const resultName = document.getElementById("resultName");
const resultUniv = document.getElementById("resultUniv");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  resultName.innerText = names.value;
  resultUniv.innerText = univ.value;
  names.value = "";
  univ.value = "";
});
