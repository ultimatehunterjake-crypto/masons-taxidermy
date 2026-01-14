// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile nav
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  // Close menu when clicking a link
  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Portfolio filtering
const chips = document.querySelectorAll(".chip");
const items = document.querySelectorAll(".gallery-item");

chips.forEach(chip => {
  chip.addEventListener("click", () => {
    chips.forEach(c => c.classList.remove("is-active"));
    chip.classList.add("is-active");

    const filter = chip.dataset.filter;
    items.forEach(item => {
      const tags = (item.dataset.tags || "").split(" ");
      const show = filter === "all" || tags.includes(filter);
      item.style.display = show ? "" : "none";
    });
  });
});

// Lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox?.querySelector("img");
const lightboxCap = lightbox?.querySelector(".lightbox-caption");
const lightboxClose = lightbox?.querySelector(".lightbox-close");

function openLightbox(src, caption, alt) {
  if (!lightbox || !lightboxImg || !lightboxCap) return;
  lightboxImg.src = src;
  lightboxImg.alt = alt || "";
  lightboxCap.textContent = caption || "";
  lightbox.style.display = "flex";
  lightbox.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.style.display = "none";
  lightbox.setAttribute("aria-hidden", "true");
  if (lightboxImg) lightboxImg.src = "";
}

items.forEach(item => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img");
    const cap = item.querySelector("figcaption")?.textContent || "";
    if (!img) return;
    openLightbox(img.src, cap, img.alt);
  });
});

lightboxClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

// Mailto quote fallback
const mailtoForm = document.getElementById("mailtoForm");
mailtoForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(mailtoForm);
  const name = data.get("name") || "";
  const email = data.get("email") || "";
  const phone = data.get("phone") || "";
  const service = data.get("service") || "";
  const notes = data.get("notes") || "";

  const subject = encodeURIComponent(`Quote Request - ${service}`);
  const body = encodeURIComponent(
`Name: ${name}
Email: ${email}
Phone: ${phone}
Service: ${service}

Notes:
${notes}
`
  );

  // TODO: Replace with your friend's email
  const to = "youremail@example.com";
  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
});
