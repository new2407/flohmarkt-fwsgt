const navToggle = document.getElementById("nav-toggle");
const siteNav = document.getElementById("site-nav");

navToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

function initCarousel(root) {
  const track = root.querySelector(".carousel-track");
  const slides = Array.from(root.querySelectorAll(".carousel-slide"));
  const dotsWrap = root.querySelector(".carousel-dots");
  const prevBtn = root.querySelector(".carousel-nav.prev");
  const nextBtn = root.querySelector(".carousel-nav.next");

  if (!track || slides.length === 0) return;

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Foto ${i + 1} anzeigen`);
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => scrollToSlide(i));
    dotsWrap.appendChild(dot);
  });

  const dots = Array.from(dotsWrap.querySelectorAll("button"));

  function scrollToSlide(index) {
    slides[index].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  }

  function updateActiveDot() {
    const trackRect = track.getBoundingClientRect();
    let closestIndex = 0;
    let closestDistance = Infinity;
    slides.forEach((slide, i) => {
      const rect = slide.getBoundingClientRect();
      const distance = Math.abs(rect.left - trackRect.left);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    });
    dots.forEach((d, i) => d.classList.toggle("active", i === closestIndex));
    return closestIndex;
  }

  prevBtn?.addEventListener("click", () => {
    const current = updateActiveDot();
    scrollToSlide(Math.max(0, current - 1));
  });

  nextBtn?.addEventListener("click", () => {
    const current = updateActiveDot();
    scrollToSlide(Math.min(slides.length - 1, current + 1));
  });

  track.addEventListener("scroll", () => {
    window.clearTimeout(track._scrollTimeout);
    track._scrollTimeout = window.setTimeout(updateActiveDot, 100);
  });
}

document.querySelectorAll(".carousel").forEach(initCarousel);

function loadInstagramEmbedScript(onReady) {
  if (!document.getElementById("ig-embed-script")) {
    const script = document.createElement("script");
    script.id = "ig-embed-script";
    script.async = true;
    script.src = "https://www.instagram.com/embed.js";
    document.body.appendChild(script);
  }
  const startedAt = Date.now();
  (function poll() {
    if (window.instgrm) {
      onReady();
      return;
    }
    if (Date.now() - startedAt > 8000) {
      onReady(new Error("timeout"));
      return;
    }
    window.setTimeout(poll, 150);
  })();
}

document.querySelectorAll(".ig-feed-card").forEach((card) => {
  const btn = card.querySelector(".ig-feed-load-btn");
  btn?.addEventListener("click", () => {
    const url = card.dataset.igUrl;
    card.innerHTML = `<blockquote class="instagram-media" data-instgrm-permalink="${url}" data-instgrm-version="14" style="margin:0; width:100%;"></blockquote>`;
    loadInstagramEmbedScript((err) => {
      if (err || !window.instgrm) {
        card.innerHTML = `<p class="ig-feed-fallback">Beitrag konnte nicht geladen werden (evtl. durch Tracking-Schutz im Browser blockiert).<br><a href="${url}" target="_blank" rel="noopener">Direkt auf Instagram ansehen</a></p>`;
        return;
      }
      window.instgrm.Embeds.process();
    });
  });
});

const mapLoadBtn = document.getElementById("map-load-btn");
mapLoadBtn?.addEventListener("click", () => {
  const wrap = document.getElementById("map-embed");
  const iframe = document.createElement("iframe");
  iframe.src = "https://www.google.com/maps?q=Hermann-Rothert-Str.+7,+33335+G%C3%BCtersloh&output=embed";
  iframe.loading = "lazy";
  iframe.referrerPolicy = "no-referrer-when-downgrade";
  iframe.title = "Google Maps: Hermann-Rothert-Str. 7, 33335 Gütersloh";
  wrap.innerHTML = "";
  wrap.appendChild(iframe);
});
