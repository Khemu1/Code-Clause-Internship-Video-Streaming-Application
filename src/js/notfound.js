getAccount();
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

function getAccount() {
  fetch("/api/account", {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    })
    .then((data) => {
      if (data.account) {
        document.querySelector(".name").textContent = data.account.username;
        document.querySelector(".login").classList.add("hidden");
        document.querySelector(".home").classList.add("hidden");
        document.querySelector(".profile").classList.remove("hidden");
        document.querySelector(".upload").classList.remove("hidden");
        document.querySelector(".logout").classList.remove("hidden");
        sessionId = data.account.username;
        return;
      }
      document.querySelector(".logout").classList.add("hidden");
    })
    .catch((err) => {
      console.log(err);
    });
}
