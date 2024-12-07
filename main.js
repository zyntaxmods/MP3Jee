function change(){
  let button = document.getElementById("btn");
  let img = document.getElementById("loading");
  btn.disabled = true;
  img.style.display = "block";
}

function revert(){
  let button = document.getElementById("btn");
  let img = document.getElementById("loading");
  btn.disabled = false;
  img.style.display = "none";
}

let convertBtn = document.getElementById("btn").addEventListener('click', function(){
  change();
  let user = document.getElementById("user").value;
  if(user == ''){
    alert("Please Enter URL");
    revert();
    return;
  }
  function extractYouTubeID(url) {
    const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }
  
  const videoId = extractYouTubeID(user);
  if(!videoId){
    alert("Wrong url format");
    revert();
    return;
  }
  const url = `https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`;
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': 'db3fcc2c7emsha0cc08b68381743p1c76b9jsn39db8c98bb60',
    'x-rapidapi-host': 'youtube-mp36.p.rapidapi.com'
  }
};

fetch(url, options)
.then(response => response.json())
.then(data => {
  let container= document.getElementById("resultBox");
  container.innerHTML = '';
  let tiTle = document.createElement("p");
  tiTle.textContent = data.title;
  let message = document.createElement("p");
  message.textContent = data.msg;
  if(data.msg == "success"){
    message.style.color = "green";
    message.style.textTransform = "uppercase";
  }
  else if(data.msg == "failed"){
    message.style.color = "red";
  }
  else if(data.msg == "in process"){
    message.textContent = "Convert again"
  }
  if(data.status == "fail"){
    alert("Failed fetching data Try again");
  }
  else if(data.status == "processing"){
    alert("Your music is on progress convert again to see status");
  }
  let dlBtn = document.createElement("button");
  let dlUrl = document.createElement("a");
  dlUrl.href = data.link;
  dlBtn.textContent = "Download";
  dlBtn.addEventListener('click', function(){
    dlUrl.click();
  })
  dlBtn.classList.toggle("dlBtn");
  container.appendChild(tiTle);
  container.appendChild(message);
  container.appendChild(dlBtn);
  revert();
});
  
})

let buy = document.getElementById("buy").addEventListener('click', function() {
  window.location.href = "qr.html";
})