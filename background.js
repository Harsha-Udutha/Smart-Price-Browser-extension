import { db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Store last scrape per tab
const tabDataCache = {};

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type === "SCRAPED_PRODUCT") {
    const { title, price, site, url } = message.data;
    const tabId = sender.tab?.id || "global";

    console.log("Scraped:", title, price);

    try {
      const q = query(
        collection(db, "scrapedProducts"),
        where("title", "==", title),
        where("price", "==", price)
      );
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        await addDoc(collection(db, "scrapedProducts"), {
          title,
          price,
          site,
          url,
          timestamp: new Date().toISOString()
        });
        console.log("✅ Saved to Firebase");
      } else {
        console.log("⚠️ Duplicate entry detected. Not saving.");
      }

      // Update both tab-local and global storage
      tabDataCache[tabId] = { product: title, priceData: { [site]: price } };
      chrome.storage.local.set(tabDataCache[tabId]);

    } catch (e) {
      console.error("❌ Firebase error:", e);
    }
  }

  if (message.type === "TRIGGER_SCRAPE") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, { type: "FORCE_SCRAPE" }, () => {
          sendResponse({ status: "scrape_triggered" });
        });
      }
    });
    return true;
  }
});
