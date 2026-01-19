// =========================
// KONFIGURASI
// =========================
const MYMAPS_VIEW_URL =
  "https://www.google.com/maps/d/view?mid=1KMh-f0QgPbGPkGZ00jRBO8JHDK0EVYU";

// Data dummy (siap diganti Google Sheets)
const DATA = [
  {
    id: "1",
    layer: "lingkungan",
    nama: "Bank Sampah Desa Cikole",
    desc: "Pusat pengumpulan dan pemilahan sampah warga untuk mendukung zero waste.",
    lat: -6.000000,
    lng: 107.000000
  },
  {
    id: "2",
    layer: "umkm",
    nama: "UMKM Ranginang Desa Cikole",
    desc: "Usaha olahan makanan ringan, berpotensi dikembangkan untuk pemasaran digital.",
    lat: -6.000500,
    lng: 107.000300
  },
  {
    id: "3",
    layer: "fasilitas",
    nama: "Balai Desa Cikole",
    desc: "Pusat kegiatan pelayanan publik dan koordinasi kegiatan desa.",
    lat: -6.000300,
    lng: 107.000100
  }
];

// =========================
// HELPER
// =========================
const el = (q) => document.querySelector(q);
const els = (q) => Array.from(document.querySelectorAll(q));

const state = {
  filter: "all",
  query: "",
  data: [...DATA]
};

function normalize(s) {
  return (s || "").toString().toLowerCase().trim();
}

function toGoogleMapsLink(lat, lng) {
  const q = encodeURIComponent(`${lat},${lng}`);
  return `https://www.google.com/maps?q=${q}`;
}

// =========================
// TOAST
// =========================
function toast(msg) {
  const t = el("#toast");
  if (!t) return;

  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => t.classList.remove("show"), 1600);
}

// =========================
// SPLASH SCREEN (4 DETIK)
// =========================
function initSplash() {
  const splash = el("#splash");
  const bar = el("#splashBar");
  const note = el("#splashNote");

  if (!splash) return;

  document.body.classList.add("is-splash");

  const steps = [
    "Menyiapkan tampilan…",
    "Memuat komponen peta…",
    "Menyiapkan daftar potensi…",
    "Hampir selesai…"
  ];

  const total = 4000;
  const start = Date.now();
  let lastStep = -1;

  function tick() {
    const elapsed = Date.now() - start;
    const progress = Math.min(1, elapsed / total);

    if (bar) bar.style.width = `${Math.round(progress * 100)}%`;

    const stepIndex = Math.min(
      steps.length - 1,
      Math.floor(progress * steps.length)
    );

    if (stepIndex !== lastStep) {
      lastStep = stepIndex;
      if (note) note.textContent = steps[stepIndex];
    }

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      splash.classList.add("hide");
      splash.setAttribute("aria-hidden", "true");

      setTimeout(() => {
        splash.remove();
        document.body.classList.remove("is-splash");
      }, 600);
    }
  }

  requestAnimationFrame(tick);
}

// =========================
// LIST & FILTER
// =========================
function badgeLabel(layer) {
  if (layer === "lingkungan") return "Lingkungan";
  if (layer === "umkm") return "UMKM";
  if (layer === "fasilitas") return "Fasilitas";
  if (layer === "infrastruktur") return "Infrastruktur";
  return "Potensi";
}

function applyFilters(data) {
  const q = normalize(state.query);
  return data.filter((d) => {
    const okFilter =
      state.filter === "all" ? true : d.layer === state.filter;
    const hay = normalize(`${d.nama} ${d.desc} ${badgeLabel(d.layer)}`);
    const okQuery = q ? hay.includes(q) : true;
    return okFilter && okQuery;
  });
}

