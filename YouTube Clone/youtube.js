// AIzaSyDFajly8T4pna7K27WQXtxk4eHBEcNOmjs
// https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=%5Bdata%5D&key=[YOUR_API_KEY]
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
const fetchData = async (query = "movies") => {
  const key = `AIzaSyA9SbWdeHbcVLGSoYd5grIfM2iV-KzcvnQ`;

  const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=${key}`;

  try {
    let res = await fetch(url);

    let data = res.json();

    let lastData = await data;
    localStorage.setItem("recommendation", JSON.stringify(lastData.items));
    showData(lastData.items);
  } catch (err) {
    console.log(err);
  }
};
let container = document.querySelector(".container");
const showData = (data) => {
  container.innerHTML = "";
  data.forEach((el) => {
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

    let p2 = document.createElement("p");
    p2.innerText = channel;

    div.append(img, p1, p2);

    container.append(div);
  });
};

function Search() {
  let data = document.querySelector("#input").value;

  fetchData(data);
}

fetchData();
