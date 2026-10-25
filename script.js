javascript
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 1499,
        category: "Electronics",
        image: "https://placehold.co/300x200?text=Headphones"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 1999,
        category: "Electronics",
        image: "https://placehold.co/300x200?text=Smart+Watch"
    },
    {
        id: 3,
        name: "Running Shoes",
        price: 1299,
        category: "Fashion",
        image: "https://placehold.co/300x200?text=Shoes"
    },
    {
        id: 4,
        name: "Backpack",
        price: 899,
        category: "Fashion",
        image: "https://placehold.co/300x200?text=Backpack"
    },
    {
        id: 5,
        name: "Sunglasses",
        price: 599,
        category: "Accessories",
        image: "https://placehold.co/300x200?text=Sunglasses"
    },
    {
        id: 6,
        name: "Wrist Watch",
        price: 999,
        category: "Accessories",
        image: "https://placehold.co/300x200?text=Wrist+Watch"
    }
];

let cart = [];

const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

function displayProducts() {
    const search = searchInput.value.toLowerCase();
    const category = categoryFilter.value;

    const filteredProducts = products.filter(product => {
        return product.name.toLowerCase().includes(search) &&
            (category === "All" || product.category === category);
    });

    productList.innerHTML = "";

    if (filteredProducts.length === 0) {
        productList.textContent = "No products found.";
        return;
    }

    filteredProducts.forEach(product => {
        const card = document.createElement("div");
        card.className = "product";

        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.name;
        image.loading = "lazy";

        const name = document.createElement("h3");
        name.textContent = product.name;

        const price = document.createElement("p");
        price.textContent = "Price: ₹" + product.price;

        const button = document.createElement("button");
        button.textContent = "Add to Cart";
        button.addEventListener("click", () => addToCart(product.id));

        card.append(image, name, price, button);
        productList.appendChild(card);
    });
}

function addToCart(id) {
    const product = products.find(item => item.id === id);
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    displayCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    displayCart();
}

function displayCart() {
    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;

        const row = document.createElement("div");
        row.className = "cartItem";

        const details = document.createElement("span");
        details.textContent =
            `${item.name} × ${item.quantity} — ₹${item.price * item.quantity}`;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => removeFromCart(item.id));

        row.append(details, removeButton);
        cartItems.appendChild(row);
    });

    if (cart.length === 0) {
        cartItems.textContent = "Your cart is empty.";
    }

    cartCount.textContent = count;
    cartTotal.textContent = "Total: ₹" + total;
}

searchInput.addEventListener("input", displayProducts);
categoryFilter.addEventListener("change", displayProducts);

document.getElementById("cartButton").addEventListener("click", () => {
    document.getElementById("cartSection").scrollIntoView({
        behavior: "smooth"
    });
});

document.getElementById("clearCart").addEventListener("click", () => {
    cart = [];
    displayCart();
});

displayProducts();
displayCart();
