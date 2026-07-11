const svg = document.getElementById("kb");
const NS = "http://www.w3.org/2000/svg";

// ── layout constants ────────────────────────────────────────────────
const U = 52;       // 1u key size
const G = 6;        // gap
const STEP = U + G;

const ROWS = [
  // [label, widthUnits, keyCode-override (optional)]
  [
    ["Esc",1],["F1",1],["F2",1],["F3",1],["F4",1],
    ["F5",1],["F6",1],["F7",1],["F8",1],
    ["F9",1],["F10",1],["F11",1],["F12",1]
  ],
  [
    ["`",1],["1",1],["2",1],["3",1],["4",1],
    ["5",1],["6",1],["7",1],["8",1],["9",1],
    ["0",1],["-",1],["=",1],["⌫",2]
  ],
  [
    ["Tab",1.5],["Q",1],["W",1],["E",1],["R",1],
    ["T",1],["Y",1],["U",1],["I",1],["O",1],
    ["P",1],["[",1],["]",1],["\\",1.5]
  ],
  [
    ["Caps",1.75],["A",1],["S",1],["D",1],["F",1],
    ["G",1],["H",1],["J",1],["K",1],["L",1],
    [";",1],["'",1],["↵",2.25]
  ],
  [
    ["⇧",2.25],["Z",1],["X",1],["C",1],["V",1],
    ["B",1],["N",1],["M",1],[",",1],[".",1],
    ["/",1],["⇧",2.75]
  ],
  [
    ["Ctrl",1.25],["⊞",1.25],["Alt",1.25],
    [" ",6.25],
    ["Alt",1.25],["Fn",1.25],["☰",1.25],["Ctrl",1.25]
  ]
];

// map: normalizedKey → { rect, face, shine, label }
const keyMap = {};


// ─── ASSEMBLED STRUCTURE ────────────────────────────────────────────────────

const paragraph = 
[
  [
    [p1, p2, p3, p4, p5],
    [p6, p7, p8, p9, p10],
    [p11, p12, p13, p14, p15],
    [p16, p17, p18, p19, p20],
    [p21, p22, p23, p24, p25]
  ],
  [
    [p26, p27, p28, p29, p30],
    [p31, p32, p33, p34, p35],
    [p36, p37, p38, p39, p40],
    [p41, p42, p43, p44, p45],
    [p46, p47, p48, p49, p50]
  ],
  [
    [p51, p52, p53, p54, p55],
    [p56, p57, p58, p59, p60],
    [p61, p62, p63, p64, p65],
    [p66, p67, p68, p69, p70],
    [p71, p72, p73, p74, p75]
  ],
  [
    [p76, p77, p78, p79, p80],
    [p81, p82, p83, p84, p85],
    [p86, p87, p88, p89, p90],
    [p91, p92, p93, p94, p95]
  ],
  [
    [p101, p102, p103, p104, p105],
    [p106, p107, p108, p109, p110],
    [p111, p112, p113, p114, p115]
  ]
];

const levelName = ["easy", "normal", "medium", "hard", "extreme"];
const lineName = ["one", "two", "three", "four", "five"];
const buttonLevel = document.querySelectorAll("#level-container button");
const buttonLine = document.querySelectorAll("#line-container button");
const easyBtn = buttonLevel[0];
const normalBtn = buttonLevel[1];
const mediumBtn = buttonLevel[2];
const hardBtn = buttonLevel[3];
const extremeBtn = buttonLevel[4];
const one = buttonLine[0];
const two = buttonLine[1];
const three = buttonLine[2];
const four = buttonLine[3];
const five = buttonLine[4];
const sliderLevel = document.getElementById("slider-level");
const sliderLine = document.getElementById("slider-lines");
const lineCont = document.getElementById("line-container"); 
const txt = document.getElementById("txt-area");
const lbl = document.getElementById("label");
const lpm = document.getElementById("lpm");
const accuracy = document.getElementById("accuracy");
const time = document.getElementById("time");
const percent = document.getElementById("percent");
const circle = document.getElementsByClassName("progress")[0];
const btn = document.getElementById("refresh");
const section = document.getElementById("typing-area");
const levelWrap = document.getElementById("level-wrap");
const lineWrap = document.getElementById("line-wrap");
const fadeout = document.querySelectorAll(".fade-out");
let guessedPara;
let interval;
let startTime;
let circumference;
let isCompleted;
let isUserStarted;
