// Edite os dados abaixo para trocar textos, fotos, data, carta, música e lembranças.
const siteData = {
  relationshipStart: "2022-06-06T20:15:30",
  letter:
    "Hoje eu olho para tudo o que vivemos e sinto orgulho da nossa história. Obrigado por ser meu abrigo, minha melhor conversa, meu riso favorito e a pessoa com quem eu quero dividir os dias simples e os sonhos enormes.\n\nNesses 4 anos, aprendi que amar você é escolher cuidado, parceria e futuro todos os dias. Eu te amo mais do que qualquer página conseguiria dizer.",
  timeline: [
    {
      title: "Como nos conhecemos",
      text: "Aquele Roles que nos Amavamso fazer quase todos dias so pra esta juntos",
      image: "assets/images/galeria-1.jpeg",
    },
    {
      title: "Primeiro encontro",
      text: "Quado te levei em casa pela primeira vez , pouco tempo juntos e vc ja comemorou seu Niver comigo",
      image: "assets/images/galeria-2.jpeg",
    },
    {
      title: "Pedido de namoro",
      text: "È e foi la no Ctn que eu resolvi te pedir em namora e vc disse simmmmmm KKKKKK, depois dai nunca mais nos largamos",
      image: "assets/images/galeria-3.jpeg",
    },
    {
      title: "Momentos especiais",
      text: "Nosso Primiera viagem de muitas ",
      image: "assets/images/galeria-4.jpeg",
    },
    {
      title: "Nascimento do nosso filho",
      text: "Um capítulo cheio de amor, cuidado e uma felicidade que mudou tudo para sempre. Nosso Nenem Kaleb chegou para completar nossa família e nos ensinar o verdadeiro significado de amor incondicional.",
      image: "assets/images/galeria-5.jpeg",
    },
    {
      title: "Conquistas juntos",
      text: "Cada passo, cada vitoria e cada desafio vencido lado a lado. O quanto eu ouvi sobre essa motinha eletrica KKKKKK",
      image: "assets/images/galeria-6.jpeg",
    },
    {
      title: "Sonhos para o futuro",
      text: "Tudo o que ainda vamos construir com amor, paciência, coragem e muita parceria.",
      image: "assets/images/galeria-7.jpg",
    },
  ],
  gallery: Array.from({ length: 16 }, (_, index) => ({
    src: `assets/images/galeria-${index + 8}.jpeg`,
    caption: `Nossa lembrança ${index + 1}`,
  })),
  reasons: [
    "Seu sorriso ilumina meus dias.",
    "Você acredita em mim.",
    "Você é uma mãe incrível.",
    "Você transforma casa em lar.",
    "Seu abraço acalma qualquer tempestade.",
    "Você me inspira a ser melhor.",
    "Sua risada é minha música favorita.",
    "Você cuida dos detalhes com amor.",
    "Com você, até o simples vira especial.",
    "Você sonha comigo.",
    "Você tem uma força admirável.",
    "Você faz meus dias terem mais cor.",
    "Você me entende até no silêncio.",
    "Você é minha melhor companhia.",
    "Você ama com verdade.",
    "Você torna o futuro mais bonito.",
    "Você tem um coração generoso.",
    "Você celebra minhas vitórias.",
    "Você segura minha mão nos dias difíceis.",
    "Você é linda por dentro e por fora.",
    "Você me ensina sobre paciência.",
    "Você faz parte das minhas melhores memórias.",
    "Você é minha escolha diária.",
    "Você me dá paz.",
    "Porque eu amo quem sou quando estou com você.",
  ],
  memories: Array.from({ length: 25 }, (_, index) => ({
    title: `Lembrança ${index + 1}`,
    message: `Uma memória especial que merece ficar guardada para sempre.`,
    image: `assets/images/galeria-${(index % 8) + 1}.jpeg`,
  })),
};

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

function initLoader() {
  window.addEventListener("load", () => {
    setTimeout(() => $("[data-loader]")?.classList.add("is-hidden"), 450);
  });
}

function initTypewriter() {
  const target = $("[data-typewriter]");
  if (!target) return;

  const text = target.dataset.typewriter;
  let index = 0;
  const write = () => {
    target.textContent = text.slice(0, index);
    index += 1;
    if (index <= text.length) window.setTimeout(write, 58);
  };
  write();
}

