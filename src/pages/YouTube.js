import '../style.css';
import '../styles/youtube.css';

const BACKEND = 'http://localhost:5000';
const MIN_QUERY_LEN = 2;
const MAX_QUERY_LEN = 250;

// ── Simple spell-check dictionary for common misspellings ──────────────────
const SPELL_DICT = {
  'tutoral': 'tutorial', 'tutorail': 'tutorial', 'tuturial': 'tutorial',
  'videoes': 'videos', 'vidoes': 'videos',
  'javascript': 'javascript', 'javascrpit': 'javascript', 'javasript': 'javascript',
  'programing': 'programming', 'progrming': 'programming',
  'accessbility': 'accessibility', 'accessibilty': 'accessibility',
  'recepie': 'recipe', 'recipies': 'recipes',
  'excercise': 'exercise', 'excersise': 'exercise',
  'beginers': 'beginners', 'begginers': 'beginners',
  'musci': 'music', 'muisc': 'music',
  'movei': 'movie', 'moive': 'movie',
  'sciense': 'science', 'scinece': 'science',
  'histroy': 'history', 'histry': 'history',
  'tecnology': 'technology', 'techonology': 'technology',
};

/** Clean user input: trim + remove unsafe chars */
function sanitizeInput(raw) {
  if (typeof raw !== 'string') return '';
  return raw.trim().replace(/[<>"'`\\]/g, '').substring(0, MAX_QUERY_LEN);
}

/** Spell-check individual words and return { corrected, suggestions } */
function spellCheck(query) {
  const words = query.toLowerCase().split(/\s+/);
  const correctedWords = words.map(w => SPELL_DICT[w] || w);
  const corrected = correctedWords.join(' ');
  const changed = corrected !== query.toLowerCase();
  return { corrected: changed ? corrected : null, changed };
}

/** Format a YouTube publish date nicely */
function formatDate(iso) {
  if (!iso) return '';
  try {
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(iso));
  } catch {
    return iso.slice(0, 10);
  }
}

/** Escape HTML to prevent XSS */
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Mount the app ───────────────────────────────────────────────────────────
const app = document.querySelector('#youtube-app');
if (!app) throw new Error('#youtube-app container not found.');

app.innerHTML = `
  <div class="yt-page">
    <aside class="dashboard-sidebar">
      <div class="dashboard-brand">
        <div class="dashboard-brand-icon">A</div>
        <span>AURA</span>
      </div>
      <nav class="dashboard-nav" aria-label="Main navigation">
        <a href="/pages/dashboard.html"><span>⌂</span> Dashboard</a>
        <a href="#" id="navAssistant"><span>◉</span> Voice Assistant</a>
        <a href="/pages/accessibility.html"><span>♿</span> Accessibility</a>
        <a href="/pages/youtube.html" class="active"><span>▶</span> YouTube</a>
        <a href="/pages/settings.html"><span>⚙</span> Settings</a>
      </nav>
      <div class="dashboard-sidebar-bottom">
        <button id="ytLogout" type="button"><span>↪</span> Log out</button>
      </div>
    </aside>

    <main class="dashboard-main">
      <header class="dashboard-topbar">
        <div class="dashboard-mobile-brand">
          <div class="dashboard-brand-icon">A</div>
          <span>AURA</span>
        </div>
        <div class="dashboard-title">
          <span>AURA INTELLIGENT ASSISTANT</span>
          <h1>YouTube Search</h1>
        </div>
        <div class="dashboard-status">
          <span class="dashboard-status-dot"></span>
          System online
        </div>
      </header>

      <section class="dashboard-content">

        <!-- Search card -->
        <section class="yt-search-card">
          <span class="dashboard-label">YOUTUBE SEARCH</span>
          <h2>Find videos on any topic</h2>
          <p>Powered by YouTube Data API v3 &mdash; 10,000 free units/day</p>

          <form id="ytForm" class="yt-form" novalidate>
            <div class="yt-input-wrap">
              <span class="yt-input-icon" aria-hidden="true">▶</span>
              <input
                id="ytInput"
                type="search"
                placeholder="Search YouTube… e.g. accessibility tutorials"
                autocomplete="off"
                maxlength="250"
                aria-label="YouTube search query"
              >
              <button type="submit" class="yt-search-btn" aria-label="Search">Search</button>
            </div>
            <div id="ytInputError" class="yt-input-error" role="alert" aria-live="polite"></div>
            <div id="ytSpellSuggest" class="yt-spell-suggest" aria-live="polite"></div>
          </form>
        </section>

        <!-- Loading spinner -->
        <div id="ytSpinner" class="yt-spinner-wrap" hidden aria-label="Loading results" role="status">
          <div class="yt-spinner"></div>
          <span>Searching YouTube…</span>
        </div>

        <!-- Error banner -->
        <div id="ytError" class="yt-error-banner" hidden role="alert" aria-live="assertive"></div>

        <!-- Results section -->
        <section id="ytResults" class="yt-results-section" hidden>
          <div class="yt-results-meta">
            <div>
              <span class="dashboard-label">SEARCH RESULTS</span>
              <h2 id="ytResultsTitle">Results</h2>
            </div>
            <div id="ytKeywordsWrap" class="yt-keywords-wrap"></div>
          </div>

          <div id="ytGrid" class="yt-grid" role="list"></div>

          <!-- Related searches -->
          <div id="ytRelatedWrap" class="yt-related-wrap">
            <span class="dashboard-label">RELATED SEARCHES</span>
            <div id="ytRelated" class="yt-related-pills" aria-label="Related searches"></div>
          </div>
        </section>

        <!-- No results -->
        <div id="ytEmpty" class="yt-empty" hidden role="status" aria-live="polite">
          <div class="yt-empty-icon">🔍</div>
          <h3>No results found</h3>
          <p id="ytEmptyMsg">Try different keywords or check your spelling.</p>
        </div>

      </section>
    </main>
  </div>
`;

// ── Element references ───────────────────────────────────────────────────────
const form         = document.getElementById('ytForm');
const input        = document.getElementById('ytInput');
const inputError   = document.getElementById('ytInputError');
const spellSuggest = document.getElementById('ytSpellSuggest');
const spinner      = document.getElementById('ytSpinner');
const errorBanner  = document.getElementById('ytError');
const resultsSection = document.getElementById('ytResults');
const resultsTitle = document.getElementById('ytResultsTitle');
const grid         = document.getElementById('ytGrid');
const relatedWrap  = document.getElementById('ytRelatedWrap');
const relatedPills = document.getElementById('ytRelated');
const keywordsWrap = document.getElementById('ytKeywordsWrap');
const emptyState   = document.getElementById('ytEmpty');
const emptyMsg     = document.getElementById('ytEmptyMsg');

// ── Auth ─────────────────────────────────────────────────────────────────────
const token = localStorage.getItem('aura_token');
if (!token) {
  window.location.href = '/pages/login.html';
}

document.getElementById('ytLogout')?.addEventListener('click', () => {
  localStorage.removeItem('aura_token');
  localStorage.removeItem('aura_user');
  window.location.href = '/pages/login.html';
});

// ── UI state helpers ─────────────────────────────────────────────────────────
function showSpinner(visible) {
  spinner.hidden = !visible;
}

function showError(msg) {
  errorBanner.hidden = false;
  errorBanner.innerHTML = `<span class="yt-error-icon">⚠</span> ${esc(msg)}`;
  resultsSection.hidden = true;
  emptyState.hidden = true;
}

function clearError() {
  errorBanner.hidden = true;
  errorBanner.textContent = '';
}

function setInputError(msg) {
  inputError.textContent = msg;
  input.setAttribute('aria-invalid', 'true');
}

function clearInputError() {
  inputError.textContent = '';
  input.removeAttribute('aria-invalid');
}

// ── Render a video card ──────────────────────────────────────────────────────
function renderVideoCard(video) {
  const date = formatDate(video.publishedAt);
  const card = document.createElement('article');
  card.className = 'yt-card';
  card.setAttribute('role', 'listitem');
  card.innerHTML = `
    <a href="${esc(video.url)}" target="_blank" rel="noopener noreferrer" class="yt-card-link" aria-label="Watch ${esc(video.title)} on YouTube">
      <div class="yt-card-thumb-wrap">
        <img
          class="yt-card-thumb"
          src="${esc(video.thumbnail)}"
          alt="Thumbnail for ${esc(video.title)}"
          loading="lazy"
          onerror="this.src='https://i.ytimg.com/vi/${esc(video.videoId)}/mqdefault.jpg'"
        >
        <div class="yt-card-play" aria-hidden="true">▶</div>
      </div>
      <div class="yt-card-body">
        <h3 class="yt-card-title">${esc(video.title)}</h3>
        <div class="yt-card-meta">
          <span class="yt-card-channel">📺 ${esc(video.channel)}</span>
          ${date ? `<span class="yt-card-date">🗓 ${esc(date)}</span>` : ''}
        </div>
        ${video.description ? `<p class="yt-card-desc">${esc(video.description.slice(0, 120))}${video.description.length > 120 ? '…' : ''}</p>` : ''}
        <span class="yt-card-watch-link">Watch on YouTube →</span>
      </div>
    </a>
  `;
  return card;
}

// ── Render related pill ──────────────────────────────────────────────────────
function renderRelatedPill(text) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'yt-related-pill';
  btn.textContent = text;
  btn.addEventListener('click', () => {
    input.value = text;
    doSearch(text);
  });
  return btn;
}

