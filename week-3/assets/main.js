const statusPernikahan = document.getElementById("inputStatusPernikahan");

// BUTTON BACK TO TOP
let toTopButton = document.getElementById("btn-back-to-top");

window.onscroll = () => scrollFunction();

function scrollFunction() {
  toTopButton.style.display =
    document.body.scrollTop > 250 || document.documentElement.scrollTop > 250
      ? "block"
      : "none";
}

toTopButton.addEventListener("click", () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

// BUTTON SUBMIT
document
  .getElementById("form-registrasi")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    submitForm();
  });

function submitForm() {
  var userConfirmed = window.confirm(
    "Apakah kamu yakin data yang dimasukkan sudah benar?"
  );

  if (userConfirmed) {
    window.location.href = "succes-page.html";
  }
}

// Validasi Number untuk Tinggi & Berat Badan
const tinggiBadan = document.getElementById("inputTinggi");
const beratBadan = document.getElementById("inputBerat");
const tinggiAlert = document.getElementById("tinggiInvalid");
const beratAlert = document.getElementById("beratInvalid");

beratBadan.addEventListener("input", () => {
  if (isNaN(beratBadan.value)) {
    beratAlert.style.visibility = "visible";
    beratBadan.removeAttribute("class", "form-control");
    beratBadan.setAttribute("class", "form-control is-invalid");
    beratBadan.value = "";
  } else {
    beratAlert.style.visibility = "hidden";
    beratBadan.removeAttribute("class", "form-control is-invalid");
    beratBadan.setAttribute("class", "form-control");
  }
});

tinggiBadan.addEventListener("input", () => {
  if (isNaN(tinggiBadan.value)) {
    tinggiAlert.style.visibility = "visible";
    tinggiBadan.removeAttribute("class", "form-control");
    tinggiBadan.setAttribute("class", "form-control is-invalid");
    tinggiBadan.value = "";
  } else {
    tinggiAlert.style.visibility = "hidden";
    tinggiBadan.removeAttribute("class", "form-control is-invalid");
    tinggiBadan.setAttribute("class", "form-control");
  }
});

const numberInputs = document.querySelectorAll(".input-angka");
// validation for input besides number
numberInputs.forEach((element) => {
  element.addEventListener("input", () => {
    let valueInput = element.value;
    if (element.id === "kode_pos") {
      element.value = valueInput.replace(/[^,\d]/g, "").toString();
    } else {
      element.value = valueInput.replace(/[^\+,\d]/g, "").toString();
    }
  });
});

function IyaTidakCheck() {
  if (document.getElementById("IyaCheck").checked) {
    document.getElementById("JikaIya").style.visibility = "visible";
  } else document.getElementById("JikaIya").style.visibility = "hidden";
}

function OtherWaliCheck() {
  if (document.getElementById("OtherCheck").checked) {
    document.getElementById("JikaOther").style.visibility = "visible";
  } else document.getElementById("JikaOther").style.visibility = "hidden";
}

function lainnyaChecked() {
  if (document.getElementById("jplain").checked) {
    document.getElementById("ifYes").style.visibility = "visible";
  } else document.getElementById("ifYes").style.visibility = "hidden";
}
