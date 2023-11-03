const faqBlock = document.querySelector(".faqBlock");
const display = document.querySelector(".display");
const enterQuestion = document.querySelector(".enterQuestion");
const popUpBtn = document.querySelector(".popUpBtn");
const image = document.querySelector(".image");
const circle = document.querySelector(".circle");
const toggleBtn = document.querySelector(".toggleBtn")
function popUp() {
  faqBlock.style.display = "grid";
  popUpBtn.style.display = "none";
  image.style.display = "none";
  circle.style.display = "none";
}
function closeChat() {
  faqBlock.style.display = "none";
  popUpBtn.style.display = "block";
  image.style.display = "block";
  circle.style.display = "block";
  clearValues();
}
function enterSubmit(event) {
  if (event.key == "Enter") {
    submit();
  }
}
function scrollDown() {
  display.scrollTop = display.scrollHeight;
}
function submit() {
  if (
    enterQuestion.value == "clear" ||
    enterQuestion == "Clear" ||
    enterQuestion == "CLEAR"
  ) {
    clearValues();
  } 
  
  else {
    const que = document.createElement("p");
    que.classList.add("question");
    const quest = document.createElement("div");
    quest.classList.add("questionCss");
    const q70 = document.createElement("div");
    q70.classList.add("q70");
    const ans = document.createElement("p");
    ans.classList.add("answer");

    const answe = document.createElement("div");
    answe.classList.add("answerCss");
    quest.innerHTML = enterQuestion.value;
    const answ = findAnswer(enterQuestion.value);
    if(enterQuestion.value == "" || enterQuestion.value == " ")
    {
      answe.innerHTML = "Incomplete question"
    }
    else{
      answe.innerHTML = answ;
    }
    
    const a70 = document.createElement("div");
    a70.classList.add("a70");

    que.appendChild(quest);
    ans.appendChild(answe);
    q70.appendChild(que);
    a70.appendChild(ans);
    display.appendChild(q70);
    display.appendChild(a70);
    enterQuestion.value = "";
    scrollDown();
    a70.addEventListener("click", () => {
      textToSpeech(answe.innerHTML);
    });
  }
}
function clearValues() {
  const removeQuestions = document.querySelectorAll(".question");
  removeQuestions.forEach((question) => {
    question.remove();
  });
  const removeAnswers = document.querySelectorAll(".answer");
  removeAnswers.forEach((answer) => {
    answer.remove();
  });
  enterQuestion.value = "";
}

function findAnswer(keyword) {
  keyword = keyword.toLowerCase();
  for (const item of faq) {
    const foundQuestion = item.questions.find((question) => {
      const normalizedQuestion = question.toLowerCase();
      const words = keyword.split(" ");
      return words.every((word) => normalizedQuestion.includes(word));
    });

    if (foundQuestion) {
      return item.answer;
    }
  }

  for (const item of faq) {
    const foundAnswer = item.answer.toLowerCase().includes(keyword);
    if (foundAnswer) {
      return item.answer;
    }
  }

  return "I'm sorry, I didn't understand that. Can you ask in a different way?";
}

function speechToText() {
  let recognization = new webkitSpeechRecognition();
  recognization.lang = "en-GB";
  recognization.onresult = function (e) {
    var transcript = e.results[0][0].transcript;
    enterQuestion.value = transcript;
    submit();
  };

  recognization.start();
}
function textToSpeech(voice) {
  let speech = new SpeechSynthesisUtterance();
  speech.text = voice;
  window.speechSynthesis.speak(speech);
}
function toggleTheme(){
  const body = document.body
  body.classList.toggle("body")
  const changeColor = document.querySelectorAll(".changeColor")
  changeColor.forEach(item =>{
    item.classList.toggle("colorChange")
  })
  const toggleImg = document.querySelector(".toggleImg")
  toggleImg.classList.toggle("img")
  if (toggleImg.classList.contains("img")){
    toggleImg.src = "moon.png"
  }
  else{
    toggleImg.src = "sun.png"
  }
  
}
