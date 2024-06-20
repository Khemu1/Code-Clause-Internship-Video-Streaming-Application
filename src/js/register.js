import { displayErrors } from "./utils.js";

const registerForm = document.querySelector(".register");
let emailError = document.querySelector(".email-error");
let usernameError = document.querySelector(".username-error");
let passwordError = document.querySelector(".password-error");
let EmailField = document.querySelector(".email");
let UsernameField = document.querySelector(".username");
let PasswordField = document.querySelector(".password");

console.log("started registration");
const urlPrefix = "/api";

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(registerForm);
  submit(formData);
  emailError.classList.add("hide");
  usernameError.classList.add("hide");
  passwordError.classList.add("hide");
  EmailField.classList.remove("red-field");
  UsernameField.classList.remove("red-field");
  PasswordField.classList.remove("red-field");
});

function submit(data) {
  fetch(urlPrefix + "/register", {
    method: "POST",
    body: data,
  })
    .then((response) => {
      if (response.ok) {
        return response.json().then((data) => {
          window.location.href = data.redirect;
        });
      }
      return response.json();
    })
    .then((data) => {
      if (data.errors) {
        displayErrors(data.errors);
      }
    })
    .catch((error) => {
      console.error("Something went wrong when sending data:", error);
    });
}
