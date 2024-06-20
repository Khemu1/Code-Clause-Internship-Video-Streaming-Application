import * as FilePond from "filepond";
import "filepond/dist/filepond.min.css";
import { displayUploadErrors } from "./utils.js";

import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import Plyr from "plyr";
getAccount();

FilePond.registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);
const prefix = "/api";
let id;
const form = document.querySelector("form");

const video = document.querySelector('input[name="video"]');
const thumb = document.querySelector('input[name="thumbnail"]');

let icon = document.querySelector(".icon");

icon.addEventListener("click", (e) => {
  let menu = document.querySelector(".menu");
  menu.classList.toggle("hide");
});
document.body.addEventListener("click", (e) => {
  let menu = document.querySelector(".menu");
  if (!icon.contains(e.target) && !menu.contains(e.target)) {
    menu.classList.add("hide");
  }
});

const pond = FilePond.create(video, {
  acceptedFileTypes: ["video/mp4", "video/webm", "video/ogg"],
  allowFileTypeValidation: true,
  labelFileTypeNotAllowed: "Invalid file type",
  fileValidateTypeLabelExpectedTypes: "Expects {allButLastType} or {lastType}",
});
const pond1 = FilePond.create(thumb, {
  acceptedFileTypes: ["image/jpeg", "image/png"],
  allowFileTypeValidation: true,
  labelFileTypeNotAllowed: "Invalid file type",
  fileValidateTypeLabelExpectedTypes: "Expects {allButLastType} or {lastType}",
});

FilePond.setOptions({
  server: {
    url: "http://localhost:5173/api",
    process: "/process",
    revert: `/revert`,
    allowRevert: true,
    allowProcess: true,
    debug: true,
  },
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  submit(formData);

  pond.removeFiles();
  pond1.removeFiles();
});

function submit(formData) {
  const url = "/api/submit";
  fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        document.querySelector("input.title").value = "";
        document.querySelector(".description").value = "";
        document.querySelector(".video").value = "";
        document.querySelector(".thumbnail").value = "";
        document.querySelector(".valid").classList.remove("hidden");
        setTimeout(() => {
          document.querySelector(".valid").classList.add("hidden");
        }, 5000);
      } else {
        document.querySelector(".valid").classList.remove("add");
      }
      return response.json();
    })
    .then((data) => {
      if (data.body.errors) {
        displayUploadErrors(data.body.errors);
        console.log(data.body.errors);
      }
    })
    .catch((error) => {
      console.error("Submit error:", error);
    });
}

function getAccount() {
  fetch("/api/account", {
    method: "GET",
  })
    .then(async (response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          if (data.redirect) {
            window.location.href = data.redirect;
            throw new Error("Redirecting to login");
          }
        });
      }
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return response.json();
      } else {
        return Promise.reject("Unexpected response type");
      }
    })
    .then((data) => {
      document.querySelector(".name").textContent = data.account.username;
      return;
    })
    .catch((err) => {
      console.error("Failed to fetch account data:", err);
    });
}
