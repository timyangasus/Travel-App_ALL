/* ═══════════════════════════════════════
   旅遊誌 — Application Logic
   app.js
═══════════════════════════════════════ */

/* ─── SVG Icon Strings ─── */
const EDIT_SVG  = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>`;
const DEL_SVG   = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>`;
const MINUS_SVG = `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93ZM280-440h400v-80H280v80Z"/></svg>`;

const EXPENSE_CATS = [
  { label: "餐飲", color: "#C99A6A", svg: `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#C99A6A"><path d="M240-80v-366q-54-14-87-57t-33-97v-280h80v240h40v-240h80v240h40v-240h80v280q0 54-33 97t-87 57v366h-80Zm400 0v-381q-54-18-87-75.5T520-667q0-89 47-151t113-62q66 0 113 62.5T840-666q0 73-33 130t-87 75v381h-80Z"/></svg>` },
  { label: "交通", color: "#A1A75E", svg: `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#A1A75E"><path d="M160-340v-380q0-53 27.5-84.5t72.5-48q45-16.5 102.5-22T480-880q66 0 124.5 5.5t102 22q43.5 16.5 68.5 48t25 84.5v380q0 59-40.5 99.5T660-200l60 60v20h-80l-80-80H400l-80 80h-80v-20l60-60q-59 0-99.5-40.5T160-340Zm320-460q-106 0-155 12.5T258-760h448q-15-17-64.5-28.5T480-800ZM240-560h200v-120H240v120Zm420 80H240h480-60Zm-140-80h200v-120H520v120ZM383-337q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17Zm280 0q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17Zm-363 57h360q26 0 43-17t17-43v-140H240v140q0 26 17 43t43 17Zm180-480h226-448 222Z"/></svg>` },
  { label: "購物", color: "#6B9BCE", svg: `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#6B9BCE"><path d="m240-522-40 22q-14 8-30 4t-24-18L66-654q-8-14-4-30t18-24l230-132h70q9 0 14.5 5.5T400-820v20q0 33 23.5 56.5T480-720q33 0 56.5-23.5T560-800v-20q0-9 5.5-14.5T580-840h70l230 132q14 8 18 24t-4 30l-80 140q-8 14-23.5 17.5T760-501l-40-20v361q0 17-11.5 28.5T680-120H280q-17 0-28.5-11.5T240-160v-362Zm80-134v456h320v-456l124 68 42-70-172-100q-15 51-56.5 84.5T480-640q-56 0-97.5-33.5T326-758L154-658l42 70 124-68Zm160 177Z"/></svg>` },
  { label: "住宿", color: "#72A275", svg: `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#72A275"><path d="M40-200v-600h80v400h320v-320h320q66 0 113 47t47 113v360h-80v-120H120v120H40Zm155-275q-35-35-35-85t35-85q35-35 85-35t85 35q35 35 35 85t-35 85q-35 35-85 35t-85-35Zm325 75h320v-160q0-33-23.5-56.5T760-640H520v240ZM308.5-531.5Q320-543 320-560t-11.5-28.5Q297-600 280-600t-28.5 11.5Q240-577 240-560t11.5 28.5Q263-520 280-520t28.5-11.5ZM280-560Zm240-80v240-240Z"/></svg>` },
  { label: "票券", color: "#B77976", svg: `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#B77976"><path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm0-160q17 0 28.5-11.5T520-480q0-17-11.5-28.5T480-520q-17 0-28.5 11.5T440-480q0 17 11.5 28.5T480-440Zm0-160q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm320 440H160q-33 0-56.5-23.5T80-240v-160q33 0 56.5-23.5T160-480q0-33-23.5-56.5T80-560v-160q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v160q-33 0-56.5 23.5T800-480q0 33 23.5 56.5T880-400v160q0 33-23.5 56.5T800-160Zm0-80v-102q-37-22-58.5-58.5T720-480q0-43 21.5-79.5T800-618v-102H160v102q37 22 58.5 58.5T240-480q0 43-21.5 79.5T160-342v102h640ZM480-480Z"/></svg>` },
  { label: "其他", color: "#74ADB1", svg: `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#74ADB1"><path d="M880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720Zm-720 80h640v-80H160v80Zm0 160v240h640v-240H160Zm0 240v-480 480Z"/></svg>` },
];


/* ═══════════════════════════════════════
   DATA LAYER
═══════════════════════════════════════ */
const IMGBB_API_KEY = 'cfd268943c3eb02881f5526f3ddf3431';

async function uploadToImgBB(file) {
  const form = new FormData();
  form.append('image', file);
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
    method: 'POST', body: form
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error?.message || 'Upload failed');
  return json.data.image?.url || json.data.display_url || json.data.url;
}

function showUploadStatus(msg) {
  let el = document.getElementById('_upload-status');
  if (!el) {
    el = document.createElement('div');
    el.id = '_upload-status';
    el.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.78);color:#fff;padding:8px 20px;border-radius:20px;font-size:13px;z-index:9999;pointer-events:none;transition:opacity 0.3s';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.style.opacity = msg ? '1' : '0';
}

/* ═══════════════════════════════════════
   MULTI-TRIP DATA LAYER
═══════════════════════════════════════ */
const META_KEY    = 'travel_trace_meta';
const OLD_KEY     = 'travel_journal_v4';
const TRIP_PREFIX = 'travel_trace_trip_';

/* meta: { trips: [ { id, name, startDate, endDate, currency, coverImg } ] } */
let meta = { trips: [] };

/* currently active trip data (same shape as before) */
let data = null;
let currentTripId = null;
let currentDay = 0;
let editingEventId = null;
let _slideshowTimer = null;
const _blobCache = new Map();

function genId() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

/* ─── Load meta list ─── */
function loadMeta() {
  try {
    const s = localStorage.getItem(META_KEY);
    if (s) meta = JSON.parse(s);
    if (!meta.trips) meta.trips = [];
  } catch(e) { meta = { trips: [] }; }

  // migrate old single trip
  migrateOldTrip();
}

function saveMeta() {
  try { localStorage.setItem(META_KEY, JSON.stringify(meta)); } catch(e) {}
}

function migrateOldTrip() {
  const old = localStorage.getItem(OLD_KEY);
  if (!old) return;
  // already migrated?
  const alreadyMigrated = meta.trips.some(t => t.id === 'migrated_v4');
  if (alreadyMigrated) return;
  try {
    const oldData = JSON.parse(old);
    const id = 'migrated_v4';
    const tripName = oldData.settings?.tripName || 'USJ大阪の旅';
    const tripDates = oldData.settings?.tripDates || '';
    const { startDate, endDate } = parseTripDates(tripDates);
    const coverImg = oldData.days?.[0]?.banner?.photos?.[0] || '';
    // push to meta
    meta.trips.unshift({
      id, name: tripName,
      startDate, endDate,
      currency: oldData.settings?.currency || 'TWD',
      coverImg
    });
    saveMeta();
    // save trip data under new key
    localStorage.setItem(TRIP_PREFIX + id, old);
  } catch(e) {}
}

/* ─── Load a specific trip ─── */
function loadTrip(id) {
  currentTripId = id;
  currentDay    = 0;
  try {
    const s = localStorage.getItem(TRIP_PREFIX + id);
    if (s) {
      data = JSON.parse(s);
    } else {
      data = freshTripData();
    }
    // Ensure all fields exist
    while (data.expenses.length < data.days.length) data.expenses.push([]);
    if (!data.flights)   data.flights   = [];
    if (!data.hotels)    data.hotels    = [];
    if (!data.tickets)   data.tickets   = [];
    if (!data.checklist) data.checklist = [];
    if (!data.shopping)  data.shopping  = [];
    if (!data.notes)     data.notes     = '';
    if (!data.maps)      data.maps      = [];
    if (!data.settings)  data.settings  = { tripName: '', budget: 0, currency: 'TWD', theme: 'light' };
    data.days.forEach(d => {
      if (!d.banner) d.banner = { date: '', subtitle: '', photos: [] };
      if (!d.banner.photos) d.banner.photos = [];
    });
  } catch(e) {
    data = freshTripData();
  }
}

function freshTripData() {
  return {
    days: [{ banner: { date: '', subtitle: '', photos: [] }, events: [] }],
    expenses: [[]],
    flights: [], hotels: [], tickets: [], checklist: [], shopping: [],
    notes: '',
    maps: [],
    settings: { tripName: '', budget: 0, currency: 'TWD', theme: 'light' }
  };
}

function save() {
  if (!currentTripId) return;
  try { localStorage.setItem(TRIP_PREFIX + currentTripId, JSON.stringify(data)); } catch(e) {}
  const trip = meta.trips.find(t => t.id === currentTripId);
  if (trip) {
    if (data.settings?.tripName) trip.name = data.settings.tripName;
    if (data.settings?.tripDates) {
      const { startDate, endDate } = _parseTripSheetDates(data.settings.tripDates);
      if (startDate) trip.startDate = _cleanDate(startDate);
      if (endDate)   trip.endDate   = _cleanDate(endDate);
    }
    if (data.settings?.currency) trip.currency = data.settings.currency;
    // coverImg is managed separately via openTripCoverPicker — do NOT auto-sync from banner
  }
  saveMeta();
}

// legacy shim for old load() call at bottom of file
function load() { /* no-op: replaced by loadMeta()+loadTrip() */ }

/* ─── Parse "MM/DD-MM/DD" or "YYYY/MM/DD-YYYY/MM/DD" from settings ─── */
function parseTripDates(str) {
  if (!str) return { startDate: '', endDate: '' };
  const parts = str.split('-');
  return { startDate: parts[0]?.trim() || '', endDate: parts[1]?.trim() || '' };
}

/* ─── Date for Home list display: "MM/DD–MM/DD" ─── */
function tripDateDisplay(trip) {
  let s = trip.startDate || '';
  let e = trip.endDate || '';

  const mmdd = d => {
    if (!d) return '';
    d = d.replace(/[（(][^）)]*[）)]/g, '').trim();
    const m4 = d.match(/\d{4}\/(\d{2})\/(\d{2})/);
    if (m4) return m4[1] + '/' + m4[2];
    const m2 = d.match(/(\d{2})\/(\d{2})/);
    if (m2) return m2[1] + '/' + m2[2];
    return '';
  };

  // If missing endDate, try to get from trip data
  if (s && !e) {
    try {
      const raw = localStorage.getItem(TRIP_PREFIX + trip.id);
      if (raw) {
        const td = JSON.parse(raw);
        const tripDates = td.settings?.tripDates || '';
        if (tripDates) {
          const parts = tripDates.split('–');
          if (parts[1]) e = parts[1].trim();
        }
        if (!e) {
          const dLast = td.days?.[td.days.length - 1]?.banner?.date || '';
          if (dLast) e = dLast;
        }
      }
    } catch(err) {}
  }

  if (s || e) {
    const ms = mmdd(s), me = mmdd(e);
    if (ms && me && ms !== me) return ms + '–' + me;
    return ms || me;
  }

  // Full fallback
  try {
    const raw = localStorage.getItem(TRIP_PREFIX + trip.id);
    if (raw) {
      const td = JSON.parse(raw);
      const tripDates = td.settings?.tripDates || '';
      if (tripDates) {
        const parts = tripDates.split('–');
        return parts.map(p => mmdd(p.trim())).filter(Boolean).join('–');
      }
      const d0 = td.days?.[0]?.banner?.date || '';
      const dLast = td.days?.[td.days.length - 1]?.banner?.date || '';
      const fmt = d => { const m = d.match(/\d{4}\/(\d{2})\/(\d{2})/); return m ? m[1] + '/' + m[2] : ''; };
      if (d0) return fmt(d0) + (dLast && dLast !== d0 ? '–' + fmt(dLast) : '');
    }
  } catch(err) {}
  return '';
}


/* ─── Extract year from trip for year-tab grouping ─── */

/* ─── Extract year from date string ─── */
function tripYear(trip) {
  const d = trip.startDate || trip.endDate || '';
  // Match 4-digit year
  const m = d.match(/(\d{4})/);
  if (m) return parseInt(m[1]);
  // Fallback: check if trip has stored tripDates with banner dates (migrated data)
  // Try to read from trip data
  try {
    const raw = localStorage.getItem(TRIP_PREFIX + trip.id);
    if (raw) {
      const td = JSON.parse(raw);
      // check banner date of day 0 for year
      const bannerDate = td.days?.[0]?.banner?.date || '';
      const bm = bannerDate.match(/(\d{4})/);
      if (bm) return parseInt(bm[1]);
    }
  } catch(e) {}
  return new Date().getFullYear();
}

/* ─── Utility ─── */
function esc(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/* ═══════════════════════════════════════
   TAB NAVIGATION
═══════════════════════════════════════ */
function switchTab(tab) {
  document.querySelectorAll('.page').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.tab-item').forEach(b => b.classList.remove('active'));
  document.getElementById('screen-' + tab).classList.add('active');
  document.getElementById('tab-' + tab).classList.add('active');
  // Hide tab bar on Home, show on all other screens
  const tabBar = document.querySelector('.tab-bar');
  if (tabBar) tabBar.style.display = tab === 'home' ? 'none' : '';
  if (tab === 'home')     renderHome();
  if (tab === 'expense')  renderExpense();
  if (tab === 'info')     renderInfo();
  if (tab === 'settings') renderSettings();
}

/* ═══════════════════════════════════════
   HOME TRIP FILTER
═══════════════════════════════════════ */
// hiddenTripIds stored in meta
function getHiddenTrips() {
  if (!meta.hiddenTrips) meta.hiddenTrips = [];
  return meta.hiddenTrips;
}

function openTripFilterSheet() {
  const hidden = getHiddenTrips();
  const allTrips = [...(meta.trips || [])].sort((a, b) => {
    const parseD = trip => {
      let d = (trip.startDate || '').replace(/[（(][^）)]*[）)]/g, '').trim();
      // Try YYYY/MM/DD
      let m = d.match(/(\d{4})\/(\d{2})\/(\d{2})/);
      if (m) return new Date(+m[1], +m[2]-1, +m[3]);
      // Try MM/DD — use tripYear to get year
      m = d.match(/(\d{2})\/(\d{2})/);
      if (m) return new Date(tripYear(trip), +m[1]-1, +m[2]);
      return new Date(9999,0,1);
    };
    return parseD(a) - parseD(b);
  });
  const list = document.getElementById('trip-filter-list');
  list.innerHTML = allTrips.map(trip => {
    const visible = !hidden.includes(trip.id);
    const dateStr = tripDateDisplay(trip) || '';
    return `<div class="fsheet-row" style="cursor:pointer;align-items:center" onclick="toggleTripFilter('${trip.id}')">
      <div style="flex:1;min-width:0">
        <div style="font-size:15px;color:#C9A84C;font-family:var(--mono);font-weight:700">${esc(dateStr)}</div>
        <div style="font-size:19px;font-weight:700;font-family:var(--mono);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(trip.name||'未命名')}</div>
      </div>
      <span id="tf-cb-${trip.id}" class="info-mod-cb${visible ? ' checked' : ''}">
        <svg viewBox="0 0 10 10" width="10" height="10" style="visibility:${visible?'visible':'hidden'};display:block">
          <polyline points="1.5,5 4,8 8.5,2" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    </div>`;
  }).join('');
  document.getElementById('modal-trip-filter').classList.add('open');
}

function toggleTripFilter(id) {
  const hidden = getHiddenTrips();
  const idx = hidden.indexOf(id);
  const willShow = idx > -1; // currently hidden → will show
  if (idx > -1) hidden.splice(idx, 1);
  else hidden.push(id);
  meta.hiddenTrips = hidden;
  // Update checkbox in place
  const el = document.getElementById('tf-cb-' + id);
  if (el) {
    const showing = !hidden.includes(id);
    el.classList.toggle('checked', showing);
    const svg = el.querySelector('svg');
    if (svg) svg.style.visibility = showing ? 'visible' : 'hidden';
  }
}

function setAllTripFilter(showAll) {
  meta.hiddenTrips = showAll ? [] : (meta.trips||[]).map(t=>t.id);
  saveMeta();
  openTripFilterSheet();
}

function saveTripFilter() {
  saveMeta();
  closeModal('modal-trip-filter');
  renderHome();
}


function syncMetaFromTrips() {
  let changed = false;
  (meta.trips || []).forEach(trip => {
    try {
      const raw = localStorage.getItem(TRIP_PREFIX + trip.id);
      if (!raw) return;
      const td = JSON.parse(raw);
      const s = td.settings || {};

      // Sync name
      if (s.tripName && s.tripName !== trip.name) {
        trip.name = s.tripName;
        changed = true;
      }

      // Sync dates from settings.tripDates (YYYY/MM/DD–MM/DD)
      if (s.tripDates) {
        const { startDate, endDate } = _parseTripSheetDates(s.tripDates);
        if (startDate && startDate !== trip.startDate) { trip.startDate = startDate; changed = true; }
        if (endDate   && endDate   !== trip.endDate)   { trip.endDate   = endDate;   changed = true; }
      }

      // Sync currency
      if (s.currency && s.currency !== trip.currency) {
        trip.currency = s.currency;
        changed = true;
      }

      // coverImg managed separately — do NOT sync from banner photos
    } catch(e) {}
  });

  if (changed) saveMeta();
  return changed;
}

/* ─── Pull-to-refresh ─── */
function initHomePullToRefresh() {
  const screen = document.getElementById('screen-home');
  const indicator = document.getElementById('home-pull-indicator');
  const icon = document.getElementById('home-pull-icon');
  if (!screen || !indicator) return;

  let startY = 0, pulling = false, triggered = false;
  const THRESHOLD = 70;

  screen.addEventListener('touchstart', e => {
    if (screen.scrollTop === 0) {
      startY = e.touches[0].clientY;
      pulling = true;
      triggered = false;
    }
  }, { passive: true });

  screen.addEventListener('touchmove', e => {
    if (!pulling) return;
    const dy = e.touches[0].clientY - startY;
    if (dy <= 0) { pulling = false; return; }
    const clamped = Math.min(dy, THRESHOLD * 1.5);
    indicator.style.height = Math.min(clamped * 0.6, 44) + 'px';
    indicator.style.opacity = Math.min(dy / THRESHOLD, 1);
    icon.style.transform = `rotate(${Math.min(dy / THRESHOLD, 1) * 360}deg)`;
    if (dy >= THRESHOLD && !triggered) triggered = true;
  }, { passive: true });

  screen.addEventListener('touchend', () => {
    if (!pulling) return;
    pulling = false;
    indicator.style.height = '0';
    indicator.style.opacity = '0.5';
    icon.style.transform = 'rotate(0deg)';
    if (triggered) {
      syncMetaFromTrips();
      renderHome();
      showToast('已同步更新');
    }
  });
}


let _homeYear = null; // currently selected year tab
let _tripSheetCurrency = 'TWD';

function renderHome() {
  // Init pull-to-refresh once
  if (!renderHome._ptr) { renderHome._ptr = true; initHomePullToRefresh(); }
  const trips = meta.trips || [];

  // Collect years that have trips
  const years = [...new Set(trips.map(tripYear))].sort((a, b) => a - b);
  const now = new Date().getFullYear();
  // Default to nearest future year, or last year if none future
  if (_homeYear === null || !years.includes(_homeYear)) {
    _homeYear = years.find(y => y >= now) || years[years.length - 1] || now;
  }

  // Render year tabs
  const yearTabsEl = document.getElementById('home-year-tabs');
  if (yearTabsEl) {
    yearTabsEl.innerHTML = years.map(y =>
      `<button class="home-year-tab${y === _homeYear ? ' active' : ''}" onclick="selectHomeYear(${y})">${y}</button>`
    ).join('');
  }

  // Render trip list for selected year
  renderHomeTripList();
}

function selectHomeYear(y) {
  _homeYear = y;
  renderHome();
}

function renderHomeTripList() {
  const el = document.getElementById('home-trip-list');
  if (!el) return;
  const parseStartDate = trip => {
    let d = (trip.startDate || '').replace(/[（(][^）)]*[）)]/g, '').trim();
    // Try YYYY/MM/DD
    const m = d.match(/(\d{4})\/(\d{2})\/(\d{2})/);
    if (m) return new Date(+m[1], +m[2]-1, +m[3]);
    // Try MM/DD (assume current year from tripYear)
    const m2 = d.match(/(\d{2})\/(\d{2})/);
    if (m2) return new Date(tripYear(trip), +m2[1]-1, +m2[2]);
    return new Date(9999, 0, 1); // no date → push to end
  };

  const hidden = getHiddenTrips();
  const trips = (meta.trips || [])
    .filter(t => tripYear(t) === _homeYear && !hidden.includes(t.id))
    .sort((a, b) => parseStartDate(a) - parseStartDate(b));

  if (!trips.length) {
    el.innerHTML = `<div class="home-empty">點右上角 ⋯ 新增行程</div>`;
    return;
  }

  el.innerHTML = '<div class="home-trip-list-topline"></div>' + trips.map(trip => {
    const dateStr = tripDateDisplay(trip) || '';
    const hasImg = !!trip.coverImg;
    const coverBg = hasImg
      ? `background-image:url('${esc(trip.coverImg)}');background-size:cover;background-position:center`
      : `background:#C9A84C`;
    return `
      <div class="home-trip-row" data-id="${trip.id}">
        <div class="home-trip-row-inner" onclick="openTrip('${trip.id}')">
          <div class="home-trip-cover" style="${coverBg}" onclick="event.stopPropagation();openTripCoverPicker('${trip.id}')"></div>
          <div class="home-trip-body" style="margin-left:5px">
            <div class="home-trip-date">${esc(dateStr)}</div>
            <div class="home-trip-name">${esc(trip.name || '未命名行程')}</div>
          </div>
          ${_tripDeleteMode ? `<button class="home-trip-del-x" onclick="event.stopPropagation();confirmDeleteTrip('${trip.id}')">×</button>` : ''}
        </div>
        <div class="home-trip-row-bottom-line"></div>
      </div>`;
  }).join('');

  // Year swipe
  initHomeYearSwipe();
}

function openHomeMoreSheet() {
  document.getElementById('modal-home-more').classList.add('open');
}

let _tripDeleteMode = false;

function toggleTripDeleteMode() {
  _tripDeleteMode = !_tripDeleteMode;
  renderHomeTripList();
  // Exit delete mode when tapping outside or after a delete
}

function confirmDeleteTrip(id) {
  const trip = meta.trips.find(t => t.id === id);
  showConfirm('刪除行程', `確定刪除「${trip?.name || '此行程'}」？此操作無法復原。`, () => {
    deleteTrip(id);
    if (!meta.trips.some(t => tripYear(t) === _homeYear)) {
      _tripDeleteMode = false;
    }
  });
}

let _homeYearSwipeInited = false;
function initHomeYearSwipe() {
  if (_homeYearSwipeInited) return;
  _homeYearSwipeInited = true;
  const screen = document.getElementById('screen-home');
  if (!screen) return;
  let startX = 0, startY = 0;
  screen.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });
  screen.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) < 50 || Math.abs(dy) > Math.abs(dx)) return;
    const years = [...new Set((meta.trips || []).map(tripYear))].sort((a,b) => a-b);
    if (years.length <= 1) return;
    const idx = years.indexOf(_homeYear);
    if (dx < 0 && idx < years.length - 1) {
      _homeYear = years[idx + 1];
      renderHome();
    } else if (dx > 0 && idx > 0) {
      _homeYear = years[idx - 1];
      renderHome();
    }
  }, { passive: true });
}

function deleteTrip(id) {
  meta.trips = meta.trips.filter(t => t.id !== id);
  saveMeta();
  try { localStorage.removeItem(TRIP_PREFIX + id); } catch(e) {}
  if (currentTripId === id) { data = null; currentTripId = null; }
  _tripDeleteMode = false;
  renderHome();
}

function openTrip(id) {
  loadTrip(id);
  // sync currency from meta to data.settings
  const trip = meta.trips.find(t => t.id === id);
  if (trip && data.settings) {
    data.settings.currency = trip.currency || 'TWD';
    data.settings.tripName = trip.name || '';
  }
  // Auto-jump to today
  const today = new Date(); today.setHours(0,0,0,0);
  let matched = false;
  for (let i = 0; i < data.days.length; i++) {
    const d = parseBannerDate(data.days[i].banner.date);
    if (d) { d.setHours(0,0,0,0); if (d.getTime() === today.getTime()) { currentDay = i; matched = true; break; } }
  }
  if (!matched) currentDay = 0;

  renderItinerary();
  renderExpense();
  renderSettings();
  switchTab('itinerary');
  // Clear cached weather and re-fetch for this trip's location
  _liveTemp = '';
  _liveWeatherKey = 'sunny_day';
  _forecastCache = {};
  initWeather();
}

/* ─── Trip Cover Picker ─── */
function openTripCoverPicker(id) {
  const inp = document.createElement('input');
  inp.type = 'file'; inp.accept = 'image/*';
  inp.onchange = async () => {
    const file = inp.files[0]; if (!file) return;
    showUploadStatus('上傳中...');
    try {
      const url = await uploadToImgBB(file);
      const trip = meta.trips.find(t => t.id === id);
      if (trip) { trip.coverImg = url; saveMeta(); }
      renderHome();
    } catch(err) { alert('上傳失敗：' + err.message); }
    finally { showUploadStatus(''); }
  };
  inp.click();
}

/* ─── Trip Sheet ─── */
let _tfCurrencyCode = 'TWD';

function openTripSheet() {
  _tfCurrencyCode = 'TWD';
  document.getElementById('tf-name').value = '';
  document.getElementById('tf-dates').value = '';
  document.getElementById('tf-currency-display').textContent = 'NT$ 新台幣';
  document.getElementById('modal-trip-sheet').classList.add('open');
  setTimeout(() => document.getElementById('tf-name').focus(), 340);
}

function openTripCurrencySheet() {
  openCurrencySheet('trip');
}

function setTripCurrencySheet(code, symbol, label) {
  _tfCurrencyCode = code;
  document.getElementById('tf-currency-display').textContent = symbol + ' ' + label;
  closeModal('modal-trip-currency');
}

function setTripCurrency(code, symbol, label) {
  _tfCurrencyCode = code;
  document.getElementById('tf-currency-display').textContent = symbol + ' ' + label;
  document.getElementById('tf-currency-dropdown')?.classList.remove('open');
}