function getDateParts(startDate, endDate) {
  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();
  let days = endDate.getDate() - startDate.getDate();

  if (days < 0) {
    months -= 1;
    const previousMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
    days += previousMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months, days };
}

function initCounter() {
  const counter = $("[data-counter]");
  if (!counter) return;

  const labels = [
    ["years", "anos"],
    ["months", "meses"],
    ["days", "dias"],
    ["hours", "horas"],
    ["minutes", "minutos"],
  ];

  counter.innerHTML = labels
    .map(
      ([key, label]) => `
        <article class="counter-card">
          <strong data-counter-value="${key}">0</strong>
          <span>${label}</span>
        </article>
      `
    )
    .join("");

  const update = () => {
    const start = new Date(siteData.relationshipStart);
    const now = new Date();
    const diff = Math.max(0, now - start);
    const parts = getDateParts(start, now);
    const hours = Math.floor((diff / 1000 / 60 / 60) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const values = { ...parts, hours, minutes };

    Object.entries(values).forEach(([key, value]) => {
      const node = $(`[data-counter-value="${key}"]`);
      if (node) node.textContent = String(value).padStart(key === "years" ? 1 : 2, "0");
    });
  };

  update();
  setInterval(update, 30000);
}

function renderTimeline() {
  const timeline = $("[data-timeline]");
  if (!timeline) return;

  timeline.innerHTML = siteData.timeline
    .map(
      (item) => `
        <article class="timeline-item reveal">
          <div class="timeline-item__image">
            <img src="${item.image}" alt="${item.title}" loading="lazy" />
          </div>
          <div class="timeline-item__content">
            <h3>${item.title}</h3>
            <p>${item.text}</p>
          </div>
        </article>
      `
    )
    .join("");
}

function renderGallery() {
  const gallery = $("[data-gallery]");
  if (!gallery) return;

  gallery.innerHTML = siteData.gallery
    .map(
      (item) => `
        <button class="gallery-card" type="button" data-lightbox-src="${item.src}" data-caption="${item.caption}">
          <img src="${item.src}" alt="${item.caption}" loading="lazy" />
        </button>
      `
    )
    .join("");
}

function renderReasons() {
  const reasons = $("[data-reasons]");
  if (!reasons) return;

  reasons.innerHTML = siteData.reasons
    .map(
      (reason, index) => `
        <article class="reason-card reveal">
          <strong>${index + 1}</strong>
          <p>${reason}</p>
        </article>
      `
    )
    .join("");
}

function initLetter() {
  const button = $("[data-open-letter]");
  const letter = $("[data-letter]");
  const textTarget = $("[data-letter-text]");
  if (!button || !letter || !textTarget) return;

  button.addEventListener("click", () => {
    button.classList.add("is-open");
    setTimeout(() => {
      letter.classList.add("is-visible");
      typeText(textTarget, siteData.letter, 18);
    }, 520);
  });
}

function typeText(target, text, speed) {
  target.textContent = "";
  let index = 0;
  const timer = setInterval(() => {
    target.textContent += text[index] || "";
    index += 1;
    if (index >= text.length) clearInterval(timer);
  }, speed);
}

function initAudioPlayer() {
  const audio = $("[data-audio]");
  const play = $("[data-play]");
  const progress = $("[data-progress]");
  const volume = $("[data-volume]");
  const time = $("[data-time]");
  if (!audio || !play || !progress || !volume || !time) return;

  const format = (seconds) => {
    if (!Number.isFinite(seconds)) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const rest = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
  };

  play.addEventListener("click", async () => {
    try {
      if (audio.paused) {
        await audio.play();
        play.textContent = "Pause";
      } else {
        audio.pause();
        play.textContent = "Play";
      }
    } catch {
      play.textContent = "Sem MP3";
    }
  });

  audio.addEventListener("timeupdate", () => {
    progress.value = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
    time.textContent = `${format(audio.currentTime)} / ${format(audio.duration)}`;
  });

  audio.addEventListener("ended", () => {
    play.textContent = "Play";
  });

  progress.addEventListener("input", () => {
    if (audio.duration) audio.currentTime = (progress.value / 100) * audio.duration;
  });

  volume.addEventListener("input", () => {
    audio.volume = volume.value;
  });

  audio.volume = volume.value;
}

function renderMemoryTree() {
  const tree = $("[data-memory-tree]");
  if (!tree) return;

  const positions = siteData.memories.map((_, index) => {
    const angle = (index / siteData.memories.length) * Math.PI * 2;
    const radiusX = 210 + (index % 4) * 28;
    const radiusY = 120 + (index % 5) * 14;
    return {
      left: 50 + Math.cos(angle) * (radiusX / 7.4),
      top: 39 + Math.sin(angle) * (radiusY / 5.6),
      rotate: Math.round((angle * 180) / Math.PI),
    };
  });

  tree.innerHTML = siteData.memories
    .map((memory, index) => {
      const position = positions[index];
      return `
        <button
          class="leaf"
          type="button"
          style="left:${position.left}%; top:${position.top}%; --rotate:${position.rotate}deg"
          data-lightbox-src="${memory.image}"
          data-caption="${memory.title}: ${memory.message}"
          aria-label="${memory.title}"
        ></button>
      `;
    })
    .join("");
}

function initLightbox() {
  const lightbox = $("[data-lightbox]");
  const image = $("[data-lightbox-image]");
  const caption = $("[data-lightbox-caption]");
  const close = $("[data-close-lightbox]");
  if (!lightbox || !image || !caption || !close) return;

  const open = (src, text) => {
    image.src = src;
    image.alt = text;
    caption.textContent = text;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-locked");
  };

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-locked");
  };

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-lightbox-src]");
    if (trigger) open(trigger.dataset.lightboxSrc, trigger.dataset.caption || "");
  });

  close.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });
}