// ── Render keyword badge ─────────────────────────────────────────────────────
function renderKeywordBadge(word) {
  const span = document.createElement('span');
  span.className = 'yt-keyword-badge';
  span.textContent = word;
  return span;
}

// ── Core search function ─────────────────────────────────────────────────────
async function doSearch(rawQuery) {
  clearInputError();
  clearError();

  // Frontend validation
  const clean = sanitizeInput(rawQuery);
  if (!clean) {
    setInputError('Please enter a search query.');
    return;
  }
  if (clean.length < MIN_QUERY_LEN) {
    setInputError(`Query too short — please enter at least ${MIN_QUERY_LEN} characters.`);
    return;
  }

  // Spell check
  const { corrected, changed } = spellCheck(clean);
  if (changed && corrected) {
    spellSuggest.innerHTML = `Did you mean: <button type="button" class="yt-did-you-mean" id="ytDym">${esc(corrected)}</button>?`;
    document.getElementById('ytDym')?.addEventListener('click', () => {
      input.value = corrected;
      spellSuggest.innerHTML = '';
      doSearch(corrected);
    });
  } else {
    spellSuggest.innerHTML = '';
  }

  // Show spinner, hide previous results
  showSpinner(true);
  resultsSection.hidden = true;
  emptyState.hidden = true;

  try {
    const params = new URLSearchParams({ q: clean, maxResults: '8' });
    const response = await fetch(`${BACKEND}/api/youtube/search?${params}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });

    let data;
    try {
      data = await response.json();
    } catch {
      throw new Error('Invalid response from server.');
    }

    if (!response.ok || !data.success) {
      let userMsg = data.message || 'Search failed. Please try again.';
      // Friendly rewording for quota error
      if (response.status === 429) {
        userMsg = '⚡ YouTube daily quota reached (10,000 units/day). Results will be available again tomorrow.';
      } else if (response.status === 403) {
        userMsg = '🔑 YouTube API key issue. Please check your Google Cloud Console settings.';
      } else if (response.status === 503) {
        userMsg = '⚙️ YouTube search is not configured yet. Add your YOUTUBE_API_KEY to backend/.env';
      } else if (response.status === 504) {
        userMsg = '🌐 No internet connection or YouTube is unreachable. Check your network.';
      }
      showError(userMsg);
      return;
    }

    const { videos, related, keywords, query } = data;

    if (!videos || videos.length === 0) {
      emptyState.hidden = false;
      emptyMsg.textContent = `No videos found for "${clean}". Try broader keywords.`;
      resultsSection.hidden = true;
      return;
    }

    // Render results
    resultsTitle.textContent = `Results for "${query}"`;
    grid.innerHTML = '';
    videos.forEach(v => grid.appendChild(renderVideoCard(v)));

    // Keywords
    keywordsWrap.innerHTML = '';
    if (keywords && keywords.length) {
      const label = document.createElement('span');
      label.className = 'yt-keywords-label';
      label.textContent = 'Keywords: ';
      keywordsWrap.appendChild(label);
      keywords.forEach(kw => keywordsWrap.appendChild(renderKeywordBadge(kw)));
    }

    // Related searches
    relatedPills.innerHTML = '';
    if (related && related.length) {
      related.forEach(r => relatedPills.appendChild(renderRelatedPill(r)));
      relatedWrap.hidden = false;
    } else {
      relatedWrap.hidden = true;
    }

    resultsSection.hidden = false;

    // Announce to screen readers
    resultsSection.setAttribute('tabindex', '-1');
    resultsSection.focus({ preventScroll: false });

  } catch (err) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      showError('🌐 Cannot connect to AURA backend. Make sure the server is running on port 5000.');
    } else {
      showError(err.message || 'An unexpected error occurred.');
    }
  } finally {
    showSpinner(false);
  }
}

// ── Form submit ──────────────────────────────────────────────────────────────
form.addEventListener('submit', e => {
  e.preventDefault();
  doSearch(input.value);
});

// ── Real-time input validation ────────────────────────────────────────────────
input.addEventListener('input', () => {
  const val = input.value.trim();
  if (val.length > 0 && val.length < MIN_QUERY_LEN) {
    setInputError(`Keep typing… need at least ${MIN_QUERY_LEN} characters.`);
  } else if (val.length > MAX_QUERY_LEN) {
    setInputError(`Query too long (max ${MAX_QUERY_LEN} characters).`);
  } else {
    clearInputError();
  }
});

// ── Apply saved accessibility preferences ────────────────────────────────────
try {
  const prefs = JSON.parse(localStorage.getItem('aura_prefs') || '{}');
  if (prefs.theme === 'light') document.body.dataset.theme = 'light';
  if (prefs.highContrast) document.body.classList.add('high-contrast');
  if (prefs.largeText) document.body.classList.add('large-text');
  if (prefs.reduceMotion) document.body.classList.add('reduce-motion');
} catch {}
