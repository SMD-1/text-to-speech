const main = document.querySelector("main");
const voiceSelect = document.getElementById("voices");
const textArea = document.getElementById("text");
const readBtn = document.getElementById("read");
const toggleBtn = document.getElementById("toggle");
const closeBtn = document.getElementById("close");

const data = [
  {
    img: "./image/happy.png",
    text: "I am Happy",
  },
  {
    img: "./image/scared.png",
    text: "I am scared",
  },
  {
    img: "./image/angry.png",
    text: "I am angry",
  },
  {
    img: "./image/school.png",
    text: "I am in school",
  },
  {
    img: "./image/exam.png",
    text: "Tomorrow is my exam",
  },
  {
    img: "./image/job.png",
    text: "At Job",
  },
];

data.forEach(createBoxes);

function createBoxes(item) {
  console.log(item);
  const box = document.createElement("div");
  const { img, text } = item;
  box.classList.add("box");
  box.innerHTML = `
  <img class="image" src="${img}" alt="${text}" />
  <p class="info"> ${text} </p> 
  `;

  box.addEventListener("click", () => {
    setTextMessage(text);
    speakText();

    box.classList.add("active");
    setTimeout(() => box.classList.remove("active"), 800);
  });

  main.appendChild(box);
}

// init speech synthesis
const message = new SpeechSynthesisUtterance();

// store voices
let voices = [];

// store voices
function getVoices() {
  voices = speechSynthesis.getVoices();
  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voiceSelect.appendChild(option);
  });
}

// set text
function setTextMessage(text) {
  message.text = text;
}

// speak text
function speakText() {
  speechSynthesis.speak(message);
}

function setVoice(e) {
  message.voice = voices.find((voice) => voice.name === e.target.value);
}

// voices changed
speechSynthesis.addEventListener("voiceschanged", getVoices);

toggleBtn.addEventListener("click", () => {
  document.getElementById("text-box").classList.toggle("show");
  console.log("clicked");
});

closeBtn.addEventListener("click", () => {
  document.getElementById("text-box").classList.remove("show");
});

// Change voice
voiceSelect.addEventListener("change", setVoice);

// Read text button
readBtn.addEventListener("click", () => {
  setTextMessage(textArea.value);
  speakText();
});

getVoices();
