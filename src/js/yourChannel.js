getData();

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

function getData() {
  fetch("/api/userData", {
    method: "GET",
  })
    .then((response) => {
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
      document.querySelector(".name").textContent = data.username.username;
      let videos = document.querySelector(".videos");
      videos.innerHTML = "";
      data.Videos.forEach((video) => {
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
          <video class="player">
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
        <div class="video-type">${video.type}</div>
      </div>
    </a>
  `;
        const videosP = document.querySelectorAll("video");
        videosP.forEach((video) => {
          video.disablePictureInPicture = true;
          video.addEventListener("enterpictureinpicture", (event) => {
            console.log("in");
            event.preventDefault();
            console.log("Picture-in-Picture mode prevented.");
          });
        });
      });
    })
    .catch((err) => {
      console.error("Failed to fetch account data:", err);
    });
}
