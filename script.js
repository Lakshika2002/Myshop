const products = [
  { id: 1, name: "Ceramic Mug", price: 14, cat: "home", icon: "☕", bg: "#f6e3c4" },
  { id: 2, name: "Linen Cushion", price: 28, cat: "home", icon: "🛋️", bg: "#dbe9e4" },
  { id: 3, name: "Scented Candle", price: 18, cat: "home", icon: "🕯️", bg: "#f9d9cf" },
  { id: 4, name: "Canvas Tote", price: 24, cat: "bags", icon: "👜", bg: "#e6e0f0" },
  { id: 5, name: "Day Backpack", price: 62, cat: "bags", icon: "🎒", bg: "#dbe9e4" },
  { id: 6, name: "Sun Hat", price: 22, cat: "style", icon: "👒", bg: "#f6e3c4" },
  { id: 7, name: "Round Sunglasses", price: 32, cat: "style", icon: "🕶️", bg: "#f9d9cf" },
  { id: 8, name: "Wool Scarf", price: 36, cat: "style", icon: "🧣", bg: "#e6e0f0" }
];

let cart = [];
const $ = id => document.getElementById(id);

function renderProducts(cat = "all") {
  const list = cat === "all" ? products : products.filter(p => p.cat === cat);
  $("grid").innerHTML = list.map(p => `
    <article class="card">
      <div class="thumb" style="background:${p.bg}">${p.icon}</div>
      <div class="card-body">
        <h3>${p.name}</h3>
        <span class="price">$${p.price.toFixed(2)}</span>
        <button class="add" data-id="${p.id}">Add to cart</button>
      </div>
    </article>`).join("");
}

function renderCart() {
  const items = $("cartItems");
  items.innerHTML = cart.length
    ? cart.map(c => `<li><span>${c.name} × ${c.qty}</span>
        <span>$${(c.price * c.qty).toFixed(2)} <button data-remove="${c.id}" aria-label="Remove ${c.name}">−</button></span></li>`).join("")
    : '<li class="empty">Your cart is empty.</li>';
  $("cartCount").textContent = cart.reduce((s, c) => s + c.qty, 0);
  $("cartTotal").textContent = cart.reduce((s, c) => s + c.price * c.qty, 0).toFixed(2);
}

function toggleCart(open) {
  $("drawer").classList.toggle("open", open);
  $("overlay").classList.toggle("open", open);
}

$("grid").addEventListener("click", e => {
  const id = e.target.dataset.id;
  if (!id) return;
  const p = products.find(x => x.id == id);
  const inCart = cart.find(x => x.id == id);
  inCart ? inCart.qty++ : cart.push({ ...p, qty: 1 });
  renderCart();
});

$("cartItems").addEventListener("click", e => {
  const id = e.target.dataset.remove;
  if (!id) return;
  const item = cart.find(x => x.id == id);
  item.qty--;
  if (item.qty === 0) cart = cart.filter(x => x.id != id);
  renderCart();
});

$("filters").addEventListener("click", e => {
  if (!e.target.dataset.cat) return;
  document.querySelectorAll("#filters button").forEach(b => b.classList.remove("active"));
  e.target.classList.add("active");
  renderProducts(e.target.dataset.cat);
});

$("cartBtn").onclick = () => toggleCart(true);
$("closeCart").onclick = $("overlay").onclick = () => toggleCart(false);
$("checkout").onclick = () => alert("This is a demo shop. Checkout is not connected.");

renderProducts();
renderCart();