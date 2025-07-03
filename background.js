chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type === "PRODUCT_INFO") {
    const productName = message.data.name;
    console.log("Received product info:", productName);

    // Use SerpAPI to search for product prices
    const apiKey = "";
    const query = encodeURIComponent(productName);

    const url = `https://serpapi.com/search.json?q=${query}&hl=en&gl=us&api_key=${apiKey}&engine=google_shopping`;

    try {
      console.log("Constructed URL:", url);
      const response = await fetch(url);
      const data = await response.json();
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type === "PRODUCT_INFO") {
    const productName = message.data.name;
    console.log("🔍 Received product info:", productName);

    const apiKey = "e624e87f40c527520f2d0eb6b0b6d4ecd2d5d8d6a63e7666a467604f0f5d5033";
    const query = encodeURIComponent(productName);
    const url = `https://serpapi.com/search.json?q=${query}&hl=en&gl=us&api_key=${apiKey}&engine=google_shopping`;

    try {
      console.log("🔗 Constructed URL:", url);
      const response = await fetch(url);
      const data = await response.json();

      const prices = {};

      if (data.shopping_results && Array.isArray(data.shopping_results)) {
        console.log("🛒 Shopping Results:", data.shopping_results);

        data.shopping_results.forEach((item, index) => {
          try {
            const link = item.link;

            // Check that link is a string and starts with http/https
            if (typeof link === "string" && link.startsWith("http")) {
              const source = new URL(link).hostname;
              console.log(`✅ [${index}] Source: ${source}, Price: ${item.price}`);
              prices[source] = item.price;
            } else {
              console.warn(`⚠️ [${index}] Skipping invalid link:`, link);
            }
          } catch (e) {
            console.error(`❌ [${index}] Error processing item:`, e, item);
          }
        });
      } else {
        console.warn("⚠️ No shopping results returned from SerpAPI.");
      }

      console.log("💲 Live prices:", prices);
      chrome.storage.local.set({ priceData: prices, product: productName });
    } catch (error) {
      console.error("🚨 Error fetching from SerpAPI:", error);
      chrome.storage.local.set({ priceData: null, product: productName });
    }
  }
});

      const prices = {};
      if (data.shopping_results) {
        console.log("Shopping Results:", data.shopping_results);

        data.shopping_results.forEach(item => {
        try {
            // Ensure item.link exists and is a valid URL
            if (item.link && item.link.startsWith("http")) {
            const source = new URL(item.link).hostname;
            console.log("Source:", source, "Price:", item.price);
            prices[source] = item.price;
            } else {
            console.warn("Skipping item due to missing or invalid link:", item);
            }
        } catch (e) {
            console.warn("Skipping item due to error:", e, item);
        }
        });

      }

      console.log("Live prices:", prices);

      chrome.storage.local.set({ priceData: prices, product: productName });
    } catch (error) {
      console.error("Error fetching from SerpAPI:", error);
      chrome.storage.local.set({ priceData: null, product: productName });
    }
  }
});
