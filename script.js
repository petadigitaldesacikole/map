// =========================
// KONFIGURASI
// =========================
const MYMAPS_VIEW_URL =
  //"https://www.google.com/maps/d/view?mid=1KMh-f0QgPbGPkGZ00jRBO8JHDK0EVYU";
  "https://www.google.com/maps/d/view?mid=1dh3WJEh3RtB0k-XdLYt4yY5ve7ofYIk&usp=sharing";

// =========================
// HELPER
// =========================
const el = (q) => document.querySelector(q);
const els = (q) => Array.from(document.querySelectorAll(q));

const state = { filter: "all", query: "", data: [] };
state.data = [
  {
    id: "1",
    layer: "lingkungan",
    nama: "Bank Sampah Desa Cikole",
    desc: "Pengelolaan sampah terpadu milik desa",
    owner: "BUMDes Cikole",
    alamat: "Dusun Cikole RT 02 RW 01",
    lat: -6.808514250784063,
    lng: 107.93639078109223,
    foto: "assets/bank sampah cikole.jpg",
    whatsapp: "6283115872194"
  },
  {
    id: "12",
    layer: "umkm",
    nama: "Kuda Ekem",
    desc: "Kuda renggong RW 01 RT 04. Terdapat dua kuda, salah satunya kuda silat.",
    owner: "Teh Susi",
    alamat: "RW 01 RT 04 Desa Cikole",
    lat: -6.8076705,
    lng: 107.9367253,
    foto: "assets/umkm-default.jpg",
    whatsapp: ""
  },
  {
    id: "2",
    layer: "umkm",
    nama: "Makroni Bi Nana",
    desc: "Produksi makroni kering sejak 2016 dengan berbagai tingkat kepedasan.",
    owner: "Ibu Ratna",
    alamat: "Desa Cikole",
    lat: -6.8060202,
    lng: 107.9333946,
    foto: "assets/umkm-default.jpg",
    whatsapp: ""
  },
  {
    id: "3",
    layer: "umkm",
    nama: "MADE SNACK",
    desc: "Produksi kicimpring, rangining, comring, dan opak genar.",
    owner: "Ibu Dede",
    alamat: "Desa Cikole",
    lat: -6.8065729,
    lng: 107.9338919,
    foto: "assets/umkm-default.jpg",
    whatsapp: ""
  },
  {
    id: "4",
    layer: "umkm",
    nama: "Keripik 3 Putra",
    desc: "Produksi kicimpring, rangining, comring, dan opak genar.",
    owner: "Ibu Upit",
    alamat: "Desa Cikole",
    lat: -6.8063375,
    lng: 107.9339093,
    foto: "assets/umkm-default.jpg",
    whatsapp: ""
  },
  {
    id: "5",
    layer: "umkm",
    nama: "Cuangki Cikole",
    desc: "Produksi cuangki rumahan di sekitar posko.",
    owner: "-",
    alamat: "Desa Cikole",
    lat: -6.8041789,
    lng: 107.9314286,
    foto: "assets/umkm-default.jpg",
    whatsapp: ""
  },
  {
    id: "6",
    layer: "umkm",
    nama: "Budidaya Jamur",
    desc: "Budidaya jamur tiram putih dan coklat oleh kelompok tani.",
    owner: "Pak RT",
    alamat: "Desa Cikole",
    lat: -6.8045404,
    lng: 107.9315969,
    foto: "assets/umkm-default.jpg",
    whatsapp: ""
  },
  {
    id: "7",
    layer: "umkm",
    nama: "Puding Nagen",
    desc: "Produksi aneka puding rumahan.",
    owner: "Ai Hapsari",
    alamat: "Desa Cikole",
    lat: -6.80476,
    lng: 107.931636,
    foto: "assets/umkm-default.jpg",
    whatsapp: ""
  },
  {
    id: "8",
    layer: "umkm",
    nama: "Gula Abah",
    desc: "Produksi gula aren tradisional.",
    owner: "Abah",
    alamat: "Desa Cikole",
    lat: -6.8067636,
    lng: 107.9356242,
    foto: "assets/umkm-default.jpg",
    whatsapp: ""
  },
  {
    id: "9",
    layer: "umkm",
    nama: "Keripik Judes",
    desc: "Produksi keripik judes dengan 3 varian rasa.",
    owner: "Yuyus (Devi)",
    alamat: "Desa Cikole",
    lat: -6.8092565,
    lng: 107.9322353,
    foto: "assets/umkm-default.jpg",
    whatsapp: ""
  },
  {
    id: "10",
    layer: "umkm",
    nama: "Pindang",
    desc: "Produksi pindang rumahan.",
    owner: "Pemilik UMKM",
    alamat: "Desa Cikole",
    lat: -6.8082291,
    lng: 107.9376064,
    foto: "assets/umkm-default.jpg",
    whatsapp: "6285323205793"
  },
  {
    id: "11",
    layer: "umkm",
    nama: "Rindu Cookies",
    desc: "Produksi cookies rumahan.",
    owner: "Suryati",
    alamat: "Desa Cikole",
    lat: -6.8048364,
    lng: 107.9333028,
    foto: "assets/umkm-default.jpg",
    whatsapp: ""
  },
  {
    id: "12",
    layer: "umkm",
    nama: "Getuk Bu Yuyun",
    desc: "Produksi getuk singkong tradisional.",
    owner: "Ibu Yuyun",
    alamat: "Desa Cikole",
    lat: -6.808623,
    lng: 107.933485,
    foto: "assets/umkm-default.jpg",
    whatsapp: ""
  }
];


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
    "Mengambil data dari Google Sheets…",
    "Menyiapkan daftar potensi…",
    "Hampir selesai…",
  ];

  const total = 4000;
  const start = Date.now();
  let lastStep = -1;

  function tick() {
    const elapsed = Date.now() - start;
    const progress = Math.min(1, elapsed / total);

    if (bar) bar.style.width = `${Math.round(progress * 100)}%`;

    const stepIndex = Math.min(steps.length - 1, Math.floor(progress * steps.length));
    if (stepIndex !== lastStep) {
      lastStep = stepIndex;
      if (note) note.textContent = steps[stepIndex];
    }

    if (progress < 1) requestAnimationFrame(tick);
    else {
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

function parseGvizJson(text) {
  // GViz response bukan JSON murni, tapi JS wrapper:
  // google.visualization.Query.setResponse(<json>);
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end < 0) throw new Error("Format GViz tidak valid");
  const jsonStr = text.slice(start, end + 1);
  return JSON.parse(jsonStr);
}

function safeNum(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function rowToObj(cols, row) {
  // cols: daftar header dari sheet
  // row: array values
  const obj = {};
  cols.forEach((k, i) => (obj[k] = row[i]));
  return obj;
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
    const okFilter = state.filter === "all" ? true : d.layer === state.filter;
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
function syncFilterFromDOM() {
  const active = document.querySelector(".pill.active");
  if (!active) return;
  state.filter = active.dataset.filter || "all";
}

// =========================
// MAP UX (LOCK/UNLOCK)
// =========================
function initMapUX() {
  const frame = el("#mymapsFrame");
  const skeleton = el("#mapSkeleton");
  const statusText = el("#statusText");
  const btnToggle = el("#btnFocusVillage");
  const btnFullscreen = el("#btnFullscreen");
  if (!frame) return;

  let interactive = false; // default terkunci

  function syncToggleUI() {
    if (!btnToggle) return;
    btnToggle.setAttribute("aria-pressed", interactive ? "true" : "false");
    btnToggle.textContent = interactive ? "🔓" : "🔒";
    btnToggle.title = interactive ? "Peta terbuka (klik untuk kunci)" : "Peta terkunci (klik untuk buka)";
    frame.classList.toggle("interactive", interactive);
  }
  syncToggleUI();

  frame.addEventListener("load", () => {
    if (skeleton) skeleton.style.display = "none";
    frame.classList.add("loaded");
    if (statusText) statusText.textContent = "Peta siap digunakan";
  });

  btnToggle?.addEventListener("click", () => {
    interactive = !interactive;
    syncToggleUI();
    toast(interactive ? "Peta dibuka" : "Peta dikunci");
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
// =======================================
// FINAL: KLIK ITEM LIST → POPUP DETAIL
// =======================================
(function initPotensiClick() {
  const list = document.getElementById("potensiList");
  if (!list) return;

  list.addEventListener("click", function (e) {
    const item = e.target.closest(".item");
    if (!item) return;

    // ❗ kalau klik tombol/link, jangan buka popup
    if (e.target.closest("a")) return;

    const title = item.querySelector(".title")?.innerText?.trim();
    if (!title) return;

    const data = state.data.find(d => d.nama === title);
    if (!data) {
      console.warn("Data tidak ditemukan:", title);
      return;
    }

    openPotensiDetail(data);
  });
})();

// =========================
// TOPBAR HEIGHT SYNC
// =========================
function syncTopbarHeight() {
  const topbar = el(".topbar");
  if (!topbar) return;
  const h = topbar.getBoundingClientRect().height;
  document.documentElement.style.setProperty("--topbar-h", `${Math.ceil(h)}px`);
}

// =========================
// INIT
// =========================
function initTopLinks() {
  const a = el("#btnOpenMaps");
  if (a) a.href = MYMAPS_VIEW_URL;
}


async function main() {
  initSplash();

  initTopLinks();
  initFilters();
  initSearch();
  initShuffle();
  initMapUX();
  initModal();

  syncFilterFromDOM(); // 🔥 INI KUNCINYA
  renderList();

  syncTopbarHeight();

}

// =======================================
// EXTENSION: KLIK LIST → DETAIL POTENSI
// (TIDAK MENGUBAH KODE LAMA)
// =======================================



// =======================================
// MODAL DETAIL (DINAMIS)
// =======================================

function openDetailModal(data) {
  let modal = document.getElementById("detailModal");

  if (!modal) {
    modal = document.createElement("div");
    modal.id = "detailModal";
    modal.innerHTML = `
      <div class="modal-backdrop"></div>
      <div class="modal-card">
        <div class="modal-head">
          <h3 id="detailTitle"></h3>
          <button id="closeDetail">✕</button>
        </div>
        <div class="modal-body">
          <p id="detailCategory"></p>
          <p id="detailDesc"></p>
          <a id="detailMaps" target="_blank" class="chip primary">
            📍 Buka di Google Maps
          </a>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector("#closeDetail").onclick =
      modal.querySelector(".modal-backdrop").onclick =
        () => modal.remove();
  }

  modal.querySelector("#detailTitle").innerText = data.nama;
  modal.querySelector("#detailCategory").innerText =
    "Kategori: " + data.kategori;
  modal.querySelector("#detailDesc").innerText = data.deskripsi;

  if (data.lat && data.lng) {
    modal.querySelector("#detailMaps").href =
      `https://www.google.com/maps?q=${data.lat},${data.lng}`;
  } else {
    modal.querySelector("#detailMaps").style.display = "none";
  }
}
// =======================================
// EXTENSION: KLIK ITEM LIST → DETAIL
// TANPA MENGUBAH KODE LAMA
// =======================================

function openPotensiDetail(d) {
  let modal = document.getElementById("potensiDetailModal");
  if (modal) modal.remove();

  modal = document.createElement("div");
  modal.id = "potensiDetailModal";
  modal.className = "modal show";

  modal.innerHTML = `
    <div class="modal-backdrop"></div>
    <div class="modal-card detail-card">
      <div class="modal-head">
        <h3>${d.nama}</h3>
        <button class="icon-btn" id="closeDetail">✕</button>
      </div>

      <div class="modal-body detail-body">
  <img src="${d.foto}" class="detail-img" alt="${d.nama}" />

  <div class="detail-grid">
    <div>
      <p class="label">Pemilik</p>
      <p>${d.owner}</p>
    </div>
    <div>
      <p class="label">Alamat</p>
      <p>${d.alamat}</p>
    </div>
    <div>
      <p class="label">Deskripsi</p>
      <p>${d.desc}</p>
    </div>
  </div>

  <div class="detail-actions">
  <a href="https://www.google.com/maps?q=${d.lat},${d.lng}"
     target="_blank"
     class="chip primary">
     📍 Buka Lokasi
  </a>

  ${
    d.whatsapp
      ? `<a href="https://wa.me/${d.whatsapp}"
           target="_blank"
           class="chip wa">
           💬 WhatsApp
         </a>`
      : ""
  }
</div>

</div>

    </div>
  `;
  
  
  document.body.appendChild(modal);

  modal.querySelector(".modal-backdrop").onclick =
  modal.querySelector("#closeDetail").onclick =
    () => modal.remove();
}
function syncDefaultFilter() {
  const btnAll = document.querySelector('.pill[data-filter="all"]');
  if (!btnAll) return;

  document.querySelectorAll(".pill").forEach(b => b.classList.remove("active"));
  btnAll.classList.add("active");
  state.filter = "all";
}


main();
