(function () {
  function scrapeAmazon() {
    const title = document.querySelector("#productTitle")?.innerText?.trim();
    const price = document.querySelector("#priceblock_ourprice, #priceblock_dealprice, #priceblock_saleprice")?.innerText?.trim();

    if (title && price) {
      chrome.runtime.sendMessage({
        type: "SCRAPED_PRODUCT",
        data: { title, price, source: location.hostname, url: location.href }
      });
    }
  }

  // Only run on product pages
  if (window.location.hostname.includes("amazon.com")) {
    window.addEventListener("load", () => {
      setTimeout(scrapeAmazon, 2000); // wait for dynamic content to load
    });
  }
})();