function fmtTripSheetDates(el) {
  const digits = el.value.replace(/\D/g, '').slice(0, 12);
  const len = digits.length;
  if (len === 0) { el.value = ''; return; }

  const y = digits.slice(0, 4);
  const mo = digits.slice(4, 6);
  const d1 = digits.slice(6, 8);
  const mo2 = digits.slice(8, 10);
  const d2 = digits.slice(10, 12);

  // Auto-zero month (position 5): if first digit of month > 1, prepend 0
  if (len === 5 && parseInt(digits[4]) > 1) {
    el.value = y + '/0' + digits[4] + '/';
    return;
  }
  // Auto-zero day1 (position 7): if first digit of day > 3, prepend 0
  if (len === 7 && parseInt(digits[6]) > 3) {
    el.value = y + '/' + mo + '/0' + digits[6] + '–';
    return;
  }
  // Auto-zero month2 (position 9): if first digit > 1, prepend 0
  if (len === 9 && parseInt(digits[8]) > 1) {
    el.value = y + '/' + mo + '/' + d1 + '–0' + digits[8] + '/';
    return;
  }
  // Auto-zero day2 (position 11): if first digit > 3, prepend 0
  if (len === 11 && parseInt(digits[10]) > 3) {
    el.value = y + '/' + mo + '/' + d1 + '–' + mo2 + '/0' + digits[10];
    return;
  }

  let result = '';
  if (len <= 4)       result = y;
  else if (len <= 6)  result = y + '/' + mo;
  else if (len <= 8)  result = y + '/' + mo + '/' + d1;
  else if (len <= 10) result = y + '/' + mo + '/' + d1 + '–' + mo2;
  else                result = y + '/' + mo + '/' + d1 + '–' + mo2 + '/' + d2;
  el.value = result;
}

function _cleanDate(d) {
  if (!d) return '';
  d = d.replace(/[（(][^）)]*[）)]/g, '').trim();
  const m = d.match(/(\d{4}\/\d{2}\/\d{2})/);
  return m ? m[1] : d;
}

function _parseTripSheetDates(raw) {
  // Parse "YYYY/MM/DD–MM/DD" → { startDate, endDate, days }
  const parts = raw.split('–');
  const startStr = parts[0]?.trim() || '';
  const endStr   = parts[1]?.trim() || '';
  if (!startStr) return { startDate: '', endDate: '', days: 1 };

  // Parse start: YYYY/MM/DD
  const sm = startStr.match(/(\d{4})\/(\d{2})\/(\d{2})/);
  if (!sm) return { startDate: startStr, endDate: endStr, days: 1 };
  const startDate = new Date(parseInt(sm[1]), parseInt(sm[2])-1, parseInt(sm[3]));

  if (!endStr) return { startDate: startStr, endDate: '', days: 1 };

  // Parse end: MM/DD (same year)
  const em = endStr.match(/(\d{2})\/(\d{2})/);
  if (!em) return { startDate: startStr, endDate: endStr, days: 1 };
  const endDate = new Date(parseInt(sm[1]), parseInt(em[1])-1, parseInt(em[2]));

  // If end month < start month, assume next year
  if (endDate < startDate) endDate.setFullYear(endDate.getFullYear() + 1);

  const diffMs = endDate - startDate;
  const days = Math.max(1, Math.round(diffMs / 86400000) + 1);

  const fmt = d => `${d.getFullYear()}/${String(d.getMonth()+1).padStart(2,'0')}/${String(d.getDate()).padStart(2,'0')}`;
  return { startDate: fmt(startDate), endDate: fmt(endDate), days };
}