function initSurpriseModal() {
  const modal = $("[data-surprise-modal]");
  const open = $("[data-open-surprise]");
  const close = $("[data-close-surprise]");
  if (!modal || !open || !close) return;

  const setOpen = (isOpen) => {
    modal.classList.toggle("is-open", isOpen);
    modal.setAttribute("aria-hidden", String(!isOpen));
    document.body.classList.toggle("is-locked", isOpen);
  };

  open.addEventListener("click", () => setOpen(true));
  close.addEventListener("click", () => setOpen(false));
  modal.addEventListener("click", (event) => {
    if (event.target === modal) setOpen(false);
  });
}

function initRevealAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          if (entry.target.classList.contains("final-message")) {
            setTimeout(() => entry.target.classList.add("is-active"), 1200);
          }
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  $$(".reveal, .final-message").forEach((element) => observer.observe(element));
}

function initNavigation() {
  const topbar = $(".topbar");
  const backTop = $("[data-back-top]");
  const menu = $("[data-menu]");
  const toggle = $("[data-menu-toggle]");

  const onScroll = () => {
    const scrolled = window.scrollY > 80;
    topbar?.classList.toggle("is-scrolled", scrolled);
    backTop?.classList.toggle("is-visible", window.scrollY > 600);
    document.documentElement.style.setProperty("--parallax", `${window.scrollY * 0.18}px`);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  backTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  toggle?.addEventListener("click", () => menu?.classList.toggle("is-open"));
  menu?.addEventListener("click", (event) => {
    if (event.target.matches("a")) menu.classList.remove("is-open");
  });
}

function initHeartsSky() {
  const sky = $("[data-hearts-sky]");
  if (!sky) return;

  const createHeart = () => {
    const heart = createElement("span", "heart", "♥");
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${14 + Math.random() * 18}px`;
    heart.style.animationDuration = `${6 + Math.random() * 5}s`;
    heart.style.opacity = `${0.25 + Math.random() * 0.35}`;
    sky.appendChild(heart);
    setTimeout(() => heart.remove(), 11500);
  };

  setInterval(createHeart, 650);
}

document.addEventListener("DOMContentLoaded", () => {
  initLoader();
  initTypewriter();
  initCounter();
  renderTimeline();
  renderGallery();
  renderReasons();
  initLetter();
  initAudioPlayer();
  renderMemoryTree();
  initLightbox();
  initSurpriseModal();
  initNavigation();
  initHeartsSky();
  initRevealAnimations();
});
