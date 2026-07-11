// extra function for hard and extreme

function updateLineLayout(level) {
  // Default
  four.style.display = "";
  five.style.display = "";
  lineCont.style.gridTemplateColumns = "repeat(5, 1fr)";
  lineCont.style.gridTemplateAreas = "one two three four five";
  sliderLine.style.width = "20%";
  
  if (level === "hard") {
    five.style.display = "none";
    lineCont.style.gridTemplateColumns = "1fr 1fr 1fr 1fr";
    lineCont.style.gridTemplateAreas = "one two three four";
    sliderLine.style.width = "calc(100% / 4)";
  } else if (level === "extreme") {
    five.style.display = "none";
    four.style.display = "none";
    lineCont.style.gridTemplateColumns = "1fr 1fr 1fr";
    lineCont.style.gridTemplateAreas = "one two three";
    sliderLine.style.width = "calc(100% / 3)";
  }
}

// local storage

function setDefault(storageKey, value, slider, direction) {
  localStorage.setItem(storageKey, value);
  slider.style.transform = `translate${direction}(0%)`;
}
if (!localStorage.getItem("lastline")) {
  setDefault("lastline", "one", sliderLine, "X");
}
if (!localStorage.getItem("lastlevel")) {
  setDefault("lastlevel", "easy", sliderLevel, "Y");
}

// moving slider

function moveSlider(localName, direction, array, slider) {
  const index = array.indexOf(localStorage.getItem(localName))
  
  if(index === -1) return
  
  slider.style.transform = `translate${direction}(${index * 100}%)` 
}

moveSlider("lastlevel", "Y", levelName, sliderLevel)
moveSlider("lastline", "X", lineName, sliderLine)

if (["hard", "extreme"].includes(localStorage.getItem("lastlevel"))) updateLineLayout(localStorage.getItem("lastlevel"))

// level

buttonLevel.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    localStorage.setItem("lastlevel", btn.id);
    moveSlider("lastline", "X", lineName, sliderLine)
    moveSlider("lastlevel", "Y", levelName, sliderLevel)
    updateLineLayout(btn.id);
    if(btn.id === "hard" && localStorage.getItem("lastline") === "five"){
      setDefault("lastline", "one", sliderLine, "X");
    }
    if (btn.id === "extreme" && ["four","five"].includes(localStorage.getItem("lastline"))){
      setDefault("lastline", "one", sliderLine, "X");
    }
  });
});

// lines

buttonLine.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    localStorage.setItem("lastline", btn.id)
    updateLineLayout(localStorage.getItem("lastlevel"));
    moveSlider("lastline", "X", lineName, sliderLine)
    moveSlider("lastlevel", "Y", levelName, sliderLevel)
  });
});
