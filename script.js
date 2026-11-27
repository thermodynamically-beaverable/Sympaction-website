// 1. Mobile menu button
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
    toggle.textContent = open ? "Close" : "Menu";
  });
}

// 2. Underline the nav link for the page you're on
const here = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".main-nav a").forEach((link) => {
  if (link.getAttribute("href") === here) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  }
});

// 3. If a photo isn't in /images yet, hide the broken icon
//    so the grey placeholder box shows instead
document.querySelectorAll(".gallery img, .photo-row img").forEach((img) => {
  const hide = () => img.classList.add("missing");
  img.addEventListener("error", hide);
  if (img.complete && img.naturalWidth === 0) hide();
});

// 4. Typing effect in the sidebar
const typedEl = document.getElementById("typed");

if (typedEl) {
  const phrases = [
    "E-textiles",
    "Co-design",
    "Wearable Technology",
    "Digital Fabrication",
    "Functional Fabrics",
    "Computational Folding",
    "Self-assembly Architecture",
    "Non-invasive Wearables",
    "Assistive Technology",
    "Cascading Degrees of Folding",
    "Wearable Computing",
    "Art",
    "Adaptive Education",
    "Mixing Media",
  ];

  const typeSpeed = 70;     // ms per letter typed
  const deleteSpeed = 35;   // ms per letter deleted
  const holdTime = 1500;    // ms to pause on a finished phrase
  const gapTime = 400;      // ms to pause before typing the next one

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) {
    // no animation: just swap phrases every few seconds
    let n = 0;
    typedEl.textContent = phrases[0];
    setInterval(() => {
      n = (n + 1) % phrases.length;
      typedEl.textContent = phrases[n];
    }, 3000);
  } else {
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
      const phrase = phrases[phraseIndex];

      if (!deleting) {
        charIndex++;
        typedEl.textContent = phrase.slice(0, charIndex);
        if (charIndex === phrase.length) {
          deleting = true;
          return setTimeout(tick, holdTime);
        }
        return setTimeout(tick, typeSpeed);
      }

      charIndex--;
      typedEl.textContent = phrase.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        return setTimeout(tick, gapTime);
      }
      setTimeout(tick, deleteSpeed);
    }

    tick();
  }
}