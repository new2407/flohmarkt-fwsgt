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
