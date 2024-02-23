const products = [
  { id: 1, name: "Eco-friendly Water Bottle", category: "Home", price: 15, tags: ["eco-friendly", "new"] },
  { id: 2, name: "Organic Cotton T-shirt", category: "Apparel", price: 25, tags: ["eco-friendly"] },
  { id: 3, name: "Wireless Headphones", category: "Electronics", price: 200, tags: ["new", "sale"] },
  { id: 4, name: "Electric Scooter", category: "Transportation", price: 300, tags: ["electronics", "new"] },
  { id: 5, name: "Phone Case", category: "Accessories", price: 15, tags: ["eco-friendly", "new", "sale"] },
  { id: 6, name: "Organic Cotton Laptop Bag", category: "Accessories", price: 35, tags: ["eco-friendly", "new", "laptop"] },
  { id: 7, name: "Recycled Plastic Laptop Stand", category: "Accessories", price: 30, tags: ["eco-friendly", "new", "laptop"] },
  { id: 8, name: "Bamboo Phone Stand", category: "Accessories", price: 10, tags: ["eco-friendly", "new", "phone"] },
  { id: 9, name: "Phone Charger", category: "Electronics", price: 50, tags: ["new", "phone"] },
  { id: 10, name: "Macbook Air 13.3' Laptop", category: "Electronics", price: 850, tags: ["new", "laptop", "sale"] },
  { id: 11, name: "Reusable Storage Baskets", category: "Home", price: 12, tags: ["eco-friendly", "sale", "storage"] }
];
  
function createProductList(products) {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';

  if (!products.length) {
    productList.innerHTML = '<p>No products found</p>';
    return;
  }

  products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.className = 'product-element'
    productElement.innerHTML = `
      <p>Name: ${product.name}</p>
      <p>Category: ${product.category}</p>
      <p>Price: $${product.price}</p>
      <p>Tags: ${product.tags.join(', ')}</p>
    `;
    productList.appendChild(productElement);
  });
}
  
function toFilter() {
  const categoryFilter = document.getElementById('category-filter').value;
  const tagCheckboxes = document.querySelectorAll('input[name="tags"]:checked');
  const tagFilters = [];

  for (let i = 0; i < tagCheckboxes.length; i++) {
    tagFilters.push(tagCheckboxes[i].value);
  }
  
  let filteredProducts = products;

  if (categoryFilter) {
    filteredProducts = filteredProducts.filter(product => product.category === categoryFilter);
  }

  if (tagFilters.length) {
    filteredProducts = filteredProducts.filter(product => tagFilters.every(tag => product.tags.includes(tag)));
  }

  createProductList(filteredProducts);
}
  
document.getElementById('category-filter').addEventListener('change', toFilter);
document.querySelectorAll('input[name="tags"]').forEach(tag => tag.addEventListener('change', toFilter));

createProductList(products);