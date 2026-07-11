// ── press / release ───────────────────────────────────────────────────
const lastKeyEl = document.querySelector("#lastKeyDisplay span");

function getEntries(code) {
  return codeMap[code] || [];
}

function press(code, keyLabel) {
  initAudio();
  const entries = getEntries(code);
  if (!entries.length) return;
  for (const e of entries) {
    e.rect.classList.add("active");
    e.label.classList.add("active");
  }
  clickSound();
  if (keyLabel) lastKeyEl.textContent = keyLabel;
}

function release(code) {
  const entries = getEntries(code);
  for (const e of entries) {
    e.rect.classList.remove("active");
    e.label.classList.remove("active");
  }
}

document.addEventListener("keydown", e => {
  e.preventDefault();
  press(e.code, e.key === " " ? "Space" : e.key);
});

document.addEventListener("keyup", e => {
  release(e.code);
});

document.addEventListener("click", initAudio);
