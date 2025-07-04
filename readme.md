🛍️ Product Price Tracker Extension

A lightweight and efficient Chrome extension that automatically extracts product name and price from e-commerce websites like Amazon, Walmart, and BestBuy, stores it in Firebase, and displays price info directly in the extension popup.

🚀 Features

🔍 Automatically detects product name and price on supported sites

☁️ Stores unique product-price entries to Firebase Firestore (deduplicated)

🖥️ View current product details in a clean popup interface

↺ Reacts to product variant changes or page updates

🌐 Works across tabs, pages, and multiple sessions

🖼️ Screenshots

Extension Popup

Firebase Firestore





🧰 Tech Stack

Chrome Extension API (Manifest v3)

Firebase Firestore – Realtime cloud database

JavaScript (ES Modules)

Content Scripts + Mutation Observers

Popup UI with HTML/CSS

**Cross-tab communication using **chrome.runtime.sendMessage

✅ Supported Sites



Support for more sites can be added by updating content.js.

📁 File Structure

├── background.js          # Handles Firebase logic and messaging
├── content.js             # Scrapes product name and price
├── popup.html             # Extension UI
├── popup.css              # Popup styling
├── popup.js               # Popup logic + data display
├── firebase-config.js     # Firebase project configuration
├── manifest.json          # Chrome extension config
└── .gitignore             # Prevents exposing firebase-config.js

🔐 Environment & Security

Ensure firebase-config.js is NOT committed to your public repository.Use .gitignore and consider moving sensitive keys to Chrome extension storage or background logic.

⚙️ Setup Instructions

1. Clone this repo

git clone https://github.com/your-username/product-price-tracker.git
cd product-price-tracker

2. Add your firebase-config.js

// firebase-config.js (Don't expose in public repos!)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app-id",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "app-id"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

3. Load into Chrome

Go to chrome://extensions/

Enable Developer Mode

Click "Load unpacked"

Select the project directory

4. Visit Amazon, Walmart, or BestBuy product page

Click the extension icon to see the product's price!

🔪 Demo

You can try this extension on:

https://www.amazon.com

https://www.walmart.com

https://www.bestbuy.com

💡 Future Improvements

Add support for Flipkart, Target, and Newegg

Historical price tracking per product

Alerts for price drops

User-specific watchlists

Firebase Auth integration

🤝 Contributing

Pull requests are welcome! For major changes, open an issue first to discuss what you'd like to change.

📄 License

MIT

yehh I have no idea, what to put here.