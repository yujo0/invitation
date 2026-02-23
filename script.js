const buttonZone = document.getElementById("buttonZone");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const kicker = document.getElementById("kicker");
const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");
const confettiLayer = document.getElementById("confettiLayer");
const celebrationMedia = document.getElementById("celebrationMedia");

let shiftX = 0;
let shiftY = 0;
let celebrationImageAdded = false;

function renderCelebrationImage() {
  if (celebrationImageAdded || !celebrationMedia) return;

  const img = document.createElement("img");
  img.src = "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=1200";
  img.alt = "많은 사람들이 함께 환호하는 장면";
  img.loading = "lazy";
  celebrationMedia.appendChild(img);
  celebrationImageAdded = true;
}

function initTextContent() {
  const initialTitle = "박사과정에 진학하시겠습니까?";
  if (kicker) kicker.textContent = "AIM 석사생들을 위한 특별한 오퍼";
  if (title) title.textContent = initialTitle;
  if (subtitle) subtitle.textContent = "현명한 선택을 응원합니다.";
  document.title = initialTitle;
}

initTextContent();

function applyNoPosition() {
  noBtn.style.transform = `translate(${shiftX}px, ${shiftY}px)`;
}

function clampPosition(left, top, zone, rect) {
  const minLeft = zone.left + 8;
  const maxLeft = zone.right - rect.width - 8;
  const minTop = zone.top + 6;
  const maxTop = zone.bottom - rect.height - 6;

  return {
    left: Math.max(minLeft, Math.min(maxLeft, left)),
    top: Math.max(minTop, Math.min(maxTop, top))
  };
}

function moveNoTo(left, top) {
  const rect = noBtn.getBoundingClientRect();
  shiftX += left - rect.left;
  shiftY += top - rect.top;
  applyNoPosition();
}

function moveNoFrom(pointerX, pointerY) {
  const zone = buttonZone.getBoundingClientRect();
  const rect = noBtn.getBoundingClientRect();

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const dx = centerX - pointerX;
  const dy = centerY - pointerY;
  const distance = Math.hypot(dx, dy);

  const triggerDistance = 130;
  if (distance > triggerDistance) return;

  const push = (triggerDistance - distance) * 0.45 + 10;
  const angle = Math.atan2(dy || 1, dx || 1);

  const nextLeft = rect.left + Math.cos(angle) * push;
  const nextTop = rect.top + Math.sin(angle) * push;
  const clamped = clampPosition(nextLeft, nextTop, zone, rect);

  moveNoTo(clamped.left, clamped.top);
}

function keepNoInsideZone() {
  const zone = buttonZone.getBoundingClientRect();
  const rect = noBtn.getBoundingClientRect();
  const clamped = clampPosition(rect.left, rect.top, zone, rect);
  moveNoTo(clamped.left, clamped.top);
}

window.addEventListener("mousemove", (event) => {
  moveNoFrom(event.clientX, event.clientY);
});

window.addEventListener(
  "touchmove",
  (event) => {
    const t = event.touches[0];
    if (t) moveNoFrom(t.clientX, t.clientY);
  },
  { passive: true }
);

window.addEventListener("resize", keepNoInsideZone);

noBtn.setAttribute("tabindex", "-1");
noBtn.setAttribute("aria-disabled", "true");

yesBtn.addEventListener("click", () => {
  renderCelebrationImage();
  document.body.classList.add("celebrate");
  title.textContent = "YEEEESSSS";
  document.title = "YEEEESSSS";
  subtitle.innerHTML = 'FYI: <a href="https://ae.kaist.ac.kr/boards/view/board_notice/13980" target="_blank" rel="noopener noreferrer">https://ae.kaist.ac.kr/boards/view/board_notice/13980</a>';
  launchConfetti(120);

  if (navigator.vibrate) navigator.vibrate([80, 40, 80]);
});

function launchConfetti(count) {
  const palette = ["#ff4d6d", "#ffbe0b", "#00bbf9", "#80ed99", "#8338ec", "#fb5607"];

  for (let i = 0; i < count; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = palette[Math.floor(Math.random() * palette.length)];
    piece.style.animationDuration = `${2.2 + Math.random() * 1.8}s`;
    piece.style.animationDelay = `${Math.random() * 0.45}s`;
    confettiLayer.appendChild(piece);

    setTimeout(() => {
      piece.remove();
    }, 4300);
  }
}
