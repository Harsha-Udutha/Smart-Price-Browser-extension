document.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0];

    if (!currentTab || !currentTab.id) {
      renderError("No active tab found.");
      return;
    }

    // Inject content.js into the active tab (safe if already present)
    chrome.scripting.executeScript(
      {
        target: { tabId: currentTab.id },
        files: ["content.js"]
      },
      () => {
        if (chrome.runtime.lastError) {
          console.warn("Injection failed:", chrome.runtime.lastError.message);
          loadFromStorage();
          return;
        }

        // Now trigger scrape
        chrome.tabs.sendMessage(currentTab.id, { type: "FORCE_SCRAPE" }, (response) => {
          if (chrome.runtime.lastError) {
            console.warn("Message failed:", chrome.runtime.lastError.message);
            loadFromStorage();
            return;
          }

          console.log("Scrape triggered:", response);
          setTimeout(loadFromStorage, 1500);
        });
      }
    );
  });
});

function loadFromStorage() {
  chrome.storage.local.get(["product", "priceData"], (result) => {
    const product = result.product || "Not detected";
    const prices = result.priceData;

    document.getElementById("product-name").textContent = product;

    const pricesDiv = document.getElementById("prices");
    pricesDiv.innerHTML = "";

    if (prices && Object.keys(prices).length > 0) {
      for (const [store, price] of Object.entries(prices)) {
        const p = document.createElement("p");
        p.textContent = `${store}: ${price}`;
        pricesDiv.appendChild(p);
      }
    } else {
      pricesDiv.textContent = "No price data found.";
    }
  });
}

function renderError(msg) {
  document.getElementById("product-name").textContent = msg;
  document.getElementById("prices").textContent = "";
}
