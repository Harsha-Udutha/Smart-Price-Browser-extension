function extractProductInfo() {
  let productName = null;

  const hostname = window.location.hostname;

  if (hostname.includes("amazon.com")) {
    const titleEl = document.getElementById("productTitle");
    productName = titleEl ? titleEl.innerText.trim() : null;

  } else if (hostname.includes("bestbuy.com")) {
    const titleEl = document.querySelector("div.sku-title h1");
    productName = titleEl ? titleEl.innerText.trim() : null;

  } else if (hostname.includes("walmart.com")) {
    const titleEl = document.querySelector("h1.prod-ProductTitle");
    productName = titleEl ? titleEl.innerText.trim() : null;

  } else {
    // Fallback: just use first <h1> on the page
    const titleEl = document.querySelector("h1");
    productName = titleEl ? titleEl.innerText.trim() : null;
  }

  if (productName) {
    console.log("Detected product:", productName);

    chrome.runtime.sendMessage({
      type: "PRODUCT_INFO",
      data: {
        name: productName
      }
    });
  } else {
    console.log("No product title detected on this page.");
  }
}

// Wait for DOM to load
window.addEventListener("load", () => {
  setTimeout(extractProductInfo, 2000); // wait 2s for dynamic content
});
