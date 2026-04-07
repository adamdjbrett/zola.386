function debounce(func, wait) {
  let timeout;

  return function debounced(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(this, args);
    }, wait);
  };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function makeTeaser(excerpt) {
  return escapeHtml(excerpt || "");
}

async function initSearch() {
  const searchInput = document.getElementById("search");
  const searchResults = document.querySelector(".search-results");
  const searchResultsItems = document.querySelector(".search-results__items");

  if (!searchInput || !searchResults || !searchResultsItems || !window.pagefind) {
    return;
  }

  const MAX_ITEMS = 10;
  let currentTerm = "";

  searchInput.addEventListener("keyup", debounce(async () => {
    const term = searchInput.value.trim();
    if (term === currentTerm) {
      return;
    }

    currentTerm = term;
    searchResultsItems.innerHTML = "";
    searchResults.style.display = term === "" ? "none" : "block";

    if (term === "") {
      return;
    }

    const response = await window.pagefind.search(term);
    if (!response?.results?.length) {
      searchResults.style.display = "none";
      return;
    }

    const matches = await Promise.all(
      response.results.slice(0, MAX_ITEMS).map((result) => result.data())
    );

    for (const match of matches) {
      const item = document.createElement("li");
      const title = escapeHtml(match.meta.title || match.url);
      item.innerHTML =
        '<div class="search-results__item">' +
        `<a href="${match.url}">${title}</a>` +
        `<div>${makeTeaser(match.excerpt)}</div>` +
        "</div>";
      searchResultsItems.appendChild(item);
    }
  }, 150));
}

if (
  document.readyState === "complete" ||
  (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  initSearch();
} else {
  document.addEventListener("DOMContentLoaded", initSearch);
}
