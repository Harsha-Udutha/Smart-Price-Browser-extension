chrome.storage.local.get("productData", ({ productData }) => {
  if (productData) {
    const { title, price, source, url } = productData;
    document.getElementById("output").innerHTML = `
      <strong>${title}</strong><br>
      Price: ${price}<br>
      Site: ${source}<br>
      <a href="${url}" target="_blank">View Product</a>
    `;
  } else {
    document.getElementById("output").innerText = "No product data found.";
  }
});
