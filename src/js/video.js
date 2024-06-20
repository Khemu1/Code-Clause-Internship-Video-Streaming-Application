import Plyr from "plyr";
getAccount();
getVideoData();

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

function getVideoData() {
  const urlParams = new URLSearchParams(window.location.search);
  const videoId = urlParams.get("id");

  fetch(`/api/loadVideo?id=${videoId}`)
    .then(async (response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          if (data.redirect) {
            window.location.href = data.redirect;
          }
        });
      }
      return response.json();
    })
    .then((data) => {
      document.title = data.video.title;
      let videoDiv = document.querySelector(".video-div");
      let videosDiv = document.querySelector(".videos");
      videoDiv.innerHTML = `
        <div class="video">
          <video id="player" autoplay controls>
            <source src="http://localhost:5173/public/assets/videos/${data.video.path}" type="video/mp4" />
          </video>
        <div class="video-title">${data.video.title}</div>
        <div class="video-views"><img class="view" src="/public/assets/images/view-svgrepo-com.svg" />  ${data.video.views}</div>
        <div class="video-decs">
        <div class="date">${data.video.date}</div>
        <div class="desc">${data.video.description}</div>
        <div class="uploader"> Uploader : <a href="/api/pages/userChannel?id=${data.uploader._id}">${data.uploader.username}</a></div>
        <div class="show-less">show less</div>
        </div>
      `;
      let desc = document.querySelector(".video-decs");
      desc.addEventListener("click", (e) => {
        if (e.target.classList.contains("extended")) {
          return;
        }
        desc.classList.add("extended");
      });

      let show_less = document.querySelector(".show-less");
      show_less.addEventListener("click", (e) => {
        e.stopPropagation();
        desc.classList.remove("extended");
      });

      const player = new Plyr("#player");
      document.querySelector("#player").load();
      document.querySelector("#player").removeAttribute("autoplay");
      document.querySelector("#player").pause();

      let viewCountIncremented = false;

      document.querySelector("#player").addEventListener("play", () => {
        if (!viewCountIncremented) {
          incrementViewCount();
          viewCountIncremented = true;
        }
      });

      data.videos.forEach((video) => {
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
            <source src="http://localhost:5173/public/assets/videos/${video.path}"  type="video/mp4" />
            </video>
          </div>
          `;
        }

        videosDiv.innerHTML += `
    <a href="/api/pages/video?id=${video._id}" class="video-card">
      ${thumbnailHTML}
      <div class="info">
        <div class="video-card-title">${video.title}</div>
        <div class="video-views"><img class="view" src="/public/assets/images/view-svgrepo-com.svg" /> ${video.views}</div>
      </div>
    </a>
  `;
      });
      const videosP = document.querySelectorAll("video");
      videosP.forEach((video) => {
        video.disablePictureInPicture = true;
        video.removeAttribute("autoplay");
        video.pause();
        video.addEventListener("enterpictureinpicture", (event) => {
          event.preventDefault();
          console.log("Picture-in-Picture mode prevented.");
        });
      });
    })

    .catch((error) => {
      console.error("Error fetching video data:", error);
    });
}

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
        document.querySelector(".profile").classList.remove("hidden");
        document.querySelector(".upload").classList.remove("hidden");
        document.querySelector(".logout").classList.remove("hidden");
        return;
      }
      document.querySelector(".logout").classList.add("hidden");
    })
    .catch((err) => {
      console.log(err);
    });
}

function incrementViewCount() {
  const urlParams = new URLSearchParams(window.location.search);
  const videoId = urlParams.get("id");
  fetch(`/api/incrementViewCount?id=${videoId}`, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to increment view count");
      }
      return response.json();
    })
    .then((data) => {
      console.log("View count incremented:", data);
    })
    .catch((error) => {
      console.error("Error incrementing view count:", error);
    });
}
