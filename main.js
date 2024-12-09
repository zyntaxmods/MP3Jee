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
var option = false;
let mode = document.getElementById("dark").addEventListener('click', function(){
  let head = document.getElementById("head");
  let imgMode = document.getElementById("darkMode");
  let darkAssurance = document.getElementById("darkAssurance");
  let darkads = document.getElementById("darkAds");
  let darkarrow = document.getElementById("darkArrow");
  let darkunli = document.getElementById("darkUnli");
  let btn = document.getElementById("dark");
  let darkCard = document.getElementById("darkCont");
  let darklogo = document.getElementById("darkLogo");
  let darklogo1 = document.getElementById("darkLogo1");
  let kenshie = document.getElementById("kenshie");
  if(option){
    btn.style.boxShadow = "0px 0px 20px white";
    btn.style.backgroundColor = "gray";
    darkAssurance.src = "./dark/assuranced.png"
    darkads.src = "./dark/darkAd.png";
    imgMode.src = "./dark/light-bulb.png";
    darkarrow.src = "./dark/tech.png";
    darkunli.src = "./dark/unlimited-storage.png";
    darklogo.src = "./logo1/zy.jpg";
    darklogo1.src = "./logo1/zy.jpg";
    darkCard.classList.toggle("darkCont");
    head.style.backgroundColor = "black";
    head.classList.toggle("dark");
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
    kenshie.style.backgroundColor = "black";
  }
  else{
    let imgMode = document.getElementById("darkMode");
    head.style.backgroundColor = "white";
    head.classList.remove("dark");
    imgMode.src = "./dark/house-rules.png";
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
    darkAssurance.src = "./icons/assurance.png"
    darkads.src = "./icons/ad-block.png";
    darkarrow.src = "./icons/arrow.png";
    darkunli.src = "./icons/unlimited.png";
    darkCard.classList.remove("darkCont");
    btn.style.backgroundColor = "white";
    darklogo.src = "./logo1/zy1.jpg";
    darklogo1.src = "./logo1/zy1.jpg";
    kenshie.style.backgroundColor = "white";
  }
  option = !option;
})