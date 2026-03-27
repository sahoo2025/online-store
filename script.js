let products = [];

fetch("products.json")
  .then(res => res.json())
  .then(data => {
    products = data;
    displayProducts(products);
  });

function displayProducts(data) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  data.forEach(p => {
    container.innerHTML += `
      <div class="card">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <p>⭐ ${p.rating}</p>
        <button>Add to Cart</button>
      </div>
    `;
  });
}

/* Search */
document.getElementById("search").addEventListener("input", function() {
  const value = this.value.toLowerCase();
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(value)
  );
  displayProducts(filtered);
});

/* Filter */
document.getElementById("categoryFilter").addEventListener("change", function() {
  const value = this.value;
  const filtered = value ? products.filter(p => p.category === value) : products;
  displayProducts(filtered);
});

/* Sort */
document.getElementById("sort").addEventListener("change", function() {
  let sorted = [...products];

  if (this.value === "low") sorted.sort((a,b)=>a.price-b.price);
  if (this.value === "high") sorted.sort((a,b)=>b.price-a.price);

  displayProducts(sorted);
});