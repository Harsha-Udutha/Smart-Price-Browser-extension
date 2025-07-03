document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["priceData", "product"], (result) => {
    const product = result.product || "N/A";
    const priceData = result.priceData || {};

    document.getElementById("productName").textContent = product;

    const priceList = document.getElementById("priceList");
    priceList.innerHTML = "";

    if (Object.keys(priceData).length === 0) {
      priceList.innerHTML = "<li>No prices found.</li>";
      return;
    }

    for (const [source, price] of Object.entries(priceData)) {
      const li = document.createElement("li");
      li.textContent = `${source}: ${price}`;
      priceList.appendChild(li);
    }
  });
});
