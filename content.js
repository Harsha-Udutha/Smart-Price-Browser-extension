let lastTitle = "";
let lastPrice = "";

function scrapeProduct() {
  const hostname = window.location.hostname;
  let title = null;
  let price = null;

  if (hostname.includes("amazon")) {
    const titleEl = document.getElementById("productTitle");
    const priceEl =
      document.querySelector("#corePrice_feature_div .a-price .a-offscreen") ||
      document.querySelector(".a-price .a-offscreen");

    title = titleEl?.textContent.trim();
    price = priceEl?.textContent.trim();

  } else if (hostname.includes("walmart")) {
    const titleEl = document.querySelector("h1[data-testid='product-title']") ||
                    document.querySelector("h1");

    const priceEl = document.querySelector("span[data-testid='price']") ||
                    document.querySelector("span[itemprop='price']");

    title = titleEl?.textContent.trim();
    price = priceEl?.textContent.trim();

  } else if (hostname.includes("bestbuy")) {
  title = document.querySelector("h1")?.innerText;
  price = document.querySelector('[data-testid="large-customer-price"]')?.innerText;
}

  const url = window.location.href;
  const site = hostname;

  if (!title || !price) {
    console.log("⛔ Missing title or price");
    return;
  }

  if (title !== lastTitle || price !== lastPrice) {
    console.log("🔥 Extracted product:", title, "|", price);

    chrome.runtime.sendMessage({
      type: "SCRAPED_PRODUCT",
      data: {
        title,
        price,
        site,
        url
      }
    });

    lastTitle = title;
    lastPrice = price;
  }
}

function debounce(fn, delay = 500) {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(fn, delay);
  };
}

scrapeProduct();

const observer = new MutationObserver(debounce(scrapeProduct));
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Listen for forced rescrape from popup
window.addEventListener("forceRescrape", () => {
  scrapeProduct();
});


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "FORCE_SCRAPE") {
    scrapeProduct(); // call your existing scrapeProduct function
    sendResponse({ status: "scraped" });
  }
});