function renderList() {
  const container = el("#potensiList");
  const count = el("#resultCount");
  if (!container) return;

  const filtered = applyFilters(state.data);
  if (count) count.textContent = `${filtered.length} hasil`;

  if (!filtered.length) {
    container.innerHTML = `
      <div class="empty">
        Tidak ada hasil untuk pencarian/filter ini.<br/>
        Coba kata kunci lain atau pilih kategori <b>Semua</b>.
      </div>`;
    return;
  }

  container.innerHTML = filtered
    .map((d) => {
      const gmaps = toGoogleMapsLink(d.lat, d.lng);
      return `
        <div class="item">
          <div class="item-top">
            <div>
              <p class="title">${d.nama}</p>
              <p class="desc">${d.desc}</p>
            </div>
            <span class="badge">${badgeLabel(d.layer)}</span>
          </div>
          <div class="item-actions">
            <a class="small-btn primary" href="${gmaps}" target="_blank" rel="noopener">📍 Buka Lokasi</a>
            <a class="small-btn" href="${gmaps}" target="_blank" rel="noopener">🧭 Navigasi</a>
          </div>
        </div>`;
    })
    .join("");
}

function initFilters() {
  els(".pill").forEach((btn) => {
    btn.addEventListener("click", () => {
      els(".pill").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      state.filter = btn.dataset.filter || "all";
      renderList();
    });
  });
}

function initSearch() {
  const input = el("#searchInput");
  const clear = el("#clearSearch");
  if (!input || !clear) return;

  input.addEventListener("input", () => {
    state.query = input.value;
    renderList();
  });

  clear.addEventListener("click", () => {
    input.value = "";
    state.query = "";
    renderList();
    input.focus();
  });
}

function initShuffle() {
  const btn = el("#btnShuffle");
  if (!btn) return;

  btn.addEventListener("click", () => {
    state.data = [...state.data].sort(() => Math.random() - 0.5);
    renderList();
    toast("Daftar diacak");
  });
}

// =========================
// MAP UX
// =========================
function initMapUX() {
  const frame = el("#mymapsFrame");
  const skeleton = el("#mapSkeleton");
  const statusText = el("#statusText");
  const btnToggle = el("#btnFocusVillage");
  const btnFullscreen = el("#btnFullscreen");

  if (!frame) return;

  let interactive = false;

  function syncToggleUI() {
    if (!btnToggle) return;
    btnToggle.setAttribute("aria-pressed", interactive ? "true" : "false");
    btnToggle.title = interactive
      ? "Matikan interaksi peta"
      : "Aktifkan interaksi peta";
  }
  syncToggleUI();

  frame.addEventListener("load", () => {
    if (skeleton) skeleton.style.display = "none";
    frame.classList.add("loaded");
    if (statusText) statusText.textContent = "Peta siap digunakan";
  });

  btnToggle?.addEventListener("click", () => {
    interactive = !interactive;
    frame.classList.toggle("interactive", interactive);
    syncToggleUI();
    toast(interactive ? "Interaksi peta: ON" : "Interaksi peta: OFF");
  });

  btnFullscreen?.addEventListener("click", async () => {
    const shell = el(".map-shell");
    try {
      if (!document.fullscreenElement) {
        await shell?.requestFullscreen?.();
        toast("Mode fullscreen");
      } else {
        await document.exitFullscreen?.();
      }
    } catch {
      toast("Fullscreen tidak didukung");
    }
  });
}

// =========================
// MODAL
// =========================
function initModal() {
  const modal = el("#tipsModal");
  const openBtn = el("#btnTips");
  if (!modal || !openBtn) return;

  const closeBtn = modal.querySelector("[data-close]");

  function open() {
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    setTimeout(() => closeBtn?.focus(), 0);
  }

  function close() {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    openBtn.focus();
  }

  openBtn.addEventListener("click", open);
  modal.addEventListener("click", (e) => {
    if (e.target.matches("[data-close]")) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) close();
  });
}

// =========================
// TOPBAR HEIGHT SYNC
// =========================
function syncTopbarHeight() {
  const topbar = el(".topbar");
  if (!topbar) return;
  const h = topbar.getBoundingClientRect().height;
  document.documentElement.style.setProperty(
    "--topbar-h",
    `${Math.ceil(h)}px`
  );
}

// =========================
// INIT
// =========================
function initTopLinks() {
  const a = el("#btnOpenMaps");
  if (a) a.href = MYMAPS_VIEW_URL;
}

function main() {
  initSplash(); // splash 4 detik

  initTopLinks();
  initFilters();
  initSearch();
  initShuffle();
  initMapUX();
  initModal();
  renderList();

  syncTopbarHeight();
  window.addEventListener("resize", syncTopbarHeight);
  window.addEventListener("load", syncTopbarHeight);
}

main();
