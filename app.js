(() => {
  "use strict";

  const STORAGE = {
    items: "lostlink.items.v1",
    claims: "lostlink.claims.v1",
    user: "lostlink.user.v1",
    theme: "lostlink.theme.v1",
  };
  const categories = ["Electronics", "Books & Stationery", "Bags & Accessories", "Clothing", "Keys", "Other"];
  const locations = ["Library", "Student Centre", "Central Lawn", "Cafeteria", "Academic Block", "Sports Complex", "Hostel", "Other"];
  const symbols = { Electronics: "🎧", "ID Cards & Documents": "🪪", "Books & Stationery": "📚", "Bags & Accessories": "🎒", Clothing: "🧥", Keys: "🔑", Other: "🔎" };
  const stockPhoto = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;
  const byId = (id) => document.getElementById(id);
  const today = new Date();
  const dateAgo = (days) => {
    const date = new Date(today);
    date.setDate(date.getDate() - days);
    return date.toISOString().slice(0, 10);
  };
  const seedItems = [
    { id: "seed-1", type: "lost", name: "Wireless earbuds", category: "Electronics", description: "White wireless earbuds in a compact charging case. Lost after an afternoon lecture.", date: dateAgo(1), location: "Academic Block", identifying: "", status: "Open", owner: "u-demo", ownerName: "Nidhi", photo: stockPhoto("photo-1606220945770-b5b6c2c55bf1"), createdAt: Date.now() - 86400000 * 1 },
    { id: "seed-2", type: "found", name: "Bluetooth earbuds case", category: "Electronics", description: "A small white earbuds case was found near the lecture halls. Please describe the case to claim it.", date: dateAgo(2), location: "Academic Block", identifying: "One tiny blue sticker on the inside of the lid.", status: "Open", owner: "u-meera", ownerName: "Meera Kaur", photo: stockPhoto("photo-1606220945770-b5b6c2c55bf1"), createdAt: Date.now() - 86400000 * 2 },
    { id: "seed-3", type: "lost", name: "Engineering mathematics notes", category: "Books & Stationery", description: "A spiral notebook with handwritten calculus and linear algebra notes.", date: dateAgo(3), location: "Library", identifying: "", status: "Open", owner: "u-rohan", ownerName: "Rohan Mehta", photo: stockPhoto("photo-1531346878377-a5be20888e57"), createdAt: Date.now() - 86400000 * 3 },
    { id: "seed-4", type: "found", name: "Black notebook", category: "Books & Stationery", description: "Closed black notebook picked up from a study table.", date: dateAgo(1), location: "Library", identifying: "There is a small geometric doodle on the back cover.", status: "Open", owner: "u-demo", ownerName: "Nidhi", photo: stockPhoto("photo-1551396028-60ed2702a337"), createdAt: Date.now() - 86400000 },
    { id: "seed-5", type: "found", name: "Key with a green keychain", category: "Keys", description: "One key with a bright green, handmade keychain, currently kept safe with the finder.", date: dateAgo(4), location: "Student Centre", identifying: "The tag has a handwritten word on its reverse.", status: "Open", owner: "u-isha", ownerName: "Isha Sharma", photo: "assets/green-keychain.png", createdAt: Date.now() - 86400000 * 4 },
    { id: "seed-6", type: "lost", name: "Navy blue backpack", category: "Bags & Accessories", description: "Navy backpack left behind around lunchtime. Contains course materials.", date: dateAgo(5), location: "Cafeteria", identifying: "", status: "Open", owner: "u-demo", ownerName: "Nidhi", photo: stockPhoto("photo-1553062407-98eeb64c6a62"), createdAt: Date.now() - 86400000 * 5 },
    { id: "seed-7", type: "found", name: "Casio scientific calculator", category: "Electronics", description: "A Casio scientific calculator was handed in near the Central Lawn and is being held at the campus office.", date: dateAgo(2), location: "Central Lawn", identifying: "Check the model label and a small mark on the back of the cover.", status: "Submitted to campus office", owner: "u-kabir", ownerName: "Kabir Anand", photo: stockPhoto("photo-1757256137041-0aab889db199"), createdAt: Date.now() - 86400000 * 2 },
    { id: "seed-8", type: "lost", name: "Silver water bottle", category: "Other", description: "Insulated silver bottle with a black cap, misplaced during the morning.", date: dateAgo(6), location: "Sports Complex", identifying: "", status: "Open", owner: "u-nisha", ownerName: "Nisha Bedi", photo: stockPhoto("photo-1616170919057-5946e5f0c9f6"), createdAt: Date.now() - 86400000 * 6 },
  ];

  const read = (key, fallback) => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch (error) {
      console.error(`Could not read ${key} from local storage.`, error);
      return fallback;
    }
  };
  const write = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Could not save ${key} to local storage.`, error);
      toast("Your browser could not save this change. Check available storage.");
      return false;
    }
    return true;
  };

  let items = read(STORAGE.items, null);
  if (!Array.isArray(items)) {
    items = seedItems;
    write(STORAGE.items, items);
  }
  let updatedSeedItems = false;
  items.forEach((item) => {
    const seedItem = seedItems.find((seed) => seed.id === item.id);
    if (seedItem) {
      for (const [key, value] of Object.entries(seedItem)) {
        if (item[key] !== value && (key === "photo" || item.id === "seed-5" && ["name", "description"].includes(key) || item.id === "seed-7" && ["name", "category", "description", "identifying"].includes(key) || item.id === "seed-4" && key === "description")) {
          item[key] = value;
          updatedSeedItems = true;
        }
      }
    }
  });
  if (updatedSeedItems) write(STORAGE.items, items);
  let claims = read(STORAGE.claims, []);
  if (!Array.isArray(claims)) claims = [];
  let user = read(STORAGE.user, {
    id: "u-demo", name: "Nidhi", email: "aarav.singh@thapar.edu",
    studentId: "1023••••", verified: true, contactPreference: "In-app messages",
  });
  if (user?.id === "u-demo" && user.email === "aarav.singh@thapar.edu") {
    user.email = "nidhi@thapar.edu";
    write(STORAGE.user, user);
  }
  if (user?.id === "u-demo" && user.name === "Aarav Singh") {
    user.name = "Nidhi";
    write(STORAGE.user, user);
    items.forEach((item) => {
      if (item.owner === "u-demo" && item.ownerName === "Aarav Singh") item.ownerName = "Nidhi";
    });
    write(STORAGE.items, items);
  }
  let currentPage = "dashboard";
  let browseType = "all";
  let browseFilters = { search: "", category: "", location: "", status: "" };
  let authMode = "login";
  let photoPreviewUrl = null;

  function escapeHtml(value = "") {
    return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  }
  function initials(name = "Student") {
    return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0] || "").join("").toUpperCase();
  }
  function dateLabel(date) {
    if (!date) return "Date not specified";
    return new Date(`${date}T00:00:00`).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
  }
  function timeAgo(timestamp) {
    const days = Math.max(0, Math.floor((Date.now() - timestamp) / 86400000));
    return days === 0 ? "Today" : days === 1 ? "Yesterday" : `${days} days ago`;
  }
  function toast(message) {
    const node = document.createElement("div");
    node.className = "toast";
    node.textContent = message;
    byId("toast-region").append(node);
    window.setTimeout(() => node.remove(), 3500);
  }
  function itemPhotoMarkup(item) {
    const placeholder = `<span class="item-photo-placeholder">${/calculator/i.test(item.name) ? "🧮" : symbols[item.category] || "🔎"}</span>`;
    const photo = item.photo;
    if (!photo || !(/^(https:\/\/|assets\/[a-z0-9._-]+|data:image\/(?:jpeg|png|webp);base64,)/i).test(photo)) return placeholder;
    return `<img class="item-photo-image" src="${escapeHtml(photo)}" alt="${escapeHtml(item.name)}" loading="lazy">${placeholder}`;
  }
  function clearPhotoPreview() {
    if (photoPreviewUrl) URL.revokeObjectURL(photoPreviewUrl);
    photoPreviewUrl = null;
  }
  function compressPhoto(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("The selected photo could not be read."));
      reader.onload = () => {
        const image = new Image();
        image.onerror = () => reject(new Error("The selected photo could not be opened."));
        image.onload = () => {
          const scale = Math.min(1, 1000 / Math.max(image.naturalWidth, image.naturalHeight));
          const canvas = document.createElement("canvas");
          canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
          canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
          const context = canvas.getContext("2d");
          if (!context) {
            reject(new Error("Photo processing is not available in this browser."));
            return;
          }
          context.fillStyle = "#fff";
          context.fillRect(0, 0, canvas.width, canvas.height);
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL("image/jpeg", .78));
        };
        image.src = String(reader.result);
      };
      reader.readAsDataURL(file);
    });
  }
  function persistItems() { return write(STORAGE.items, items); }
  function persistClaims() { return write(STORAGE.claims, claims); }
  function persistUser() { return write(STORAGE.user, user); }
  function safeEmail(email) {
    const [name, domain] = email.split("@");
    if (!domain) return "Student email";
    return `${name.charAt(0)}.......@${domain}`;
  }
  function syncUser() {
    const name = user?.name || "Student";
    byId("mini-avatar").textContent = initials(name);
    byId("top-avatar").textContent = initials(name);
    byId("mini-name").textContent = name;
    byId("mini-email").textContent = user ? safeEmail(user.email || "") : "Not signed in";
    byId("top-name").textContent = name.split(" ")[0];
    byId("nav-item-count").textContent = items.filter((item) => item.status === "Open").length;
    byId("nav-claim-count").textContent = claims.filter((claim) => claim.status === "Pending" && ownItem(claim.itemId)).length;
  }
  function ownItem(itemId) { return items.find((item) => item.id === itemId)?.owner === user?.id; }
  function navTo(page) {
    clearPhotoPreview();
    if (!user && page !== "auth") {
      page = "auth";
      toast("Please sign in to access your account.");
    }
    currentPage = page;
    document.querySelectorAll(".nav-item[data-page]").forEach((button) => button.classList.toggle("active", button.dataset.page === page));
    const label = { dashboard: "Dashboard", browse: "Browse items", "report-lost": "Report lost", "report-found": "Report found", reports: "My reports", claims: "Claims & requests", profile: "My profile", settings: "Settings", auth: "Sign in" }[page] || "Dashboard";
    byId("crumb-current").textContent = label;
    byId("sidebar").classList.remove("open");
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function render() {
    syncUser();
    const page = {
      dashboard: renderDashboard, browse: renderBrowse, "report-lost": () => renderReportForm("lost"),
      "report-found": () => renderReportForm("found"), reports: renderReports,
      claims: renderClaims, profile: renderProfile, settings: renderSettings, auth: renderAuth,
    }[currentPage] || renderDashboard;
    byId("page-content").innerHTML = page();
  }
  function pageHeading(eyebrow, title, subtitle, action = "") {
    return `<div class="page-heading"><div><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><p>${subtitle}</p></div>${action}</div>`;
  }
  function idCardNotice() {
    return `<div class="id-card-notice" role="note"><strong>Lost or found an ID card?</strong><p>If you find one, contact its owner directly or hand it to the designated campus authority. If your ID is missing, contact campus authority for help. Please don’t post a card photo or personal details publicly.</p></div>`;
  }
  function typeBadge(type) {
    return `<span class="type-badge ${type}">${type === "lost" ? "Lost" : "Found"}</span>`;
  }
  function matchesFor(item) {
    if (!item || item.status !== "Open") return [];
    const otherType = item.type === "lost" ? "found" : "lost";
    const words = `${item.name} ${item.description}`.toLowerCase().split(/[^a-z0-9]+/).filter((word) => word.length > 2);
    return items.filter((other) => {
      if (other.id === item.id || other.type !== otherType || other.status !== "Open") return false;
      let score = 0;
      if (other.category === item.category) score += 2;
      if (other.location === item.location) score += 2;
      const otherWords = new Set(`${other.name} ${other.description}`.toLowerCase().split(/[^a-z0-9]+/).filter((word) => word.length > 2));
      score += words.filter((word) => otherWords.has(word)).length;
      return score >= 3;
    }).map((other) => {
      const reasons = [];
      if (other.category === item.category) reasons.push("same category");
      if (other.location === item.location) reasons.push("same campus location");
      const shared = [...new Set(words)].filter((word) => `${other.name} ${other.description}`.toLowerCase().includes(word));
      if (shared.length) reasons.push(`related details: ${shared.slice(0, 2).join(", ")}`);
      const score = Math.min(98, 55 + (other.category === item.category ? 12 : 0) + (other.location === item.location ? 15 : 0) + shared.length * 5);
      return { item: other, score, reason: reasons.join(" · ") };
    }).sort((a, b) => b.score - a.score).slice(0, 3);
  }
  function renderDashboard() {
    const openItems = items.filter((item) => item.status === "Open").length;
    const myLost = items.filter((item) => item.owner === user.id && item.type === "lost").length;
    const myFound = items.filter((item) => item.owner === user.id && item.type === "found").length;
    const myClaims = claims.filter((claim) => claim.status === "Pending" && (claim.claimant === user.id || ownItem(claim.itemId))).length;
    const myOpenLost = items.filter((item) => item.owner === user.id && item.type === "lost" && item.status === "Open");
    const suggestions = myOpenLost.flatMap((item) => matchesFor(item).map((match) => ({ ...match, source: item }))).sort((a, b) => b.score - a.score).slice(0, 2);
    const recent = [...items].sort((a, b) => b.createdAt - a.createdAt).slice(0, 4);
    return `
      <section class="welcome-banner"><div class="welcome-copy"><div class="eyebrow">A little help goes a long way</div><h1>Good to see you, ${escapeHtml(user.name.split(" ")[0])} 👋</h1><p>Lost something on campus? Your Thapar community is here to help you find it.</p><div class="welcome-actions"><button class="button button-primary" data-page="report-lost">+ Report an item</button><button class="button button-secondary" data-page="browse">Browse items</button></div></div><div class="banner-illustration"><div class="illustration-card"><svg viewBox="0 0 80 80"><path d="M15 34 40 14l25 20v31a4 4 0 0 1-4 4H19a4 4 0 0 1-4-4z"/><path d="M30 69V48h20v21M23 35l17-14 17 14"/><circle cx="54" cy="27" r="10" fill="#e9f4eb"/><path d="m50 27 3 3 6-7"/></svg></div></div></section>
      <section class="stat-grid" aria-label="Community activity">
        <div class="stat-card"><span class="stat-icon lost"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 8v8m-4-4h8"/></svg></span><div class="stat-copy"><span>Open reports</span><strong>${openItems}</strong></div></div>
        <div class="stat-card"><span class="stat-icon found"><svg viewBox="0 0 24 24"><path d="m5 13 4 4L19 7"/></svg></span><div class="stat-copy"><span>My lost reports</span><strong>${myLost}</strong></div></div>
        <div class="stat-card"><span class="stat-icon match"><svg viewBox="0 0 24 24"><path d="M8 8h8v8H8z"/><path d="M4 10V6a2 2 0 0 1 2-2h4m10 10v4a2 2 0 0 1-2 2h-4"/></svg></span><div class="stat-copy"><span>My found reports</span><strong>${myFound}</strong></div></div>
        <div class="stat-card"><span class="stat-icon claim"><svg viewBox="0 0 24 24"><path d="M8.5 12 11 14.5 17 8"/><circle cx="12" cy="12" r="9"/></svg></span><div class="stat-copy"><span>Pending claims</span><strong>${myClaims}</strong></div></div>
      </section>
      <section class="dashboard-grid">
        <div><div class="section-card"><div class="section-card-header"><div><h2>Recently reported</h2><p>Fresh updates from around campus</p></div><button class="text-link" data-page="browse">View all →</button></div><div class="recent-list">${recent.map((item) => `<div class="recent-item" data-item="${escapeHtml(item.id)}" role="button" tabindex="0"><span class="item-emoji recent-item-photo">${itemPhotoMarkup(item)}</span><div class="recent-details"><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.location)} · ${timeAgo(item.createdAt)}</span></div>${typeBadge(item.type)}</div>`).join("")}</div></div>
          <div class="quick-actions"><button class="quick-action" data-page="report-lost"><span class="quick-icon lost">＋</span><span><strong>Lost something?</strong><small>Tell the community</small></span></button><button class="quick-action" data-page="report-found"><span class="quick-icon found">✓</span><span><strong>Found an item?</strong><small>Help reunite it</small></span></button></div>
        </div>
        <div class="section-card matches-panel"><div class="section-card-header"><div><h2>Possible matches</h2><p>Suggestions, not confirmed matches</p></div><span class="match-arrow">✦</span></div>${suggestions.length ? suggestions.map((match) => `<div class="match-card" data-item="${escapeHtml(match.item.id)}" role="button" tabindex="0"><div class="match-card-top">${typeBadge(match.item.type)}<span class="match-score">${match.score}% match</span></div><strong>${escapeHtml(match.source.name)} ↔ ${escapeHtml(match.item.name)}</strong><p>${escapeHtml(match.reason)}. Check the details to see if they belong together.</p></div>`).join("") : `<div class="empty-state" style="margin:0 14px 12px;padding:25px 12px"><div class="empty-emoji">✦</div><h3>No new matches yet</h3><p>We’ll compare your open reports as new items are added.</p></div>`}</div>
      </section>`;
  }
  function renderBrowse() {
    const visible = items.filter((item) => {
      if (browseType !== "all" && item.type !== browseType) return false;
      if (browseFilters.category && item.category !== browseFilters.category) return false;
      if (browseFilters.location && item.location !== browseFilters.location) return false;
      if (browseFilters.status && item.status !== browseFilters.status) return false;
      if (browseFilters.date) {
        const age = (Date.now() - new Date(`${item.date}T00:00:00`).getTime()) / 86400000;
        if (browseFilters.date === "week" && age > 7) return false;
        if (browseFilters.date === "month" && age > 30) return false;
      }
      const query = browseFilters.search.toLowerCase().trim();
      return !query || `${item.name} ${item.description} ${item.category} ${item.location}`.toLowerCase().includes(query);
    }).sort((a, b) => b.createdAt - a.createdAt);
    return `${pageHeading("Campus community", "Browse items", "Search reports and help bring a lost item back to its owner.", `<button class="button button-primary" data-page="report-lost">+ New report</button>`)}
      ${idCardNotice()}
      <div class="filter-bar"><label class="search-field"><svg viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.5 4.5"/></svg><input id="browse-search" type="search" placeholder="Search name, details or location..." value="${escapeHtml(browseFilters.search)}" aria-label="Search reports"></label>
      <select class="filter-select" id="category-filter" aria-label="Filter by category"><option value="">All categories</option>${categories.map((category) => `<option ${browseFilters.category === category ? "selected" : ""}>${escapeHtml(category)}</option>`).join("")}</select>
      <select class="filter-select" id="location-filter" aria-label="Filter by location"><option value="">All locations</option>${locations.map((location) => `<option ${browseFilters.location === location ? "selected" : ""}>${escapeHtml(location)}</option>`).join("")}</select>
      <select class="filter-select" id="date-filter" aria-label="Filter by date"><option value="">Any date</option><option value="week" ${browseFilters.date === "week" ? "selected" : ""}>Past week</option><option value="month" ${browseFilters.date === "month" ? "selected" : ""}>Past month</option></select>
      <select class="filter-select" id="status-filter" aria-label="Filter by status"><option value="">All statuses</option>${["Open", "Submitted to campus office", "Recovered"].map((status) => `<option ${browseFilters.status === status ? "selected" : ""}>${status}</option>`).join("")}</select></div>
      <div class="tabs"><button class="tab-button ${browseType === "all" ? "active" : ""}" data-browse-type="all">All items</button><button class="tab-button ${browseType === "lost" ? "active" : ""}" data-browse-type="lost">Lost items</button><button class="tab-button ${browseType === "found" ? "active" : ""}" data-browse-type="found">Found items</button><span style="margin-left:auto;color:var(--muted);font-size:10px;padding:0 4px 10px">${visible.length} reports</span></div>
      ${visible.length ? `<div class="item-grid">${visible.map(renderItemCard).join("")}</div>` : `<div class="empty-state"><div class="empty-emoji">🔎</div><h3>No reports found</h3><p>Try changing your search or filters, or add a new report.</p><button class="button button-secondary" data-action="clear-filters">Clear filters</button></div>`}`;
  }
  function renderItemCard(item) {
    const matches = matchesFor(item);
    const canClaim = item.type === "found" && item.owner !== user.id && item.status === "Open";
    const claimAlready = claims.some((claim) => claim.itemId === item.id && claim.claimant === user.id && claim.status === "Pending");
    return `<article class="item-card" data-item="${escapeHtml(item.id)}" tabindex="0" role="button"><div class="item-card-visual">${itemPhotoMarkup(item)}${typeBadge(item.type)}${matches.length ? `<span class="match-chip">✦ ${matches.length} possible ${matches.length === 1 ? "match" : "matches"}</span>` : ""}</div><div class="item-card-body"><div class="item-card-title"><h3>${escapeHtml(item.name)}</h3></div><p>${escapeHtml(item.description)}</p><div class="item-meta"><span><svg viewBox="0 0 24 24"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>${escapeHtml(item.location)}</span><span><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>${dateLabel(item.date)}</span></div><div class="item-card-footer"><span class="reporter">Shared by ${item.owner === user.id ? "you" : "a student"} · ${timeAgo(item.createdAt)}</span><span class="status-badge ${item.status.toLowerCase().replaceAll(" ", "-")}">${escapeHtml(item.status)}</span></div>${canClaim ? `<button class="small-button claim-button" style="margin-top:11px;width:100%" data-action="claim" data-id="${escapeHtml(item.id)}" ${claimAlready ? "disabled" : ""}>${claimAlready ? "Claim submitted" : "Claim item"}</button>` : ""}</div></article>`;
  }
  function renderReportForm(type) {
    const isLost = type === "lost";
    return `${pageHeading(isLost ? "Tell us what happened" : "Give it a way home", isLost ? "Report a lost item" : "Report a found item", isLost ? "Add a few details so your campus community can keep an eye out." : "Share a safe description and help its owner find it.")}
      <div class="form-layout"><form class="form-card" id="report-form" data-type="${type}"><h2>${isLost ? "Item details" : "Found item details"}</h2><p class="form-intro">${isLost ? "The more you share, the easier it is for someone to spot your item." : "Please leave unique identifying details private so the rightful owner can verify their claim."}</p>
        <div class="form-grid"><div class="field"><label for="item-name">Item name *</label><input id="item-name" name="name" required maxlength="70" placeholder="e.g. Blue water bottle"></div>
        <div class="field"><label for="item-category">Category *</label><select id="item-category" name="category" required><option value="">Choose a category</option>${categories.map((category) => `<option>${escapeHtml(category)}</option>`).join("")}</select></div>
        <div class="field field-full"><label for="item-description">Description *</label><textarea id="item-description" name="description" required maxlength="350" placeholder="${isLost ? "What does it look like? When did you last have it?" : "Share a general description without revealing unique identifying details."}"></textarea></div>
        <div class="field"><label for="item-date">${isLost ? "Approximate date lost" : "Date found"} *</label><input id="item-date" name="date" type="date" max="${dateAgo(0)}" required></div>
        <div class="field"><label for="item-location">${isLost ? "Last known location" : "Location found"} *</label><select id="item-location" name="location" required><option value="">Choose a campus location</option>${locations.map((location) => `<option>${escapeHtml(location)}</option>`).join("")}</select></div>
        <div class="field field-full"><label for="item-identifying">${isLost ? "Identifying details" : "Private identifying details"} <span>${isLost ? "(optional)" : "(only shown to the finder)"}</span></label><textarea id="item-identifying" name="identifying" maxlength="300" placeholder="${isLost ? "A unique mark, sticker or detail that helps identify it." : "Keep one or two distinctive details private for claim verification."}"></textarea><small>${isLost ? "Details help distinguish your item from similar reports." : "This information is not shown in public listings and can help you verify claims."}</small></div>
        ${!isLost ? `<div class="field field-full"><label for="item-photo">Item photo <span>(optional)</span></label><input id="item-photo" name="photo" type="file" accept="image/jpeg,image/png,image/webp"><small>Choose a clear photo (JPEG, PNG or WebP, up to 8 MB). It will be resized and saved in this browser.</small><div class="photo-preview" id="photo-preview" hidden></div></div>` : ""}
        ${isLost ? `<div class="field field-full"><label for="contact-pref">Contact preference *</label><select id="contact-pref" name="contactPreference" required><option>In-app messages</option><option>Meet at a campus office</option><option>Meet at a public campus location</option></select></div>` : `<div class="field field-full"><label for="item-status">Where is the item now? *</label><select id="item-status" name="status" required><option value="With the finder">With me (the finder)</option><option value="Submitted to campus office">Submitted to a campus office</option></select></div>`}
        </div><div class="form-actions"><button class="button button-secondary" type="reset">Clear form</button><button class="button button-primary" type="submit">Publish ${isLost ? "lost" : "found"} report →</button></div></form>
        <aside>${!isLost ? idCardNotice() : ""}<div class="info-panel"><h3>${isLost ? "Make your report count" : "A safer way to help"}</h3><ul class="info-list">${(isLost ? ["Include a clear, accurate description.", "Choose the closest campus location.", "Check possible matches in your dashboard."] : ["Keep unique details private for verification.", "Choose where the item is safely held.", "Never share someone’s ID or contact details."]).map((tip) => `<li>${tip}</li>`).join("")}</ul></div><div class="safety-note"><strong>Safe handovers matter</strong><p>Arrange returns at a campus office or a busy public place. Verify ownership before handing anything over.</p></div></aside></div>`;
  }
  function renderReports() {
    const mine = items.filter((item) => item.owner === user.id).sort((a, b) => b.createdAt - a.createdAt);
    return `${pageHeading("Your activity", "My reports", "Keep track of items you’ve reported to the Thapar community.", `<button class="button button-primary" data-page="report-lost">+ New report</button>`)}
      <div class="tabs"><button class="tab-button active" data-report-filter="all">All reports (${mine.length})</button><button class="tab-button" data-report-filter="lost">Lost</button><button class="tab-button" data-report-filter="found">Found</button></div>
      <div class="report-list" id="my-report-list">${mine.length ? mine.map(renderReportRow).join("") : `<div class="empty-state"><div class="empty-emoji">📋</div><h3>No reports yet</h3><p>Your lost and found reports will show up here.</p><button class="button button-primary" data-page="report-lost">Create a report</button></div>`}</div>`;
  }
  function renderReportRow(item) {
    const claimsForItem = claims.filter((claim) => claim.itemId === item.id && claim.status === "Pending").length;
    return `<article class="item-card report-item-card" data-item="${escapeHtml(item.id)}" tabindex="0" role="button"><div class="item-card-visual">${itemPhotoMarkup(item)}${typeBadge(item.type)}</div><div class="item-card-body"><div class="item-card-title"><h3>${escapeHtml(item.name)}</h3><span class="status-badge ${item.status.toLowerCase().replaceAll(" ", "-")}">${escapeHtml(item.status)}</span></div><p>${escapeHtml(item.location)} · ${dateLabel(item.date)} · ${claimsForItem ? `${claimsForItem} pending claim${claimsForItem > 1 ? "s" : ""}` : "No pending claims"}</p><div class="row-actions">${item.type === "found" && claimsForItem ? `<button class="small-button" data-page="claims">Review claims</button>` : ""}${item.type === "found" && item.status !== "Recovered" ? `<button class="small-button" data-action="recover" data-id="${escapeHtml(item.id)}">Mark recovered</button>` : ""}</div></div></article>`;
  }
  function renderClaims() {
    const incoming = claims.filter((claim) => ownItem(claim.itemId)).sort((a, b) => b.createdAt - a.createdAt);
    const outgoing = claims.filter((claim) => claim.claimant === user.id).sort((a, b) => b.createdAt - a.createdAt);
    return `${pageHeading("Ownership, thoughtfully", "Claims & requests", "Review claims for your found items, or check on claims you’ve submitted.")}
      <section class="claims-section"><h2>Incoming claims</h2>${incoming.length ? incoming.map((claim) => renderClaimRow(claim, true)).join("") : `<div class="empty-state"><div class="empty-emoji">📨</div><h3>No incoming claims</h3><p>If someone claims an item you found, you can review it here.</p></div>`}</section>
      <section class="claims-section"><h2>Your submitted claims</h2>${outgoing.length ? outgoing.map((claim) => renderClaimRow(claim, false)).join("") : `<div class="empty-state"><div class="empty-emoji">🧾</div><h3>No claims submitted</h3><p>When you claim a found item, its status will appear here.</p><button class="button button-secondary" data-page="browse">Browse found items</button></div>`}</section>`;
  }
  function renderClaimRow(claim, incoming) {
    const item = items.find((entry) => entry.id === claim.itemId);
    if (!item) return "";
    return `<div class="claim-row"><span class="item-emoji">${symbols[item.category] || "🔎"}</span><div class="claim-copy"><strong>${incoming ? `${escapeHtml(claim.claimantName)} claims` : "You claimed"} “${escapeHtml(item.name)}”</strong><p>${escapeHtml(claim.details)}</p><small>Submitted ${timeAgo(claim.createdAt)} · <span class="status-badge ${claim.status.toLowerCase()}">${escapeHtml(claim.status)}</span></small></div>${incoming && claim.status === "Pending" ? `<div class="claim-actions"><button class="small-button" data-action="reject-claim" data-id="${escapeHtml(claim.id)}">Reject</button><button class="small-button claim-button" data-action="approve-claim" data-id="${escapeHtml(claim.id)}">Approve</button></div>` : ""}</div>`;
  }
  function renderProfile() {
    return `${pageHeading("Your account", "My profile", "Your student identity stays private while you connect with campus peers.")}
      <div class="profile-layout"><section class="profile-card"><div class="profile-header"><span class="avatar avatar-large">${initials(user.name)}</span><div><h2>${escapeHtml(user.name)}</h2><p>Thapar Institute of Engineering &amp; Technology</p>${user.verified ? `<span class="verified"><svg viewBox="0 0 16 16"><path d="m3 8 3 3 7-7"/></svg>Verified student</span>` : `<span class="status-badge">Verification pending</span>`}</div></div>
      <div class="profile-details"><div class="detail-pair"><span>Thapar email</span><strong>${escapeHtml(safeEmail(user.email))}</strong></div><div class="detail-pair"><span>Student ID</span><strong>${escapeHtml(user.studentId || "••••••••")}</strong></div><div class="detail-pair"><span>Contact preference</span><strong>${escapeHtml(user.contactPreference || "In-app messages")}</strong></div></div></section>
      <aside class="section-card"><div class="section-card-header"><div><h2>Account access</h2><p>Manage your sign-in</p></div></div><div style="padding:0 16px 16px"><p style="font-size:10px;color:var(--muted);line-height:1.55">This local prototype stores demo account details only in this browser.</p><button class="button button-secondary" data-action="sign-out" style="width:100%">Sign out</button></div></aside></div>`;
  }
  function renderSettings() {
    const dark = document.documentElement.classList.contains("dark");
    return `${pageHeading("Make it yours", "Settings", "Adjust how LostLink looks and how your information is shared.")}
      <section class="settings-list"><div class="settings-row"><span class="stat-icon match">◐</span><div><strong>Appearance</strong><small>Choose a comfortable theme for your campus search.</small></div><button class="toggle ${dark ? "on" : ""}" data-action="theme" aria-label="Toggle dark theme" aria-pressed="${dark}"></button></div>
      <div class="settings-row"><span class="stat-icon found">✓</span><div><strong>Student verification</strong><small>${user.verified ? "Your Thapar student email has been verified." : "Verify your Thapar student email to build trust."}</small></div><button class="button button-secondary" data-action="verify">${user.verified ? "Verified" : "Verify now"}</button></div>
      <div class="settings-row"><span class="stat-icon claim">◎</span><div><strong>Privacy &amp; safety</strong><small>Your email, full student ID and private claim details are never shown on public reports.</small></div></div></section>
      <div class="safety-note" style="max-width:540px;margin-top:16px"><strong>Meet safely, return kindly</strong><p>For handovers, choose a staffed campus office or a public place during busy hours. Ask claimants to verify ownership with details that aren’t in the public listing.</p></div>`;
  }
  function renderAuth() {
    const isRegister = authMode === "register";
    return `<div class="auth-wrap"><section class="auth-card"><div class="auth-brand"><span class="brand-mark"><svg viewBox="0 0 32 32"><path d="M7.5 14.5 16 7l8.5 7.5v10a1.5 1.5 0 0 1-1.5 1.5H9a1.5 1.5 0 0 1-1.5-1.5z"/><path d="M12.5 26v-8h7v8M22 8.5l2.5 2.2"/></svg></span><span class="brand-name">Lost<span>Link</span><small>THAPAR COMMUNITY</small></span></div>
      <h1>${isRegister ? "Join the Thapar community" : "Welcome back"}</h1><p>${isRegister ? "Create your account to report items and help classmates reconnect with their belongings." : "Sign in with your Thapar student email to continue."}</p>
      <form class="auth-form" id="auth-form" data-mode="${authMode}">${isRegister ? `<div class="field"><label for="auth-name">Full name *</label><input id="auth-name" name="name" required maxlength="60" placeholder="Your name"></div>` : ""}
      <div class="field"><label for="auth-email">Thapar email *</label><input id="auth-email" name="email" type="email" required placeholder="you@thapar.edu"></div>
      ${isRegister ? `<div class="field"><label for="auth-student-id">Thapar student ID *</label><input id="auth-student-id" name="studentId" required maxlength="30" placeholder="Your student ID"><small>Your full ID is private and will never appear on public listings.</small></div>` : ""}
      <div class="field"><label for="auth-password">Password *</label><input id="auth-password" name="password" type="password" required minlength="6" placeholder="${isRegister ? "At least 6 characters" : "Your password"}"></div>
      <button class="button button-primary" type="submit">${isRegister ? "Create account & verify" : "Sign in"} →</button></form>
      <p class="auth-switch">${isRegister ? "Already have an account?" : "New to LostLink?"} <button data-action="auth-switch">${isRegister ? "Sign in" : "Create an account"}</button></p>
      <div class="privacy-footnote">🔒 Demo verification checks for a <strong>@thapar.edu</strong> address. No email is sent in this prototype; never use a real password here.</div>
      ${!isRegister ? `<button class="button button-secondary" data-action="demo-login" style="width:100%;margin-top:11px">Continue with demo account</button>` : ""}</section></div>`;
  }

  function openItemModal(itemId) {
    const item = items.find((entry) => entry.id === itemId);
    if (!item) return;
    const possibleMatches = matchesFor(item);
    const isOwner = item.owner === user.id;
    const existingClaim = claims.some((claim) => claim.itemId === item.id && claim.claimant === user.id && claim.status === "Pending");
    const claimButton = item.type === "found" && !isOwner && item.status === "Open"
      ? `<button class="button button-primary" data-action="claim" data-id="${escapeHtml(item.id)}" ${existingClaim ? "disabled" : ""}>${existingClaim ? "Claim submitted" : "Claim this item"}</button>` : "";
    byId("modal").innerHTML = `<div class="modal-header"><div><div class="eyebrow">${item.type === "lost" ? "Lost report" : "Found report"}</div><h2 id="modal-title">${escapeHtml(item.name)}</h2><p>${escapeHtml(item.category)} · Shared ${timeAgo(item.createdAt)}</p></div><button class="close-button" data-action="close-modal" aria-label="Close dialog">×</button></div>
      <div class="detail-visual">${itemPhotoMarkup(item)}</div><p class="detail-description">${escapeHtml(item.description)}</p>
      <div class="modal-meta"><div><span>Campus location</span><strong>${escapeHtml(item.location)}</strong></div><div><span>${item.type === "lost" ? "Date lost" : "Date found"}</span><strong>${dateLabel(item.date)}</strong></div><div><span>Report status</span><strong>${escapeHtml(item.status)}</strong></div><div><span>Reported by</span><strong>${isOwner ? "You" : "Verified student"}</strong></div></div>
      ${isOwner && item.identifying ? `<div class="private-detail"><strong>Your private identifying details</strong><p>${escapeHtml(item.identifying)}</p></div>` : ""}
      ${possibleMatches.length ? `<div style="margin-top:15px"><strong style="font-size:10px">Possible matches — not confirmed</strong>${possibleMatches.map((match) => `<div class="match-card" style="margin:9px 0 0" data-item="${escapeHtml(match.item.id)}"><div class="match-card-top">${typeBadge(match.item.type)}<span class="match-score">${match.score}% possible</span></div><strong>${escapeHtml(match.item.name)}</strong><p>${escapeHtml(match.reason)}</p></div>`).join("")}</div>` : ""}
      <div class="safety-note"><strong>Before a handover</strong><p>Verify ownership in person and choose a staffed campus office or busy public location. A suggested match is never a confirmed match.</p></div>
      <div class="modal-actions">${claimButton}${isOwner && item.type === "found" && item.status !== "Recovered" ? `<button class="button button-secondary" data-action="recover" data-id="${escapeHtml(item.id)}">Mark recovered</button>` : ""}<button class="button button-secondary" data-action="close-modal">Close</button></div>`;
    byId("modal-backdrop").hidden = false;
  }
  function closeModal() { byId("modal-backdrop").hidden = true; }
  function openClaimForm(itemId) {
    const item = items.find((entry) => entry.id === itemId);
    if (!item) return;
    byId("modal").innerHTML = `<div class="modal-header"><div><div class="eyebrow">Private ownership check</div><h2 id="modal-title">Claim “${escapeHtml(item.name)}”</h2><p>Only the finder will see your answer.</p></div><button class="close-button" data-action="close-modal" aria-label="Close dialog">×</button></div>
      <form class="modal-form" id="claim-form" data-item-id="${escapeHtml(item.id)}"><div class="field"><label for="claim-details">What details help prove it’s yours? *</label><textarea id="claim-details" name="details" minlength="12" maxlength="400" required placeholder="Describe an identifying detail that is not in the public report."></textarea><small>Don’t share passwords, full ID numbers or sensitive personal information.</small></div><div class="safety-note"><strong>Keep the handover safe</strong><p>If approved, arrange to meet at a staffed campus office or busy public place and verify the item together.</p></div><div class="modal-actions"><button type="button" class="button button-secondary" data-action="close-modal">Cancel</button><button class="button button-primary" type="submit">Submit private claim</button></div></form>`;
  }
  function toggleTheme(force) {
    const dark = force ?? !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", dark);
    byId("theme-color").content = dark ? "#201915" : "#fbf5eb";
    write(STORAGE.theme, dark ? "dark" : "light");
    render();
  }
  function emailLooksThapar(email) {
    const domain = email.toLowerCase().split("@")[1];
    return domain === "thapar.edu" || domain === "thaparuniversity.in";
  }
  function setItemStatus(itemId, status) {
    const item = items.find((entry) => entry.id === itemId);
    if (!item || item.owner !== user.id) return;
    item.status = status;
    if (!persistItems()) return;
    closeModal();
    render();
    toast(`Item marked as ${status.toLowerCase()}.`);
  }
  function handleAction(action, id) {
    if (action === "close-modal") closeModal();
    if (action === "theme") toggleTheme();
    if (action === "verify") {
      if (user.verified) { toast("Your student account is already verified."); return; }
      if (!emailLooksThapar(user.email || "")) { toast("Use your Thapar student email to verify."); return; }
      user.verified = true;
      if (persistUser()) { render(); toast("Student verification complete (simulated)."); }
    }
    if (action === "auth-switch") { authMode = authMode === "login" ? "register" : "login"; render(); }
    if (action === "demo-login") { user = { id: "u-demo", name: "Nidhi", email: "nidhi@thapar.edu", studentId: "1023••••", verified: true, contactPreference: "In-app messages" }; persistUser(); navTo("dashboard"); toast("Welcome back to the demo account."); }
    if (action === "sign-out") { user = null; write(STORAGE.user, null); navTo("auth"); }
    if (action === "claim") openClaimForm(id);
    if (action === "recover") setItemStatus(id, "Recovered");
    if (action === "clear-filters") { browseFilters = { search: "", category: "", location: "", status: "" }; render(); }
    if (action === "approve-claim" || action === "reject-claim") {
      const claim = claims.find((entry) => entry.id === id);
      if (!claim || !ownItem(claim.itemId) || claim.status !== "Pending") return;
      claim.status = action === "approve-claim" ? "Approved" : "Rejected";
      if (action === "approve-claim") {
        const claimedItem = items.find((entry) => entry.id === claim.itemId);
        if (claimedItem) claimedItem.status = "Recovered";
        if (!persistItems()) return;
      }
      if (persistClaims()) { render(); toast(action === "approve-claim" ? "Claim approved. Arrange a safe handover." : "Claim rejected."); }
    }
  }
  document.addEventListener("error", (event) => {
    if (event.target.matches(".item-photo-image")) event.target.parentElement.classList.add("photo-failed");
  }, true);

  document.addEventListener("click", (event) => {
    const pageButton = event.target.closest("[data-page]");
    if (pageButton) { event.preventDefault(); navTo(pageButton.dataset.page); return; }
    const actionButton = event.target.closest("[data-action]");
    if (actionButton) { handleAction(actionButton.dataset.action, actionButton.dataset.id); return; }
    const typeButton = event.target.closest("[data-browse-type]");
    if (typeButton) { browseType = typeButton.dataset.browseType; render(); return; }
    const reportFilter = event.target.closest("[data-report-filter]");
    if (reportFilter) {
      const filter = reportFilter.dataset.reportFilter;
      const mine = items.filter((item) => item.owner === user.id && (filter === "all" || item.type === filter)).sort((a, b) => b.createdAt - a.createdAt);
      document.querySelectorAll("[data-report-filter]").forEach((button) => button.classList.toggle("active", button === reportFilter));
      byId("my-report-list").innerHTML = mine.length ? mine.map(renderReportRow).join("") : `<div class="empty-state"><h3>No ${filter} reports</h3><p>Try another report type or create a report.</p></div>`;
      return;
    }
    const itemCard = event.target.closest("[data-item]");
    if (itemCard) openItemModal(itemCard.dataset.item);
  });
  document.addEventListener("keydown", (event) => {
    if ((event.key === "Enter" || event.key === " ") && event.target.matches("[data-item][role='button'], .item-card")) {
      event.preventDefault();
      openItemModal(event.target.dataset.item);
    }
    if (event.key === "Escape") closeModal();
  });
  document.addEventListener("input", (event) => {
    if (event.target.id === "browse-search") {
      const position = event.target.selectionStart;
      browseFilters.search = event.target.value;
      const content = byId("page-content");
      const next = renderBrowse();
      content.innerHTML = next;
      const input = byId("browse-search");
      input.focus();
      input.setSelectionRange(position, position);
    }
  });
  document.addEventListener("change", (event) => {
    if (event.target.id === "item-photo") {
      const input = event.target;
      const file = input.files[0];
      const preview = byId("photo-preview");
      clearPhotoPreview();
      preview.hidden = true;
      preview.innerHTML = "";
      if (!file) return;
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        input.value = "";
        toast("Choose a JPEG, PNG or WebP image.");
        return;
      }
      if (file.size > 8 * 1024 * 1024) {
        input.value = "";
        toast("Choose a photo smaller than 8 MB.");
        return;
      }
      photoPreviewUrl = URL.createObjectURL(file);
      preview.innerHTML = `<img src="${photoPreviewUrl}" alt="Selected item photo preview">`;
      preview.hidden = false;
      return;
    }
    if (["category-filter", "location-filter", "date-filter", "status-filter"].includes(event.target.id)) {
      browseFilters[{ "category-filter": "category", "location-filter": "location", "date-filter": "date", "status-filter": "status" }[event.target.id]] = event.target.value;
      render();
    }
  });
  document.addEventListener("submit", async (event) => {
    const form = event.target;
    if (form.id === "report-form") {
      event.preventDefault();
      if (!user) { navTo("auth"); toast("Sign in to create a report."); return; }
      const data = new FormData(form);
      const type = form.dataset.type;
      const newItem = {
        id: `item-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        type, name: String(data.get("name")).trim(), category: String(data.get("category")),
        description: String(data.get("description")).trim(), date: String(data.get("date")),
        location: String(data.get("location")), identifying: String(data.get("identifying") || "").trim(),
        status: type === "lost" ? "Open" : String(data.get("status")), owner: user.id, ownerName: user.name,
        contactPreference: String(data.get("contactPreference") || ""), createdAt: Date.now(),
      };
      if (!newItem.name || !newItem.description || !newItem.date || new Date(`${newItem.date}T00:00:00`) > today) { toast("Please check the required fields and date."); return; }
      const photoFile = type === "found" ? form.elements.photo.files[0] : null;
      if (photoFile) {
        try {
          newItem.photo = await compressPhoto(photoFile);
        } catch (error) {
          console.error("Could not process the selected item photo.", error);
          toast("Could not process that photo. Try a different image.");
          return;
        }
      }
      items.unshift(newItem);
      if (!persistItems()) { items.shift(); return; }
      clearPhotoPreview();
      toast(`${type === "lost" ? "Lost" : "Found"} report published.`);
      navTo("reports");
    }
    if (form.id === "claim-form") {
      event.preventDefault();
      const itemId = form.dataset.itemId;
      if (claims.some((claim) => claim.itemId === itemId && claim.claimant === user.id && claim.status === "Pending")) { toast("You already have a pending claim for this item."); return; }
      const details = String(new FormData(form).get("details") || "").trim();
      if (details.length < 12) { toast("Please add a little more detail to help verify ownership."); return; }
      claims.unshift({ id: `claim-${Date.now()}`, itemId, claimant: user.id, claimantName: user.name, details, status: "Pending", createdAt: Date.now() });
      if (!persistClaims()) { claims.shift(); return; }
      closeModal();
      render();
      toast("Your private claim was sent to the finder.");
    }
    if (form.id === "auth-form") {
      event.preventDefault();
      const data = new FormData(form);
      const email = String(data.get("email") || "").trim().toLowerCase();
      if (!emailLooksThapar(email)) { toast("Please use your @thapar.edu student email."); return; }
      const isRegister = form.dataset.mode === "register";
      if (isRegister) {
        const studentId = String(data.get("studentId") || "").trim();
        if (studentId.length < 4) { toast("Please enter a valid Thapar student ID."); return; }
        user = { id: `u-${Date.now()}`, name: String(data.get("name")).trim(), email, studentId: `${studentId.slice(0, 2)}••••`, verified: true, contactPreference: "In-app messages" };
        toast("Account created and student verification simulated.");
      } else {
        user = { id: `u-${email}`, name: email === "aarav.singh@thapar.edu" ? "Nidhi" : email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase()), email, studentId: "••••••••", verified: true, contactPreference: "In-app messages" };
        toast("Signed in. Student verification simulated.");
      }
      if (persistUser()) navTo("dashboard");
    }
  });
  document.addEventListener("reset", (event) => {
    if (event.target.id === "report-form") {
      clearPhotoPreview();
      window.setTimeout(() => {
        const dateInput = byId("item-date");
        if (dateInput) dateInput.value = "";
        const preview = byId("photo-preview");
        if (preview) { preview.hidden = true; preview.innerHTML = ""; }
      }, 0);
    }
  });
  byId("theme-toggle").addEventListener("click", () => toggleTheme());
  byId("mobile-menu").addEventListener("click", () => byId("sidebar").classList.toggle("open"));
  byId("modal-backdrop").addEventListener("click", (event) => { if (event.target === byId("modal-backdrop")) closeModal(); });
  document.addEventListener("click", (event) => {
    if (event.target.closest(".nav-item")) return;
    if (event.target.closest(".sidebar") || event.target.closest("#mobile-menu")) return;
    if (window.innerWidth <= 760) byId("sidebar").classList.remove("open");
  });

  const initialTheme = read(STORAGE.theme, "light");
  document.documentElement.classList.toggle("dark", initialTheme === "dark");
  byId("theme-color").content = initialTheme === "dark" ? "#201915" : "#fbf5eb";
  if (!user) currentPage = "auth";
  render();
})();
