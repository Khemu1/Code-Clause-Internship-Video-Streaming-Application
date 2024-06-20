/**
 *
 * @param {Object} errors
 */
export function displayErrors(errors) {
  let emailError = document.querySelector(".email-error");
  let usernameError = document.querySelector(".username-error");
  let passwordError = document.querySelector(".password-error");
  let EmailField = document.querySelector("input[name=email]");
  let UsernameField = document.querySelector("input[name=username]");
  let PasswordField = document.querySelector("input[name=password]");
  if (errors.email) {
    emailError.innerHTML = errors.email;
    emailError.classList.remove("hide");
    EmailField.classList.add("red-field");
  }
  if (errors.username) {
    usernameError.innerHTML = errors.username;
    usernameError.classList.remove("hide");
    UsernameField.classList.add("red-field");
  }
  if (errors.password) {
    passwordError.innerHTML = errors.password;
    passwordError.classList.remove("hide");
    PasswordField.classList.add("red-field");
  }
}

export function displayError(error) {
  let mainError = document.querySelector(".mainError");
  let emailError = document.querySelector(".emailError");
  let passwordError = document.querySelector(".passwordError");
  let EmailField = document.querySelector(".email");
  let PasswordField = document.querySelector(".password");
  if (error.email) {
    emailError.innerHTML = error.email;
    emailError.classList.remove("hide");
    EmailField.classList.add("red-field");
  }
  if (error.password) {
    passwordError.innerHTML = error.password;
    passwordError.classList.remove("hide");
    PasswordField.classList.add("red-field");
  }
  if (error.error) {
    PasswordField.classList.add("red-field");
    EmailField.classList.add("red-field");
    mainError.classList.remove("hide");
    mainError.innerHTML = error.error;
  }
}

export function displayUploadErrors(errors) {
  let titleError = document.querySelector(".title-error");
  let videoError = document.querySelector(".video-error");
  let thumbError = document.querySelector(".thumb-error");
  let typeError = document.querySelector(".type-error");
  if (errors.title) {
    titleError.textContent = errors.title;
    // titleError.classList.remove("hide");
  }
  if (errors.file) {
    videoError.textContent = errors.file;
    // videoError.classList.remove("hide");
  }
  if (errors.thumb) {
    thumbError.textContent = errors.thumb;
    // thumbError.classList.remove("hide");
  }
  if (errors.radioGroup) {
    location.reload();
  }
}