function saveTripSheet() {
  const name = document.getElementById('tf-name').value.trim();
  const datesRaw = document.getElementById('tf-dates').value.trim();
  if (!name) { document.getElementById('tf-name').focus(); return; }

  const { startDate, endDate, days } = _parseTripSheetDates(datesRaw);

  const id = genId();
  const newTrip = { id, name, startDate, endDate, currency: _tfCurrencyCode, coverImg: '' };
  meta.trips.push(newTrip);
  saveMeta();

  // Create trip data with correct number of days
  const tripData = freshTripData();
  tripData.settings.tripName  = name;
  tripData.settings.currency  = _tfCurrencyCode;
  tripData.settings.tripDates = datesRaw;

  // Generate day entries based on date range
  tripData.days = [];
  tripData.expenses = [];
  const start = startDate ? new Date(startDate.replace(/\//g, '-')) : null;
  for (let i = 0; i < days; i++) {
    let dateStr = '';
    if (start) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      const wd = ['日','一','二','三','四','五','六'][d.getDay()];
      dateStr = `${d.getFullYear()}/${String(d.getMonth()+1).padStart(2,'0')}/${String(d.getDate()).padStart(2,'0')}（${wd}）`;
    }
    tripData.days.push({ banner: { date: dateStr, subtitle: '', photos: [] }, events: [] });
    tripData.expenses.push([]);
  }

  localStorage.setItem(TRIP_PREFIX + id, JSON.stringify(tripData));
  closeModal('modal-trip-sheet');
  openTrip(id);
  showToast(`行程已建立，共 ${days} 天`);
}

/* ═══════════════════════════════════════
   INFO MODULES CUSTOMIZATION
═══════════════════════════════════════ */
const INFO_MODULE_DEFS = [
  { id: 'flight',    label: '機票' },
  { id: 'hotel',     label: '飯店' },
  { id: 'shopping',  label: '購物清單' },
  { id: 'ticket',    label: '票券' },
  { id: 'checklist', label: '待辦清單' },
  { id: 'notes',     label: '備忘錄' },
  { id: 'photo',     label: '相片' },
  { id: 'map',       label: '地圖' },
];

const DEFAULT_MODULES = ['flight','hotel','shopping','ticket','checklist','notes','photo'];

function getInfoModules() {
  if (!data) return DEFAULT_MODULES;
  if (!data.settings.infoModules) data.settings.infoModules = [...DEFAULT_MODULES];
  return data.settings.infoModules;
}

function renderInfoGrid() {
  if (!data) return;
  const modules = getInfoModules();
  INFO_MODULE_DEFS.forEach(m => {
    const btn = document.getElementById('info-btn-' + m.id);
    if (btn) btn.style.display = modules.includes(m.id) ? '' : 'none';
  });
}

function openInfoCustomSheet() {
  const modules = getInfoModules();
  const list = document.getElementById('info-custom-list');

  if (!list.dataset.built) {
    list.dataset.built = '1';
    list.innerHTML = INFO_MODULE_DEFS.map(m => {
      const checked = modules.includes(m.id);
      return `<div class="fsheet-row" onclick="toggleInfoModule('${m.id}')" style="cursor:pointer">` +
        `<span class="fsheet-label" style="font-size:18px;white-space:nowrap;font-weight:700;color:#1A1A1A">${m.label}</span>` +
        `<span id="info-mod-check-${m.id}" class="info-mod-cb${checked ? ' checked' : ''}">` +
          `<svg viewBox="0 0 10 10" width="10" height="10" style="visibility:${checked ? 'visible' : 'hidden'};display:block">` +
            `<polyline points="1.5,5 4,8 8.5,2" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>` +
          `</svg>` +
        `</span>` +
        `</div>`;
    }).join('');
  }

  // Always sync visual state (handles switching trips)
  INFO_MODULE_DEFS.forEach(m => {
    const el = document.getElementById('info-mod-check-' + m.id);
    if (!el) return;
    const checked = modules.includes(m.id);
    el.classList.toggle('checked', checked);
    const svg = el.querySelector('svg');
    if (svg) svg.style.visibility = checked ? 'visible' : 'hidden';
  });

  const modal = document.getElementById('modal-info-custom');
  if (!modal.classList.contains('open')) modal.classList.add('open');
}


function toggleInfoModule(id) {
  const modules = getInfoModules();
  const idx = modules.indexOf(id);
  if (idx > -1) {
    if (modules.length <= 1) { showToast('至少保留一個項目'); return; }
    modules.splice(idx, 1);
  } else {
    modules.push(id);
  }
  data.settings.infoModules = modules;
  const checked = modules.includes(id);
  const el = document.getElementById('info-mod-check-' + id);
  if (el) {
    el.dataset.checked = checked;
    el.classList.toggle('checked', checked);
    const svg = el.querySelector('svg');
    if (svg) svg.style.visibility = checked ? 'visible' : 'hidden';
  }
}


function saveInfoModules() {
  save();
  renderInfoGrid();
  closeModal('modal-info-custom');
  showToast('已更新');
}


/* ═══════════════════════════════════════
   REORDER DAYS SHEET
═══════════════════════════════════════ */
let _reorderOrder = [];

function openReorderSheet() {
  _reorderOrder = data.days.map((_, i) => i);
  _reorderSelected = null;
  renderReorderList();
  const label = document.getElementById('reorder-selected-label');
  if (label) { label.textContent = '點選行程後移動'; label.style.color = '#AAAAAA'; label.style.fontWeight = '400'; }
  document.getElementById('modal-reorder-sheet').classList.add('open');
}

function renderReorderList() {
  const list = document.getElementById('reorder-list');
  list.innerHTML = _reorderOrder.map((origIdx, pos) => {
    const day = data.days[origIdx];
    const rawDate = day.banner?.date || '';
    const dateDisplay = rawDate.replace(/\d{4}\//, '').replace(/（[^）]*）/, m => m) || '日期未設定';
    const subtitle = day.banner?.subtitle || '';
    const eventCount = (day.events || []).length;
    return `<div class="reorder-row" id="rrow-${pos}">
      <div class="reorder-row-info">
        <div class="reorder-row-day">DAY ${pos + 1}</div>
        <div class="reorder-row-date">${dateDisplay}</div>
        ${subtitle ? `<div style="font-size:12px;color:#666666;font-family:var(--mono);margin-top:2px">${subtitle}</div>` : ''}
        ${eventCount ? `<div style="font-size:11px;color:#CCCCCC;font-family:var(--mono)">${eventCount} 個行程</div>` : ''}
      </div>
      <div class="reorder-row-handle" data-pos="${pos}">≡</div>
    </div>`;
  }).join('');
  initReorderDrag();
}

function renderReorderList() {
  const list = document.getElementById('reorder-list');
  list.innerHTML = _reorderOrder.map((origIdx, pos) => {
    const day = data.days[origIdx];
    const rawDate = day.banner?.date || '';
    const dateDisplay = rawDate.replace(/\d{4}\//, '') || '日期未設定';
    const subtitle = day.banner?.subtitle || '';
    const eventCount = (day.events || []).length;
    const isSelected = _reorderSelected === pos;
    return `<div class="reorder-row${isSelected ? ' reorder-selected' : ''}" id="rrow-${pos}" onclick="selectReorderRow(${pos})">
      <div class="reorder-row-info">
        <div class="reorder-row-day">DAY ${pos + 1}</div>
        <div class="reorder-row-date">${dateDisplay}</div>
        ${subtitle ? `<div style="font-size:12px;color:#888;font-family:var(--mono);margin-top:2px">${subtitle}</div>` : ''}
        ${eventCount ? `<div style="font-size:11px;color:#BBBBBB;font-family:var(--mono)">${eventCount} 個行程</div>` : ''}
      </div>
    </div>`;
  }).join('');
}

function selectReorderRow(pos) {
  _reorderSelected = (_reorderSelected === pos) ? null : pos;
  renderReorderList();
  const label = document.getElementById('reorder-selected-label');
  if (label) {
    if (_reorderSelected !== null) {
      const day = data.days[_reorderOrder[_reorderSelected]];
      const rawDate = day.banner?.date || '';
      const dateDisplay = rawDate.replace(/\d{4}\//, '') || '日期未設定';
      label.textContent = `DAY ${_reorderSelected + 1}`;
      label.style.color = '#1A1A1A';
      label.style.fontWeight = '700';
    } else {
      label.textContent = '點選行程後移動';
      label.style.color = '#AAAAAA';
      label.style.fontWeight = '400';
    }
  }
}

function reorderMoveSelected(dir) {
  if (_reorderSelected === null) return;
  const newPos = _reorderSelected + dir;
  if (newPos < 0 || newPos >= _reorderOrder.length) return;
  const tmp = _reorderOrder[_reorderSelected];
  _reorderOrder[_reorderSelected] = _reorderOrder[newPos];
  _reorderOrder[newPos] = tmp;
  _reorderSelected = newPos;
  renderReorderList();
  // Update label without toggling selection off
  const label = document.getElementById('reorder-selected-label');
  if (label) {
    const day = data.days[_reorderOrder[_reorderSelected]];
    const rawDate = day.banner?.date || '';
    const dateDisplay = rawDate.replace(/\d{4}\//, '') || '日期未設定';
    label.textContent = `DAY ${_reorderSelected + 1}`;
    label.style.color = '#1A1A1A';
    label.style.fontWeight = '700';
  }
  setTimeout(() => {
    const el = document.getElementById('rrow-' + newPos);
    if (el) el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, 50);
}


function initReorderDrag() {} // no-op
function initReorderHandles() {} // no-op

function applyReorder() {
  const origContent = data.days.map((d, i) => ({
    events:   [...(d.events || [])],
    photos:   [...(d.banner?.photos || [])],
    subtitle: d.banner?.subtitle || '',
    expenses: [...(data.expenses[i] || [])],
  }));

  _reorderOrder.forEach((origIdx, newPos) => {
    const src = origContent[origIdx];
    data.days[newPos].events          = src.events;
    data.days[newPos].banner.photos   = src.photos;
    data.days[newPos].banner.subtitle = src.subtitle;
    data.expenses[newPos]             = src.expenses;
  });

  save();
  closeModal('modal-reorder-sheet');
  renderItinerary();
  renderExpenseDayTabs();
  showToast('行程順序已更新');
}

function renderItinerary() {
  if (!data) return;
  renderDayTabs();
  renderBanner();
  renderTimeline();
}

/* ─── Custom Confirm Dialog ─── */
function showConfirm(title, msg, onOk, onCancel) {
  let el = document.getElementById('app-confirm');
  if (!el) {
    el = document.createElement('div');
    el.id = 'app-confirm';
    el.innerHTML = `
      <div class="confirm-box">
        <div class="confirm-title" id="confirm-title"></div>
        <div class="confirm-msg" id="confirm-msg"></div>
        <div class="confirm-btns">
          <button class="confirm-btn confirm-cancel" id="confirm-cancel">取消</button>
          <button class="confirm-btn confirm-ok" id="confirm-ok">刪除</button>
        </div>
      </div>`;
    document.body.appendChild(el);
  }
  document.getElementById('confirm-title').textContent = title;
  document.getElementById('confirm-msg').textContent   = msg;
  el.classList.add('show');
  const ok     = document.getElementById('confirm-ok');
  const cancel = document.getElementById('confirm-cancel');
  const close  = () => el.classList.remove('show');
  ok.onclick     = () => { close(); onOk(); };
  cancel.onclick = () => { close(); onCancel && onCancel(); };
  el.onclick     = (e) => { if (e.target === el) { close(); onCancel && onCancel(); } };
}


function deleteDay(i) {
  if (data.days.length <= 1) {
    showToast('至少保留一天');
    return;
  }
  showConfirm(`刪除 Day ${i + 1}？`, '此天的行程與帳單將一併移除。', () => {
    data.days.splice(i, 1);
    data.expenses.splice(i, 1);
    currentDay = Math.min(currentDay, data.days.length - 1);
    if (expenseDay >= data.days.length) expenseDay = data.days.length - 1;
    syncTripDatesFromDays();
    save();
    renderItinerary();
    renderExpenseDayTabs();
  });
}

/* ─── Toast helper ─── */
let _toastTimer = null;
function showToast(msg) {
  let el = document.getElementById('app-toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'app-toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('show');
  if (_toastTimer) clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => el.classList.remove('show'), 2000);
}

function renderDayTabs() {
  const w = document.getElementById('day-tabs');
  w.innerHTML = '';
  data.days.forEach((_, i) => {
    const b = document.createElement('button');
    b.className = 'day-tab' + (i === currentDay ? ' active' : '');
    b.textContent = i + 1;
    b.onclick = () => { currentDay = i; renderItinerary(); };

    // Long-press to delete
    let pressTimer = null;
    b.addEventListener('pointerdown', () => {
      pressTimer = setTimeout(() => {
        pressTimer = null;
        deleteDay(i);
      }, 600);
    });
    b.addEventListener('pointerup',    () => { if (pressTimer) { clearTimeout(pressTimer); pressTimer = null; } });
    b.addEventListener('pointerleave', () => { if (pressTimer) { clearTimeout(pressTimer); pressTimer = null; } });

    w.appendChild(b);
  });
}

/* Day 預設背景圖（對應 image/ 資料夾） */
const DAY_DEFAULT_PHOTOS = [
  'image/day1.jpg',
  'image/day2.jpg',
  'image/day3.jpg',
  'image/day4.jpg',
  'image/day5.jpg',
];

function renderBanner() {
  const area  = document.getElementById('banner-area');
  const b     = data.days[currentDay].banner;
  const userPhotos = b.photos || [];

  // 若使用者沒有上傳照片，使用預設圖
  const defaultPhoto = DAY_DEFAULT_PHOTOS[currentDay] || DAY_DEFAULT_PHOTOS[DAY_DEFAULT_PHOTOS.length - 1];
  const photos = userPhotos.length > 0 ? userPhotos : [defaultPhoto];

  let bg = '';
  if (photos.length > 0) {
    const resolved = photos.map(resolvePhoto).filter(Boolean);
    if (resolved.length > 0) {
      bg = `<div class="banner-slides-wrap" id="banner-slides">
        ${resolved.map(u => `<div class="banner-slide" style="background-image:url('${esc(u)}')"></div>`).join('')}
      </div>`;
    } else {
      bg = `<div class="banner-placeholder-bg"></div>`;
    }
  } else {
    bg = `<div class="banner-placeholder-bg"></div>`;
  }

  const dots = photos.length > 1
    ? `<div class="banner-dots">${photos.map((_, i) => `<div class="banner-dot${i === 0 ? ' active' : ''}"></div>`).join('')}</div>`
    : '';

  area.innerHTML = `
    <!-- Topbar above banner -->
    <div class="banner-topbar-outer">
      <span class="banner-brand">Travel Trace</span>
      <div class="banner-topbar-line"></div>
      <span class="banner-lon">${esc(data.settings?.tripName || '')}</span>
    </div>
    <div class="banner-more-wrap">
      <button class="banner-more-btn" onclick="openBannerActionSheet(event)" title="更多選項">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1A1A1A"><path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/></svg>
      </button>
    </div>
    <div class="day-banner" onclick="openBannerModal(event)">
      ${bg}
      <div class="banner-gradient"></div>
      <!-- Right side: weather -->
      <div class="banner-lat-block">
        <span class="banner-lat-text" id="banner-weather-temp"></span>
        <div class="banner-weather-icon" id="banner-weather-icon"></div>
      </div>
      <!-- Bottom left: date + subtitle -->
      <div class="banner-text-area">

        <div class="banner-date-display" onclick="event.stopPropagation();document.getElementById('banner-date-live').focus()" id="banner-date-display">${formatBannerDate(b.date)}</div>
        <input class="banner-date-input banner-date-hidden" id="banner-date-live"
          data-day="${currentDay}"
          value="${esc(b.date)}"
          placeholder="YYYY/MM/DD（一）"
          onclick="event.stopPropagation()"
          oninput="fmtDate(this);updateBannerDateDisplay(this.value)"
          onblur="saveBannerText()">
        <input class="banner-subtitle-input" id="banner-sub-live"
          data-day="${currentDay}"
          value="${esc(b.subtitle)}"
          placeholder="行程說明…"
          onclick="event.stopPropagation()"
          onblur="saveBannerText()">
      </div>
      ${dots}
    </div>`;

  if (_slideshowTimer) { clearInterval(_slideshowTimer); _slideshowTimer = null; }
  if (photos.length > 1) {
    let idx = 0;
    const slides  = area.querySelector('#banner-slides');
    const dotEls  = area.querySelectorAll('.banner-dot');
    _slideshowTimer = setInterval(() => {
      idx = (idx + 1) % photos.length;
      slides.style.transform = `translateX(-${idx * 100}%)`;
      dotEls.forEach((d, i) => d.classList.toggle('active', i === idx));
    }, 3500);
  }
  // 重繪後補回天氣溫度
  setTimeout(() => { if (typeof applyWeatherToDOM === 'function') applyWeatherToDOM(); }, 0);
}

function saveBannerText() {
  const d   = document.getElementById('banner-date-live');
  const s   = document.getElementById('banner-sub-live');
  if (!d || !s) return;
  const dayIdx = parseInt(d.dataset.day ?? currentDay);
  if (isNaN(dayIdx) || !data.days[dayIdx]) return;
  data.days[dayIdx].banner.date     = d.value;
  data.days[dayIdx].banner.subtitle = s.value;
  // 填入日期後推算所有空白天
  inferAllDates();
  save();
  // 重新 render tabs（日期可能更新了）
  renderDayTabs();
  renderExpenseDayTabs();
}

function renderTimeline() {
  const list = document.getElementById('timeline-list');
  const evs  = [...(data.days[currentDay].events || [])].sort((a, b) => a.time.localeCompare(b.time));
  if (!evs.length) {
    list.innerHTML = `<div class="timeline-empty">點 ＋ 新增行程</div>`;
    return;
  }
  list.innerHTML = evs.map((ev, i) => {
    const noteHtml = ev.note ? `<div class="timeline-note" onclick="editEvent(${ev.id})" style="cursor:pointer">${noteToHtml(ev.note)}</div>` : '';
    const addrHtml = ev.addr ? `<div class="timeline-addr" onclick="openAddr('${esc(ev.addr)}')">${esc(ev.addr)}</div>` : '';
    const stationHtml = (ev.station || ev.line) ? `
      <div class="timeline-station-row">
        ${ev.station ? `<span class="timeline-station-name">${esc(ev.station)}</span>` : ''}
        ${ev.line ? `<span class="transit-pill" style="background:${ev.lineColor||'#999'}" onclick="openTransit('${esc(ev.station||'')}','${esc(ev.line||'')}')">${esc(ev.line)}</span>` : ''}
      </div>` : '';
    return `
    <div class="timeline-item" style="animation-delay:${i * 0.05}s">
      <div class="timeline-left">
        <div class="timeline-dot"></div>
        <div class="timeline-line"></div>
      </div>
      <div class="timeline-right">
        <div class="timeline-time-row">
          <span class="timeline-time" onclick="editEvent(${ev.id})" style="cursor:pointer">${ev.time}</span>
          <button class="t-del-btn" onclick="deleteEvent(${ev.id})">×</button>
        </div>
        <div class="timeline-title" onclick="editEvent(${ev.id})">${esc(ev.title)}</div>
        ${noteHtml}
        ${addrHtml}
        ${stationHtml}
      </div>
    </div>`;
  }).join('');
}

function formatBannerDate(str) {
  if (!str) return '<span class="banner-date-placeholder">YYYY/<br>MM/DD（一）</span>';
  // str = "YYYY/MM/DD（wd）"
  const m = str.match(/^(\d{4})\/(.*)/);
  if (m) return `${m[1]}/<br>${m[2]}`;
  return str;
}

function updateBannerDateDisplay(val) {
  const el = document.getElementById('banner-date-display');
  if (el) el.innerHTML = formatBannerDate(val);
}

/* ─── Date Auto-format: digits → YYYY/MM/DD（weekday） ─── */
const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];

function fmtDate(el) {
  let digits = el.value.replace(/\D/g, '').slice(0, 8);
  let out = '';
  if (digits.length <= 4) {
    out = digits;
  } else if (digits.length <= 6) {
    out = digits.slice(0, 4) + '/' + digits.slice(4);
  } else {
    out = digits.slice(0, 4) + '/' + digits.slice(4, 6) + '/' + digits.slice(6);
  }
  if (digits.length === 8) {
    const y  = parseInt(digits.slice(0, 4));
    const m  = parseInt(digits.slice(4, 6)) - 1;
    const d  = parseInt(digits.slice(6, 8));
    const dt = new Date(y, m, d);
    if (!isNaN(dt.getTime())) {
      out += '（' + WEEKDAYS[dt.getDay()] + '）';
    }
  }
  el.value = out;
}

/* parse "YYYY/MM/DD…" → Date or null */
function parseBannerDate(str) {
  const m = String(str || '').match(/(\d{4})\/(\d{2})\/(\d{2})/);
  if (!m) return null;
  return new Date(parseInt(m[1]), parseInt(m[2]) - 1, parseInt(m[3]));
}

/* ─── Date helpers ─── */
function dateToStr(dt) {
  const y  = dt.getFullYear();
  const mo = String(dt.getMonth() + 1).padStart(2, '0');
  const d  = String(dt.getDate()).padStart(2, '0');
  const wd = WEEKDAYS[dt.getDay()];
  return `${y}/${mo}/${d}（${wd}）`;
}

/* 從任一已知天推算所有空白天的日期 */
function inferAllDates() {
  // 找第一個有日期的 anchor
  let anchorIdx = -1;
  let anchorDate = null;
  for (let i = 0; i < data.days.length; i++) {
    const d = parseBannerDate(data.days[i].banner.date);
    if (d) { anchorIdx = i; anchorDate = d; break; }
  }
  if (anchorIdx === -1) return; // 沒有任何日期，無法推算

  // 往前推
  for (let i = anchorIdx - 1; i >= 0; i--) {
    if (!parseBannerDate(data.days[i].banner.date)) {
      const dt = new Date(anchorDate);
      dt.setDate(dt.getDate() - (anchorIdx - i));
      data.days[i].banner.date = dateToStr(dt);
    }
  }
  // 往後推
  for (let i = anchorIdx + 1; i < data.days.length; i++) {
    if (!parseBannerDate(data.days[i].banner.date)) {
      const dt = new Date(anchorDate);
      dt.setDate(dt.getDate() + (i - anchorIdx));
      data.days[i].banner.date = dateToStr(dt);
    }
  }
}

/* resolve stored value → displayable URL */
function resolvePhoto(val) {
  if (!val) return '';
  return val; // ImgBB URL, persisted in data/localStorage
}

function syncTripDatesFromDays() {
  if (!data || !data.days.length) return;
  // Find first and last banner dates
  let firstDate = null, lastDate = null;
  for (let i = 0; i < data.days.length; i++) {
    const d = parseBannerDate(data.days[i].banner.date);
    if (d) { if (!firstDate) firstDate = d; lastDate = d; }
  }
  if (!firstDate) return;

  const fmt = d => `${d.getFullYear()}/${String(d.getMonth()+1).padStart(2,'0')}/${String(d.getDate()).padStart(2,'0')}`;
  const startStr = fmt(firstDate);
  const endStr = lastDate && lastDate !== firstDate
    ? String(lastDate.getMonth()+1).padStart(2,'0') + '/' + String(lastDate.getDate()).padStart(2,'0')
    : String(firstDate.getMonth()+1).padStart(2,'0') + '/' + String(firstDate.getDate()).padStart(2,'0');

  data.settings.tripDates = `${startStr}–${endStr}`;

  // Also update meta
  const trip = meta.trips.find(t => t.id === currentTripId);
  if (trip) {
    trip.startDate = startStr;
    trip.endDate = fmt(lastDate || firstDate);
  }
  saveMeta();
}

function addDay() {
  // 先找最後一個有日期的天往後推一天
  let nextDate = '';
  for (let i = data.days.length - 1; i >= 0; i--) {
    const d = parseBannerDate(data.days[i].banner.date);
    if (d) {
      d.setDate(d.getDate() + (data.days.length - i));
      nextDate = dateToStr(d);
      break;
    }
  }
  data.days.push({ banner: { date: nextDate, subtitle: '', photos: [] }, events: [] });
  data.expenses.push([]);
  currentDay = data.days.length - 1;
  syncTripDatesFromDays();
  save();
  renderItinerary();
  const etabs = document.getElementById('expense-day-tabs');
  if (etabs) renderExpenseDayTabs();
}

/* ─── Event Modal ─── */
function fmtEventTime(el) {
  const raw = el.value;
  const digits = raw.replace(/\D/g, '').slice(0, 4);

  // If user is deleting (raw ends with nothing after removing colon), don't auto-insert
  const isDeleting = raw.length < (el._lastLen || 0);
  el._lastLen = raw.length;

  let out = digits;

  if (digits.length === 1) {
    if (!isDeleting && parseInt(digits) > 2) {
      out = '0' + digits + ':';
      el.value = out;
      el._lastLen = out.length;
      return;
    }
  } else if (digits.length === 2) {
    if (!isDeleting) {
      out = digits + ':';
      el.value = out;
      el._lastLen = out.length;
      return;
    }
  } else if (digits.length >= 3) {
    out = digits.slice(0,2) + ':' + digits.slice(2,4);
  }

  el.value = out;
  el._lastLen = out.length;
}

function openEventModal(id) {
  editingEventId = id !== undefined ? id : null;
  document.getElementById('modal-event-title').textContent = id !== undefined ? '編輯行程' : '新增行程';
  if (id !== undefined) {
    const ev = data.days[currentDay].events.find(e => e.id === id);
    document.getElementById('ev-time').value  = ev.time;
    document.getElementById('ev-title').value = ev.title;
    document.getElementById('ev-note').value  = ev.note || '';
  } else {
    document.getElementById('ev-time').value  = '';
    document.getElementById('ev-title').value = '';
    document.getElementById('ev-note').value  = '';
  }
  document.getElementById('modal-event').classList.add('open');
  setTimeout(() => {
    document.getElementById('ev-time').focus();
    initAutoResize();
  }, 340);
}

function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = el.scrollHeight + 'px';
}

function initAutoResize() {
  document.querySelectorAll('.ev-auto').forEach(el => {
    el.addEventListener('input', () => autoResize(el));
    autoResize(el);
  });
}

let _evColor = '#999';

function openColorSheet() {
  // Mark currently selected color
  document.querySelectorAll('.cpk-swatch').forEach(el => {
    el.classList.toggle('selected', el.style.background === _evColor || el.style.backgroundColor === _evColor);
  });
  document.getElementById('modal-color-sheet').classList.add('open');
}

function pickColor(hex) {
  _evColor = hex;
  document.getElementById('ev-color-swatch').style.background = hex;
  document.querySelectorAll('.cpk-swatch').forEach(el => {
    el.classList.toggle('selected', el.style.background === hex || el.style.backgroundColor === hex);
  });
  closeModal('modal-color-sheet');
}

function setEvColor(hex) { pickColor(hex); }
function toggleEvColorPicker() { openColorSheet(); }

function noteToHtml(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  // Split by * bullets and render each on its own line
  const lines = esc(text).split(/\s*\*\s+/);
  const result = lines.map((line, i) => {
    const linked = line.replace(urlRegex, url => `<a href="${url}" target="_blank" style="color:#2980B9;text-decoration:underline">${url}</a>`);
    return i === 0 ? linked : '• ' + linked;
  }).filter(l => l.trim()).join('<br>');
  return result;
}

function openEventModal(id) {
  editingEventId = id !== undefined ? id : null;
  document.getElementById('modal-event-title').textContent = id !== undefined ? '編輯行程' : '新增行程';
  _evColor = '#CCC';
  document.getElementById('ev-color-swatch').style.background = '#CCC';

  if (id !== undefined) {
    const ev = data.days[currentDay].events.find(e => e.id === id);
    document.getElementById('ev-time').value    = ev.time;
    document.getElementById('ev-title').value   = ev.title;
    document.getElementById('ev-note').value    = ev.note    || '';
    document.getElementById('ev-addr').value    = ev.addr    || '';
    document.getElementById('ev-station').value = ev.station || '';
    document.getElementById('ev-line').value    = ev.line    || '';
    if (ev.lineColor) {
      _evColor = ev.lineColor;
      document.getElementById('ev-color-swatch').style.background = ev.lineColor;
    }
  } else {
    ['ev-time','ev-title','ev-note','ev-addr','ev-station','ev-line'].forEach(id => {
      document.getElementById(id).value = '';
    });
  }
  document.getElementById('modal-event').classList.add('open');
  setTimeout(() => {
    document.getElementById('ev-time').focus();
    initAutoResize();
  }, 340);
}

function editEvent(id) { openEventModal(id); }

function deleteEvent(id) {
  data.days[currentDay].events = data.days[currentDay].events.filter(e => e.id !== id);
  save();
  renderTimeline();
}

function saveEvent() {
  const time    = document.getElementById('ev-time').value;
  const title   = document.getElementById('ev-title').value.trim();
  if (!time || !title) return;
  const note    = document.getElementById('ev-note').value.trim();
  const addr    = document.getElementById('ev-addr').value.trim();
  const station = document.getElementById('ev-station').value.trim();
  const line    = document.getElementById('ev-line').value.trim();
  const lineColor = (station || line) ? _evColor : '';

  if (editingEventId !== null) {
    const ev = data.days[currentDay].events.find(e => e.id === editingEventId);
    if (ev) { ev.time = time; ev.title = title; ev.note = note; ev.addr = addr; ev.station = station; ev.line = line; ev.lineColor = lineColor; }
  } else {
    data.days[currentDay].events.push({ id: Date.now(), time, title, note, addr, station, line, lineColor });
  }
  save();
  closeModal('modal-event');
  renderTimeline();
}

function openAddr(addr) {
  const url = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(addr);
  window.open(url, '_blank');
}

function openTransit(station, line) {
  // Check if map module is enabled
  const modules = data.settings?.infoModules || [];
  if (modules.includes('map')) {
    switchTab('info');
    openInfoSub('map');
  }
  // else: no action
}


function openBannerActionSheet(e) {
  e.stopPropagation();
  document.getElementById('action-sheet-banner').classList.add('open');
}

function bannerActionAddEvent() {
  closeActionSheet('action-sheet-banner');
  setTimeout(() => openEventModal(), 350);
}

function bannerActionAddDay() {
  closeActionSheet('action-sheet-banner');
  setTimeout(() => addDay(), 350);
}

function bannerActionDelete() {
  closeActionSheet('action-sheet-banner');
  deleteDay(currentDay);
}

function bannerActionEdit() {
  closeActionSheet('action-sheet-banner');
  setTimeout(() => openBannerModal({}), 350);
}

function closeActionSheet(id) {
  document.getElementById(id).classList.remove('open');
}

/* ─── Banner Photo Modal ─── */
function openBannerModal(e) {
  if (e && e.stopPropagation) e.stopPropagation();
  renderPhotoGrid();
  document.getElementById('modal-banner').classList.add('open');
}

function renderPhotoGrid() {
  const grid   = document.getElementById('photo-grid');
  const photos = data.days[currentDay].banner.photos || [];
  grid.innerHTML = '';

  // 已有的照片格子
  photos.forEach((val, idx) => {
    const url = resolvePhoto(val);
    const cell = document.createElement('div');
    cell.className = 'photo-cell photo-cell-filled';
    cell.style.backgroundImage = url ? `url('${url}')` : '';
    cell.innerHTML = `<button class="photo-cell-del" onclick="removeBannerPhoto(${idx})">×</button>`;
    grid.appendChild(cell);
  });

  // 新增格子（最多 5 張）
  if (photos.length < 5) {
    const remaining = 5 - photos.length;
    const add = document.createElement('div');
    add.className = 'photo-cell photo-cell-add';
    add.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px"><path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg>
      <span>新增照片</span>`;
    // hidden input — no capture attr → iOS shows Photos only option first
    const inp = document.createElement('input');
    inp.type = 'file';
    inp.accept = 'image/*';
    inp.multiple = true;
    inp.style.display = 'none';
    inp.addEventListener('change', () => handleGridUpload(inp));
    add.addEventListener('click', () => inp.click());
    add.appendChild(inp);
    grid.appendChild(add);
  }
}

function removeBannerPhoto(idx) {
  data.days[currentDay].banner.photos.splice(idx, 1);
  renderPhotoGrid();
}

function handleGridUpload(input) {
  const files = [...input.files];
  const photos = data.days[currentDay].banner.photos || [];
  const remaining = 5 - photos.length;
  files.slice(0, remaining).forEach(async file => {
    showUploadStatus('上傳中...');
    try {
      const url = await uploadToImgBB(file);
      data.days[currentDay].banner.photos = [url];
      save();
      renderPhotoGrid();
    } catch(err) {
      alert('上傳失敗：' + err.message);
    } finally {
      showUploadStatus('');
    }
  });
}

function saveBanner() {
  save();
  closeModal('modal-banner');
  renderBanner();
}

/* ─── Custom Category Dropdown ─── */
let _selectedCat = null;

function initCatDropdown() {
  const dd = document.getElementById('exp-cat-dropdown');
  if (!dd) return;
  dd.innerHTML = EXPENSE_CATS.map(c => `
    <div class="exp-cat-option" onclick="selectCat('${c.label}')">
      <span class="exp-cat-opt-icon">${c.svg}</span>
      <span class="exp-cat-opt-label">${c.label}</span>
    </div>`).join('');
}

function toggleCatDropdown() {
  const dd = document.getElementById('exp-cat-dropdown');
  if (!dd) return;
  dd.classList.toggle('open');
}

function selectCat(label) {
  _selectedCat = label;
  const labelEl = document.getElementById('exp-cat-label');
  if (labelEl) labelEl.textContent = label;
  document.getElementById('exp-cat-dropdown')?.classList.remove('open');
}

function openExpenseSheet() {
  window._expEditId = null;
  initCatDropdown();
  _selectedCat = '餐飲';
  const labelEl = document.getElementById('exp-cat-label');
  if (labelEl) labelEl.textContent = '餐飲';
  const amt = document.getElementById('exp-amount');
  const nm  = document.getElementById('exp-name');
  if (amt) amt.value = '';
  if (nm)  nm.value  = '';
  document.getElementById('modal-expense-sheet').classList.add('open');
  setTimeout(() => document.getElementById('exp-amount')?.focus(), 340);
}

// Close dropdown on outside click
document.addEventListener('click', (e) => {
  if (!e.target.closest('#exp-cat-wrap')) {
    document.getElementById('exp-cat-dropdown')?.classList.remove('open');
  }
});

const CATS = ['餐飲', '交通', '購物', '住宿', '票券', '其他'];
let expenseDay = 0;

function renderExpense() {
  if (!data) return;
  expenseDay = Math.min(expenseDay, data.days.length - 1);

  // Auto-jump to today's day if within trip range
  const today = new Date();
  today.setHours(0,0,0,0);
  let matched = false;
  for (let i = 0; i < data.days.length; i++) {
    const raw = data.days[i].banner?.date || '';
    const m = raw.match(/(\d{4})\/(\d{2})\/(\d{2})/);
    if (m) {
      const d = new Date(+m[1], +m[2]-1, +m[3]);
      if (d.getTime() === today.getTime()) {
        expenseDay = i;
        matched = true;
        break;
      }
    }
  }
  if (!matched) expenseDay = Math.min(expenseDay, data.days.length - 1);

  renderExpenseDayTabs();
  renderExpenseList();
  initExpenseSwipe();
}

let _expSwipeInited = false;
function initExpenseSwipe() {
  if (_expSwipeInited) return;
  _expSwipeInited = true;
  const screen = document.getElementById('screen-expense');
  if (!screen) return;
  let startX = 0, startY = 0;
  screen.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });
  screen.addEventListener('touchend', e => {
    if (!data) return;
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) < 40 || Math.abs(dy) > Math.abs(dx)) return;
    const total = data.days.length;
    if (dx < 0) {
      expenseDay = (expenseDay + 1) % total;
    } else {
      expenseDay = (expenseDay - 1 + total) % total;
    }
    renderExpenseDayTabs();
    renderExpenseList();
  }, { passive: true });
}

function renderExpenseDayTabs() {
  const t = document.getElementById('expense-day-tabs');
  if (!t) return;
  t.innerHTML = data.days.map((_, i) =>
    `<button class="day-tab${i === expenseDay ? ' active' : ''}" onclick="switchExpDay(${i})">${i + 1}</button>`
  ).join('');

  // Update date display above tabs
  const dateEl = document.getElementById('expense-day-date');
  if (dateEl && data.days[expenseDay]) {
    const raw = data.days[expenseDay].banner?.date || '';
    const dateDisplay = raw.replace(/\d{4}\//, '').trim();
    dateEl.textContent = dateDisplay || '';
  }
}

function switchExpDay(i) {
  const total = data.days.length;
  expenseDay = ((i % total) + total) % total; // circular
  renderExpenseDayTabs();
  renderExpenseList();
  // Reset scroll to top when switching days
  const screen = document.getElementById('screen-expense');
  if (screen) screen.scrollTop = 0;
}

function renderExpenseList() {
  const list  = document.getElementById('expense-list');
  const items = data.expenses[expenseDay] || [];
  const sym   = getCurrencySymbol();
  const total = items.reduce((s, i) => s + parseFloat(i.amount || 0), 0);
  const totalAbs = Math.abs(total);
  document.getElementById('expense-total').textContent = `${total < 0 ? '-' : ''}${sym} ${totalAbs.toLocaleString()}`;
  const totalEl = document.getElementById('expense-total');
  if (totalEl) totalEl.style.color = total < 0 ? '#E53E3E' : '#D4AF37';
  document.getElementById('expense-count').textContent = `${items.length} 筆記錄`;

  const allTotal = data.expenses.reduce((s, day) =>
    s + day.reduce((ds, i) => ds + parseFloat(i.amount || 0), 0), 0);
  const tripEl = document.getElementById('expense-trip-total');
  if (tripEl) tripEl.textContent = `${sym} ${allTotal.toLocaleString()}`;

  if (!items.length) {
    list.innerHTML = `<div style="text-align:center;padding:40px 0;color:var(--text-tertiary);font-size:13px;font-family:var(--mono)">尚無記錄</div>`;
    return;
  }
  // Sort by time: timed items first (ascending), untimed last
  const sorted = [...items].sort((a, b) => {
    if (!a.time && !b.time) return 0;
    if (!a.time) return 1;
    if (!b.time) return -1;
    return a.time.localeCompare(b.time);
  });

  list.innerHTML = sorted.map((item) => {
    const catObj = (typeof EXPENSE_CATS !== 'undefined') ? EXPENSE_CATS.find(c => c.label === item.cat) : null;
    const iconSvg = catObj ? catObj.svg.replace(/height="[0-9]+px"/, 'height="22px"').replace(/width="[0-9]+px"/, 'width="22px"') : '';
    const label   = item.name || item.cat || '其他';

    const validSubs = (item.subitems || []).filter(s => s.name || s.amount > 0);
    const subitemsHtml = validSubs.length > 0
      ? `<div class="exp-row-subitems">${validSubs.map(s =>
          `<div class="exp-row-subitem">
            <span>${esc(s.name)}</span>
            <span>${s.amount > 0 ? sym + '&nbsp;' + parseFloat(s.amount).toLocaleString() : ''}</span>
          </div>`).join('')}</div>`
      : '';
    return `
      <div class="exp-row" onclick="openExpenseSheetForEdit(${item.id})">
        <div class="exp-row-icon">
          ${iconSvg}
          ${item.time ? `<span class="exp-row-icon-time">${item.time}</span>` : ''}
        </div>
        <div class="exp-row-body">
          <div style="display:flex;align-items:baseline;justify-content:space-between;gap:8px">
            <div class="exp-row-label">${esc(label)}</div>
            <div class="exp-row-amt" style="${parseFloat(item.amount) < 0 ? 'color:#E53E3E' : ''}">${parseFloat(item.amount) < 0 ? '-' : ''}${sym}&nbsp;${Math.abs(parseFloat(item.amount)).toLocaleString()}</div>
          </div>
          ${subitemsHtml}
        </div>
        <button class="exp-row-del" onclick="event.stopPropagation();deleteExpense(${item.id})">×</button>
      </div>`;
  }).join('');
}

function addExpense() {
  const name   = document.getElementById('exp-name').value.trim();
  const amount = document.getElementById('exp-amount').value;
  const time   = document.getElementById('exp-time')?.value?.trim() || '';
  const cat    = _selectedCat || '其他';
  if (!amount) return;
  const subitems = _getExpSubitems().filter(s => s.name || s.amount > 0);
  if (window._expEditId) {
    const idx = data.expenses[expenseDay].findIndex(i => i.id === window._expEditId);
    if (idx !== -1) data.expenses[expenseDay][idx] = { id: window._expEditId, name, amount: parseFloat(amount), cat, time, subitems };
    window._expEditId = null;
  } else {
    data.expenses[expenseDay].push({ id: Date.now(), name, amount: parseFloat(amount), cat, time, subitems });
  }
  save();
  closeModal('modal-expense-sheet');
  renderExpenseList();
}

function deleteExpense(id) {
  data.expenses[expenseDay] = data.expenses[expenseDay].filter(i => i.id !== id);
  save();
  renderExpenseList();
}

/* ═══════════════════════════════════════
   INFO — HUB + SUB SCREENS
═══════════════════════════════════════ */
function renderInfo() {
  renderInfoGrid();
}

function openInfoSub(name) {
  document.getElementById('screen-info').classList.remove('active');
  const sub = document.getElementById('screen-info-' + name);
  sub.classList.add('active');
  if (name === 'flight')    renderFlightCards();
  if (name === 'hotel')     renderHotelCards();
  if (name === 'checklist') renderCheckItems();
  if (name === 'shopping')  renderShopItems();
  if (name === 'ticket')    renderTicketCards();
  if (name === 'notes')     renderNotes();
  if (name === 'photo')     renderPhotoPage();
  if (name === 'map')       renderMapSub();
}

function closeInfoSub(name) {
  document.getElementById('screen-info-' + name).classList.remove('active');
  document.getElementById('screen-info').classList.add('active');
}

/* ═══════════════════════════════════════
   PHOTO MODULE
═══════════════════════════════════════ */
let _photoDayIdx = 0;

let _photoSwipeInited = false;
function initPhotoSwipe() {
  if (_photoSwipeInited) return;
  _photoSwipeInited = true;
  const screen = document.getElementById('screen-info-photo');
  if (!screen) return;
  let startX = 0, startY = 0;
  screen.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });
  screen.addEventListener('touchend', e => {
    if (!data) return;
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) < 40 || Math.abs(dy) > Math.abs(dx)) return;
    const total = (data.days || []).length;
    if (!total) return;
    if (dx < 0) {
      _photoDayIdx = (_photoDayIdx + 1) % total;
    } else {
      _photoDayIdx = (_photoDayIdx - 1 + total) % total;
    }
    renderPhotoPage();
  }, { passive: true });
}

function renderPhotoPage() {
  if (!data.photos) data.photos = [];
  const days = data.days || [];
  if (!days.length) return;
  _photoDayIdx = Math.min(_photoDayIdx, days.length - 1);
  initPhotoSwipe();

  // Render day tabs
  const tabsEl = document.getElementById('photo-day-tabs');
  if (tabsEl) {
    tabsEl.innerHTML = days.map((_, i) =>
      `<button class="day-tab${i === _photoDayIdx ? ' active' : ''}" onclick="selectPhotoDay(${i})">${i + 1}</button>`
    ).join('');
  }
  // Date label
  const dateEl = document.getElementById('photo-day-date');
  if (dateEl && days[_photoDayIdx]) {
    const raw = days[_photoDayIdx].banner?.date || '';
    dateEl.textContent = raw.replace(/\d{4}\//, '').trim();
  }

  // Filter photos for selected day (1-based)
  const dayKey = _photoDayIdx + 1;
  const photos = data.photos.filter(p => p.day === dayKey);

  const grid = document.getElementById('photo-page-grid');
  if (!grid) return;
  if (!photos.length) { grid.innerHTML = ''; return; }
  grid.innerHTML = `<div style="display:flex;flex-direction:column;gap:2px;width:100%">${
    photos.map(p => `
    <div style="position:relative;width:100%;overflow:hidden;background:#F0F0F0">
      <img src="${resolvePhoto(p.url)}" style="width:100%;height:auto;display:block;cursor:pointer" onclick="openPhotoLightbox('${resolvePhoto(p.url)}')" loading="lazy">
      <button onclick="deletePhoto(${p.id})" style="position:absolute;top:8px;right:8px;width:20px;height:20px;border-radius:50%;background:rgba(0,0,0,0.5);color:#fff;border:none;font-size:12px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:2;line-height:1">×</button>
    </div>`).join('')
  }</div>`;
}

function selectPhotoDay(idx) {
  _photoDayIdx = idx;
  renderPhotoPage();
}

async function addPhotoFromPicker(input) {
  const files = [...input.files];
  if (!data.photos) data.photos = [];
  const dayKey = _photoDayIdx + 1;
  for (const file of files) {
    showUploadStatus('上傳中...');
    try {
      const url = await uploadToImgBB(file);
      data.photos.push({ id: Date.now() + Math.random(), url, day: dayKey });
      save();
      renderPhotoPage();
    } catch(err) {
      alert('上傳失敗：' + err.message);
    } finally {
      showUploadStatus('');
    }
  }
  input.value = '';
}

function deletePhoto(id) {
  data.photos = (data.photos || []).filter(p => p.id !== id);
  save(); renderPhotoPage();
}

function openPhotoLightbox(url) {
  if (typeof openTicketLightbox === 'function') { openTicketLightbox(url); return; }
  window.open(url, '_blank');
}

/* ═══════════════════════════════════════
   MAP MODULE
═══════════════════════════════════════ */

/* ─── Render / state ─── */
/* ═══════════════════════════════════════
   MAP MODULE — Multi-map with tabs
═══════════════════════════════════════ */
let _mapTabTimer = null, _mapTabCancelled = false;
function _mapTabTouchStart(idx, el) {
  _mapTabCancelled = false;
  _mapTabTimer = setTimeout(() => {
    if (!_mapTabCancelled) mapLongPressTab(idx);
  }, 500);
}
function _mapTabTouchEnd(idx, el) {
  clearTimeout(_mapTabTimer);
}
function _mapTabTouchCancel() {
  _mapTabCancelled = true;
  clearTimeout(_mapTabTimer);
}


let _mapEditingId = null; // for rename

function renderMapSub() {
  if (!data.maps) data.maps = [];
  // migrate old single-map format, strip file extension from name
  data.maps = data.maps.map(m => {
    if (!m.id) m.id = Date.now() + Math.random();
    if (!m.name) m.name = '地圖';
    m.name = m.name.replace(/\.[a-zA-Z]{2,5}$/, ''); // strip .jpeg .png etc
    if (!m.name) m.name = '地圖';
    return m;
  });
  save();

  const maps    = data.maps;
  const emptyEl = document.getElementById('map-empty-state');
  const viewerEl= document.getElementById('map-viewer');
  const tabsBar = document.getElementById('map-tabs-bar');

  if (!maps.length) {
    emptyEl.style.display  = 'flex';
    viewerEl.style.display = 'none';
    tabsBar.style.display  = 'none';
    return;
  }

  emptyEl.style.display  = 'none';
  viewerEl.style.display = 'block';
  tabsBar.style.display  = 'block';

  _mapActiveIdx = Math.min(_mapActiveIdx, maps.length - 1);
  _renderMapTabs();
  // Size viewer synchronously first, then load image
  _mapSizeViewerSync();
  _mapLoadImage(maps[_mapActiveIdx].url);
}

function _renderMapTabs() {
  const maps  = data.maps || [];
  const tabsEl = document.getElementById('map-tabs');
  if (!tabsEl) return;
  tabsEl.innerHTML = maps.map((m, i) => `
    <button
      onclick="mapSelectTab(${i})"
      ondblclick="mapLongPressTab(${i})"
      style="flex-shrink:0;padding:10px 20px;border:none;background:none;font-family:var(--mono);font-size:14px;font-weight:${i===_mapActiveIdx?700:400};color:${i===_mapActiveIdx?'#1A1A1A':'#AAAAAA'};border-bottom:${i===_mapActiveIdx?'2px solid #1A1A1A':'2px solid transparent'};cursor:pointer;white-space:nowrap;transition:all 0.15s">
      ${esc(m.name)}
    </button>`).join('');
}

function mapSelectTab(idx) {
  _mapActiveIdx = idx;
  _renderMapTabs();
  _mapLoadImage(data.maps[idx].url);
  mapResetView();
}

// Long-press or right-click tab → rename/delete menu
function mapLongPressTab(idx) {
  const m = data.maps[idx];
  if (!m) return;
  _mapEditingId = m.id;
  _mapActiveIdx = idx;
  document.getElementById('modal-map-name-title').textContent = '地圖選項';
  const inp = document.getElementById('map-name-input');
  inp.value = m.name;
  inp.readOnly = false;
  document.getElementById('map-delete-btn').style.display = 'block';
  document.getElementById('modal-map-name').classList.add('open');
  // Tap the input to trigger keyboard on Safari
  setTimeout(() => inp.focus(), 50);
}

// Add new map: prompt name first
function mapAddNew() {
  _mapEditingId = null;
  document.getElementById('modal-map-name-title').textContent = '新增地圖';
  const inp = document.getElementById('map-name-input');
  inp.value = '';
  inp.readOnly = false;
  document.getElementById('map-delete-btn').style.display = 'none';
  document.getElementById('modal-map-name').classList.add('open');
  inp.focus();
}

function mapConfirmName() {
  const name = document.getElementById('map-name-input').value.trim() || '地圖';
  closeModal('modal-map-name');

  if (_mapEditingId) {
    // Rename existing map
    const m = (data.maps||[]).find(m => m.id === _mapEditingId);
    if (m) {
      m.name = name;
      save();
      _renderMapTabs();
    }
    return;
  }

  // New map: pick image file
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = async () => {
    const file = input.files[0];
    if (!file) return;
    showUploadStatus('上傳地圖中…');
    try {
      const url = await uploadToImgBB(file);
      if (!data.maps) data.maps = [];
      data.maps.push({ id: Date.now(), name, url });
      _mapActiveIdx = data.maps.length - 1;
      save();
      showUploadStatus('');
      renderMapSub();
    } catch(e) {
      showUploadStatus('');
      showToast('上傳失敗，請再試一次');
    }
  };
  input.click();
}

function mapDeleteCurrent() {
  if (!_mapEditingId) return;
  closeModal('modal-map-name');
  data.maps = (data.maps||[]).filter(m => m.id !== _mapEditingId);
  _mapActiveIdx = Math.max(0, _mapActiveIdx - 1);
  save();
  renderMapSub();
}

// Legacy: keep onMapActionBtn pointing to mapAddNew
function onMapActionBtn() { mapAddNew(); }



function _mapSizeViewerSync() {
  const header  = document.getElementById('map-sub-header');
  const tabsBar = document.getElementById('map-tabs-bar');
  const viewer  = document.getElementById('map-viewer');
  if (!header || !viewer) return;
  const hH = header.getBoundingClientRect().height;
  const tH = (tabsBar && tabsBar.style.display !== 'none') ? tabsBar.getBoundingClientRect().height : 0;
  viewer.style.top    = (hH + tH) + 'px';
  viewer.style.bottom = '0';
  viewer.style.height = '';
}

function _mapSizeViewer() {
  const header  = document.getElementById('map-sub-header');
  const tabsBar = document.getElementById('map-tabs-bar');
  const viewer  = document.getElementById('map-viewer');
  if (!header || !viewer) return;
  requestAnimationFrame(() => {
    const hH = header.getBoundingClientRect().height;
    const tH = (tabsBar && tabsBar.style.display !== 'none') ? tabsBar.getBoundingClientRect().height : 0;
    viewer.style.top    = (hH + tH) + 'px';
    viewer.style.bottom = '0';
    viewer.style.height = '';
  });
}
let _mapScale = 1, _mapTx = 0, _mapTy = 0;
let _mapDragging = false;
let _mapLastX = 0, _mapLastY = 0;
let _mapPinchDist = null;
let _mapPinchMidX = 0, _mapPinchMidY = 0;
let _mapEngineReady = false;
const MAP_MAX_SCALE = 8;

function _mapGetMinScale() {
  const viewer = document.getElementById('map-viewer');
  const img    = document.getElementById('map-img');
  if (!viewer || !img || !img.naturalWidth) return 1;
  const vw = viewer.clientWidth;
  const vh = viewer.clientHeight;
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  return vh / (vw * (ih / iw));
}

function _mapClamp(v, min, max) { return Math.min(max, Math.max(min, v)); }

function _mapConstrain() {
  const viewer = document.getElementById('map-viewer');
  const img    = document.getElementById('map-img');
  if (!viewer || !img) return;
  const vw = viewer.clientWidth, vh = viewer.clientHeight;
  const iw = img.naturalWidth || vw, ih = img.naturalHeight || vh;
  const renderedW = vw * _mapScale;
  const renderedH = vw * (ih / iw) * _mapScale;
  if (renderedW <= vw) _mapTx = (vw - renderedW) / 2;
  else _mapTx = _mapClamp(_mapTx, vw - renderedW, 0);
  if (renderedH <= vh) _mapTy = (vh - renderedH) / 2;
  else _mapTy = _mapClamp(_mapTy, vh - renderedH, 0);
}

function _mapApply(smooth) {
  const img = document.getElementById('map-img');
  if (!img) return;
  img.style.transition = smooth ? 'transform 0.18s cubic-bezier(0.25,0.46,0.45,0.94)' : 'none';
  img.style.transform  = `translate(${_mapTx}px,${_mapTy}px) scale(${_mapScale})`;
}

function mapResetView() {
  const viewer = document.getElementById('map-viewer');
  const img    = document.getElementById('map-img');
  if (!viewer || !img) return;
  _mapSizeViewer();
  requestAnimationFrame(() => {
    const vw = viewer.clientWidth;
    const vh = viewer.clientHeight;
    const iw = img.naturalWidth  || vw;
    const ih = img.naturalHeight || vh;
    _mapScale = vh / (vw * (ih / iw));
    const renderedW = vw * _mapScale;
    _mapTx = (vw - renderedW) / 2;
    _mapTy = 0;
    _mapApply(true);
  });
}

function _mapZoomAt(px, py, factor) {
  const min = _mapGetMinScale();
  const newScale = _mapClamp(_mapScale * factor, min, MAP_MAX_SCALE);
  _mapTx = px - (px - _mapTx) * (newScale / _mapScale);
  _mapTy = py - (py - _mapTy) * (newScale / _mapScale);
  _mapScale = newScale;
  _mapConstrain();
  _mapApply(false);
}

function _mapDist(t1, t2) {
  return Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
}

function _mapMid(t1, t2, rect) {
  return {
    x: (t1.clientX + t2.clientX) / 2 - rect.left,
    y: (t1.clientY + t2.clientY) / 2 - rect.top
  };
}

function mapInitPanZoom() {
  const viewer = document.getElementById('map-viewer');
  const img    = document.getElementById('map-img');
  if (!viewer || !img || _mapEngineReady) return;
  _mapEngineReady = true;

  // Touch events
  viewer.addEventListener('touchstart', e => {
    img.style.transition = 'none';
    if (e.touches.length === 1) {
      _mapDragging = true;
      _mapLastX = e.touches[0].clientX;
      _mapLastY = e.touches[0].clientY;
      _mapPinchDist = null;
    } else if (e.touches.length === 2) {
      _mapDragging = false;
      _mapPinchDist = _mapDist(e.touches[0], e.touches[1]);
      const rect = viewer.getBoundingClientRect();
      const mid  = _mapMid(e.touches[0], e.touches[1], rect);
      _mapPinchMidX = mid.x;
      _mapPinchMidY = mid.y;
    }
  }, { passive: true });

  viewer.addEventListener('touchmove', e => {
    e.preventDefault();
    if (e.touches.length === 1 && _mapDragging && _mapPinchDist === null) {
      _mapTx += e.touches[0].clientX - _mapLastX;
      _mapTy += e.touches[0].clientY - _mapLastY;
      _mapLastX = e.touches[0].clientX;
      _mapLastY = e.touches[0].clientY;
      _mapConstrain();
      _mapApply(false);
    } else if (e.touches.length === 2 && _mapPinchDist !== null) {
      const newDist = _mapDist(e.touches[0], e.touches[1]);
      const rect = viewer.getBoundingClientRect();
      const mid  = _mapMid(e.touches[0], e.touches[1], rect);
      // pan from mid delta
      _mapTx += mid.x - _mapPinchMidX;
      _mapTy += mid.y - _mapPinchMidY;
      _mapPinchMidX = mid.x;
      _mapPinchMidY = mid.y;
      // zoom
      _mapZoomAt(mid.x, mid.y, newDist / _mapPinchDist);
      _mapPinchDist = newDist;
    }
  }, { passive: false });

  viewer.addEventListener('touchend', e => {
    if (e.touches.length < 2) _mapPinchDist = null;
    if (e.touches.length === 0) _mapDragging = false;
  }, { passive: true });

  // Mouse drag (desktop)
  viewer.addEventListener('mousedown', e => {
    _mapDragging = true;
    _mapLastX = e.clientX;
    _mapLastY = e.clientY;
    img.style.transition = 'none';
    e.preventDefault();
  });
  window.addEventListener('mousemove', e => {
    if (!_mapDragging) return;
    _mapTx += e.clientX - _mapLastX;
    _mapTy += e.clientY - _mapLastY;
    _mapLastX = e.clientX;
    _mapLastY = e.clientY;
    _mapConstrain();
    _mapApply(false);
  });
  window.addEventListener('mouseup', () => { _mapDragging = false; });

  // Wheel zoom (desktop)
  viewer.addEventListener('wheel', e => {
    e.preventDefault();
    const rect = viewer.getBoundingClientRect();
    const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
    _mapZoomAt(e.clientX - rect.left, e.clientY - rect.top, factor);
  }, { passive: false });
}

function _mapLoadImage(url) {
  const img    = document.getElementById('map-img');
  const viewer = document.getElementById('map-viewer');
  if (!img) return;

  _mapScale = 1; _mapTx = 0; _mapTy = 0;
  _mapEngineReady = false;
  img.style.transform = '';

  img.onload = () => {
    requestAnimationFrame(() => {
      const vw = viewer.clientWidth, vh = viewer.clientHeight;
      const iw = img.naturalWidth  || vw;
      const ih = img.naturalHeight || vh;
      _mapScale = vh / (vw * (ih / iw));
      const renderedW = vw * _mapScale;
      _mapTx = (vw - renderedW) / 2;
      _mapTy = 0;
      _mapApply(false);
      mapInitPanZoom();
    });
  };
  img.onerror = () => showToast('地圖圖片載入失敗');
  img.src = url;
}

/* ─── Checklist ─── */
const CHECKLIST_DEFAULTS = [
  { g: '證件/文具', items: ['護照','眼鏡','筆記本','筆','購物袋','紙膠帶','口紅膠','小剪刀','分裝袋'] },
  { g: '電子/充電', items: ['手錶充電 x1','充電器 Type-C x2','Sony 充電器 x1','行動電源＋充電線 x1'] },
  { g: '攝影',      items: ['快門線','相機電池','底片','底片相機電池','拭鏡布'] },
  { g: '盥洗/保養', items: ['盥洗用具','毛巾','刮鬍刀','護唇膏','乳液','護手霜'] },
  { g: '藥品/衛生', items: ['止痛藥','胃藥','感冒藥','溫度計','OK繃','衛生紙','口罩','落健'] },
  { g: '衣物/日用', items: ['帽子','短袖上衣','長褲','短褲','內衣褲','襪子','布鞋','夾腳拖或涼鞋','薄外套','雨傘','黃色雨衣','寶特瓶','帆布包','筷子叉子'] },
];

function initChecklist() {
  if (!data.checklist || data.checklist.length === 0) {
    data.checklist = CHECKLIST_DEFAULTS.flatMap(g =>
      g.items.map(text => ({ text, done: false, group: g.g }))
    );
    save();
  }
}

function stripEmoji(str) {
  return (str || '').replace(/[\u{1F000}-\u{1FFFF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\uD83E[\uDD00-\uDFFF]|[📄🔌📷🧴💊👗]\s*/gu, '').trim();
}

function resetChecklist() {
  if (!data.checklist) return;
  data.checklist.forEach(item => item.done = false);
  save();
  renderCheckItems();
}

function renderCheckItems() {
  initChecklist();
  const items = data.checklist;
  const groups = {};
  const groupOrder = [];
  items.forEach((item, i) => {
    const g = item.group || '其他';
    if (!groups[g]) { groups[g] = []; groupOrder.push(g); }
    groups[g].push({ ...item, idx: i });
  });

  document.getElementById('checklist-items').innerHTML = groupOrder.map(g => {
    const list = groups[g];
    return `
      <div class="cl-group">
        <div class="cl-group-header">
          <span class="cl-group-title">${esc(stripEmoji(g))}</span>
          <button class="cl-group-add" onclick="openChecklistModal('${esc(g)}')">＋</button>
        </div>
        ${list.map(item => `
          <div class="cl-row ${item.done ? 'cl-done' : ''}" onclick="toggleCheck(${item.idx})">
            <div class="cl-circle ${item.done ? 'cl-checked' : ''}">
              ${item.done ? `<svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="#fff"><path d="m424-312 282-282-56-56-226 226-114-114-56 56 170 170Z"/></svg>` : ''}
            </div>
            <span class="cl-text">${esc(item.text)}</span>
            <button class="cl-del" onclick="event.stopPropagation();deleteCheckItem(${item.idx})">×</button>
          </div>`).join('')}
      </div>`;
  }).join('');
}

function openChecklistModal(group) {
  initChecklist();
  document.getElementById('modal-checklist-add').classList.add('open');
  document.getElementById('modal-checklist-add').dataset.group = group || '其他';
  // populate group dropdown
  const groups = [...new Set(data.checklist.map(i => i.group || '其他'))];
  const sel = document.getElementById('checklist-add-group');
  if (sel) {
    sel.innerHTML = groups.map(g => `<option value="${esc(g)}" ${g===group?'selected':''}>${esc(g)}</option>`).join('');
  }
  setTimeout(() => {
    const inp = document.getElementById('checklist-add-input');
    if (inp) { inp.value = ''; inp.focus(); }
  }, 340);
}

function saveChecklistModal() {
  const text  = document.getElementById('checklist-add-input').value.trim();
  const group = document.getElementById('modal-checklist-add').dataset.group || '其他';
  if (!text) return;
  if (!data.checklist) data.checklist = [];
  data.checklist.push({ text, done: false, group });
  save();
  closeModal('modal-checklist-add');
  renderCheckItems();
}


function addCheckItem() {
  // fallback — 加到其他
  addCheckItemToGroup('其他', 'cg-other');
}

function toggleCheck(i) {
  data.checklist[i].done = !data.checklist[i].done;
  save(); renderCheckItems();
}

function deleteCheckItem(i) {
  data.checklist.splice(i, 1);
  save(); renderCheckItems();
}

/* ─── Shopping List ─── */
function renderShopItems() {
  const items = data.shopping || [];
  const el = document.getElementById('shopping-items');
  if (!items.length) { el.innerHTML = `<div class="list-empty"></div>`; return; }

  el.innerHTML = items.map((item, i) => {
    const photoUrl = item.photo ? resolvePhoto(item.photo) : '';
    const done = item.done;

    if (done) {
      // 完成態：只保留圖片 + 名稱 + check
      return `
      <div class="sl-card sl-done" style="min-height:72px">
        <div class="sl-img-col" style="width:72px;min-height:72px;flex-shrink:0">
          ${photoUrl ? `<img class="sl-img" src="${photoUrl}">` : `<div class="sl-img-empty" style="min-height:72px"></div>`}
        </div>
        <div class="sl-content" style="flex-direction:row;align-items:center;padding:0 16px;gap:0">
          <span class="sl-name" style="flex:1;padding-right:12px">${esc(item.name || '')}</span>
          <button class="sl-check sl-checked" onclick="event.stopPropagation();toggleShop(${i})">
            <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px"><path d="m424-312 282-282-56-56-226 226-114-114-56 56 170 170Zm56 232q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
          </button>
        </div>
      </div>`;
    }

    const nameHtml   = `<div class="sl-name">${esc(item.name || '')}</div>` +
      (item.subname ? `<div class="sl-subname">${esc(item.subname)}</div>` : '');
    const addrHtml   = item.addr  ? `<div class="sl-meta sl-addr" onclick="event.stopPropagation();window.open('https://maps.google.com/?q=${encodeURIComponent(item.addr)}','_blank')">${esc(item.addr)}</div>` : '';
    const hoursHtml  = item.hours ? `<div class="sl-hours">${esc(item.hours)}</div>` : '';
    const linkHtml   = item.link  ? `<div class="sl-link" onclick="event.stopPropagation();window.open('${esc(item.link)}','_blank')">${esc(item.link)}</div>` : '';

    return `
    <div class="sl-card" onclick="openShopSheet(${i})">
      <div class="sl-img-col">
        ${photoUrl ? `<img class="sl-img" src="${photoUrl}">` : `<div class="sl-img-empty"></div>`}
      </div>
      <div class="sl-content">
        <button class="sl-del" onclick="event.stopPropagation();deleteShopItem(${i})">×</button>
        ${nameHtml}
        ${addrHtml}
        ${hoursHtml}
        ${linkHtml}
        <div class="sl-bottom">
          <div class="sl-qty-row">
            <button class="sl-qty-btn" onclick="event.stopPropagation();changeShopQty(${i},-1)">−</button>
            <span class="sl-qty">${item.qty || 1}</span>
            <button class="sl-qty-btn" onclick="event.stopPropagation();changeShopQty(${i},1)">＋</button>
          </div>
          <button class="sl-check" onclick="event.stopPropagation();toggleShop(${i})">
            <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px"><path d="m424-312 282-282-56-56-226 226-114-114-56 56 170 170Zm56 232q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
          </button>
        </div>
      </div>
    </div>`;
  }).join('');
}

let _shopEditIdx = null;

function openShopSheet(idx) {
  _shopEditIdx = (idx !== undefined && idx !== null) ? idx : null;
  const isNew = _shopEditIdx === null;
  const item = isNew ? {} : (data.shopping[_shopEditIdx] || {});

  const fields = ['name','addr','hours','link','qty'];
  fields.forEach(k => {
    const el = document.getElementById('sf-' + k);
    if (el) el.value = (k === 'qty') ? (item.qty || 1) : (item[k] || '');
  });

  // photo
  const photoUrl = item.photo ? resolvePhoto(item.photo) : '';
  const photoEl  = document.getElementById('sf-photo-preview');
  if (photoEl) {
    photoEl.style.backgroundImage = photoUrl ? `url('${photoUrl}')` : '';
    photoEl.classList.toggle('has-photo', !!photoUrl);
  }

  document.getElementById('shop-sheet-title').textContent = isNew ? '新增品項' : '編輯品項';
  document.getElementById('modal-shop-sheet').classList.add('open');
  setTimeout(() => {
    document.getElementById('sf-name')?.focus();
    document.querySelectorAll('#modal-shop-sheet .ev-auto').forEach(el => autoResize(el));
    document.querySelectorAll('#modal-shop-sheet .ev-auto').forEach(el => {
      if (!el.dataset.autoInited) {
        el.dataset.autoInited = '1';
        el.addEventListener('input', () => autoResize(el));
      }
    });
  }, 340);
}

function saveShopSheet() {
  const get = id => document.getElementById(id)?.value.trim() || '';
  const vals = {
    name:    get('sf-name'),
    addr:    get('sf-addr'),
    hours:   get('sf-hours'),
    link:    get('sf-link'),
    qty:     Math.max(1, parseInt(document.getElementById('sf-qty')?.value) || 1),
    done:    false,
  };
  if (_shopEditIdx !== null) {
    Object.assign(data.shopping[_shopEditIdx], vals);
  } else {
    if (!data.shopping) data.shopping = [];
    data.shopping.push({ photo: '', ...vals });
  }
  save();
  closeModal('modal-shop-sheet');
  renderShopItems();
}

async function handleShopPhotoSheet(input) {
  const file = input.files[0];
  if (!file) return;
  showUploadStatus('上傳中...');
  try {
    const url = await uploadToImgBB(file);
    if (_shopEditIdx !== null && data.shopping[_shopEditIdx]) {
      data.shopping[_shopEditIdx].photo = url;
      save();
    }
    const photoEl = document.getElementById('sf-photo-preview');
    if (photoEl) {
      photoEl.style.backgroundImage = `url('${url}')`;
      photoEl.classList.add('has-photo');
    }
  } catch(err) {
    alert('上傳失敗：' + err.message);
  } finally {
    showUploadStatus('');
  }
}

function addShopItem() { openShopSheet(null); }

function saveShopField(i, field, val) {
  if (!data.shopping[i]) return;
  data.shopping[i][field] = val; save();
}

function changeShopQty(i, delta) {
  if (!data.shopping[i]) return;
  data.shopping[i].qty = Math.max(1, (data.shopping[i].qty || 1) + delta);
  save(); renderShopItems();
}

function toggleShop(i) {
  if (!data.shopping[i]) return;
  data.shopping[i].done = !data.shopping[i].done;
  save(); renderShopItems();
}

function deleteShopItem(i) {
  data.shopping.splice(i, 1);
  save(); renderShopItems();
}


/* ─── Tickets ─── */
function ticketDefaults() {
  return { id: Date.now(), name: '票券名稱', date: '', note: '', photo: '' };
}

function addTicketCard() {
  if (!data.tickets) data.tickets = [];
  data.tickets.push(ticketDefaults());
  save(); renderTicketCards();
}

function deleteTicketCard(id) {
  data.tickets = data.tickets.filter(t => t.id !== id);
  save(); renderTicketCards();
}

function saveTicketField(id, field, val) {
  const t = data.tickets.find(t => t.id === id);
  if (t) { t[field] = val; save(); }
}

async function handleTicketPhoto(input, id) {
  const file = input.files[0];
  if (!file) return;
  showUploadStatus('上傳中...');
  try {
    const url = await uploadToImgBB(file);
    const t = data.tickets.find(t => t.id === id);
    if (t) { t.photo = url; save(); renderTicketCards(); }
  } catch(err) {
    alert('上傳失敗：' + err.message);
  } finally {
    showUploadStatus('');
  }
}

function addTicketFromPhoto(input) {
  const files = [...input.files];
  if (!data.tickets) data.tickets = [];
  files.forEach(async file => {
    showUploadStatus('上傳中...');
    try {
      const url = await uploadToImgBB(file);
      data.tickets.push({ id: Date.now() + Math.random(), photo: url });
      save();
      renderTicketCards();
    } catch(err) {
      alert('上傳失敗：' + err.message);
    } finally {
      showUploadStatus('');
    }
  });
  input.value = '';
}


function openTicketLightbox(url) {
  // Build URL list from current tickets
  const urls = (data.tickets || [])
    .filter(t => t.photo)
    .map(t => resolvePhoto(t.photo));
  if (!urls.length) return;
  let idx = urls.indexOf(url);
  if (idx < 0) idx = 0;

  let lb = document.getElementById('ticket-lightbox');
  if (!lb) {
    lb = document.createElement('div');
    lb.id = 'ticket-lightbox';
    lb.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.92);z-index:9999;overflow:hidden;touch-action:none;';

    const img = document.createElement('img');
    img.id = 'ticket-lightbox-img';
    img.style.cssText = 'position:absolute;top:0;left:0;transform-origin:0 0;will-change:transform;max-width:none;';
    lb.appendChild(img);

    // Counter
    const counter = document.createElement('div');
    counter.id = 'ticket-lb-counter';
    counter.style.cssText = 'position:absolute;top:20px;left:0;right:0;text-align:center;color:rgba(255,255,255,0.7);font-family:var(--mono);font-size:13px;pointer-events:none;z-index:10;';
    lb.appendChild(counter);

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = 'position:absolute;top:12px;right:16px;z-index:11;background:rgba(0,0,0,0.5);color:#fff;border:none;font-size:28px;line-height:1;width:44px;height:44px;border-radius:50%;cursor:pointer;';
    closeBtn.addEventListener('click', () => lb.style.display = 'none');
    lb.appendChild(closeBtn);

    document.body.appendChild(lb);
    _initLightboxPinch(lb, img);
  }

  lb._urls = urls;
  lb._idx = idx;
  lb.style.display = 'block';
  _lbShowIdx(lb);
}

function _lbShowIdx(lb) {
  const img = document.getElementById('ticket-lightbox-img');
  const counter = document.getElementById('ticket-lb-counter');
  const urls = lb._urls;
  const idx = lb._idx;
  img.src = urls[idx];
  img.style.transform = '';
  if (counter) counter.textContent = urls.length > 1 ? `${idx + 1} / ${urls.length}` : '';
  img.onload = () => _lbFitImage(lb, img);
}

function _lbFitImage(lb, img) {
  const vw = lb.clientWidth, vh = lb.clientHeight;
  const iw = img.naturalWidth, ih = img.naturalHeight;
  const scale = Math.min(vw / iw, vh / ih);
  const tx = (vw - iw * scale) / 2;
  const ty = (vh - ih * scale) / 2;
  img._lbScale = scale;
  img._lbMinScale = scale;
  img._lbTx = tx; img._lbTy = ty;
  img.style.transition = 'none';
  img.style.transform = `translate(${tx}px,${ty}px) scale(${scale})`;
}

function _initLightboxPinch(lb, img) {
  let dragging = false, lastX = 0, lastY = 0;
  let pinchDist = null, pinchMidX = 0, pinchMidY = 0;

  function clamp(v, min, max) { return Math.min(max, Math.max(min, v)); }
  function dist(t1, t2) { return Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY); }
  function mid(t1, t2) { return { x: (t1.clientX + t2.clientX) / 2, y: (t1.clientY + t2.clientY) / 2 }; }

  function apply(smooth) {
    const vw = lb.clientWidth, vh = lb.clientHeight;
    const iw = img.naturalWidth, ih = img.naturalHeight;
    const s = img._lbScale || 1;
    const rw = iw * s, rh = ih * s;
    img._lbTx = rw <= vw ? (vw - rw) / 2 : clamp(img._lbTx, vw - rw, 0);
    img._lbTy = rh <= vh ? (vh - rh) / 2 : clamp(img._lbTy, vh - rh, 0);
    img.style.transition = smooth ? 'transform 0.18s ease' : 'none';
    img.style.transform = `translate(${img._lbTx}px,${img._lbTy}px) scale(${s})`;
  }

  function zoomAt(px, py, factor) {
    const min = img._lbMinScale || 0.1;
    const newScale = clamp((img._lbScale || 1) * factor, min, min * 10);
    img._lbTx = px - (px - (img._lbTx || 0)) * (newScale / (img._lbScale || 1));
    img._lbTy = py - (py - (img._lbTy || 0)) * (newScale / (img._lbScale || 1));
    img._lbScale = newScale;
    apply(false);
  }

  lb.addEventListener('touchstart', e => {
    img.style.transition = 'none';
    if (e.touches.length === 1) {
      dragging = true; pinchDist = null;
      lastX = e.touches[0].clientX; lastY = e.touches[0].clientY;
    } else if (e.touches.length === 2) {
      dragging = false;
      pinchDist = dist(e.touches[0], e.touches[1]);
      const m = mid(e.touches[0], e.touches[1]);
      pinchMidX = m.x; pinchMidY = m.y;
    }
  }, { passive: true });

  lb.addEventListener('touchmove', e => {
    e.preventDefault();
    if (e.touches.length === 1 && dragging && pinchDist === null) {
      img._lbTx = (img._lbTx || 0) + e.touches[0].clientX - lastX;
      img._lbTy = (img._lbTy || 0) + e.touches[0].clientY - lastY;
      lastX = e.touches[0].clientX; lastY = e.touches[0].clientY;
      apply(false);
    } else if (e.touches.length === 2 && pinchDist !== null) {
      const newDist = dist(e.touches[0], e.touches[1]);
      const m = mid(e.touches[0], e.touches[1]);
      img._lbTx = (img._lbTx || 0) + m.x - pinchMidX;
      img._lbTy = (img._lbTy || 0) + m.y - pinchMidY;
      pinchMidX = m.x; pinchMidY = m.y;
      zoomAt(m.x, m.y, newDist / pinchDist);
      pinchDist = newDist;
    }
  }, { passive: false });

  lb.addEventListener('touchend', e => {
    if (e.touches.length < 2) pinchDist = null;
    if (e.touches.length === 0) {
      dragging = false;
      // If back to min scale, re-center
      if ((img._lbScale || 1) <= (img._lbMinScale || 0.1) * 1.05) {
        _lbFitImage(lb, img);
      }
    }
  }, { passive: true });

  // Double-tap to zoom + swipe to navigate
  let lastTap = 0;
  let swipeStartX = 0, swipeStartY = 0, swipeStartScale = 1;
  lb.addEventListener('touchstart', e => {
    if (e.touches.length === 1) {
      swipeStartX = e.touches[0].clientX;
      swipeStartY = e.touches[0].clientY;
      swipeStartScale = img._lbScale || 1;
    }
  }, { passive: true });

  lb.addEventListener('touchend', e => {
    if (e.touches.length > 0) return;
    const now = Date.now();
    const dx = e.changedTouches[0].clientX - swipeStartX;
    const dy = e.changedTouches[0].clientY - swipeStartY;
    const min = img._lbMinScale || 0.1;
    const atMinScale = (img._lbScale || 1) <= min * 1.05;

    // Swipe navigate when at base scale and fast horizontal swipe
    if (atMinScale && Math.abs(dx) > 60 && Math.abs(dy) < Math.abs(dx) * 0.6 && (lb._urls?.length > 1)) {
      const dir = dx < 0 ? 1 : -1;
      lb._idx = (lb._idx + dir + lb._urls.length) % lb._urls.length;
      _lbShowIdx(lb);
      lastTap = 0;
      return;
    }

    // Double-tap zoom
    if (now - lastTap < 300 && Math.abs(dx) < 20 && Math.abs(dy) < 20) {
      const s = img._lbScale || 1;
      if (s > min * 1.1) {
        _lbFitImage(lb, img);
      } else {
        const t = e.changedTouches[0];
        zoomAt(t.clientX, t.clientY, 2.5);
      }
    }
    lastTap = now;
  }, { passive: true });

  // Wheel zoom (desktop)
  lb.addEventListener('wheel', e => {
    e.preventDefault();
    zoomAt(e.clientX, e.clientY, e.deltaY < 0 ? 1.12 : 1 / 1.12);
  }, { passive: false });
}


function openExpenseSheetForEdit(id) {
  const item = (data.expenses[expenseDay] || []).find(i => i.id === id);
  if (!item) return;
  window._expEditId = id;
  initCatDropdown();
  _selectedCat = item.cat || '其他';
  const labelEl = document.getElementById('exp-cat-label');
  if (labelEl) labelEl.textContent = _selectedCat;
  const nameEl = document.getElementById('exp-name');
  const amtEl  = document.getElementById('exp-amount');
  if (nameEl) nameEl.value = item.name || '';
  if (amtEl)  amtEl.value  = item.amount || '';
  const negBtn2 = document.getElementById('exp-neg-btn');
  if (negBtn2) {
    const isNeg = parseFloat(item.amount || 0) < 0;
    negBtn2.style.color = isNeg ? '#E53E3E' : '#AAAAAA';
    negBtn2.style.borderColor = isNeg ? '#E53E3E' : '#E0E0E0';
  }
  const timeEl = document.getElementById('exp-time');
  if (timeEl) timeEl.value = item.time || '';
  // Render subitems into the shared list
  _renderExpSubitemsForEdit(item.subitems || []);
  document.getElementById('modal-expense-sheet').classList.add('open');
  setTimeout(() => document.getElementById('exp-amount')?.focus(), 340);
}

function renderTicketCards() {
  const cards = data.tickets || [];
  document.getElementById('ticket-cards').innerHTML = cards.length
    ? cards.map(t => {
        const photoUrl = t.photo ? resolvePhoto(t.photo) : '';
        return `
        <div class="ticket-card">
          <div class="ticket-img-wrap">
            <img class="ticket-img" src="${photoUrl}" alt="票券" onclick="openTicketLightbox('${photoUrl}')">
            <button class="ticket-img-del" onclick="deleteTicketCard(${t.id})">
              <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
            </button>
          </div>
        </div>`;
      }).join('')
    : `<div class="list-empty"></div>`;
}

function deleteTicketPhoto(id) {
  const t = data.tickets.find(t => t.id === id);
  if (t) { t.photo = ''; save(); renderTicketCards(); }
}

/* ─── Notes ─── */
/* ═══════════════════════════════════════
   NOTES — card-based
═══════════════════════════════════════ */
let _noteEditId = null;
let _noteImages = []; // staging images in sheet

function noteBodyToHtml(text) {
  const segments = text.split(/\[\[IMG:([^\]]+)\]\]/);
  let html = '';
  for (let i = 0; i < segments.length; i++) {
    if (i % 2 === 0) {
      const t = segments[i].trim();
      if (t) {
        const escaped = esc(t).replace(/(https?:\/\/[^\s]+)/g,
          url => `<a href="${url}" target="_blank" onclick="event.stopPropagation()">${url}</a>`);
        html += `<span style="white-space:pre-wrap">${escaped}</span>`;
      }
    } else {
      html += `<img src="${segments[i]}" style="max-width:100%;border-radius:0;display:block;margin:8px 0" onclick="event.stopPropagation()">`;
    }
  }
  return html;
}

function openNoteSheet(id) {
  _noteEditId = id;
  const isNew = id === null;
  document.getElementById('note-sheet-title').textContent = isNew ? '新增筆記' : '編輯筆記';
  const delRow = document.getElementById('note-delete-row');
  if (delRow) delRow.style.display = isNew ? 'none' : 'flex';
  const note = isNew ? null : data.notes.find(n => n.id === id);
  const ta = document.getElementById('note-sheet-content');
  // Migrate legacy images array into [[IMG:]] markers
  let noteContent = note?.content || '';
  if (note?.images?.length && !noteContent.includes('[[IMG:')) {
    noteContent += note.images.map(u => '\n[[IMG:' + u + ']]').join('');
  }
  ta.value = noteContent;
  ta.setSelectionRange(0, 0);
  _renderNoteImgPreview();
  document.getElementById('modal-note-sheet').classList.add('open');
  setTimeout(() => { ta.focus(); ta.setSelectionRange(0, 0); ta.scrollTop = 0; }, 340);
}

function renderNotes() {
  if (!data.notes) data.notes = [];
  if (typeof data.notes === 'string') {
    const old = data.notes.trim();
    data.notes = old ? [{ id: Date.now(), content: old }] : [];
  }
  const list = document.getElementById('notes-card-list');
  if (!list) return;
  if (!data.notes.length) {
    list.innerHTML = '<div style="color:#CCCCCC;font-family:var(--mono);font-size:14px;text-align:center;padding:40px 0">尚無筆記</div>';
    return;
  }
  list.innerHTML = [...data.notes].reverse().map(n => {
    const lines = (n.content || '').split('\n');
    const title = lines[0] || '';
    const body = lines.slice(1).join('\n').trim();
    // merge legacy images into body
    let fullBody = body;
    if (n.images?.length && !fullBody.includes('[[IMG:')) {
      fullBody += n.images.map(u => '\n[[IMG:' + u + ']]').join('');
    }
    // Extract first image for thumbnail
    const imgMatch = fullBody.match(/\[\[IMG:([^\]]+)\]\]/);
    const thumbUrl = imgMatch ? imgMatch[1] : null;
    // Body without [[IMG:]] for text-only clamp display
    const textOnly = fullBody.replace(/\n?\[\[IMG:[^\]]+\]\]\n?/g, '').trim();
    const bodyHtml = fullBody ? noteBodyToHtml(fullBody) : '';
    const textOnlyHtml = textOnly ? `<div class="note-card-body note-card-body-clamp" onclick="openNoteSheet(${n.id})">${esc(textOnly).replace(/(https?:\/\/[^\s]+)/g, url => `<a href="${url}" target="_blank" onclick="event.stopPropagation()">${url}</a>`)}</div>` : '';
    const thumbHtml = thumbUrl ? `<img class="note-card-thumb" src="${thumbUrl}" onclick="openNoteSheet(${n.id})">` : '';
    // Collapsed view: thumbnail + text side by side
    const collapsedInner = `<div class="note-card-content-row" id="ncollapsed-${n.id}">
        ${thumbHtml}
        <div class="note-card-text-col" style="margin-top:-5px">${textOnlyHtml}</div>
      </div>`;
    // Expanded view: full bodyHtml with images inline
    const expandedInner = bodyHtml ? `<div class="note-card-body" onclick="openNoteSheet(${n.id})" style="display:none" id="nexpanded-${n.id}">${bodyHtml}</div>` : '';
    return `<div class="note-card" id="ncard-${n.id}">
      <button onclick="event.stopPropagation();confirmDeleteNote(${n.id})" style="position:absolute;top:8px;right:8px;background:none;border:none;font-size:18px;color:#CCCCCC;cursor:pointer;line-height:1;padding:2px 6px">×</button>
      <div class="note-card-title" style="padding-right:28px;margin-bottom:8px" onclick="openNoteSheet(${n.id})">${esc(title)}</div>
      <div class="note-card-inner collapsed" id="ninner-${n.id}">
        ${collapsedInner}
        ${expandedInner}
      </div>
      <div class="note-card-toggle" id="ntoggle-${n.id}" onclick="toggleNoteCard(${n.id})" style="display:none">
        <svg id="ntoggle-icon-${n.id}" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#AAAAAA"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>
      </div>
    </div>`;
  }).join('');

  requestAnimationFrame(() => {
    if (!Array.isArray(data.notes)) return;
    [...data.notes].reverse().forEach(n => {
      const inner  = document.getElementById('ninner-' + n.id);
      const toggle = document.getElementById('ntoggle-' + n.id);
      if (!inner || !toggle) return;
      // Show toggle if content overflows 4 lines or has images
      const hasImg = (n.content || '').includes('[[IMG:') || n.images?.length;
      if (inner.scrollHeight > inner.clientHeight + 4 || hasImg) {
        toggle.style.display = 'flex';
      }
    });
  });
}

function toggleNoteCard(id) {
  const inner       = document.getElementById('ninner-'       + id);
  const toggle      = document.getElementById('ntoggle-'      + id);
  const icon        = document.getElementById('ntoggle-icon-' + id);
  const expandedEl  = document.getElementById('nexpanded-'    + id);
  const collapsedEl = document.getElementById('ncollapsed-'   + id);
  if (!inner) return;
  const isExpanded = inner.classList.toggle('expanded');
  inner.classList.toggle('collapsed', !isExpanded);
  // Show/hide views
  if (collapsedEl) collapsedEl.style.display = isExpanded ? 'none' : 'flex';
  if (expandedEl)  expandedEl.style.display  = isExpanded ? 'block' : 'none';
  // Swap chevron icon
  if (icon) {
    icon.innerHTML = isExpanded
      ? '<path d="M480-616 240-376l-56-56 296-296 296 296-56 56-240-240Z"/>'
      : '<path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/>';
  }
}

function confirmDeleteNote(id) {
  showConfirm('刪除筆記？', '此筆記將永久移除。', () => {
    data.notes = data.notes.filter(n => n.id !== id);
    save();
    renderNotes();
  });
}

function saveNoteSheet() {
  const content = document.getElementById('note-sheet-content').value;
  if (!content.trim()) { closeModal('modal-note-sheet'); return; }
  if (!Array.isArray(data.notes)) data.notes = [];
  if (_noteEditId === null) {
    data.notes.push({ id: Date.now(), content });
  } else {
    const note = data.notes.find(n => n.id === _noteEditId);
    if (note) note.content = content;
  }
  save();
  closeModal('modal-note-sheet');
  renderNotes();
}

function noteInsertImage() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = async () => {
    const file = input.files[0];
    if (!file) return;
    showUploadStatus('上傳圖片中…');
    try {
      const url = await uploadToImgBB(file);
      showUploadStatus('');
      const ta = document.getElementById('note-sheet-content');
      const start = ta.selectionStart;
      const marker = '\n[[IMG:' + url + ']]\n';
      ta.value = ta.value.slice(0, start) + marker + ta.value.slice(ta.selectionEnd);
      ta.setSelectionRange(start + marker.length, start + marker.length);
      ta.focus();
      _renderNoteImgPreview();
    } catch(e) {
      showUploadStatus('');
      showToast('上傳失敗，請再試一次');
    }
  };
  input.click();
}

function _renderNoteImgPreview() {
  const wrap = document.getElementById('note-img-preview');
  if (!wrap) return;
  const ta = document.getElementById('note-sheet-content');
  const matches = ta ? [...ta.value.matchAll(/\[\[IMG:([^\]]+)\]\]/g)] : [];
  if (!matches.length) { wrap.innerHTML = ''; return; }
  wrap.innerHTML = matches.map((m, i) =>
    `<div style="position:relative;display:inline-block">
      <img src="${m[1]}" style="width:72px;height:72px;object-fit:cover;border-radius:6px;display:block">
      <button onclick="_removeNoteImg(${i})" style="position:absolute;top:-6px;right:-6px;width:20px;height:20px;border-radius:50%;background:#1A1A1A;border:none;color:#fff;font-size:13px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0">×</button>
    </div>`
  ).join('');
}

function _removeNoteImg(idx) {
  const ta = document.getElementById('note-sheet-content');
  if (!ta) return;
  let count = 0;
  ta.value = ta.value.replace(/\n?\[\[IMG:[^\]]+\]\]\n?/g, m => count++ === idx ? '' : m);
  _renderNoteImgPreview();
}

function deleteCurrentNote() {
  if (_noteEditId === null) return;
  confirmDeleteNote(_noteEditId);
  closeModal('modal-note-sheet');
}

function saveNotes() {} // legacy no-op}

function saveNotes() {
  data.notes = document.getElementById('notes-content').value;
  save();
}



/* ─── Flights ─── */
function flightDefaults() {
  return {
    id: Date.now(),
    pnr: '', airline: '', url: '',
    outbound: { flightNo:'', date:'', fromTime:'', toTime:'', fromCode:'', fromName:'', fromTerminal:'', toCode:'', toName:'', toTerminal:'', baggage:'', seat:'' },
    inbound: null
  };
}

function migrateFlights() {
  if (!data.flights) { data.flights = []; return; }
  data.flights = data.flights.map(f => {
    if (f.outbound !== undefined) return f;
    const parseTimes = (str) => {
      const m = (str||'').match(/(\d{1,2}:\d{2})\s*[---]+\s*(\d{1,2}:\d{2})/);
      return m ? [m[1], m[2]] : [str||'', ''];
    };
    const [ft, tt] = parseTimes(f.times);
    return {
      id: f.id || Date.now(),
      pnr: '', airline: f.airline||'', url: '',
      outbound: {
        flightNo: f.flightNo||'', date: f.fromDate||'',
        fromTime: ft, toTime: tt,
        fromCode: f.fromCode||'', fromName: f.fromName||'', fromTerminal: f.fromTerminal||'',
        toCode: f.toCode||'', toName: f.toName||'', toTerminal: f.toTerminal||'',
        baggage: f.baggage||'', seat: f.seat||''
      },
      inbound: null
    };
  });
}

let _flightEditId = null;
function _ffSet(id, val) { const el = document.getElementById(id); if (el) el.value = val||''; }
function _ffGet(id) { return document.getElementById(id)?.value.trim()||''; }

function openFlightSheet(editId) {
  migrateFlights();
  _flightEditId = editId || null;
  ['pnr','airline','url',
   'ob-flightNo','ob-date','ob-times','ob-fromCode','ob-fromName','ob-fromTerminal','ob-toCode','ob-toName','ob-toTerminal','ob-baggage','ob-seat',
   'ib-flightNo','ib-date','ib-times','ib-fromCode','ib-fromName','ib-fromTerminal','ib-toCode','ib-toName','ib-toTerminal','ib-baggage','ib-seat'
  ].forEach(k => _ffSet('ff-'+k, ''));
  const ibWrap   = document.getElementById('ff-inbound-wrap');
  const ibToggle = document.getElementById('ff-inbound-toggle');
  if (editId) {
    const f = data.flights.find(f => f.id === editId);
    if (f) {
      _ffSet('ff-pnr', f.pnr); _ffSet('ff-airline', f.airline); _ffSet('ff-url', f.url);
      const fillSeg = (prefix, seg) => {
        if (!seg) return;
        _ffSet('ff-'+prefix+'-flightNo',     seg.flightNo);
        _ffSet('ff-'+prefix+'-date',         seg.date);
        _ffSet('ff-'+prefix+'-times',        seg.fromTime && seg.toTime ? seg.fromTime+'-'+seg.toTime : '');
        _ffSet('ff-'+prefix+'-fromCode',     seg.fromCode);
        _ffSet('ff-'+prefix+'-fromName',     seg.fromName);
        _ffSet('ff-'+prefix+'-fromTerminal', seg.fromTerminal);
        _ffSet('ff-'+prefix+'-toCode',       seg.toCode);
        _ffSet('ff-'+prefix+'-toName',       seg.toName);
        _ffSet('ff-'+prefix+'-toTerminal',   seg.toTerminal);
        _ffSet('ff-'+prefix+'-baggage',      seg.baggage);
        _ffSet('ff-'+prefix+'-seat',         seg.seat);
      };
      fillSeg('ob', f.outbound);
      if (f.inbound) {
        fillSeg('ib', f.inbound);
        if (ibWrap)   ibWrap.style.display   = 'block';
        if (ibToggle) ibToggle.style.display = 'none';
      } else {
        if (ibWrap)   ibWrap.style.display   = 'none';
        if (ibToggle) ibToggle.style.display = 'flex';
      }
    }
  } else {
    if (ibWrap)   ibWrap.style.display   = 'none';
    if (ibToggle) ibToggle.style.display = 'flex';
  }
  const title = document.getElementById('flight-sheet-title');
  if (title) title.textContent = editId ? '編輯機票' : '新增機票';
  document.getElementById('modal-flight-sheet').classList.add('open');
  setTimeout(() => document.getElementById('ff-pnr')?.focus(), 340);
}

function ffShowInbound() {
  const ibWrap   = document.getElementById('ff-inbound-wrap');
  const ibToggle = document.getElementById('ff-inbound-toggle');
  if (ibWrap)   ibWrap.style.display   = 'block';
  if (ibToggle) ibToggle.style.display = 'none';
  _ffSet('ff-ib-fromCode',     _ffGet('ff-ob-toCode'));
  _ffSet('ff-ib-fromName',     _ffGet('ff-ob-toName'));
  _ffSet('ff-ib-fromTerminal', _ffGet('ff-ob-toTerminal'));
  _ffSet('ff-ib-toCode',       _ffGet('ff-ob-fromCode'));
  _ffSet('ff-ib-toName',       _ffGet('ff-ob-fromName'));
  _ffSet('ff-ib-toTerminal',   _ffGet('ff-ob-fromTerminal'));
  _ffSet('ff-ib-baggage',      _ffGet('ff-ob-baggage'));
}

function fmtFlightTimes(el) {
  const digits = el.value.replace(/\D/g, '').slice(0, 8);
  const len = digits.length;

  if (len === 0) { el.value = ''; return; }

  // Build departure time
  let h1 = digits.slice(0, 2);
  let m1 = digits.slice(2, 4);
  let h2 = digits.slice(4, 6);
  let m2 = digits.slice(6, 8);

  // Auto-zero: if first digit > 2, prepend 0
  if (len === 1 && parseInt(digits[0]) > 2) {
    el.value = '0' + digits[0] + ':';
    return;
  }

  if (len <= 2) {
    el.value = digits;
    if (len === 2) { el.value = h1 + ':'; }
    return;
  }

  if (len <= 4) {
    let out = h1 + ':' + m1;
    if (len === 4) out += '－'; // auto-dash after first time complete
    el.value = out;
    return;
  }

  // Building second time
  let out = h1 + ':' + m1 + '－';

  // Auto-zero second segment
  if (len === 5 && parseInt(digits[4]) > 2) {
    out += '0' + digits[4] + ':';
    el.value = out;
    return;
  }

  if (len === 5) { out += h2; el.value = out; return; }
  if (len === 6) { out += h2 + ':'; el.value = out; return; }
  out += h2 + ':' + m2;
  el.value = out;
}


function saveFlightSheet() {
  const parseSeg = (prefix) => {
    const times = _ffGet('ff-'+prefix+'-times');
    const m = times.match(/(\d{1,2}:\d{2})\s*[-－—–]+\s*(\d{1,2}:\d{2})/);
    return {
      flightNo:     _ffGet('ff-'+prefix+'-flightNo').toUpperCase(),
      date:         _ffGet('ff-'+prefix+'-date'),
      fromTime:     m ? m[1] : times,
      toTime:       m ? m[2] : '',
      fromCode:     _ffGet('ff-'+prefix+'-fromCode').toUpperCase(),
      fromName:     _ffGet('ff-'+prefix+'-fromName'),
      fromTerminal: _ffGet('ff-'+prefix+'-fromTerminal'),
      toCode:       _ffGet('ff-'+prefix+'-toCode').toUpperCase(),
      toName:       _ffGet('ff-'+prefix+'-toName'),
      toTerminal:   _ffGet('ff-'+prefix+'-toTerminal'),
      baggage:      _ffGet('ff-'+prefix+'-baggage'),
      seat:         _ffGet('ff-'+prefix+'-seat').toUpperCase(),
    };
  };
  const ibWrap   = document.getElementById('ff-inbound-wrap');
  const hasInbound = ibWrap && ibWrap.style.display !== 'none';
  const vals = {
    pnr:      _ffGet('ff-pnr').toUpperCase(),
    airline:  _ffGet('ff-airline'),
    url:      _ffGet('ff-url'),
    outbound: parseSeg('ob'),
    inbound:  hasInbound ? parseSeg('ib') : null,
  };
  if (_flightEditId) {
    const f = data.flights.find(f => f.id === _flightEditId);
    if (f) Object.assign(f, vals);
  } else {
    data.flights.push({ id: Date.now(), ...vals });
  }
  save();
  closeModal('modal-flight-sheet');
  renderFlightCards();
}

function deleteFlightCard(id) {
  data.flights = data.flights.filter(f => f.id !== id);
  save(); renderFlightCards();
}

function renderFlightCards() {
  migrateFlights();
  const el = document.getElementById('flight-cards');
  if (!data.flights.length) {
    el.innerHTML = `<div class="list-empty"></div>`;
    return;
  }
  const renderSeg = (seg, label) => {
    if (!seg) return '';
    const airportRow = (code, name, terminal, alignRight) => {
      const cls = alignRight ? 'fc2-airport-right' : '';
      return `<div class="fc2-airport-wrap ${cls}">
        ${code ? `<span class="fc2-code">${esc(code)}</span>` : ''}
        <span class="fc2-aname">${esc(name||'')}</span>
        ${terminal ? `<span class="fc2-terminal">Terminal ${esc(terminal)}</span>` : ''}
      </div>`;
    };
    return `
      <div class="fc2-seg">
        <div class="fc2-seg-tag">${label}</div>
        <div class="fc2-date-row">
          <span>${esc(seg.date||'')}</span>
          <span class="fc2-flightno">${esc(seg.flightNo||'')}</span>
        </div>
        <div class="fc2-times-row">
          <span class="fc2-time">${esc(seg.fromTime||'')}</span>
          <div class="fc2-mid">
            <div class="fc2-dashes">
              <div class="fc2-dash"></div>
              <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="#D4AF37"><path d="M280-80v-100l120-84v-144L80-280v-120l320-224v-176q0-33 23.5-56.5T480-880q33 0 56.5 23.5T560-800v176l320 224v120L560-408v144l120 84v100l-200-60-200 60Z"/></svg>
              <div class="fc2-dash"></div>
            </div>
          </div>
          <span class="fc2-time fc2-time-right">${esc(seg.toTime||'')}</span>
        </div>
        <div class="fc2-airports">
          ${airportRow(seg.fromCode, seg.fromName, seg.fromTerminal, false)}
          ${airportRow(seg.toCode,   seg.toName,   seg.toTerminal,   true)}
        </div>
        ${(seg.baggage||seg.seat) ? `
        <div class="fc2-meta">
          ${seg.baggage ? `<div class="fc2-meta-item"><span class="fc2-meta-label">行李</span><span class="fc2-meta-val">${esc(seg.baggage)} kg</span></div>` : '<div></div>'}
          ${seg.seat    ? `<div class="fc2-meta-item" style="align-items:flex-end"><span class="fc2-meta-label">座位</span><span class="fc2-meta-val">${esc(seg.seat)}</span></div>` : ''}
        </div>` : ''}
      </div>`;
  };

  el.innerHTML = data.flights.map(f => {
    const hostname = (() => { try { return new URL(f.url||'').hostname.replace(/^www\./,''); } catch(e) { return f.url||''; } })();
    const ibSeg = f.inbound ? renderSeg(f.inbound, '回程') : '';
    const tear  = f.inbound ? `
      <div class="fc2-tear">
        <div class="fc2-tear-line"></div>
      </div>` : '';
    return `
    <div class="fc2" onclick="openFlightSheet(${f.id})">
      <div class="fc2-head">
        <div>
          <div class="fc2-pnr-label">訂位代號</div>
          <div class="fc2-pnr">${esc(f.pnr||'—')}</div>
        </div>
        <div class="fc2-airline-block">
          <div class="fc2-pnr-label" style="text-align:right">航空公司</div>
          <div class="fc2-airline-name">${esc(f.airline||'')}</div>
        </div>
        <button class="fc2-del" onclick="event.stopPropagation();deleteFlightCard(${f.id})">×</button>
      </div>
      <div class="fc2-body">
        ${renderSeg(f.outbound, '去程')}
        ${tear}
        ${ibSeg}
      </div>
      ${f.url ? `<div class="fc2-url-row" onclick="event.stopPropagation();window.open('${esc(f.url)}','_blank')">${esc(f.url)}</div>` : ''}
    </div>`;
  }).join('');
}

/* ─── Hotels ─── */
/* ─── Hotel Data Model ─── */
function hotelDefaults() {
  return {
    id: Date.now(),
    name: '', addr: '', checkin: '', checkout: '',
    nights: 0, ref: '', breakfast: false, price: ''
  };
}

/* ─── Hotel Bottom Sheet ─── */
let _hotelEditId = null;
let _sheetBreakfast = false;

function calcNights(checkin, checkout) {
  const parse = s => {
    const m = String(s||'').match(/(\d{1,2})\/(\d{1,2})/);
    if (!m) return null;
    return new Date(new Date().getFullYear(), parseInt(m[1])-1, parseInt(m[2]));
  };
  const a = parse(checkin), b = parse(checkout);
  if (!a || !b) return 0;
  const diff = Math.round((b - a) / 86400000);
  return diff > 0 ? diff : 0;
}

function fmtHotelPrice(el) {
  const raw = el.value.replace(/[^0-9]/g, '');
  if (raw) el.value = parseInt(raw).toLocaleString();
  else el.value = '';
}

function fmtShopHours(el) {
  // 輸入 09001200 → 09:00-12:00
  const digits = el.value.replace(/\D/g, '').slice(0, 8);
  const fmtTime = (d4) => {
    if (d4.length <= 2) return d4;
    return d4.slice(0,2) + ':' + d4.slice(2,4);
  };
  if (digits.length <= 4) {
    el.value = fmtTime(digits);
  } else {
    el.value = fmtTime(digits.slice(0,4)) + '-' + fmtTime(digits.slice(4,8));
  }
}


function fmtHotelDates(el) {
  const raw    = el.value;
  const digits = raw.replace(/\D/g, '').slice(0, 8);
  const fmt = (d4) => {
    if (d4.length < 4) return d4.slice(0,2) + (d4.length > 2 ? '/' + d4.slice(2) : '');
    const mo = d4.slice(0,2), dy = d4.slice(2,4);
    const dt = new Date(new Date().getFullYear(), parseInt(mo)-1, parseInt(dy));
    const wd = ['日','一','二','三','四','五','六'][dt.getDay()];
    return mo + '/' + dy + '（' + wd + '）';
  };
  if (digits.length <= 4) {
    el.value = fmt(digits);
  } else {
    el.value = fmt(digits.slice(0,4)) + '-' + fmt(digits.slice(4,8));
  }
}

function openHotelSheet(editId) {
  _hotelEditId = editId || null;
  _sheetBreakfast = false;
  ['hf-name','hf-dates','hf-ref','hf-addr','hf-price'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
  if (editId) {
    const h = data.hotels.find(h => h.id === editId);
    if (h) {
      const set = (id, v) => { const el = document.getElementById(id); if (el) el.value = v || ''; };
      set('hf-name',  h.name);
      set('hf-dates', h.dates || '');
      set('hf-ref',   h.ref);
      set('hf-addr',  h.addr);
      if (document.getElementById('hf-price'))
        document.getElementById('hf-price').value = h.price ? parseInt(h.price).toLocaleString() : '';
      _sheetBreakfast = h.breakfast || false;
    }
  }
  const tog = document.getElementById('hf-breakfast-toggle');
  const lbl = document.getElementById('hf-breakfast-label');
  if (tog) tog.classList.toggle('on', _sheetBreakfast);
  if (lbl) lbl.textContent = _sheetBreakfast ? '含早餐' : '不含';
  const title = document.getElementById('hotel-sheet-title');
  if (title) title.textContent = editId ? '編輯住宿' : '新增住宿';
  const saveBtn = document.getElementById('hotel-sheet-save-btn');
  if (saveBtn) saveBtn.textContent = editId ? '更新' : '儲存';
  document.getElementById('modal-hotel-sheet').classList.add('open');
  setTimeout(() => {
    document.getElementById('hf-dates')?.focus();
    document.querySelectorAll('#modal-hotel-sheet .ev-auto').forEach(el => autoResize(el));
    document.querySelectorAll('#modal-hotel-sheet .ev-auto').forEach(el => {
      if (!el.dataset.autoInited) {
        el.dataset.autoInited = '1';
        el.addEventListener('input', () => autoResize(el));
      }
    });
  }, 340);
}

function saveHotelSheet() {
  const get = id => document.getElementById(id)?.value.trim() || '';
  const dates = get('hf-dates');
  const price = get('hf-price').replace(/[^0-9]/g,'');
  const parts = dates.split('-');
  const nights = calcNights(parts[0]?.trim(), parts[1]?.trim());
  const vals = { name: get('hf-name'), dates, ref: get('hf-ref'), addr: get('hf-addr'), price, nights, breakfast: _sheetBreakfast };
  if (_hotelEditId) {
    const h = data.hotels.find(h => h.id === _hotelEditId);
    if (h) Object.assign(h, vals);
  } else {
    data.hotels.push({ id: Date.now(), ...vals });
  }
  save(); closeModal('modal-hotel-sheet'); renderHotelCards();
}

function deleteHotelCard(id) {
  data.hotels = data.hotels.filter(h => h.id !== id);
  save(); renderHotelCards();
}

function renderHotelCards() {
  const sym = getCurrencySymbol();
  const el  = document.getElementById('hotel-cards');
  if (!data.hotels.length) {
    el.innerHTML = `<div class="list-empty"></div>`;
    return;
  }
  // Sort by checkin date ascending
  const sorted = [...data.hotels].sort((a, b) => {
    const pa = (a.checkin || a.dates || '').replace(/[^\d]/g, '');
    const pb = (b.checkin || b.dates || '').replace(/[^\d]/g, '');
    if (!pa) return 1;
    if (!pb) return -1;
    return pa.localeCompare(pb);
  });
  el.innerHTML = sorted.map(h => {
    const nights = h.nights || 0;
    const priceDisplay = h.price ? `${sym} ${parseInt(h.price).toLocaleString()}` : '';
    return `
    <div class="hotel-card2" onclick="openHotelSheet(${h.id})">
      <div class="hotel2-header">
        <div class="hotel2-dates">${esc(h.dates || '日期未設定')}</div>
        <div class="hotel2-right">
          ${nights > 0 ? `<span class="hotel2-nights">${nights} 晚</span>` : ''}
          <button class="hotel2-del" onclick="event.stopPropagation();deleteHotelCard(${h.id})">
            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
          </button>
        </div>
      </div>
      <div class="hotel2-name">${esc(h.name || '未命名')}</div>
      ${h.ref ? `<div class="hotel2-ref"><span class="hotel2-ref-label">訂單編號</span><span class="hotel2-ref-val">${esc(h.ref)}</span></div>` : ''}
      ${h.addr ? `<div class="hotel2-addr" onclick="event.stopPropagation();window.open('https://maps.google.com/?q=${encodeURIComponent(h.addr)}','_blank')">
        <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px"><path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-560q0-109-69.5-184.5T480-820q-101 0-170.5 75.5T240-560q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-560q0-150 96.5-245T480-900q127 0 223.5 95T800-560q0 112-79.5 229.5T480-80Zm0-480Z"/></svg>
        ${esc(h.addr)}</div>` : ''}
      ${h.breakfast ? `<div class="hotel2-tags"><span class="hotel2-tag-breakfast">含早餐</span></div>` : ''}
      ${priceDisplay ? `<div class="hotel2-price-row">
        <span class="hotel2-price-label">總價</span>
        <span class="hotel2-price-val">${priceDisplay}</span>
      </div>` : ''}
    </div>`;
  }).join('');
}


/* ═══════════════════════════════════════
   MODAL HELPERS
═══════════════════════════════════════ */
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  // Reset info-custom-list built flag so it rebuilds fresh next open (different trip may have different modules)
  if (id === 'modal-info-custom') {
    const list = document.getElementById('info-custom-list');
    if (list) delete list.dataset.built;
  }
}

document.querySelectorAll('.modal-overlay').forEach(o => {
  o.addEventListener('click', e => {
    if (e.target === o) o.classList.remove('open');
  });
});

/* ═══════════════════════════════════════
   SETTINGS
═══════════════════════════════════════ */
const CURRENCIES = [
  { code: 'TWD', symbol: 'NT$',  label: '新台幣'       },
  { code: 'JPY', symbol: '¥',    label: '日圓'         },
  { code: 'KRW', symbol: '₩',    label: '韓元'         },
  { code: 'HKD', symbol: 'HK$',  label: '港幣'         },
  { code: 'CNY', symbol: 'CN¥',  label: '人民幣'       },
  { code: 'MOP', symbol: 'MOP$', label: '澳門幣'       },
  { code: 'THB', symbol: '฿',    label: '泰銖'         },
  { code: 'SGD', symbol: 'S$',   label: '新加坡幣'     },
  { code: 'MYR', symbol: 'RM',   label: '馬來西亞令吉' },
  { code: 'VND', symbol: '₫',    label: '越南盾'       },
  { code: 'IDR', symbol: 'Rp',   label: '印尼盾'       },
  { code: 'PHP', symbol: '₱',    label: '菲律賓披索'   },
  { code: 'INR', symbol: '₹',    label: '印度盧比'     },
  { code: 'NPR', symbol: 'Rs',   label: '尼泊爾盧比'   },
  { code: 'LKR', symbol: 'Rs',   label: '斯里蘭卡盧比' },
  { code: 'USD', symbol: '$',    label: '美金'         },
  { code: 'EUR', symbol: '€',    label: '歐元'         },
  { code: 'GBP', symbol: '£',    label: '英鎊'         },
  { code: 'CHF', symbol: 'Fr',   label: '瑞士法郎'     },
  { code: 'SEK', symbol: 'kr',   label: '瑞典克朗'     },
  { code: 'NOK', symbol: 'kr',   label: '挪威克朗'     },
  { code: 'DKK', symbol: 'kr',   label: '丹麥克朗'     },
  { code: 'CZK', symbol: 'Kč',   label: '捷克克朗'     },
  { code: 'HUF', symbol: 'Ft',   label: '匈牙利福林'   },
  { code: 'PLN', symbol: 'zł',   label: '波蘭茲羅提'   },
  { code: 'TRY', symbol: '₺',    label: '土耳其里拉'   },
  { code: 'AED', symbol: 'AED',  label: '阿聯酋迪拉姆' },
  { code: 'CAD', symbol: 'CA$',  label: '加拿大幣'     },
  { code: 'AUD', symbol: 'A$',   label: '澳幣'         },
  { code: 'NZD', symbol: 'NZ$',  label: '紐西蘭幣'     },
  { code: 'MXN', symbol: 'MX$',  label: '墨西哥披索'   },
  { code: 'BRL', symbol: 'R$',   label: '巴西里拉'     },
  { code: 'ZAR', symbol: 'R',    label: '南非蘭特'     },
  { code: 'EGP', symbol: 'E£',   label: '埃及鎊'       },
];

function renderSettings() {
  if (!data) return;
  const s = data.settings;
  const nameEl = document.getElementById('set-trip-name');
  if (nameEl) nameEl.value = s.tripName || '';
  const datesEl = document.getElementById('set-trip-dates');
  if (datesEl) datesEl.value = s.tripDates || '';
  // Geo text
  const lonEl = document.getElementById('set-lon-text');
  if (lonEl) lonEl.value = s.lonText || "135°25'59″E";
  const latEl = document.getElementById('set-lat-text');
  if (latEl) latEl.value = s.latText || "34°\n39'\n53″\nN";
  // Currency display
  const c = CURRENCIES.find(c => c.code === (s.currency || 'TWD'));
  const disp = document.getElementById('set-currency-display');
  if (disp) disp.textContent = c ? c.symbol + ' ' + c.label : 'NT$ 新台幣';
  const sel = document.getElementById('set-currency');
  if (sel) sel.value = s.currency || 'TWD';
  // Tags
  // API Key
  const apiKeyEl = document.getElementById('set-api-key');
  if (apiKeyEl) apiKeyEl.value = getApiKey();
  // Weather location display
  const wLocEl = document.getElementById('set-weather-location-display');
  if (wLocEl) {
    if (s.weatherMode === 'manual' && s.weatherCity) {
      wLocEl.textContent = s.weatherCity;
    } else {
      wLocEl.textContent = '現在地';
    }
  }
  applyTheme(s.theme);
}

function saveGeoText() {
  const lonEl = document.getElementById('set-lon-text');
  const latEl = document.getElementById('set-lat-text');
  if (lonEl) data.settings.lonText = lonEl.value;
  if (latEl) data.settings.latText = latEl.value;
  save();
  renderBanner();
}

function toggleCurrencyDropdown() { openCurrencySheet('settings'); }

/* ─── Weather Location Sheet ─── */
let _pendingWeatherCity = null; // { name, lat, lon }

/* ═══════════════════════════════════════
   一鍵匯入
═══════════════════════════════════════ */

const TRANSIT_COLORS = {
  '深綠': '#1D7340', '淺綠': '#7DC242', 'sukhumvit': '#7DC242', 'silom': '#1D7340',
  '藍線': '#1A3F8F', '紫線': '#8B1A8B',
  '板南': '#0070BD', '淡水信義': '#E3002C', '中和新蘆': '#F8A501', '松山新店': '#008659', '環狀': '#FAEC00',
  '山手': '#80C241', 'JR': '#F15A22', '丸之內': '#E60012', '日比谷': '#B5B5AC', '銀座': '#F2952E',
  '御堂筋': '#E5171F', '四つ橋': '#0066B3', '中央': '#1CB47A', '千日前': '#E5634C',
  'red': '#E60012', 'green': '#1D7340', 'blue': '#1A3F8F', 'yellow': '#F8A501',
  'orange': '#F2952E', 'purple': '#8B1A8B', 'brown': '#964B00',
  'pink': '#F194B4', 'grey': '#888888', 'gray': '#888888',
};

function getTransitColor(lineStr) {
  if (!lineStr) return '#999999';
  const s = lineStr.toLowerCase();
  for (const [key, val] of Object.entries(TRANSIT_COLORS)) {
    if (s.includes(key.toLowerCase())) return val;
  }
  return '#999999';
}

function saveApiKey() {
  const key = document.getElementById('set-api-key')?.value?.trim() || '';
  try { localStorage.setItem('claude_api_key', key); } catch(e) {}
  if (key) showToast('API Key 已儲存');
}

function getApiKey() {
  try { return localStorage.getItem('claude_api_key') || ''; } catch(e) { return ''; }
}

function openSmartImport() {
  const ta = document.getElementById('smart-import-text');
  const countEl = document.getElementById('smart-import-count');
  if (ta) {
    ta.value = '';
    ta.oninput = () => {
      const len = ta.value.length;
      if (countEl) {
        countEl.textContent = `${len} / 3000`;
        countEl.style.color = len > 3000 ? '#FF3B30' : '#AAAAAA';
      }
    };
  }
  if (countEl) { countEl.textContent = '0 / 3000'; countEl.style.color = '#AAAAAA'; }
  document.getElementById('smart-import-loading').style.display = 'none';
  document.getElementById('smart-import-report').style.display = 'none';
  document.getElementById('smart-import-actions').style.display = 'flex';
  document.getElementById('smart-import-done-actions').style.display = 'none';
  document.getElementById('modal-smart-import').classList.add('open');
}

function runSmartImport() {
  const ta = document.getElementById('smart-import-text');
  const text = ta?.value?.trim() || '';
  if (!text) { showToast('請先貼入行程文字'); return; }
  if (text.length > 3000) { showToast('文字超過 3000 字，請精簡後再試'); return; }

  // Show loading briefly then parse
  document.getElementById('smart-import-actions').style.display = 'none';
  document.getElementById('smart-import-loading').style.display = 'flex';

  setTimeout(() => {
    try {
      const result = _parseItineraryText(text);
      _applySmartImport(result);
    } catch(e) {
      document.getElementById('smart-import-loading').style.display = 'none';
      document.getElementById('smart-import-actions').style.display = 'flex';
      showToast('解析失敗，請確認文字格式');
    }
  }, 300);
}


function _parseItineraryText(text) {
  const events = [];
  const issues = [];
  let currentDay = 0;
  let currentEvent = null;
  let noteLines = [];
  let daysCount = 0;

  // Trip start date
  const tripDates = (typeof data !== 'undefined') ? (data?.settings?.tripDates || '') : '';
  const dateMatch = tripDates.match(/(\d{4})[\/-](\d{1,2})[\/-](\d{1,2})/);
  let tripStart = null;
  if (dateMatch) {
    tripStart = new Date(parseInt(dateMatch[1]), parseInt(dateMatch[2])-1, parseInt(dateMatch[3]));
  } else if (typeof data !== 'undefined' && data?.days?.length > 0) {
    const firstDate = data.days[0]?.banner?.date || '';
    const dm = firstDate.match(/(\d{4})[\/-](\d{1,2})[\/-](\d{1,2})/);
    if (dm) tripStart = new Date(parseInt(dm[1]), parseInt(dm[2])-1, parseInt(dm[3]));
  }

  function dateToDayNum(month, day) {
    if (!tripStart) return 0;
    const d = new Date(tripStart.getFullYear(), month-1, day);
    const diff = Math.round((d - tripStart) / 86400000);
    return diff >= 0 ? diff + 1 : 0;
  }

  function padTime(t) {
    const p = t.replace(/[^\d:]/g, '').split(':');
    return p[0].padStart(2,'0') + ':' + (p[1]||'00');
  }

  function pushCurrentEvent() {
    if (!currentEvent) return;
    const extra = noteLines.join(' ').trim();
    if (extra) currentEvent.note = (currentEvent.note ? currentEvent.note + ' ' : '') + extra;
    events.push(currentEvent);
    currentEvent = null;
    noteLines = [];
  }

  // Normalize: full-width → half-width, collapse spaces, strip emoji
  function normalize(s) {
    return s
      .replace(/[\uFF10-\uFF19]/g, c => String.fromCharCode(c.charCodeAt(0) - 0xFEE0))
      .replace(/\uFF1A/g, ':')
      .replace(/[\u{1F000}-\u{1FFFF}\u{2600}-\u{27FF}\u{1F900}-\u{1F9FF}\u{FE00}-\u{FEFF}]/gu, '')
      .replace(/[ \t\u3000]+/g, ' ')
      .trim();
  }

  const rawLines = text.split('\n');

  for (let i = 0; i < rawLines.length; i++) {
    const raw = rawLines[i];
    const line = normalize(raw);
    const isIndented = /^\s{2,}|^\t/.test(raw);
    if (!line) continue;

    // Day N / 第N天
    const dayNumMatch = line.match(/[Dd]ay\s*(\d+)|第\s*(\d+)\s*天/);
    if (dayNumMatch) {
      pushCurrentEvent();
      currentDay = parseInt(dayNumMatch[1] || dayNumMatch[2]);
      if (currentDay > daysCount) daysCount = currentDay;
      continue;
    }

    // Date header: 7/18 or 07/18 with weekday or long title
    const dateHdrM = line.match(/(\d{1,2})\/(\d{1,2})/);
    if (dateHdrM) {
      const hasWD = /[\u9031\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u65e5]|Mon|Tue|Wed|Thu|Fri|Sat|Sun/i.test(line);
      const notTime = !/^\d{1,2}:\d{2}/.test(line.trim());
      if (hasWD || (notTime && line.length > 8)) {
        if (tripStart) {
          const dn = dateToDayNum(parseInt(dateHdrM[1]), parseInt(dateHdrM[2]));
          if (dn > 0) {
            pushCurrentEvent(); currentDay = dn;
            if (currentDay > daysCount) daysCount = currentDay;
            continue;
          }
        }
        if (hasWD) {
          pushCurrentEvent(); currentDay++;
          if (currentDay > daysCount) daysCount = currentDay;
          continue;
        }
      }
    }

    // Strip bullet/dash prefix
    const db = line.replace(/^[-*\u2022\u00b7\u25cf\u25e6\u2013\u2014]+\s*/, '').replace(/^\d+[.)\u3001]\s*/, '').trim();

    // Time range: 14:30 - 16:30 Title
    const trm = db.match(/^(\d{1,2}:\d{2})\s*[-\u2013\u2014~\uff5e\u5230\u81f3]\s*(\d{1,2}:\d{2})\s*[|\uff5c:\u3000\s]\s*(.+)$/) ||
                db.match(/^(\d{1,2}:\d{2})\s*[-\u2013\u2014~\uff5e\u5230\u81f3]\s*(\d{1,2}:\d{2})\s+(.+)$/);
    if (trm) {
      pushCurrentEvent();
      const time = padTime(trm[1]), endTime = padTime(trm[2]);
      const title = trm[3].trim().replace(/[\u3002.\u3001,]$/, '');
      currentEvent = { day: currentDay||1, time, title, note: time+'\u2013'+endTime+' '+title, addr:'', station:'', line:'' };
      noteLines = []; continue;
    }

    // Single time: 15:00 Title
    const tsm = db.match(/^(\d{1,2}:\d{2})\s*[|\uff5c:\uff1a]\s*(.+)$/) ||
                db.match(/^(\d{1,2}:\d{2})\s+(.+)$/);
    if (tsm) {
      pushCurrentEvent();
      const time = padTime(tsm[1]);
      const title = tsm[2].trim().replace(/[\u3002.\u3001,]$/, '');
      currentEvent = { day: currentDay||1, time, title, note:'', addr:'', station:'', line:'' };
      noteLines = []; continue;
    }

    // Indented sub-bullet or 攻略/備註 line → note
    if ((isIndented || /^[\u653b\u7565\u5099\u8a3b\u8aac\u660e\u6ce8\u610f][\uff1a:]/.test(db)) && currentEvent) {
      const noteLine = db.replace(/^[\u653b\u7565\u5099\u8a3b\u8aac\u660e\u6ce8\u610f]+[\uff1a:]\s*/, '').trim().replace(/[\u3002.]$/, '');
      if (noteLine) noteLines.push(noteLine);
      continue;
    }

    // Label fields
    if (/^\u5730\u5740[\uff1a:]/.test(line)) { if (currentEvent) currentEvent.addr = db.replace(/^\u5730\u5740[\uff1a:]/,'').trim(); continue; }
    if (/^\u8aac\u660e[\uff1a:]/.test(line)) { if (currentEvent) currentEvent.note = (currentEvent.note?currentEvent.note+' ':'')+db.replace(/^\u8aac\u660e[\uff1a:]/,'').trim(); continue; }
    if (/^\u6700\u8fd1\u7ad9[\uff1a:]/.test(line)) {
      const v = db.replace(/^\u6700\u8fd1\u7ad9[\uff1a:]/,'').trim().split(/[|\uff5c]/);
      if (currentEvent) { currentEvent.station=(v[0]||'').trim(); currentEvent.line=(v[1]||'').trim(); }
      continue;
    }

    // Skip pure section headers
    if (/^(\u884c\u7a0b|\u6ce8\u610f\u4e8b\u9805|\u898f\u5283|\u5efa\u8b70|\u884c\u7a0b\u9806\u5e8f)$/.test(line)) continue;

    if (currentEvent) noteLines.push(line);
  }

  pushCurrentEvent();
  const noDayDetected = daysCount === 0;
  if (daysCount === 0 && events.length > 0) daysCount = 1;
  return { days_count: daysCount, events, issues, _noDayDetected: noDayDetected };
}

function _applySmartImport(result) {
  const reports = [];

  if (!result || !Array.isArray(result.events) || result.events.length === 0) {
    document.getElementById('smart-import-loading').style.display = 'none';
    document.getElementById('smart-import-actions').style.display = 'flex';
    showToast('無法識別行程格式，請確認文字包含日期、時間或天數資訊');
    return;
  }

  // No day detected — show day picker in report area
  if (result._noDayDetected && result.events.length > 0) {
    document.getElementById('smart-import-loading').style.display = 'none';
    const listEl = document.getElementById('smart-import-report-list');
    const dayBtns = data.days.map((d, i) => {
      const dateStr = d.banner?.date || '';
      // Extract MM/DD（週X） from dateStr like 2026/05/07（四）
      const dateShort = dateStr.replace(/^\d{4}\//, '').replace(/（[^）]+）/, m => m) || '';
      return `<button onclick="_importToDay(${i})"
        style="padding:10px 14px;background:#1A1A1A;color:#fff;border:none;font-family:var(--mono);cursor:pointer;border-radius:0;-webkit-tap-highlight-color:transparent;display:flex;flex-direction:column;align-items:center;gap:3px">
        <span style="font-size:14px;font-weight:700">Day ${i+1}</span>
        ${dateShort ? `<span style="font-size:11px;opacity:0.7">${dateShort}</span>` : ''}
      </button>`;
    }).join('');
    listEl.innerHTML = `
      <div style="font-family:var(--mono);font-size:14px;color:#1A1A1A;padding:8px 12px;background:#FFF8E1;border-left:3px solid #F5C518">
        ⚠️ 未偵測到日期或天數，請選擇要匯入至哪一天
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:4px">${dayBtns}</div>`;
    document.getElementById('smart-import-report').style.display = 'block';
    document.getElementById('smart-import-confirm-actions') && (document.getElementById('smart-import-confirm-actions').style.display = 'none');
    document.getElementById('smart-import-done-actions').style.display = 'none';
    document.getElementById('smart-import-actions').style.display = 'none';
    // store result for later use
    window._pendingSmartResult = result;
    return;
  }

  // Extend days if needed
  const daysNeeded = result.days_count || 1;
  if (daysNeeded > data.days.length) {
    const extra = daysNeeded - data.days.length;
    for (let i = 0; i < extra; i++) {
      data.days.push({ banner: { date: '', subtitle: '', photos: [] }, events: [] });
      data.expenses.push([]);
    }
    reports.push(`✓ 新增 ${extra} 天，請至設定頁更新行程區間`);
  }

  // Write events
  let written = 0, skipped = 0;
  result.events.forEach(ev => {
    const dayIdx = (ev.day || 1) - 1;
    if (dayIdx < 0 || dayIdx >= data.days.length) return;
    const dayEvents = data.days[dayIdx].events;
    // Duplicate check
    if (dayEvents.some(e => e.time === ev.time && e.title === ev.title)) {
      skipped++; return;
    }
    dayEvents.push({
      id: Date.now() + Math.random(),
      time:      ev.time     || '',
      title:     ev.title    || '',
      note:      ev.note     || '',
      addr:      ev.addr     || '',
      station:   ev.station  || '',
      line:      ev.line     || '',
      lineColor: (ev.station || ev.line) ? getTransitColor(ev.line || '') : ''
    });
    written++;
  });

  // Count by day
  const dayCount = {};
  result.events.forEach(ev => {
    if (!ev._skipped) dayCount[ev.day] = (dayCount[ev.day] || 0) + 1;
  });
  const dayReports = Object.keys(dayCount).sort((a,b)=>a-b)
    .map(d => `✓ Day ${d} 匯入 ${dayCount[d]} 筆行程`);
  reports.unshift(...dayReports);
  reports.unshift(`✓ 共匯入 ${written} 筆行程`);
  if (result._noDayDetected) reports.push('⚠️ 未偵測到日期或天數，所有行程已放入 Day 1，請自行移至正確天數');
  if (skipped > 0) reports.push(`✓ ${skipped} 筆重複行程已略過`);
  if (result.issues?.length) result.issues.forEach(i => reports.push(i));

  save();
  renderItinerary();

  // Show report
  document.getElementById('smart-import-loading').style.display = 'none';
  const listEl = document.getElementById('smart-import-report-list');
  listEl.innerHTML = reports.map(r =>
    `<div style="font-family:var(--mono);font-size:14px;color:#1A1A1A;padding:8px 12px;background:#F8F8F8;border-left:3px solid #1A1A1A">${r}</div>`
  ).join('');
  document.getElementById('smart-import-report').style.display = 'block';
  document.getElementById('smart-import-done-actions').style.display = 'block';
}

function closeSmartImportDone() {
  closeModal('modal-smart-import');
  switchTab('itinerary');
}

function _importToDay(dayIdx) {
  const result = window._pendingSmartResult;
  if (!result) return;
  const reports = [];
  let written = 0, skipped = 0;
  result.events.forEach(ev => {
    const dayEvents = data.days[dayIdx].events;
    if (dayEvents.some(e => e.time === ev.time && e.title === ev.title)) {
      skipped++; return;
    }
    dayEvents.push({
      id: Date.now() + Math.random(),
      time:      ev.time     || '',
      title:     ev.title    || '',
      note:      ev.note     || '',
      addr:      ev.addr     || '',
      station:   ev.station  || '',
      line:      ev.line     || '',
      lineColor: (ev.station || ev.line) ? getTransitColor(ev.line || '') : ''
    });
    written++;
  });
  reports.push(`✓ 共匯入 ${written} 筆行程至 Day ${dayIdx+1}`);
  if (skipped > 0) reports.push(`✓ ${skipped} 筆重複行程已略過`);
  window._pendingSmartResult = null;
  save();
  renderItinerary();
  const listEl = document.getElementById('smart-import-report-list');
  listEl.innerHTML = reports.map(r =>
    `<div style="font-family:var(--mono);font-size:14px;color:#1A1A1A;padding:8px 12px;background:#F8F8F8;border-left:3px solid #1A1A1A">${r}</div>`
  ).join('');
  document.getElementById('smart-import-done-actions').style.display = 'block';
}

/* ═══════════════════════════════════════
   AI 記帳
═══════════════════════════════════════ */

const EXPENSE_CAT_MAP = {
  '餐飲': ['餐飲','拉麵','壽司','咖啡','食','飲','餐','cafe','coffee','ramen','lunch','dinner','breakfast','食堂','烏龍'],
  '購物': ['購物','店','shop','store','買','商場','market','百貨','免稅'],
  '交通': ['車票','交通','電車','地鐵','計程車','巴士','捷運','JR','MRT','BTS','taxi','bus','train','南海','近鐵'],
  '住宿': ['飯店','旅館','住宿','hotel','hostel','inn'],
  '門票': ['門票','入場','ticket','pass','樂園'],
  '其他': [],
};

function _guessExpenseCat(text) {
  const t = text.toLowerCase();
  for (const [cat, keywords] of Object.entries(EXPENSE_CAT_MAP)) {
    if (cat === '其他') continue;
    if (keywords.some(k => t.includes(k.toLowerCase()))) return cat;
  }
  return '其他';
}

function openSmartExpense() {
  const ta = document.getElementById('smart-expense-text');
  const countEl = document.getElementById('smart-expense-count');
  if (ta) {
    ta.value = '';
    ta.oninput = () => {
      const len = ta.value.length;
      if (countEl) {
        countEl.textContent = `${len} / 3000`;
        countEl.style.color = len > 3000 ? '#FF3B30' : '#AAAAAA';
      }
    };
  }
  if (countEl) { countEl.textContent = '0 / 3000'; countEl.style.color = '#AAAAAA'; }
  document.getElementById('smart-expense-loading').style.display = 'none';
  document.getElementById('smart-expense-report').style.display = 'none';
  document.getElementById('smart-expense-actions').style.display = 'flex';
  document.getElementById('smart-expense-done-actions').style.display = 'none';
  document.getElementById('modal-smart-expense').classList.add('open');
}

function runSmartExpense() {
  const ta = document.getElementById('smart-expense-text');
  const text = ta?.value?.trim() || '';
  if (!text) { showToast('請先貼入支出記錄'); return; }
  if (text.length > 3000) { showToast('文字超過 3000 字，請精簡後再試'); return; }

  document.getElementById('smart-expense-actions').style.display = 'none';
  document.getElementById('smart-expense-loading').style.display = 'flex';

  setTimeout(() => {
    try {
      const result = _parseExpenseText(text);
      _applySmartExpense(result);
    } catch(e) {
      document.getElementById('smart-expense-loading').style.display = 'none';
      document.getElementById('smart-expense-actions').style.display = 'flex';
      showToast('解析失敗，請確認格式');
    }
  }, 300);
}

function _parseAmount(str) {
  const neg = str.includes('-');
  const m = str.match(/[\(（]?-?[¥￥$]?\s*([\d,，]+)[\)）]?/);
  const v = m ? parseInt(m[1].replace(/[,，]/g, '')) : 0;
  return neg ? -v : v;
}

function _parseSubitemsFromLine(line) {
  line = line.replace(/[。.]+$/, '').trim();
  const subitems = [];
  const rawParts = line.split(/[、，]/);
  const parts = [];
  for (let i = 0; i < rawParts.length; i++) {
    let p = rawParts[i];
    while (i + 1 < rawParts.length) {
      const next = rawParts[i + 1].trim();
      if (next.match(/^[（(][各每]?¥\s*[\d,，]+[）)]/)) {
        p = p + next; i++;
        continue;
      }
      break;
    }
    parts.push(p);
  }
  parts.forEach(part => {
    part = part.trim().replace(/^[：:,\s]+/, '').trim().replace(/[。.]+$/, '').trim();
    if (!part) return;
    // Match （各 ¥xxx）or（¥xxx）or (¥xxx)
    const amtMatch = part.match(/[（(][各每]?¥\s*([\d,，]+)[）)]\s*$/) ||
                     part.match(/\([各每]?¥\s*([\d,，]+)\)\s*$/);
    if (amtMatch) {
      const unitAmt = parseInt(amtMatch[1].replace(/[,，]/g, ''));
      const name = part.slice(0, part.lastIndexOf(amtMatch[0])).trim();
      // Check if 各/每 → multiply by quantity (x 2, x2, ×2)
      const isEach = /[各每]/.test(amtMatch[0]);
      let qty = 1;
      if (isEach) {
        const qtyMatch = name.match(/[xX×]\s*(\d+)\s*$/);
        if (qtyMatch) qty = parseInt(qtyMatch[1]);
      }
      const amount = unitAmt * qty;
      if (name && amount > 0) subitems.push({ name, amount });
    } else if (part.length > 1) {
      subitems.push({ name: part, amount: 0, _raw: true });
    }
  });
  return subitems;
}

function _parseExpenseText(text) {
  // Pre-process: split bullet points into separate lines
  text = text.replace(/\s*[•·]\s*/g, '\n');
  const lines = text.split('\n');
  const entries = [];
  const issues = [];
  let currentDay = 0;
  let currentEntry = null;

  const tripDates = (typeof data !== 'undefined') ? (data?.settings?.tripDates || '') : '';
  const dateMatch = tripDates.match(/(\d{4})\/(\d{2})\/(\d{2})/);
  const tripStart = dateMatch
    ? new Date(parseInt(dateMatch[1]), parseInt(dateMatch[2])-1, parseInt(dateMatch[3]))
    : null;

  function dateToDayNum(year, month, day) {
    if (!tripStart) return 0;
    const y = year || tripStart.getFullYear();
    const d = new Date(y, month-1, day);
    const diff = Math.round((d - tripStart) / 86400000);
    return diff >= 0 ? diff + 1 : 0;
  }

  function pushEntry() {
    if (!currentEntry) return;
    // Flush any remaining continuation buffer
    if (currentEntry._contBuf) {
      const subs = _parseSubitemsFromLine(currentEntry._contBuf);
      subs.forEach(s => { if (!currentEntry.subitems.some(e => e.name === s.name)) currentEntry.subitems.push(s); });
      currentEntry._contBuf = '';
    }
    // Recalculate total from subitems if no direct amount
    if (currentEntry.subitems.length > 0 && !currentEntry._hasDirectAmount) {
      currentEntry.amount = currentEntry.subitems.reduce((s, i) => s + i.amount, 0);
    }
    // Push even if amount is 0 (user can fill in)
    entries.push(currentEntry);
    currentEntry = null;
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Date header: 2026年5月7日 or 5/7（週四）
    const dateFullMatch = line.match(/(\d{4})[年\/](\d{1,2})[月\/](\d{1,2})[日]?/);
    if (dateFullMatch) {
      pushEntry();
      const dayNum = dateToDayNum(parseInt(dateFullMatch[1]), parseInt(dateFullMatch[2]), parseInt(dateFullMatch[3]));
      currentDay = dayNum || 1;
      continue;
    }

    const dateShortMatch = line.match(/^(\d{1,2})\/(\d{1,2})/);
    if (dateShortMatch && /[週一二三四五六日]/.test(line)) {
      pushEntry();
      const dayNum = tripStart ? dateToDayNum(0, parseInt(dateShortMatch[1]), parseInt(dateShortMatch[2])) : 0;
      currentDay = dayNum || (currentDay + 1) || 1;
      continue;
    }

    // Main expense line: HH:MM 類別 — 店名： or HH：MM 購物 — 店名：
    // Support both : and ： for time
    const mainMatch = line.match(/^[•·\-\*\s]*?(\d{1,2}[：:]\d{2})\s+(.+)/);
    if (mainMatch) {
      pushEntry();
      const timeRaw = mainMatch[1].replace('：', ':');
      const rest = mainMatch[2];

      // Split on — or - to get category and store
      const dashSplit = rest.split(/\s*[—\-–]\s*/);
      const catPart  = dashSplit[0]?.trim() || '';
      const remainder = dashSplit.slice(1).join(' — ').trim();

      // Store name: before ：, items after
      const colonIdx = remainder.search(/[：:]/);
      const storeName = colonIdx >= 0 ? remainder.slice(0, colonIdx).trim() : remainder.trim();
      const itemsPart = colonIdx >= 0 ? remainder.slice(colonIdx+1).trim() : '';

      const cat = _guessExpenseCat(catPart + ' ' + storeName);

      // Try to parse subitems from items part (same line)
      let subitems = [];
      let directAmount = 0;
      let hasDirectAmount = false;

      if (itemsPart) {
        // First try 頓號-separated subitems (multiple items)
        if (/[、，]/.test(itemsPart)) {
          const parsed = _parseSubitemsFromLine(itemsPart);
          if (parsed.length > 0) {
            subitems = parsed;
            directAmount = parsed.reduce((s,i) => s + i.amount, 0);
            hasDirectAmount = true;
          }
        }
        if (subitems.length === 0) {
          // Single item with amount: 品項名（¥1,560）
          const amtM = itemsPart.match(/\(¥\s*([\d,，]+)\)\s*$/) || itemsPart.match(/（¥\s*([\d,，]+)）\s*$/);
          if (amtM) {
            directAmount = parseInt(amtM[1].replace(/[,，]/g, ''));
            const itemName = itemsPart.slice(0, itemsPart.lastIndexOf(amtM[0])).trim();
            subitems = [{ name: itemName, amount: directAmount }];
            hasDirectAmount = true;
          } else if (itemsPart.trim()) {
            subitems = [{ name: itemsPart.trim(), amount: 0, _pending: true }];
          }
        }
      }

      // Check for total: （共 ¥11,693）in rest or itemsPart
      const totalMatchRest = (itemsPart || rest).match(/[（(]共\s*[¥￥]?\s*([\d,，]+)[）)]/);
      if (totalMatchRest) {
        directAmount = parseInt(totalMatchRest[1].replace(/[,，]/g, ''));
        hasDirectAmount = true;
        // Add descriptive text before 共 as subitem
        const beforeTotal = (itemsPart || '').slice(0, (itemsPart || '').indexOf(totalMatchRest[0])).trim()
          .replace(/^[：:,\s]+/, '').trim();
        if (beforeTotal && beforeTotal.length > 1 && subitems.length === 0) {
          subitems = [{ name: beforeTotal, amount: directAmount }];
        }
      }

      currentEntry = {
        day: currentDay || 1,
        time: timeRaw,
        name: storeName || catPart,
        cat,
        amount: directAmount,
        _hasDirectAmount: hasDirectAmount,
        subitems,
      };
      continue;
    }

    // Continuation lines under current entry
    if (currentEntry) {
      // Check for total marker: （共 ¥11,693）
      const totalMatch = line.match(/[（(]共\s*[¥￥]?\s*([\d,，]+)[）)]/);
      if (totalMatch) {
        const totalAmt = parseInt(totalMatch[1].replace(/[,，]/g, ''));
        currentEntry.amount = totalAmt;
        currentEntry._hasDirectAmount = true;
        // If there's descriptive text before the total, add it as a subitem
        const beforeTotal = line.slice(0, line.indexOf(totalMatch[0])).trim()
          .replace(/^[：:,\s]+/, '').trim();
        if (beforeTotal && beforeTotal.length > 1) {
          currentEntry.subitems.push({ name: beforeTotal, amount: totalAmt });
        }
        continue;
      }

      // Check pending subitem needing amount from next line
      const lastSub = currentEntry.subitems.length > 0 ? currentEntry.subitems[currentEntry.subitems.length - 1] : null;
      if (lastSub && lastSub._pending) {
        const amtMatch = line.match(/\(¥\s*([\d,，]+)\)\s*$/) || line.match(/（¥\s*([\d,，]+)）\s*$/);
        if (amtMatch) {
          lastSub.amount = parseInt(amtMatch[1].replace(/[,，]/g, ''));
          lastSub._pending = false;
          if (!currentEntry._hasDirectAmount) currentEntry.amount = (currentEntry.subitems.reduce((s,i)=>s+i.amount,0));
          continue;
        }
      }

      // Accumulate continuation — append to buffer and parse combined
      if (!currentEntry._contBuf) currentEntry._contBuf = '';
      currentEntry._contBuf += (currentEntry._contBuf ? '' : '') + line;

      // Try to parse accumulated buffer
      const combined = currentEntry._contBuf;
      const subs = _parseSubitemsFromLine(combined);
      if (subs.length > 0) {
        // Only flush if we have complete items (last item has amount)
        const lastS = subs[subs.length - 1];
        if (!lastS._raw || combined.trim().endsWith('。') || combined.trim().endsWith('.')) {
          subs.forEach(s => { if (!currentEntry.subitems.some(e => e.name === s.name)) currentEntry.subitems.push(s); });
          if (!currentEntry._hasDirectAmount) currentEntry.amount = currentEntry.subitems.reduce((s,i)=>s+i.amount,0);
          currentEntry._contBuf = '';
        }
      }
      continue;
    }
  }

  pushEntry();

  const noDayDetected = !tripStart && entries.every(e => e.day === 1);
  return { entries, issues, _noDayDetected: noDayDetected && entries.length > 0 };
}

function _applySmartExpense(result) {
  const { entries, issues, _noDayDetected } = result;

  if (!entries || entries.length === 0) {
    document.getElementById('smart-expense-loading').style.display = 'none';
    document.getElementById('smart-expense-actions').style.display = 'flex';
    showToast('無法識別支出格式，請確認文字包含時間和金額');
    return;
  }

  if (_noDayDetected) {
    document.getElementById('smart-expense-loading').style.display = 'none';
    const listEl = document.getElementById('smart-expense-report-list');
    const dayBtns = data.days.map((d, i) => {
      const dateStr = d.banner?.date || '';
      const dateShort = dateStr.replace(/^\d{4}\//, '').replace(/（[^）]+）/, m => m) || '';
      return `<button onclick="_importExpenseToDay(${i})"
        style="padding:10px 14px;background:#1A1A1A;color:#fff;border:none;font-family:var(--mono);cursor:pointer;border-radius:0;-webkit-tap-highlight-color:transparent;display:flex;flex-direction:column;align-items:center;gap:3px">
        <span style="font-size:14px;font-weight:700">Day ${i+1}</span>
        ${dateShort ? `<span style="font-size:11px;opacity:0.7">${dateShort}</span>` : ''}
      </button>`;
    }).join('');
    listEl.innerHTML = `
      <div style="font-family:var(--mono);font-size:14px;color:#1A1A1A;padding:8px 12px;background:#FFF8E1;border-left:3px solid #F5C518">
        ⚠️ 未偵測到日期，請選擇要匯入至哪一天
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:4px">${dayBtns}</div>`;
    document.getElementById('smart-expense-report').style.display = 'block';
    document.getElementById('smart-expense-done-actions').style.display = 'none';
    document.getElementById('smart-expense-actions').style.display = 'none';
    window._pendingSmartExpense = result;
    return;
  }

  _writeExpenseEntries(entries, issues);
}

function _writeExpenseEntries(entries, issues) {
  const reports = [];
  const dayCount = {};
  let written = 0, skipped = 0;

  entries.forEach(ev => {
    const dayIdx = (ev.day || 1) - 1;
    if (dayIdx < 0 || dayIdx >= data.expenses.length) return;
    // Duplicate check: same time + same name
    const isDup = data.expenses[dayIdx].some(e =>
      e.time === (ev.time || '') && e.name === ev.name
    );
    if (isDup) { skipped++; return; }
    data.expenses[dayIdx].push({
      id: Date.now() + Math.random(),
      name:     ev.name,
      amount:   ev.amount,
      cat:      ev.cat,
      time:     ev.time || '',
      subitems: ev.subitems || [],
    });
    dayCount[ev.day] = (dayCount[ev.day] || 0) + 1;
    written++;
  });

  Object.keys(dayCount).sort((a,b)=>a-b).forEach(d => {
    reports.push(`✓ Day ${d} 匯入 ${dayCount[d]} 筆支出`);
  });
  reports.unshift(`✓ 共匯入 ${written} 筆支出`);
  if (skipped > 0) reports.push(`✓ ${skipped} 筆重複支出已略過`);
  if (issues?.length) issues.forEach(i => reports.push(i));

  save();
  renderExpenseList();

  document.getElementById('smart-expense-loading').style.display = 'none';
  const listEl = document.getElementById('smart-expense-report-list');
  listEl.innerHTML = reports.map(r =>
    `<div style="font-family:var(--mono);font-size:14px;color:#1A1A1A;padding:8px 12px;background:#F8F8F8;border-left:3px solid #1A1A1A">${r}</div>`
  ).join('');
  document.getElementById('smart-expense-report').style.display = 'block';
  document.getElementById('smart-expense-done-actions').style.display = 'block';
  window._pendingSmartExpense = null;
}

function _importExpenseToDay(dayIdx) {
  const result = window._pendingSmartExpense;
  if (!result) return;
  const entries = result.entries.map(e => ({ ...e, day: dayIdx + 1 }));
  _writeExpenseEntries(entries, result.issues);
}

function closeSmartExpenseDone() {
  closeModal('modal-smart-expense');
  switchTab('expense');
}



function addExpSubitemRow() {
  const list = document.getElementById('exp-subitems-list');
  if (!list) return;
  const row = document.createElement('div');
  row.style.cssText = 'display:flex;align-items:flex-start;gap:8px;margin-bottom:12px';
  row.innerHTML = `
    <div style="flex:1;display:flex;flex-direction:column;gap:4px;border-bottom:1px solid #E0E0E0;padding-bottom:6px">
      <textarea placeholder="品項名稱" rows="2"
        style="width:100%;font-family:var(--mono);font-size:14px;border:none;outline:none;background:transparent;resize:none;line-height:1.5"
        oninput="_recalcExpTotal()"></textarea>
      <input placeholder="金額" type="text" inputmode="decimal"
        style="width:80px;font-family:var(--mono);font-size:14px;border:none;border-top:1px solid #F0F0F0;padding:4px 0;outline:none;background:transparent"
        oninput="_recalcExpTotal()">
    </div>
    <button onclick="this.parentElement.remove();_recalcExpTotal()"
      style="background:none;border:none;color:#CCCCCC;font-size:18px;cursor:pointer;padding:0;line-height:1;flex-shrink:0;margin-top:4px">×</button>`;
  list.appendChild(row);
  row.querySelector('textarea').focus();
}

function _recalcExpTotal() {
  const list = document.getElementById('exp-subitems-list');
  const amtEl = document.getElementById('exp-amount');
  if (!list || !amtEl) return;
  let total = 0;
  [...list.children].forEach(row => {
    const inputs = row.querySelectorAll('input');
    const amt = parseFloat(inputs[0]?.value || 0);
    if (amt > 0) total += amt;
  });
  if (total > 0) amtEl.value = total;
}

function _getExpSubitems() {
  const list = document.getElementById('exp-subitems-list');
  if (!list) return [];
  return [...list.children].map(row => {
    const ta = row.querySelector('textarea');
    const inputs = row.querySelectorAll('input');
    return {
      name: (ta?.value || inputs[0]?.value || '').trim(),
      amount: parseFloat(inputs[0]?.value || 0)
    };
  }).filter(s => s.name || s.amount > 0);
}

function _renderExpSubitemsForEdit(subitems) {
  const list = document.getElementById('exp-subitems-list');
  if (!list) return;
  list.innerHTML = '';
  (subitems || []).forEach(s => {
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;align-items:center;gap:8px;margin-bottom:8px';
    row.innerHTML = `
      <div style="flex:1;display:flex;flex-direction:column;gap:4px;border-bottom:1px solid #E0E0E0;padding-bottom:6px">
        <textarea placeholder="品項名稱" rows="2"
          style="width:100%;font-family:var(--mono);font-size:14px;border:none;outline:none;background:transparent;resize:none;line-height:1.5"
          oninput="_recalcExpTotal()">${esc(s.name)}</textarea>
        <input value="${s.amount > 0 ? s.amount : ''}" placeholder="金額" type="text" inputmode="decimal"
          style="width:80px;font-family:var(--mono);font-size:14px;border:none;border-top:1px solid #F0F0F0;padding:4px 0;outline:none;text-align:left;background:transparent"
          oninput="_recalcExpTotal()">
      </div>
      <button onclick="this.parentElement.remove();_recalcExpTotal()"
        style="background:none;border:none;color:#CCCCCC;font-size:18px;cursor:pointer;padding:0;line-height:1;flex-shrink:0;align-self:flex-start;margin-top:4px">×</button>`;
    list.appendChild(row);
  });
}

function toggleExpNegative() {
  const el = document.getElementById('exp-amount');
  const btn = document.getElementById('exp-neg-btn');
  if (!el) return;
  const val = el.value.trim();
  if (val.startsWith('-')) {
    el.value = val.slice(1);
    if (btn) { btn.style.color = '#AAAAAA'; btn.style.borderColor = '#E0E0E0'; }
  } else if (val) {
    el.value = '-' + val;
    if (btn) { btn.style.color = '#E53E3E'; btn.style.borderColor = '#E53E3E'; }
  }
}

function _updateSubitem(expId, subIdx, field, value) {
  const item = (data.expenses[expenseDay] || []).find(i => i.id === expId);
  if (!item || !item.subitems) return;
  if (field === 'amount') {
    item.subitems[subIdx].amount = parseFloat(value) || 0;
    // Recalculate total
    const amtEl = document.getElementById('exp-amount');
    if (amtEl && !item._hasDirectAmount) {
      const total = item.subitems.reduce((s,i) => s + i.amount, 0);
      amtEl.value = total;
      item.amount = total;
    }
  } else {
    item.subitems[subIdx][field] = value;
  }
  item.subitems[subIdx]._raw = false;
  save();
}

function openWeatherLocationSheet() {
  const s = data.settings;
  const isGPS = s.weatherMode !== 'manual';
  document.getElementById('weather-gps-check').style.display = isGPS ? '' : 'none';
  document.getElementById('weather-city-input').value = s.weatherCity || '';
  document.getElementById('weather-city-status').textContent = '';
  document.getElementById('weather-city-results').innerHTML = '';
  document.getElementById('weather-city-confirm').style.display = 'none';
  _pendingWeatherCity = null;
  window._weatherResults = [];
  document.getElementById('modal-weather-location').classList.add('open');
}

function setWeatherGPS() {
  data.settings.weatherMode = 'gps';
  data.settings.weatherCity = '';
  data.settings.weatherLat = null;
  data.settings.weatherLon = null;
  save();
  closeModal('modal-weather-location');
  renderSettings();
  initWeather();
}

async function searchWeatherCity() {
  const q = document.getElementById('weather-city-input').value.trim();
  if (!q) return;
  const statusEl  = document.getElementById('weather-city-status');
  const resultsEl = document.getElementById('weather-city-results');
  const confirmEl = document.getElementById('weather-city-confirm');
  statusEl.textContent = '搜尋中…';
  resultsEl.innerHTML = '';
  confirmEl.style.display = 'none';
  _pendingWeatherCity = null;
  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=5&language=zh&format=json&fuzzy=true`;
    const res = await fetch(url);
    const json = await res.json();
    if (!json.results?.length) {
      statusEl.textContent = '找不到此地點，試試其他拼法';
      return;
    }
    statusEl.textContent = '';
    // 顯示最多5個結果讓用戶選
    resultsEl.innerHTML = json.results.map((r, i) => {
      const label = [r.name, r.admin1, r.country].filter(Boolean).join('，');
      return `<div onclick="selectWeatherResult(${i})" data-idx="${i}"
        style="padding:12px 14px;border:1.5px solid #EBEBEB;margin-bottom:6px;cursor:pointer;font-family:var(--mono);font-size:14px;color:#1A1A1A;-webkit-tap-highlight-color:transparent"
        id="weather-result-${i}">${label}</div>`;
    }).join('');
    // 存結果供選擇
    window._weatherResults = json.results;
  } catch(e) {
    statusEl.textContent = '搜尋失敗，請確認網路連線';
  }
}

function selectWeatherResult(idx) {
  const r = window._weatherResults?.[idx];
  if (!r) return;
  _pendingWeatherCity = { name: r.name, lat: r.latitude, lon: r.longitude };
  // 高亮選中
  document.querySelectorAll('[id^="weather-result-"]').forEach(el => {
    el.style.borderColor = '#EBEBEB';
    el.style.background = '';
  });
  const el = document.getElementById('weather-result-' + idx);
  if (el) { el.style.borderColor = '#F5C518'; el.style.background = '#FFFBEA'; }
  document.getElementById('weather-city-confirm').style.display = 'block';
}

function confirmWeatherCity() {
  if (!_pendingWeatherCity) return;
  data.settings.weatherMode = 'manual';
  data.settings.weatherCity = _pendingWeatherCity.name;
  data.settings.weatherLat  = _pendingWeatherCity.lat;
  data.settings.weatherLon  = _pendingWeatherCity.lon;
  save();
  closeModal('modal-weather-location');
  renderSettings();
  fetchWeather(_pendingWeatherCity.lat, _pendingWeatherCity.lon);
  _pendingWeatherCity = null;
}

function setCurrencyBtn(code, symbol, label) {
  data.settings.currency = code;
  save();
  const disp = document.getElementById('set-currency-display');
  if (disp) disp.textContent = symbol + ' ' + label;
  document.getElementById('set-currency-dropdown')?.classList.remove('open');
  renderExpenseList();
}

function setCurrencyFromSelect() {
  const sel = document.getElementById('set-currency');
  if (!sel) return;
  data.settings.currency = sel.value;
  save();
  const c = CURRENCIES.find(c => c.code === sel.value);
  const disp = document.getElementById('set-currency-display');
  if (disp && c) disp.textContent = c.symbol + ' ' + c.label;
  document.getElementById('set-currency-dropdown')?.classList.remove('open');
  renderExpenseList();
}

function openCurrencySheet(context) {
  document.getElementById('currency-sheet-context').value = context;
  const list = document.getElementById('currency-sheet-list');
  list.innerHTML = CURRENCIES.map(c =>
    `<div class="currency-option-row" onclick="selectCurrencyFromSheet('${c.code}','${c.symbol}','${c.label}')">
      <span class="currency-option-code">${c.code}</span>
      <span class="currency-option-symbol">${c.symbol}</span>
      <span class="currency-option-label">${c.label}</span>
    </div>`
  ).join('');
  document.getElementById('modal-currency-sheet').classList.add('open');
}

function selectCurrencyFromSheet(code, symbol, label) {
  const context = document.getElementById('currency-sheet-context').value;
  closeModal('modal-currency-sheet');
  if (context === 'trip') {
    // new trip sheet
    _tfCurrencyCode = code;
    const disp = document.getElementById('tf-currency-display');
    if (disp) disp.textContent = symbol + ' ' + label;
  } else {
    // settings page
    data.settings.currency = code;
    save();
    const disp = document.getElementById('set-currency-display');
    if (disp) disp.textContent = symbol + ' ' + label;
    renderExpenseList();
  }
}

function renderSettingsTags() {
  const cloud = document.getElementById('set-tags-cloud');
  if (!cloud) return;
  const tags = data.settings.tags || [];
  cloud.innerHTML = tags.map((t, i) =>
    `<span class="set-tag-chip ${t.active?'active':''}" onclick="toggleSettingsTag(${i})">${esc(t.text)}</span>`
  ).join('');
  const disp = document.getElementById('set-tags-display');
  if (disp) {
    const active = tags.filter(t => t.active).map(t => t.text);
    disp.textContent = active.length ? active.join('，') : '加入標籤';
  }
}

function openTagSheet() {
  if (!data.settings.tags) data.settings.tags = [];
  renderSettingsTags();
  document.getElementById('modal-tag-sheet').classList.add('open');
  setTimeout(() => document.getElementById('set-tag-input')?.focus(), 340);
}

function addSettingsTag() {
  const inp = document.getElementById('set-tag-input');
  const text = inp?.value.trim();
  if (!text) return;
  if (!data.settings.tags) data.settings.tags = [];
  data.settings.tags.push({ text, active: true });
  save();
  inp.value = '';
  renderSettingsTags();
}

function toggleSettingsTag(idx) {
  if (!data.settings.tags) return;
  data.settings.tags[idx].active = !data.settings.tags[idx].active;
  save();
  renderSettingsTags();
}

// Close currency dropdown on outside click
document.addEventListener('click', (e) => {
  if (!e.target.closest('.set-field-select')) {
    document.getElementById('set-currency-dropdown')?.classList.remove('open');
  }
});

function fmtTripDates(el) {
  const digits = el.value.replace(/\D/g, '').slice(0, 12);
  const len = digits.length;
  if (len === 0) { el.value = ''; return; }

  const y = digits.slice(0, 4);
  const mo = digits.slice(4, 6);
  const d1 = digits.slice(6, 8);
  const mo2 = digits.slice(8, 10);
  const d2 = digits.slice(10, 12);

  if (len === 5 && parseInt(digits[4]) > 1) {
    el.value = y + '/0' + digits[4] + '/'; return;
  }
  if (len === 7 && parseInt(digits[6]) > 3) {
    el.value = y + '/' + mo + '/0' + digits[6] + '–'; return;
  }
  if (len === 9 && parseInt(digits[8]) > 1) {
    el.value = y + '/' + mo + '/' + d1 + '–0' + digits[8] + '/'; return;
  }
  if (len === 11 && parseInt(digits[10]) > 3) {
    el.value = y + '/' + mo + '/' + d1 + '–' + mo2 + '/0' + digits[10]; return;
  }

  let result = '';
  if (len <= 4)       result = y;
  else if (len <= 6)  result = y + '/' + mo;
  else if (len <= 8)  result = y + '/' + mo + '/' + d1;
  else if (len <= 10) result = y + '/' + mo + '/' + d1 + '–' + mo2;
  else                result = y + '/' + mo + '/' + d1 + '–' + mo2 + '/' + d2;
  el.value = result;
}

function saveSettings() {
  if (!data) return;
  const oldDates = data.settings.tripDates || '';
  data.settings.tripName  = document.getElementById('set-trip-name')?.value.trim() || '';
  data.settings.tripDates = document.getElementById('set-trip-dates')?.value.trim() || '';

  // Sync back to meta
  const trip = meta.trips.find(t => t.id === currentTripId);
  if (trip) trip.name = data.settings.tripName;
  saveMeta();

  // Sync days if dates changed
  if (data.settings.tripDates && data.settings.tripDates !== oldDates) {
    syncDaysToDateRange(data.settings.tripDates);
  }

  save();
  renderBanner();
  renderDayTabs();
}

function syncDaysToDateRange(tripDates) {
  const { startDate, endDate, days: newCount } = _parseTripSheetDates(tripDates);
  if (!startDate || newCount < 1) return;

  const startD = new Date(startDate.replace(/\//g, '-'));

  // Build map of existing days by their banner date (YYYY/MM/DD)
  const existingByDate = {};
  data.days.forEach(day => {
    const raw = day.banner?.date || '';
    // Extract YYYY/MM/DD from banner date like "2026/05/01（五）"
    const m = raw.match(/(\d{4}\/\d{2}\/\d{2})/);
    if (m) existingByDate[m[1]] = day;
  });

  // Build new days array
  const newDays = [];
  const newExpenses = [];
  for (let i = 0; i < newCount; i++) {
    const d = new Date(startD);
    d.setDate(d.getDate() + i);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const wd = ['日','一','二','三','四','五','六'][d.getDay()];
    const dateKey = `${yyyy}/${mm}/${dd}`;
    const dateStr = `${dateKey}（${wd}）`;

    if (existingByDate[dateKey]) {
      // Reuse existing day, update banner date
      const day = existingByDate[dateKey];
      day.banner.date = dateStr;
      newDays.push(day);
    } else {
      // New blank day
      newDays.push({ banner: { date: dateStr, subtitle: '', photos: [] }, events: [] });
    }

    // Preserve expense for this day if it existed
    const oldIdx = data.days.findIndex(day => {
      const m = (day.banner?.date || '').match(/(\d{4}\/\d{2}\/\d{2})/);
      return m && m[1] === dateKey;
    });
    newExpenses.push(oldIdx >= 0 ? (data.expenses[oldIdx] || []) : []);
  }

  data.days = newDays;
  data.expenses = newExpenses;
  currentDay = Math.min(currentDay, newDays.length - 1);
}

function setCurrency(code) {
  data.settings.currency = code;
  save();
  renderSettings();
  renderExpenseList();
}

function setTheme(mode) {
  data.settings.theme = mode;
  save();
  applyTheme(mode);
  renderSettings();
}

function applyTheme(mode) {
  document.documentElement.setAttribute('data-theme', mode);
}

function getCurrencySymbol() {
  const c = CURRENCIES.find(c => c.code === (data.settings?.currency || 'TWD'));
  return c ? c.symbol : 'NT$';
}

function exportJSON() {
  // Pack meta + all trip data into one export
  const allTrips = {};
  (meta.trips || []).forEach(trip => {
    try {
      const raw = localStorage.getItem(TRIP_PREFIX + trip.id);
      if (raw) allTrips[trip.id] = JSON.parse(raw);
    } catch(e) {}
  });

  const exportData = {
    _version: 2,
    meta: meta,
    trips: allTrips,
    // Also include current trip data for backwards compat
    currentTripId: currentTripId,
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `travel-trace-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast(`已匯出 ${(meta.trips||[]).length} 筆行程`);
}

function importJSON(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target.result);

      // v2 format: has meta + trips
      if (imported._version === 2 && imported.meta) {
        showConfirm('匯入資料', `將匯入 ${(imported.meta.trips||[]).length} 筆行程，現有資料將被覆蓋，確定繼續？`, () => {
          // Restore meta
          meta = imported.meta;
          if (!meta.trips) meta.trips = [];
          saveMeta();

          // Restore each trip
          Object.entries(imported.trips || {}).forEach(([id, tripData]) => {
            localStorage.setItem(TRIP_PREFIX + id, JSON.stringify(tripData));
          });

          // Load first trip or last active
          const firstId = imported.currentTripId || meta.trips[0]?.id;
          if (firstId) {
            loadTrip(firstId);
            renderItinerary();
            renderExpense();
            renderSettings();
          }
          switchTab('home');
          showToast('匯入成功');
        });
        return;
      }

      // v1 legacy format: single trip (has days)
      if (imported.days) {
        showConfirm('匯入資料', '現有資料將被覆蓋，確定繼續？', () => {
          data = imported;
          if (!data.settings) data.settings = { tripName: '', budget: 0, currency: 'TWD', theme: 'light' };
          data.days.forEach(d => {
            if (!d.banner) d.banner = { date: '', subtitle: '', photos: [] };
            if (!d.banner.photos) d.banner.photos = [];
            d.banner.photos = d.banner.photos.filter(p => p && !p.startsWith('blob-key:'));
          });
          save();
          renderItinerary();
          renderExpense();
          renderSettings();
          showToast('匯入成功');
        });
        return;
      }

      showToast('檔案格式錯誤');
    } catch(err) {
      showToast('檔案格式錯誤');
    }
  };
  reader.readAsText(file);
  input.value = '';
}

function clearAllData() {
  showConfirm('清除此行程資料', '此行程所有行程、帳單、資訊將永久刪除。', () => {
    if (!currentTripId) return;
    data = freshTripData();
    const trip = meta.trips.find(t => t.id === currentTripId);
    if (trip) { data.settings.tripName = trip.name; data.settings.currency = trip.currency || 'TWD'; }
    currentDay  = 0;
    expenseDay  = 0;
    save();
    renderItinerary();
    renderExpense();
    renderSettings();
    switchTab('itinerary');
    showToast('已清除所有資料');
  });
}


/* ─── Itinerary Swipe Gesture ─── */
(function() {
  let startX = 0, startY = 0, isDragging = false;
  const THRESHOLD = 50;   // px 最小滑動距離
  const ANGLE = 35;       // 允許的角度偏差

  function onTouchStart(e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isDragging = true;
  }

  function onTouchEnd(e) {
    if (!isDragging) return;
    isDragging = false;
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    // 確認是水平滑動（角度夠小）
    if (Math.abs(dx) < THRESHOLD) return;
    if (Math.abs(dy) / Math.abs(dx) > Math.tan(ANGLE * Math.PI / 180)) return;

    // 循環：左滑→下一天，右滑→上一天，頭尾相連
    if (Math.abs(dx) >= THRESHOLD) {
      currentDay = (currentDay + (dx < 0 ? 1 : -1) + data.days.length) % data.days.length;
      renderItinerary();
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById('screen-itinerary');
    if (!el) return;
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
  });
})();

/* ─── Info Sub-Screen Swipe Gesture ─── */
(function() {
  const INFO_SUBS = ['flight', 'hotel', 'checklist', 'shopping', 'ticket', 'notes']; // map excluded from swipe
  let _currentInfoSub = null;
  let _startX = 0, _startY = 0;
  const THRESHOLD = 50;
  const ANGLE = 35;

  // 記錄目前開啟的 sub
  const _origOpenInfoSub = openInfoSub;
  window.openInfoSub = function(name) {
    _currentInfoSub = name;
    _origOpenInfoSub(name);
  };

  function swipeInfoSub(dir) {
    if (!_currentInfoSub || _currentInfoSub === 'map') return; // map: no swipe
    const idx = INFO_SUBS.indexOf(_currentInfoSub);
    if (idx === -1) return;
    const nextIdx = (idx + dir + INFO_SUBS.length) % INFO_SUBS.length; // wrapping, map excluded
    const nextName = INFO_SUBS[nextIdx];
    document.getElementById('screen-info-' + _currentInfoSub)?.classList.remove('active');
    _currentInfoSub = nextName;
    _origOpenInfoSub(nextName);
  }

  function onTouchStart(e) {
    _startX = e.touches[0].clientX;
    _startY = e.touches[0].clientY;
  }

  function onTouchEnd(e) {
    const dx = e.changedTouches[0].clientX - _startX;
    const dy = e.changedTouches[0].clientY - _startY;
    if (Math.abs(dx) < THRESHOLD) return;
    if (Math.abs(dy) / Math.abs(dx) > Math.tan(ANGLE * Math.PI / 180)) return;
    swipeInfoSub(dx < 0 ? 1 : -1);
  }

  // 對所有 sub-screen 加 swipe
  document.addEventListener('DOMContentLoaded', () => {
    INFO_SUBS.forEach(name => {
      const el = document.getElementById('screen-info-' + name);
      if (!el) return;
      el.addEventListener('touchstart', onTouchStart, { passive: true });
      el.addEventListener('touchend', onTouchEnd, { passive: true });
    });
  });
})();


/* ─── Weather Fetch ─── */
const WMO_DESC = {
    0:'Sunny', 1:'Clear', 2:'Partly Cloudy', 3:'Overcast',
    45:'Foggy', 48:'Icy Fog',
    51:'Light Drizzle', 53:'Drizzle', 55:'Heavy Drizzle',
    61:'Light Rain', 63:'Rainy', 65:'Heavy Rain',
    71:'Light Snow', 73:'Snowy', 75:'Heavy Snow', 77:'Snow',
    80:'Showers', 81:'Rainy', 82:'Heavy Showers',
    85:'Snow Showers', 86:'Heavy Snow',
    95:'Stormy', 96:'Thunder', 99:'Hail Storm',
  };

  function getWeatherDesc(code) {
    return WMO_DESC[code] || 'Cloudy';
  }

let _liveTemp = '';  // 即時溫度快取

  // 把溫度顯示到 DOM
function applyWeatherToDOM() {
  const iconEl = document.getElementById('banner-weather-icon');
  const storedKey = data.days[currentDay]?.weatherKey;
  if (iconEl) iconEl.innerHTML = getWeatherSvg(storedKey || _liveWeatherKey);
  const tempEl = document.getElementById('banner-weather-temp');
  if (!tempEl) return;

  // 1. 優先：已永久儲存的溫度
  const stored = data.days[currentDay]?.weather;
  if (stored) { tempEl.textContent = stored; return; }

  // 2. 今天即時溫度
  const todayIdx = _todayDayIndex();
  if (currentDay === todayIdx && _liveTemp) {
    tempEl.textContent = _liveTemp; return;
  }

  // 3. 未來7天預報 — 先用自己的日期，沒有就從第一個有日期的天推算
  let dayDate = parseBannerDate(data.days[currentDay]?.banner?.date);
  if (!dayDate) {
    for (let i = 0; i < data.days.length; i++) {
      const anchor = parseBannerDate(data.days[i]?.banner?.date);
      if (anchor) {
        dayDate = new Date(anchor);
        dayDate.setDate(dayDate.getDate() + (currentDay - i));
        break;
      }
    }
  }
  if (dayDate) {
    const key = _dateKey(dayDate);
    if (_forecastCache[key]) { tempEl.textContent = _forecastCache[key]; return; }
  }

  // 4. Fallback：顯示今天即時溫度
  if (_liveTemp) { tempEl.textContent = _liveTemp; return; }
  tempEl.textContent = '';
}

  // 找今天對應的行程 index
function _todayDayIndex() {
    const today = new Date();
    today.setHours(0,0,0,0);
    for (let i = 0; i < data.days.length; i++) {
      const d = parseBannerDate(data.days[i].banner.date);
      if (d) {
        d.setHours(0,0,0,0);
        if (d.getTime() === today.getTime()) return i;
      }
    }
    return -1;
  }

const WEATHER_PATHS = {
  sunny_day: 'M440-760v-160h80v160h-80Zm266 110-55-55 112-115 56 57-113 113Zm54 210v-80h160v80H760ZM440-40v-160h80v160h-80ZM254-652 140-763l57-56 113 113-56 54Zm508 512L651-255l54-54 114 110-57 59ZM40-440v-80h160v80H40Zm157 300-56-57 112-112 29 27 29 28-114 114Zm113-170q-70-70-70-170t70-170q70-70 170-70t170 70q70 70 70 170t-70 170q-70 70-170 70t-170-70Zm283-57q47-47 47-113t-47-113q-47-47-113-47t-113 47q-47 47-47 113t47 113q47 47 113 47t113-47ZM480-480Z',
  sunny_night: 'M484-80q-84 0-157.5-32t-128-86.5Q144-253 112-326.5T80-484q0-146 93-257.5T410-880q-18 99 11 193.5T521-521q71 71 165.5 100T880-410q-26 144-138 237T484-80Zm0-80q88 0 163-44t118-121q-86-8-163-43.5T464-465q-61-61-97-138t-43-163q-77 43-120.5 118.5T160-484q0 135 94.5 229.5T484-160Zm-20-305Z',
  cloudy_day: 'M440-760v-160h80v160h-80Zm266 110-56-56 113-114 56 57-113 113Zm54 210v-80h160v80H760Zm3 299L650-254l56-56 114 112-57 57ZM254-650 141-763l57-57 112 114-56 56Zm-14 450h180q25 0 42.5-17.5T480-260q0-25-17-42.5T421-320h-51l-20-48q-14-33-44-52.5T240-440q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T40-320q0-83 58.5-141.5T240-520q60 0 109.5 32.5T423-400q58 0 97.5 43T560-254q-2 57-42.5 95.5T420-120H240Zm320-134q-5-20-10-39t-10-39q45-19 72.5-59t27.5-89q0-66-47-113t-113-47q-60 0-105 39t-53 99q-20-5-41-9t-41-9q14-88 82.5-144T480-720q100 0 170 70t70 170q0 77-44 138.5T560-254Zm-79-226Z',
  cloudy_night: 'M504-465Zm20 385H420l20-12.5q20-12.5 43.5-28t43.5-28l20-12.5q81-6 149.5-49T805-325q-86-8-163-43.5T504-465q-61-61-97-138t-43-163q-77 43-120.5 118.5T200-484v12l-12 5.5q-12 5.5-26.5 11.5T135-443.5l-12 5.5q-2-11-2.5-23t-.5-23q0-146 93-257.5T450-880q-18 99 11 193.5T561-521q71 71 165.5 100T920-410q-26 144-138 237T524-80Zm-284-80h180q25 0 42.5-17.5T480-220q0-25-17-42.5T422-280h-52l-20-48q-14-33-44-52.5T240-400q-50 0-85 34.5T120-280q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T40-280q0-83 58.5-141.5T240-480q60 0 109.5 32.5T423-360q57 2 97 42.5t40 97.5q0 58-41 99t-99 41H240Z',
  drizzle: 'M558-84q-15 8-30.5 2.5T504-102l-60-120q-8-15-2.5-30.5T462-276q15-8 30.5-2.5T516-258l60 120q8 15 2.5 30.5T558-84Zm240 0q-15 8-30.5 2.5T744-102l-60-120q-8-15-2.5-30.5T702-276q15-8 30.5-2.5T756-258l60 120q8 15 2.5 30.5T798-84Zm-480 0q-15 8-30.5 2.5T264-102l-60-120q-8-15-2.5-30.5T222-276q15-8 30.5-2.5T276-258l60 120q8 15 2.5 30.5T318-84Zm-18-236q-91 0-155.5-64.5T80-540q0-83 55-145t136-73q32-57 87.5-89.5T480-880q90 0 156.5 57.5T717-679q69 6 116 57t47 122q0 75-52.5 127.5T700-320H300Zm0-80h400q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-40q0-66-47-113t-113-47q-48 0-87.5 26T333-704l-10 24h-25q-57 2-97.5 42.5T160-540q0 58 41 99t99 41Zm180-200Z',
  heavy_rain: 'M338-204q-15 8-30.5 2.5T284-222L44-702q-8-15-2.5-30.5T62-756q15-8 30.5-2.5T116-738l240 480q8 15 2.5 30.5T338-204Zm187 0q-15 8-30.5 2.5T471-222L231-702q-8-15-2.5-30.5T249-756q15-8 30-2.5t23 20.5l241 480q8 15 2.5 30.5T525-204Zm187-1q-15 8-30.5 3T658-222L418-702q-8-15-2.5-30.5T436-756q15-8 30-2.5t23 20.5l241 480q8 15 2.5 30T712-205Zm155.5 3.5Q852-207 844-222L604-702q-8-15-2.5-30.5T622-756q15-8 30.5-2.5T676-738l240 480q8 15 2.5 30.5T898-204q-15 8-30.5 2.5Z',
  showers: 'M198-484q-15 8-30.5 2.5T144-502L44-702q-8-15-2.5-30.5T62-756q15-8 30.5-2.5T116-738l100 200q8 15 2.5 30.5T198-484Zm140 280q-15 8-30.5 2.5T284-222l-80-160q-8-15-2.5-30.5T222-436q15-8 30.5-2.5T276-418l80 160q8 15 2.5 30.5T338-204Zm82-200q-15 8-30.5 2.5T366-422L226-702q-8-15-2.5-30.5T244-756q15-8 30.5-2.5T298-738l140 280q8 15 2.5 30.5T420-404Zm86-200q-15 8-30.5 2.5T452-622l-39-80q-8-15-2.5-30.5T431-756q15-8 30-2.5t23 20.5l40 80q8 15 2.5 30.5T506-604Zm-6.5 402q-15.5-5-23.5-20l-40-80q-8-15-2.5-30.5T454-356q15-8 30.5-2.5T508-338l40 80q8 15 2.5 30T530-205q-15 8-30.5 3Zm216.5-3q-15 8-30.5 3T662-222L522-502q-8-15-2.5-30.5T540-556q15-8 30.5-2.5T594-538l140 280q8 15 2.5 30T716-205Zm62-239q-15 8-30.5 2.5T724-462L604-702q-8-15-2.5-30.5T622-756q15-8 30.5-2.5T676-738l120 240q8 15 2.5 30.5T778-444Zm120 240q-15 8-30.5 2.5T844-222l-60-120q-8-15-2.5-30.5T802-396q15-8 30.5-2.5T856-378l60 120q8 15 2.5 30.5T898-204Z',
  snow: 'M440-80v-166L310-118l-56-56 186-186v-80h-80L174-254l-56-56 128-130H80v-80h166L118-650l56-56 186 186h80v-80L254-786l56-56 130 128v-166h80v166l130-128 56 56-186 186v80h80l186-186 56 56-128 130h166v80H714l128 130-56 56-186-186h-80v80l186 186-56 56-130-128v166h-80Z',
  thunderstorm: 'm300-40 36-100h-76l50-140h100l-43 100h83L340-40h-40Zm270-40 28-80h-78l43-120h100l-35 80h82L610-80h-40ZM300-320q-91 0-155.5-64.5T80-540q0-83 55-145t136-73q32-57 87.5-89.5T480-880q90 0 156.5 57.5T717-679q69 6 116 57t47 122q0 75-52.5 127.5T700-320H300Zm0-80h400q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-40q0-66-47-113t-113-47q-48 0-87.5 26T333-704l-10 24h-25q-57 2-97.5 42.5T160-540q0 58 41 99t99 41Zm180-200Z',
  windy: 'M460-160q-50 0-85-35t-35-85h80q0 17 11.5 28.5T460-240q17 0 28.5-11.5T500-280q0-17-11.5-28.5T460-320H80v-80h380q50 0 85 35t35 85q0 50-35 85t-85 35ZM80-560v-80h540q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43h-80q0-59 40.5-99.5T620-840q59 0 99.5 40.5T760-700q0 59-40.5 99.5T620-560H80Zm660 320v-80q26 0 43-17t17-43q0-26-17-43t-43-17H80v-80h660q59 0 99.5 40.5T880-380q0 59-40.5 99.5T740-240Z',
};

function getWeatherSvg(key) {
  const d = WEATHER_PATHS[key] || WEATHER_PATHS.sunny_day;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#F5C518" style="width:100%;height:100%"><path d="${d}"/></svg>`;
}

function getWeatherIconKey(code, wind, isDay) {
  if (wind >= 40) return 'windy';
  if (code === 0)                       return isDay ? 'sunny_day' : 'sunny_night';
  if (code <= 3)                        return isDay ? 'cloudy_day' : 'cloudy_night';
  if (code <= 49)                       return isDay ? 'cloudy_day' : 'cloudy_night';
  if (code <= 67)                       return code <= 57 ? 'drizzle' : 'heavy_rain';
  if (code <= 77)                       return 'snow';
  if (code <= 82)                       return 'showers';
  if (code >= 95)                       return 'thunderstorm';
  return isDay ? 'sunny_day' : 'sunny_night';
}

let _forecastCache = {};
let _liveWeatherKey = 'sunny_day'; // default

function _dateKey(dateObj) {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, '0');
  const d = String(dateObj.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

async function fetchWeather(lat, lon) {
    try {
      // 一次抓：即時 + 未來7天日最高溫
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode,windspeed_10m&daily=temperature_2m_max,weathercode&temperature_unit=celsius&timezone=auto&forecast_days=7`;
      const res = await fetch(url);
      const json = await res.json();

      // 即時溫度
      const temp = Math.round(json.current.temperature_2m);
      _liveTemp = temp + '°';
      // Weather icon
      const wcode = json.current.weathercode || 0;
      const wind  = json.current.windspeed_10m || 0;
      const hour  = new Date().getHours();
      const isDay = hour >= 7 && hour < 19;
      _liveWeatherKey = getWeatherIconKey(wcode, wind, isDay);

      // 存進今天對應的行程天（永久），非行程日期就只存 _liveTemp 不寫 data
      const todayIdx = _todayDayIndex();
      if (todayIdx !== -1) {
        if (!data.days[todayIdx].weather) {
          data.days[todayIdx].weather = _liveTemp;
          data.days[todayIdx].weatherKey = _liveWeatherKey;
          save();
        }
      }

      // 未來預報 cache（只存 session，不寫 localStorage）
      const dailyDates = json.daily?.time || [];
      const dailyTemps = json.daily?.temperature_2m_max || [];
      _forecastCache = {};
      dailyDates.forEach((d, i) => {
        _forecastCache[d] = Math.round(dailyTemps[i]) + '°';
      });

      applyWeatherToDOM();
    } catch(e) {
      console.warn('Weather fetch failed:', e);
    }
  }

function initWeather() {
  const s = data?.settings || {};
  if (s.weatherMode === 'manual' && s.weatherLat && s.weatherLon) {
    // Use saved manual location
    fetchWeather(s.weatherLat, s.weatherLon);
    return;
  }
  // Fall back to GPS
  if (!navigator.geolocation) return;
  navigator.geolocation.getCurrentPosition(
    pos => fetchWeather(pos.coords.latitude, pos.coords.longitude),
    () => {},
    { timeout: 8000 }
  );
}

document.addEventListener('DOMContentLoaded', () => {
    initWeather();
    // 每30分鐘更新一次（只更新今天）
    setInterval(initWeather, 30 * 60 * 1000);
  });


/* ═══════════════════════════════════════
   INIT
═══════════════════════════════════════ */
loadMeta();
applyTheme('light');

// Start on Home screen
switchTab('home');






/* ═══════════════════════════════════════
   INPUT CLEAR BUTTONS v3
   - Wrap each input/textarea in .field-wrap
   - × positioned absolute inside wrapper
   - Show only on focus + has value
   - Hide on blur
═══════════════════════════════════════ */
function initInputClearBtns(root) {
  const target = root || document;

  // Remove ALL previous field-x and input-clear-btn buttons
  target.querySelectorAll('.field-x, .input-clear-btn').forEach(b => b.remove());

  // Reset init flag so we can re-init
  target.querySelectorAll('[data-xv3]').forEach(el => delete el.dataset.xv3);

  const selector = 'input.ff-input, input.ev-big-input, textarea.ff-input, textarea.ev-big-input, textarea.note-sheet-textarea';

  target.querySelectorAll(selector).forEach(field => {
    const parent = field.parentNode;

    // Wrap just the field in a relative container for correct positioning
    const wrap = document.createElement('span');
    wrap.style.cssText = 'position:relative;display:block;width:100%';
    parent.insertBefore(wrap, field);
    wrap.appendChild(field);

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'field-x';
    btn.textContent = '×';
    btn.tabIndex = -1;
    if (field.tagName === 'TEXTAREA') {
      btn.style.top = '10px';
      btn.style.transform = 'none';
    }
    wrap.appendChild(btn);

    if (field.tagName !== 'TEXTAREA') {
      field.style.paddingRight = '22px';
    } else {
      field.style.paddingRight = '28px';
    }

    const show = () => btn.classList.toggle('show', field.value.length > 0);
    const hide = () => btn.classList.remove('show');

    field.addEventListener('focus', show);
    field.addEventListener('input', () => {
      if (document.activeElement === field) show();
    });
    field.addEventListener('blur', () => setTimeout(hide, 150));
    btn.addEventListener('mousedown', e => e.preventDefault());
    btn.addEventListener('touchstart', e => e.preventDefault(), { passive: false });
    btn.addEventListener('click', () => {
      field.value = '';
      field.dispatchEvent(new Event('input', { bubbles: true }));
      field.focus();
      hide();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    const obs = new MutationObserver(() => {
      if (modal.classList.contains('open')) initInputClearBtns(modal);
    });
    obs.observe(modal, { attributes: true, attributeFilter: ['class'] });
  });
});
