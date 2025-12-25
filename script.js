const products = [
  { name: "Glow Face Cream", price: 999, img: "images/glow.jpg" },
  { name: "Vitamin C Serum", price: 1299, img: "images/serum.jpg" },
  { name: "Matte Lipstick", price: 799, img: "images/lipstick.jpg" },
  { name: "Stick Sunscreens", price: 799, img: "images/sunscreen.jpg" }
];

let cart = [];

function displayProducts() {
  const container = document.getElementById("product-container");
  if(!container) return;
  container.innerHTML = "";
  products.forEach((product, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <h3>${product.name}</h3>
      <div class="price">Rs. ${product.price}</div>
      Quantity: <input type="number" value="1" min="1" id="qty-${index}">
      <button class="btn" onclick="addToCart(${index})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}

function filterProducts() {
  const query = document.getElementById("search").value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(query));
  const container = document.getElementById("product-container");
  container.innerHTML = "";
  filtered.forEach((product, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <h3>${product.name}</h3>
      <div class="price">Rs. ${product.price}</div>
      Quantity: <input type="number" value="1" min="1" id="qty-${index}">
      <button class="btn" onclick="addToCart(${index})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}

function addToCart(index) {
  const qty = parseInt(document.getElementById(`qty-${index}`).value);
  const product = {...products[index], quantity: qty};
  cart.push(product);
  updateCart();
}

function updateCart() {
  const count = document.getElementById("cart-count");
  const cartList = document.getElementById("cart-list");
  const cartTotal = document.getElementById("cart-total");
  if(count) count.innerText = cart.length;
  if(cartList){
    cartList.innerHTML = "";
    let total = 0;
    cart.forEach((item, i) => {
      total += item.price * item.quantity;
      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <p>${item.name} x ${item.quantity} - Rs. ${item.price * item.quantity}</p>
        <button onclick="removeFromCart(${i})">X</button>
      `;
      cartList.appendChild(div);
    });
    if(cartTotal) cartTotal.innerText = total;
  }
}

function removeFromCart(index) {
  cart.splice(index,1);
  updateCart();
}

function toggleCart() {
  const cartDiv = document.getElementById("cart-items");
  if(cartDiv) cartDiv.style.display = cartDiv.style.display === "block" ? "none" : "block";
}

function checkout() {
  if(cart.length === 0){
    alert("Your cart is empty!");
    return;
  }
  let message = "Hello, I want to order:%0A";
  cart.forEach(item => {
    message += `Product: ${item.name} x ${item.quantity}%0APrice: Rs. ${item.price * item.quantity}%0A`;
  });
  const whatsappUrl = `https://wa.me/9779825806754?text=${message}`;
  window.open(whatsappUrl, "_blank");
}

displayProducts();
