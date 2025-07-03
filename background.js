chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "SCRAPED_PRODUCT") {
    const { title, price, source, url } = message.data;
    console.log("📦 Product found:");
    console.log("Name:", title);
    console.log("Price:", price);
    console.log("Source:", source);
    console.log("URL:", url);

    chrome.storage.local.set({
      productData: { title, price, source, url }
    });
  }
});
