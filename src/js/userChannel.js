loginnerData();
getChannelData();

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

function getChannelData() {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("id");
  fetch(`/api/userChannel?id=${userId}`, {
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
      return response.json();
    })
    .then((data) => {
      document.querySelector(".username").textContent =
        data.user_username.username;
      document.title = data.user_username.username;
      let videos = document.querySelector(".videos");
      videos.innerHTML = "";
      data.user_videos.forEach((video) => {
        let thumbnailHTML = "";
        if (video.thumbnail) {
          thumbnailHTML = `
            <div class="thumbnail">
              <img src="/assets/thumbnails/${video.thumbnail}" />
            </div>
          `;
        } else {
          thumbnailHTML = `
          <div class="video-div">
          <video id="player">
            <source src="http://localhost:5173/public/assets/videos/${video.path}" type="video/mp4" />
            </video>
          </div>
          `;
        }

        videos.innerHTML += `
    <a href="/api/pages/video?id=${video._id}" class="video-card">
      ${thumbnailHTML}
      <div class="info">
        <div class="video-title">${video.title}</div>
        <div class="video-views"><img class="view" src="/public/assets/images/view-svgrepo-com.svg" /> ${video.views}</div>
      </div>
    </a>
  `;
        const videoE = document.querySelector("video");

        videoE.disablePictureInPicture = true;

        videoE.addEventListener("enterpictureinpicture", (event) => {
          event.preventDefault();
          console.log("Picture-in-Picture mode prevented.");
        });
      });
    })
    .catch((err) => {
      console.error("Failed to fetch account data:", err);
    });
}

function loginnerData() {
  fetch("/api/loginnerData", {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.username) {
        document.querySelector(".name").textContent = data.username.username;
        document.querySelector(".login").classList.add("hidden");
        document.querySelector(".profile").classList.remove("hidden");
        document.querySelector(".upload").classList.remove("hidden");
        document.querySelector(".logout").classList.remove("hidden");
        return;
      }
      document.querySelector(".logout").classList.add("hidden");
    })
    .catch((err) => {
      console.log("error: ", err);
    });
}
