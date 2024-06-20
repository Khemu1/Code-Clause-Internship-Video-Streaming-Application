import { displayError } from "./utils.js";

const loginForm = document.querySelector(".login");
let mainError = document.querySelector(".mainError");
let emailError = document.querySelector(".emailError");
let passwordError = document.querySelector(".passwordError");
let EmailField = document.querySelector(".email");
let PasswordField = document.querySelector(".password");

console.log("started");
const urlPrefix = "/api";

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(loginForm);
  mainError.classList.add("hide");
  emailError.classList.add("hide");
  passwordError.classList.add("hide");
  EmailField.classList.remove("red-field");
  PasswordField.classList.remove("red-field");
  retrieve(formData);
});

function retrieve(formData) {
  fetch(urlPrefix + "/login", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "/api/pages/home";
      }
      return response.json();
    })
    .then((data) => {
      if (data.errors) {
        displayError(data.errors);
        return;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
