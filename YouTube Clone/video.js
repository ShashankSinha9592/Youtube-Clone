class Video {
  constructor(th, ti, ch, vi) {
    this.thumbnail = th;
    this.title = ti;
    this.channel = ch;
    this.video = vi;
  }
}
let myname = JSON.parse(localStorage.getItem("name"));
let atag = document.querySelector(".atag");
if (myname != undefined) {
  atag.innerText = myname;
  atag.setAttribute("id", "s");
}

atag.addEventListener("click", (e) => {
  if (atag.innerText == myname) {
    localStorage.removeItem("name");
    atag.removeAttribute("s");
    location.href = "./index.html";
  } else {
    location.href = "./signupLogin.html";
  }
});
let { title, video } = JSON.parse(localStorage.getItem("ClickedData"));

let videoDiv = document.querySelector(".video");

let iFrame = document.createElement("iframe");

iFrame.src = `https://www.youtube.com/embed/${video}?autoplay=1&mute=1`;
iFrame.width = "100%";

iFrame.setAttribute("allowfullscreen", "true");

let p1 = document.createElement("p");

p1.innerText = title;

videoDiv.append(iFrame, p1);

let container = document.querySelector(".reco");
const showData = (data) => {
  container.innerHTML = "";
  data.forEach((el, i) => {
    if (i <= 10) {
      let thumbnail = el.snippet.thumbnails.high.url;
      let title = el.snippet.title;
      let channel = el.snippet.channelTitle;
      let videoId = el.id.videoId;

      let videoData = new Video(thumbnail, title, channel, videoId);
      let div = document.createElement("div");
      div.addEventListener("click", (e) => {
        localStorage.setItem("ClickedData", JSON.stringify(videoData));
        location.href = "./video.html";
      });

      let img = document.createElement("img");
      img.src = thumbnail;

      let p1 = document.createElement("p");
      p1.innerText = title;

      div.append(img, p1);

      container.append(div);
    } else {
      return;
    }
  });
};

let data = JSON.parse(localStorage.getItem("recommendation")) || [];

showData(data);
